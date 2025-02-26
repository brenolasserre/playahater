import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useVideoPlayer } from '../context/VideoPlayerContext';
import { VideoProgressBarProps, Chapter } from '../types';
import '../styles.css';

const VideoProgressBar: React.FC<VideoProgressBarProps> = ({ 
  className = '',
  chapters,
  onSeek
}) => {
  const { played, loaded, seekTo, playing, seeking, duration, setPlaying } = useVideoPlayer();
  const [isDragging, setIsDragging] = useState(false);
  const [localPlayed, setLocalPlayed] = useState(played);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [wasPlayingBeforeDrag, setWasPlayingBeforeDrag] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef<HTMLDivElement>(null);
  const universalPlayedRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const frameId = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  
  // Helper function to convert time string (mm:ss) to seconds
  const timeStringToSeconds = useCallback((timeString: string): number => {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
  }, []);
  
  // Process chapters data for rendering
  const processedChapters = useMemo(() => {
    if (!chapters || !chapters.length || !duration) return [];
    
    return chapters.map(chapter => {
      const startTime = typeof chapter.start === 'string' 
        ? timeStringToSeconds(chapter.start) 
        : chapter.start;
      
      const endTime = typeof chapter.end === 'string' 
        ? timeStringToSeconds(chapter.end) 
        : chapter.end;
      
      const startFraction = startTime / duration;
      const endFraction = endTime / duration;
      const width = endFraction - startFraction;
      
      return {
        ...chapter,
        startTime,
        endTime,
        startFraction,
        endFraction,
        width
      };
    });
  }, [chapters, duration, timeStringToSeconds]);
  
  // Format time for preview - memoized to avoid recalculations
  const formatPreviewTime = useCallback((fraction: number): string => {
    if (isNaN(duration)) return '00:00';
    
    const seconds = Math.floor(fraction * duration);
    const date = new Date(seconds * 1000);
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    
    return `${mm}:${ss}`;
  }, [duration]);
  
  // Memoize the preview time to avoid recalculations during rapid movements
  const previewTime = useMemo(() => {
    if (!hoverPosition) return '00:00';
    return formatPreviewTime(hoverPosition);
  }, [hoverPosition, formatPreviewTime]);
  
  // Use direct DOM manipulation for smoother updates
  const updateProgressBar = useCallback(() => {
    if (!isDragging && !seeking && playing) {
      setLocalPlayed(played);
      
      // Direct DOM manipulation for smoother updates
      if (playedRef.current) {
        playedRef.current.style.transform = `scaleX(${played})`;
      }
      if (universalPlayedRef.current) {
        universalPlayedRef.current.style.transform = `scaleX(${played})`;
      }
      if (thumbRef.current) {
        thumbRef.current.style.left = `${played * 100}%`;
      }
      
      // Update segmented played progress bars
      if (processedChapters.length > 0) {
        processedChapters.forEach((chapter, index) => {
          const segmentEl = document.querySelector(`[data-played-chapter="${index}"]`) as HTMLElement;
          if (segmentEl) {
            const segmentPlayed = Math.min(1, Math.max(0, (played - chapter.startFraction) / chapter.width));
            segmentEl.style.transform = `scaleX(${segmentPlayed})`;
          }
        });
      }
    }
    
    frameId.current = requestAnimationFrame(updateProgressBar);
  }, [played, isDragging, seeking, playing, processedChapters]);
  
  // Initialize tooltip when component mounts
  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.style.opacity = '0';
      tooltipRef.current.style.transition = 'opacity 150ms ease-in-out';
    }
  }, []);
  
  // Start and stop the animation frame loop
  useEffect(() => {
    frameId.current = requestAnimationFrame(updateProgressBar);
    
    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
        frameId.current = null;
      }
    };
  }, [updateProgressBar]);
  
  // Update local played value when not playing or when seeking ends
  useEffect(() => {
    if (!playing || seeking) {
      setLocalPlayed(played);
      
      // Direct DOM manipulation for smoother updates
      if (playedRef.current) {
        playedRef.current.style.transform = `scaleX(${played})`;
      }
      if (universalPlayedRef.current) {
        universalPlayedRef.current.style.transform = `scaleX(${played})`;
      }
      if (thumbRef.current) {
        thumbRef.current.style.left = `${played * 100}%`;
      }
      
      // Update segmented played progress bars
      if (processedChapters.length > 0) {
        processedChapters.forEach((chapter, index) => {
          const segmentEl = document.querySelector(`[data-played-chapter="${index}"]`) as HTMLElement;
          if (segmentEl) {
            const segmentPlayed = Math.min(1, Math.max(0, (played - chapter.startFraction) / chapter.width));
            segmentEl.style.transform = `scaleX(${segmentPlayed})`;
          }
        });
      }
    }
  }, [played, playing, seeking, processedChapters]);
  
  // Calculate position from mouse event with snap-to-chapter functionality
  const getPositionFromEvent = useCallback((e: MouseEvent | React.MouseEvent): number => {
    if (!progressRef.current) return 0;
    
    const rect = progressRef.current.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    const position = Math.min(Math.max(percentage, 0), 1);
    
    // Implement snap-to-chapter functionality
    if (chapters && chapters.length && duration) {
      // Define a snap threshold (e.g., within 1% of chapter start)
      const snapThreshold = 0.02; 
      
      for (const chapter of processedChapters) {
        // Check if position is close to chapter start
        if (Math.abs(position - chapter.startFraction) < snapThreshold) {
          return chapter.startFraction;
        }
      }
    }
    
    return position;
  }, [processedChapters, chapters, duration]);
  
  // Update tooltip position directly from mouse event
  const updateTooltipPosition = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!progressRef.current || !tooltipRef.current) return 0;
    
    const rect = progressRef.current.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    const position = Math.min(Math.max(percentage, 0), 1);
    
    // Direct DOM manipulation for tooltip position
    tooltipRef.current.style.left = `${position * 100}%`;
    
    // Update tooltip text content directly
    if (tooltipRef.current) {
      const timeText = formatPreviewTime(position);
      tooltipRef.current.innerHTML = timeText;
    }
    
    return position;
  }, [formatPreviewTime]);
  
  // Handle mouse down on progress bar
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling to parent elements
    
    // Immediately pause the video before any other operations
    if (playing) {
      // Use direct DOM manipulation to pause the video immediately
      const player = (window as any).__playerRef;
      if (player && player.getInternalPlayer) {
        const internalPlayer = player.getInternalPlayer();
        if (internalPlayer && internalPlayer.pause) {
          internalPlayer.pause();
        }
      }
      
      // Then update the state
      setPlaying(false);
    }
    
    // Store the current playing state before we start dragging
    setWasPlayingBeforeDrag(playing);
    
    setIsDragging(true);
    
    // Set isProgressBarClick to true to prevent play/pause animation
    if (window && typeof window !== 'undefined') {
      (window as any).__isProgressBarClick = true;
    }
    
    // Update position immediately
    const newPosition = getPositionFromEvent(e);
    setLocalPlayed(newPosition);
    
    // Use seekTo with 'fraction' type as specified in react-player docs
    seekTo(newPosition);
    
    // Call onSeek callback if provided
    if (onSeek) {
      onSeek(newPosition);
    }
  }, [getPositionFromEvent, seekTo, onSeek, playing, setPlaying]);
  
  // Handle click on progress bar - using seekTo with 'fraction' type as per react-player docs
  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent event bubbling to parent elements
    
    // Set isProgressBarClick to true to prevent play/pause animation
    if (window && typeof window !== 'undefined') {
      (window as any).__isProgressBarClick = true;
    }
    
    const newPosition = getPositionFromEvent(e);
    setLocalPlayed(newPosition);
    
    // Clear any preview debounce to prevent conflicts
    const player = (window as any).__playerRef;
    if (player && player._previewDebounce) {
      clearTimeout(player._previewDebounce);
      player._previewDebounce = null;
    }
    
    // Notify that we're no longer in preview mode
    const handlePreviewSeek = (window as any).__handlePreviewSeek;
    if (handlePreviewSeek) {
      handlePreviewSeek(false);
    }
    
    // Use seekTo with 'fraction' type as specified in react-player docs
    seekTo(newPosition);
    
    // Call onSeek callback if provided
    if (onSeek) {
      onSeek(newPosition);
    }
    
    // Reset isProgressBarClick after a short delay
    setTimeout(() => {
      if (window && typeof window !== 'undefined') {
        (window as any).__isProgressBarClick = false;
      }
    }, 300);
  }, [getPositionFromEvent, seekTo, onSeek]);
  
  // Handle mouse move on progress bar for preview with throttling
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isHovering || isDragging) {
      // Update tooltip position immediately for better responsiveness
      const position = updateTooltipPosition(e);
      
      // Show tooltip immediately
      if (tooltipRef.current) {
        tooltipRef.current.style.opacity = '1';
      }
      
      // Use requestAnimationFrame for other state updates
      if (!frameId.current) {
        frameId.current = requestAnimationFrame(() => {
          // Update state (this is less critical for visual smoothness)
          setHoverPosition(position);
          
          // If we're not already showing the preview, show it
          if (!showPreview) {
            setShowPreview(true);
          }
          
          // If we're dragging, also update the played position
          if (isDragging) {
            setLocalPlayed(position);
            
            // Direct DOM manipulation for smoother updates during dragging
            if (playedRef.current) {
              playedRef.current.style.transform = `scaleX(${position})`;
            }
            if (universalPlayedRef.current) {
              universalPlayedRef.current.style.transform = `scaleX(${position})`;
            }
            if (thumbRef.current) {
              thumbRef.current.style.left = `${position * 100}%`;
            }
          }
          
          // Reset the frame ID so we can request another frame
          frameId.current = null;
        });
      }
    }
  }, [isHovering, isDragging, updateTooltipPosition, showPreview]);
  
  // Handle mouse leave - just hide the tooltip without seeking
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setShowPreview(false);
    setHoverPosition(null);
    
    // Direct DOM manipulation to hide tooltip
    if (tooltipRef.current) {
      tooltipRef.current.style.opacity = '0';
    }
  }, []);

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    
    // Initialize tooltip with opacity 0 to prepare for smooth transition
    if (tooltipRef.current) {
      tooltipRef.current.style.transition = 'opacity 150ms ease-in-out';
    }
  }, []);
  
  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    // Handle number keys (0-9)
    if (e.key >= '0' && e.key <= '9') {
      const percentage = e.key === '0' ? 0 : Number(e.key) / 10;
      seekTo(percentage);
      
      // Call onSeek callback if provided
      if (onSeek) {
        onSeek(percentage);
      }
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const seconds = e.key === 'ArrowLeft' ? -5 : 5;
      const newTime = Math.max(0, Math.min(1, played + (seconds / duration)));
      seekTo(newTime);
      
      // Call onSeek callback if provided
      if (onSeek) {
        onSeek(newTime);
      }
    }
  }, [played, seekTo, onSeek, duration]);
  
  // Add global event listeners for mouse move and up
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      // Ensure video is paused while dragging
      if (playing) {
        // Use direct DOM manipulation to pause the video immediately
        const player = (window as any).__playerRef;
        if (player && player.getInternalPlayer) {
          const internalPlayer = player.getInternalPlayer();
          if (internalPlayer && internalPlayer.pause) {
            internalPlayer.pause();
          }
        }
        
        setPlaying(false);
      }
      
      // Throttle updates for better performance
      const now = performance.now();
      // Only update every 16ms (roughly 60fps) for smooth performance
      if (now - lastUpdateTimeRef.current > 16) {
        lastUpdateTimeRef.current = now;
        
        const newPosition = getPositionFromEvent(e);
        setLocalPlayed(newPosition);
        setHoverPosition(newPosition);
        
        // Direct DOM manipulation for smoother updates during dragging
        if (playedRef.current) {
          playedRef.current.style.transform = `scaleX(${newPosition})`;
        }
        if (universalPlayedRef.current) {
          universalPlayedRef.current.style.transform = `scaleX(${newPosition})`;
        }
        if (thumbRef.current) {
          thumbRef.current.style.left = `${newPosition * 100}%`;
        }
        
        // Update segmented played progress bars
        if (processedChapters.length > 0) {
          processedChapters.forEach((chapter, index) => {
            const segmentEl = document.querySelector(`[data-played-chapter="${index}"]`) as HTMLElement;
            if (segmentEl) {
              const segmentPlayed = Math.min(1, Math.max(0, (newPosition - chapter.startFraction) / chapter.width));
              segmentEl.style.transform = `scaleX(${segmentPlayed})`;
            }
          });
        }
      }
    };
    
    const handleGlobalMouseUp = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newPosition = getPositionFromEvent(e);
      
      // Clear any preview debounce to prevent conflicts
      const player = (window as any).__playerRef;
      if (player && player._previewDebounce) {
        clearTimeout(player._previewDebounce);
        player._previewDebounce = null;
      }
      
      // Notify that we're no longer in preview mode
      const handlePreviewSeek = (window as any).__handlePreviewSeek;
      if (handlePreviewSeek) {
        handlePreviewSeek(false);
      }
      
      // Use seekTo with 'fraction' type as specified in react-player docs
      seekTo(newPosition);
      
      // Call onSeek callback if provided
      if (onSeek) {
        onSeek(newPosition);
      }
      
      // Set a longer delay before resuming playback to ensure the seek completes
      setTimeout(() => {
        // Resume playing if it was playing before dragging started
        if (wasPlayingBeforeDrag) {
          setPlaying(true);
        }
      }, 100);
      
      setIsDragging(false);
      
      // Reset isProgressBarClick after a short delay
      setTimeout(() => {
        if (window && typeof window !== 'undefined') {
          (window as any).__isProgressBarClick = false;
        }
      }, 300);
      
      // Prevent event from bubbling to parent elements
      e.stopPropagation();
    };
    
    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
      window.addEventListener('mouseup', handleGlobalMouseUp);
      
      // Disable text selection while dragging
      document.body.style.userSelect = 'none';
    }
    
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      
      // Re-enable text selection
      document.body.style.userSelect = '';
    };
  }, [isDragging, getPositionFromEvent, seekTo, onSeek, wasPlayingBeforeDrag, setPlaying, playing]);
  
  // Add global keyboard event listeners for number keys and arrow keys
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Handle number keys 0-9 for percentage jumps
      if (e.key >= '0' && e.key <= '9') {
        const percentage = e.key === '0' ? 0 : Number(e.key) / 10;
        
        setLocalPlayed(percentage);
        seekTo(percentage);
        
        // Call onSeek callback if provided
        if (onSeek) {
          onSeek(percentage);
        }
      }
      // Handle arrow keys for 5-second jumps
      else if (e.key === 'ArrowRight') {
        const jumpSeconds = 5;
        const jumpFraction = jumpSeconds / duration;
        const newPosition = Math.min(localPlayed + jumpFraction, 1);
        
        setLocalPlayed(newPosition);
        seekTo(newPosition);
      } else if (e.key === 'ArrowLeft') {
        const jumpSeconds = 5;
        const jumpFraction = jumpSeconds / duration;
        const newPosition = Math.max(localPlayed - jumpFraction, 0);
        
        setLocalPlayed(newPosition);
        seekTo(newPosition);
      }
    };
    
    window.addEventListener('keydown', handleGlobalKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [localPlayed, seekTo, onSeek, duration]);
  
  // Get preview frame - simplified to just create the element
  const getPreviewFrame = useCallback(() => {
    return (
      <div 
        ref={tooltipRef}
        className="absolute bottom-12 bg-white/15 backdrop-blur-[8px] rounded-lg px-2 py-1 text-white text-xs transform -translate-x-1/2 pointer-events-none select-none z-20"
        style={{ 
          left: '0%',
          transform: 'translateX(-50%)',
          willChange: 'left, opacity',
          opacity: 0,
          transition: 'opacity 150ms ease-in-out'
        }}
      >
        00:00
      </div>
    );
  }, []);
  
  return (
    <div 
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ paddingTop: '24px', paddingBottom: '24px', marginTop: '-24px', marginBottom: '-24px' }}
    >
      <div 
        ref={progressRef}
        className={`relative h-3 bg-transparent cursor-pointer rounded-full select-none transition-all duration-200 overflow-hidden focus:outline-none ${className}`}
        onClick={handleProgressClick}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label="Video progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(localPlayed * 100)}
        role="slider"
      >
        {/* Background showing video through gaps */}
        <div className="absolute inset-0 bg-transparent" />
        
        {/* Unified progress bar when no chapters */}
        {(!chapters || chapters.length === 0) && (
          <>
            {/* Loaded progress */}
            <div 
              className="absolute top-0 left-0 h-full bg-white/20"
              style={{ 
                width: `${loaded * 100}%`,
                transform: 'translateZ(0)'
              }}
            />
            
            {/* Played progress */}
            <div 
              ref={playedRef}
              className="absolute top-0 left-0 h-full bg-white/40 origin-left"
              style={{ 
                width: '100%',
                transform: `scaleX(${localPlayed})`,
                transformOrigin: 'left',
                willChange: 'transform',
                transition: isDragging ? 'none' : 'transform 50ms linear'
              }}
            />
          </>
        )}
        
        {/* Universal played progress bar that spans the entire width */}
        {processedChapters.length > 0 && (
          <div 
            ref={universalPlayedRef}
            className="absolute top-0 left-0 h-full bg-white/40 origin-left z-[10]"
            style={{ 
              width: '100%',
              transform: `scaleX(${localPlayed})`,
              transformOrigin: 'left',
              willChange: 'transform',
              transition: isDragging ? 'none' : 'transform 50ms linear',
              visibility: 'hidden' // Hide the original universal progress bar
            }}
          />
        )}
        
        {/* Segmented played progress that matches chapter segments */}
        {processedChapters.length > 0 && processedChapters.map((chapter, index) => (
          <div
            key={`played-chapter-${index}`}
            data-played-chapter={index}
            className="absolute top-0 h-full bg-white/40 origin-left z-[11]"
            style={{
              left: `${chapter.startFraction * 100}%`,
              width: `${chapter.width * 100}%`,
              marginRight: index < processedChapters.length - 1 ? '4px' : '0',
              clipPath: index < processedChapters.length - 1 
                ? `polygon(0% 0%, calc(100% - 4px) 0%, calc(100% - 4px) 100%, 0% 100%)`
                : 'none',
              transform: `scaleX(${Math.min(1, Math.max(0, (localPlayed - chapter.startFraction) / chapter.width))})`,
              transformOrigin: 'left',
              willChange: 'transform',
              transition: isDragging ? 'none' : 'transform 50ms linear'
            }}
          />
        ))}
        
        {/* Chapter segments with gaps */}
        {processedChapters.length > 0 && processedChapters.map((chapter, index) => (
          <div
            key={`chapter-${index}`}
            className={`absolute top-0 h-full bg-white/10 backdrop-blur-[8px] z-15 ${
              index === processedChapters.length - 1 ? 'rounded-r-full' : ''
            }`}
            style={{
              left: `${chapter.startFraction * 100}%`,
              width: `${chapter.width * 100}%`,
              marginRight: index < processedChapters.length - 1 ? '4px' : '0',
              clipPath: index < processedChapters.length - 1 
                ? `polygon(0% 0%, calc(100% - 4px) 0%, calc(100% - 4px) 100%, 0% 100%)`
                : 'none'
            }}
          >
          </div>
        ))}
        
        {/* Thumb - using absolute positioning for better performance */}
        <div 
          ref={thumbRef}
          className="absolute top-1/2 w-[5px] h-full rounded shadow-md bg-white group-hover:h-[120%] group-hover:bg-white/90 z-[20]"
          style={{ 
            left: `${localPlayed * 100}%`,
            transform: 'translate(-50%, -50%)',
            willChange: 'left',
            transition: isDragging ? 'none' : 'left 50ms linear, height 150ms ease, background-color 150ms ease'
          }}
        />
      </div>
      
      {/* Preview tooltip - always render but control visibility with opacity */}
      {getPreviewFrame()}
    </div>
  );
};

export default React.memo(VideoProgressBar);