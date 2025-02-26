import React, { useEffect, useState } from 'react';
import { useVideoPlayer } from '../context/VideoPlayerContext';
import { VideoTimeDisplayProps } from '../types';

const VideoTimeDisplay: React.FC<VideoTimeDisplayProps> = ({
  className = '',
  showDuration = true
}) => {
  const { played, duration, formatTime } = useVideoPlayer();
  const [currentTimeDisplay, setCurrentTimeDisplay] = useState('00:00');
  const [durationDisplay, setDurationDisplay] = useState('00:00');
  
  // Calculate current time in seconds and update displays
  useEffect(() => {
    // Only update if duration is valid
    if (duration > 0) {
      const currentTime = duration * played;
      setCurrentTimeDisplay(formatTime(currentTime));
      setDurationDisplay(formatTime(duration));
    }
  }, [played, duration, formatTime]);
  
  return (
    <div className={`text-white/60 text-sm font-mono ${className}`}>
      <span>{currentTimeDisplay}</span>
      {showDuration && (
        <>
          <span className="mx-1">/</span>
          <span>{durationDisplay}</span>
        </>
      )}
    </div>
  );
};

export default VideoTimeDisplay; 