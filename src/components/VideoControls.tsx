import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useVideoPlayer } from '../context/VideoPlayerContext';
import VideoProgressBar from './VideoProgressBar';
import VideoTimeDisplay from './VideoTimeDisplay';
import { VideoControlsProps, Chapter } from '../types';
import '../styles.css';

const timeStringToSeconds = (timeString: string): number => {
  const [minutes, seconds] = timeString.split(':').map(Number);
  return minutes * 60 + seconds;
};

const VideoControls: React.FC<VideoControlsProps> = ({
  className = '',
  videoTitle,
  chapters,
  showVolumeControl = true,
  showProgressBar = true,
  showFullscreenButton = false,
  showPlaybackRateControl = false,
  showTimeDisplay = true,
  autoHideControls = true,
  isHovering = false,
  onSeek,
}) => {
  const {
    playing,
    muted,
    toggleMute,
    toggleFullscreen,
    duration,
    seekTo,
    played,
  } = useVideoPlayer();

  const [visible, setVisible] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const volumeControlRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  // Get current chapter based on played time
  const currentChapter = useMemo(() => {
    if (!chapters || !chapters.length || !duration) return null;
    
    const currentTime = played * duration;
    
    return chapters.find(chapter => {
      const startTime = typeof chapter.start === 'string' 
        ? timeStringToSeconds(chapter.start) 
        : chapter.start;
      
      const endTime = typeof chapter.end === 'string' 
        ? timeStringToSeconds(chapter.end) 
        : chapter.end;
      
      return currentTime >= startTime && currentTime < endTime;
    });
  }, [chapters, played, duration]);

  // Reset the auto-hide timer
  const resetHideTimer = useCallback(() => {
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
      hideControlsTimeout.current = null;
    }
    
    setVisible(true);
    
    if (autoHideControls && playing && !isHovering) {
      hideControlsTimeout.current = setTimeout(() => {
        setVisible(false);
      }, 1000);
    }
  }, [autoHideControls, playing, isHovering]);

  // Handle auto-hide controls
  useEffect(() => {
    resetHideTimer();
    
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, [autoHideControls, playing, isHovering, resetHideTimer]);

  // Handle clicks outside volume control to hide slider
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeControlRef.current && !volumeControlRef.current.contains(event.target as Node)) {
        setShowVolumeSlider(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle volume icon click
  const handleVolumeClick = useCallback(() => {
    toggleMute();
  }, [toggleMute]);

  // Handle volume icon hover or click to show slider
  const handleVolumeIconInteraction = useCallback(() => {
    setShowVolumeSlider(true);
  }, []);

  // Handle seeking
  const handleSeek = useCallback((fraction: number) => {
    seekTo(fraction);
    if (onSeek) {
      onSeek(fraction);
    }
    resetHideTimer();
  }, [seekTo, onSeek, resetHideTimer]);

  // Get volume icon based on current state
  const getVolumeIcon = useCallback(() => {
    if (muted) return '🔇';
    return '🔊';
  }, [muted]);

  // Instead of returning null, we'll always render the component but with CSS transitions
  return (
    <div 
      className={`flex flex-col w-full bg-gradient-to-t from-black/40 via-black/20 to-transparent 
        transition-all duration-150 ease-in transform origin-bottom
        ${visible || isHovering ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-1 pointer-events-none'}
        ${className}`}
      onMouseMove={resetHideTimer}
      onMouseEnter={resetHideTimer}
      onClick={resetHideTimer}
    >
      {/* Top controls - Volume in top right */}
      <div className="flex justify-between items-end w-full px-4 pb-1">
        
        {/* Video title and current chapter on the left */}
        <div className="flex flex-col">
          {videoTitle && (
            <div className="text-white text-base font-medium font-inter select-none">
              {videoTitle}
            </div>
          )}
          {currentChapter && (
            <div className="text-white/70 text-sm font-normal font-inter select-none">
              {currentChapter.title}
            </div>
          )}
        </div>
        
        {/* Time display */}
        {showTimeDisplay && duration > 0 && (
          <VideoTimeDisplay />
        )}
        
      </div>
      
      {/* Bottom controls */}
      <div className="flex flex-col w-full px-4 py-2">
        {/* Progress bar */}
        {showProgressBar && (
          <div className="w-full mb-2">
            <VideoProgressBar onSeek={handleSeek} chapters={chapters} />
          </div>
        )}
        
        {/* Bottom row with play/pause, time display, etc. */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Fullscreen button */}
            {showFullscreenButton && (
              <button
                className="text-white focus:outline-none select-none transition-transform duration-200 hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                  resetHideTimer();
                }}
                aria-label="Toggle fullscreen"
              >
                ⛶
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(VideoControls); 