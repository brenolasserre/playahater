import React, { useRef, useState } from 'react';
import { useVideoPlayer } from '../context/VideoPlayerContext';
import { VideoVolumeControlProps } from '../types';

const VideoVolumeControl: React.FC<VideoVolumeControlProps> = ({ 
  className = '',
  vertical = false 
}) => {
  const { volume, muted, setVolume } = useVideoPlayer();
  const volumeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Handle click on volume bar
  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeRef.current) return;
    
    const rect = volumeRef.current.getBoundingClientRect();
    let percentage;
    
    if (vertical) {
      // For vertical slider, 0 is at the bottom, 1 is at the top
      percentage = 1 - ((e.clientY - rect.top) / rect.height);
    } else {
      // For horizontal slider, 0 is at the left, 1 is at the right
      percentage = (e.clientX - rect.left) / rect.width;
    }
    
    setVolume(Math.min(Math.max(percentage, 0), 1));
  };
  
  // Handle mouse down on volume bar
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleVolumeClick(e);
    
    // Add event listeners for dragging
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  // Handle mouse move while dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && volumeRef.current) {
      const rect = volumeRef.current.getBoundingClientRect();
      let percentage;
      
      if (vertical) {
        percentage = 1 - ((e.clientY - rect.top) / rect.height);
      } else {
        percentage = (e.clientX - rect.left) / rect.width;
      }
      
      setVolume(Math.min(Math.max(percentage, 0), 1));
    }
  };
  
  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Remove event listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = 0.1; // 10% step
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setVolume(Math.min(volume + step, 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setVolume(Math.max(volume - step, 0));
    }
  };
  
  // Clean up event listeners on unmount
  React.useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  const currentVolume = muted ? 0 : volume;
  
  if (vertical) {
    return (
      <div className={`relative w-1.5 bg-gray-600 cursor-pointer rounded-full ${className}`}>
        <div 
          ref={volumeRef}
          className="w-full h-full"
          onMouseDown={handleMouseDown}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-label="Volume control"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(currentVolume * 100)}
          role="slider"
        >
          {/* Volume level (bottom to top) */}
          <div 
            className="absolute bottom-0 left-0 w-full bg-white rounded-full"
            style={{ height: `${currentVolume * 100}%` }}
          />
          
          {/* Thumb */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md"
            style={{ bottom: `${currentVolume * 100}%` }}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className={`relative h-1.5 bg-gray-600 cursor-pointer rounded-full ${className}`}>
      <div 
        ref={volumeRef}
        className="w-full h-full"
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label="Volume control"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(currentVolume * 100)}
        role="slider"
      >
        {/* Volume level */}
        <div 
          className="absolute top-0 left-0 h-full bg-white rounded-full"
          style={{ width: `${currentVolume * 100}%` }}
        />
        
        {/* Thumb */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-md"
          style={{ left: `${currentVolume * 100}%` }}
        />
      </div>
    </div>
  );
};

export default VideoVolumeControl; 