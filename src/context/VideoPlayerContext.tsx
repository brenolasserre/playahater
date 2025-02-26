import React, { createContext, useContext, useState, useRef, useCallback, ReactNode } from 'react';
import { VideoPlayerContextType } from '../types';
import ReactPlayer from 'react-player';

// Create the context with a default value
const VideoPlayerContext = createContext<VideoPlayerContextType | undefined>(undefined);

interface VideoPlayerProviderProps {
  children: ReactNode;
  initialPlaying?: boolean;
  initialMuted?: boolean;
  initialVolume?: number;
  initialPlaybackRate?: number;
}

export const VideoPlayerProvider: React.FC<VideoPlayerProviderProps> = ({
  children,
  initialPlaying = false,
  initialMuted = false,
  initialVolume = 0.8,
  initialPlaybackRate = 1.0,
}) => {
  // Player state
  const [playing, setPlaying] = useState<boolean>(initialPlaying);
  const [muted, setMuted] = useState<boolean>(initialMuted);
  const [volume, setVolume] = useState<number>(initialVolume);
  const [playbackRate, setPlaybackRate] = useState<number>(initialPlaybackRate);
  const [played, setPlayed] = useState<number>(0);
  const [loaded, setLoaded] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  
  // Refs
  const playerRef = useRef<ReactPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Toggle play/pause
  const togglePlay = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  
  // Toggle mute
  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);
  
  // Set volume (0 to 1)
  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (newVolume === 0) {
      setMuted(true);
    } else if (muted) {
      setMuted(false);
    }
  }, [muted]);
  
  // Set playback rate
  const handlePlaybackRateChange = useCallback((rate: number) => {
    setPlaybackRate(rate);
  }, []);
  
  // Seek to a specific time
  const seekTo = useCallback((fraction: number, type: 'seconds' | 'fraction' = 'fraction') => {
    setSeeking(true);
    setPlayed(fraction);
    
    // If seeking to the beginning (fraction is 0 or very close to 0), ensure we're playing
    if (fraction < 0.01) {
      setPlaying(true);
    }
    
    // Try to use the player ref from the window object if available
    const player = playerRef.current || (window as any).__playerRef;
    
    // Directly seek to the position in the player
    if (player) {
      player.seekTo(fraction, type);
    }
    
    // Use a short timeout to ensure the seeking state is reset after the seek operation completes
    setTimeout(() => setSeeking(false), 100);
  }, [setPlaying]);
  
  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);
  
  // Format seconds to MM:SS
  const formatTime = useCallback((seconds: number): string => {
    if (isNaN(seconds)) return '00:00';
    
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    
    return `${mm}:${ss}`;
  }, []);
  
  // Handle fullscreen change events
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Context value
  const value: VideoPlayerContextType = {
    playing,
    muted,
    volume,
    playbackRate,
    played,
    loaded,
    duration,
    seeking,
    fullscreen,
    togglePlay,
    toggleMute,
    setVolume: handleVolumeChange,
    setPlaybackRate: handlePlaybackRateChange,
    seekTo,
    toggleFullscreen,
    formatTime,
    setPlayed,
    setLoaded,
    setDuration,
    setPlaying,
  };
  
  return (
    <VideoPlayerContext.Provider value={value}>
      {children}
    </VideoPlayerContext.Provider>
  );
};

// Custom hook to use the video player context
export const useVideoPlayer = (): VideoPlayerContextType => {
  const context = useContext(VideoPlayerContext);
  
  if (context === undefined) {
    throw new Error('useVideoPlayer must be used within a VideoPlayerProvider');
  }
  
  return context;
};

export default VideoPlayerContext; 