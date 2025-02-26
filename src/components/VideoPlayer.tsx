import React, { useRef, useEffect, useState, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { VideoPlayerProps } from '../types';
import { VideoPlayerProvider, useVideoPlayer } from '../context/VideoPlayerContext';
import VideoControls from '../components/VideoControls';
import '../styles.css';
const VideoPlayerInner: React.FC<VideoPlayerProps> = ({
  url,
  autoPlay = false,
  loop = false,
  muted: initialMuted = false,
  controls = true,
  autoHideControls = true,
  volume: initialVolume = 0.8,
  playbackRate: initialPlaybackRate = 1.0,
  width = '100%',
  height = 'auto',
  containerClassName = '',
  controlsClassName = '',
  videoClassName = '',
  showPlayPause = false,
  showVolumeControl = true,
  showProgressBar = true,
  showFullscreenButton = false,
  showPlaybackRateControl = false,
  showTimeDisplay = true,
  replayIfNotLooped = true,
  onPlay,
  onPause,
  onEnded,
  onProgress,
  onDuration,
  onReady,
  onError,
  config,
  children,
  videoTitle,
  chapters,
  ...rest
}) => {
  const {
    playing,
    muted,
    volume,
    playbackRate,
    togglePlay,
    toggleMute,
    setVolume,
    setPlaybackRate,
    seekTo,
    played,
    loaded,
    duration,
    seeking,
    setPlayed,
    setLoaded,
    setDuration,
    setPlaying,
  } = useVideoPlayer();

  const [isHovering, setIsHovering] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [isProgressBarClick, setIsProgressBarClick] = useState(false);
  const [isSpacebarHeld, setIsSpacebarHeld] = useState(false);
  const playerRef = useRef<ReactPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPreviewSeeking, setIsPreviewSeeking] = useState(false);
  const [lastPlayedPosition, setLastPlayedPosition] = useState(0);

  // Handle progress updates
  const handleProgress = useCallback((state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    if (!seeking) {
      setPlayed(state.played);
      setLoaded(state.loaded);
      onProgress?.(state);
      
      // Store the last played position when not in preview mode
      if (!isPreviewSeeking) {
        setLastPlayedPosition(state.played);
      }
      
      // Reset ended state if video is playing again
      if (hasEnded && state.played > 0 && state.played < 0.99) {
        setHasEnded(false);
      }
    }
  }, [seeking, setPlayed, setLoaded, onProgress, hasEnded, setHasEnded, isPreviewSeeking]);

  // Handle duration updates
  const handleDuration = useCallback((duration: number) => {
    setDuration(duration);
    onDuration?.(duration);
  }, [setDuration, onDuration]);

  // Handle play event
  const handlePlay = useCallback(() => {
    setHasEnded(false);
    onPlay?.();
  }, [setHasEnded, onPlay]);

  // Handle pause event
  const handlePause = useCallback(() => {
    onPause?.();
  }, [onPause]);

  // Handle end event
  const handleEnded = useCallback(() => {
    if (!loop) {
      setHasEnded(true);
    }
    onEnded?.();
  }, [loop, setHasEnded, onEnded]);

  // Handle ready event
  const handleReady = useCallback(() => {
    setIsReady(true);
    onReady?.();
  }, [setIsReady, onReady]);

  // Handle error event
  const handleError = useCallback((error: any) => {
    onError?.(error);
  }, [onError]);

  // Handle replay
  const handleReplay = useCallback(() => {
    // First set playing to true to ensure video starts playing
    setPlaying(true);
    
    // Small delay before seeking to ensure the play command is processed first
    setTimeout(() => {
      seekTo(0, 'fraction');
      setHasEnded(false);
    }, 10);
  }, [seekTo, setPlaying, setHasEnded]);

  // Set initial volume and muted state
  useEffect(() => {
    setVolume(initialVolume);
  }, [initialVolume, setVolume]);

  // Set initial playback rate
  useEffect(() => {
    setPlaybackRate(initialPlaybackRate);
  }, [initialPlaybackRate, setPlaybackRate]);

  // Handle mouse enter/leave for hover effects
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  // Handle seeking when clicking on progress bar
  const handleSeek = useCallback((fraction: number) => {
    // Mark that this is a progress bar click to prevent play/pause animation
    setIsProgressBarClick(true);
    
    // Store the current playing state
    const wasPlaying = playing;
    
    // Set seeking state to true to prevent progress updates during seeking
    seekTo(fraction, 'fraction');
    
    // If we're playing, store the current position before seeking
    if (playing) {
      setLastPlayedPosition(played);
    }
    
    // If the video was playing, ensure it continues playing after seeking
    if (wasPlaying) {
      // Small delay to ensure the seek completes before resuming playback
      setTimeout(() => {
        setPlaying(true);
      }, 50);
    }
    
    // Reset the flag after a short delay
    setTimeout(() => {
      setIsProgressBarClick(false);
    }, 300);
  }, [seekTo, playing, played, setPlaying]);

  // Update player ref in context when it changes and set up preview handling
  useEffect(() => {
    if (playerRef.current) {
      // This is a workaround to expose the player ref to the context
      // We're using a property that's not in the type definition but exists in the actual object
      (window as any).__playerRef = playerRef.current;
      
      // Initialize the isProgressBarClick flag
      (window as any).__isProgressBarClick = false;
      
      // Add a method to handle preview seeking
      (window as any).__handlePreviewSeek = (isPreview: boolean) => {
        // Only change state if it's different to avoid unnecessary renders
        if (isPreviewSeeking !== isPreview) {
          setIsPreviewSeeking(isPreview);
        }
        
        // If we're exiting preview mode and we were playing before, restore the last played position
        if (!isPreview && playing && lastPlayedPosition > 0) {
          // Only restore if we were actually playing
          setTimeout(() => {
            if (playerRef.current && playing) {
              // Use a small timeout to ensure the UI updates first
              playerRef.current.seekTo(lastPlayedPosition, 'fraction');
            }
          }, 50);
        }
      };
    }
    
    return () => {
      // Clean up global references when component unmounts
      if (typeof window !== 'undefined') {
        delete (window as any).__playerRef;
        delete (window as any).__handlePreviewSeek;
        delete (window as any).__isProgressBarClick;
      }
    };
  }, [playerRef.current, playing, lastPlayedPosition, isPreviewSeeking]);

  // Prevent default drag behavior
  const preventDrag = useCallback((e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
  }, []);

  // Add global keyboard event listeners for spacebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' && !e.repeat) {
        setIsSpacebarHeld(true);
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        setIsSpacebarHeld(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl group ${containerClassName}`}
      style={{ width, height: height === 'auto' ? 'auto' : height }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseEnter}
      {...rest}
    >
      {/* Controls positioned above the video */}
      {controls && (
        <div className="absolute bottom-0 left-0 right-0 z-10 transition-opacity duration-300">
          <VideoControls
            className={controlsClassName}
            videoTitle={videoTitle}
            showPlayPause={showPlayPause}
            showVolumeControl={showVolumeControl}
            showProgressBar={showProgressBar}
            showFullscreenButton={showFullscreenButton}
            showPlaybackRateControl={showPlaybackRateControl}
            showTimeDisplay={showTimeDisplay}
            autoHideControls={autoHideControls}
            isHovering={isHovering || !playing}
            chapters={chapters}
            onSeek={handleSeek}
          />
        </div>
      )}
      
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        loop={loop}
        muted={muted}
        volume={volume}
        playbackRate={playbackRate}
        width="100%"
        height="100%"
        className={`react-player ${videoClassName}`}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onReady={handleReady}
        onError={handleError}
        progressInterval={33} // Update progress more frequently (approximately 30fps for smoother updates)
        config={{
          ...config,
          file: {
            ...config?.file,
            forceVideo: true,
            attributes: {
              ...config?.file?.attributes,
              controlsList: 'nodownload'
            }
          }
        }}
      />
      
      {/* Black overlay on hover */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-250 ${isHovering || !playing || hasEnded ? 'opacity-20' : 'opacity-0'}`}
      />
      
      {/* Video overlay for click to play/pause */}
      <div 
        className="absolute inset-0 bg-transparent cursor-pointer flex items-center justify-center select-none"
        onClick={hasEnded && replayIfNotLooped ? handleReplay : togglePlay}
        tabIndex={0}
        aria-label={hasEnded && replayIfNotLooped ? "Replay video" : playing ? "Pause video" : "Play video"}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (hasEnded && replayIfNotLooped) {
              handleReplay();
            } else {
              togglePlay();
            }
          }
        }}
      >
        {/* Play/Pause/Replay icon overlay */}
        <div className={`transform scale-100 select-none ease-spring duration-600 ${
          (isHovering || hasEnded || !playing || isSpacebarHeld) && 
          (playing ? !(window as any).__isProgressBarClick : true) ? 'opacity-100 scale-100 group-active:scale-[0.95] active:scale-[0.95]' : 'opacity-0 scale-100'
        } ${isSpacebarHeld ? 'active:scale-[0.95] scale-[0.95]' : ''}`}>
          <div className="w-20 h-20 flex items-center justify-center">
            {hasEnded && replayIfNotLooped ? (
              <img 
                src="/replay.svg" 
                alt="Replay"
                draggable="false"
                onDragStart={preventDrag}
                className={`w-18 h-18 transform select-none cursor-pointer shadow-xl ${isSpacebarHeld ? 'scale-[0.95]' : 'scale-100'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setPlaying(true);
                  setTimeout(() => {
                    seekTo(0, 'fraction');
                    setHasEnded(false);
                  }, 10);
                }}
              />
            ) : playing ? (
              <img 
                src="/pause.svg" 
                alt="Pause"
                draggable="false"
                onDragStart={preventDrag} 
                className={`w-18 h-18 transform select-none ${isSpacebarHeld ? 'scale-[0.95]' : 'scale-100'}`}
              />
            ) : (
              <img 
                src="/play.svg" 
                alt="Play"
                draggable="false"
                onDragStart={preventDrag} 
                className={`w-18 h-18 transform select-none ${isSpacebarHeld ? 'scale-[0.95]' : 'scale-100'}`}
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Custom children (overlays, etc.) */}
      {children}
    </div>
  );
};

const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  return (
    <VideoPlayerProvider
      initialPlaying={props.autoPlay}
      initialMuted={props.muted}
      initialVolume={props.volume}
      initialPlaybackRate={props.playbackRate}
    >
      <VideoPlayerInner {...props} />
    </VideoPlayerProvider>
  );
};

export default React.memo(VideoPlayer); 