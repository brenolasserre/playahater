import React, { useState, useRef, useEffect } from 'react';
import { useVideoPlayer } from '../context/VideoPlayerContext';
import { VideoPlaybackRateControlProps } from '../types';

const VideoPlaybackRateControl: React.FC<VideoPlaybackRateControlProps> = ({
  className = '',
  rates = [0.5, 0.75, 1, 1.25, 1.5, 2]
}) => {
  const { playbackRate, setPlaybackRate } = useVideoPlayer();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Toggle dropdown menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Handle rate selection
  const handleRateSelect = (rate: number) => {
    setPlaybackRate(rate);
    setIsOpen(false);
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Format rate for display
  const formatRate = (rate: number) => {
    return rate === 1 ? 'Normal' : `${rate}x`;
  };
  
  return (
    <div ref={menuRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={toggleMenu}
        className="p-1 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 rounded text-xs"
        aria-label="Playback speed"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        {formatRate(playbackRate)}
      </button>
      
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-1 bg-black/90 rounded shadow-lg p-1 min-w-[80px] z-10">
          <ul className="space-y-1">
            {rates.map((rate) => (
              <li key={rate}>
                <button
                  type="button"
                  onClick={() => handleRateSelect(rate)}
                  className={`w-full text-left px-2 py-1 text-xs rounded ${
                    playbackRate === rate ? 'bg-white/20 text-white' : 'text-gray-300 hover:bg-white/10'
                  }`}
                  tabIndex={0}
                >
                  {formatRate(rate)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VideoPlaybackRateControl; 