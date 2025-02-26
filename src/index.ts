import './styles.css';

// Export components
export { default as VideoPlayer } from './components/VideoPlayer';
export { default as VideoControls } from './components/VideoControls';
export { default as VideoProgressBar } from './components/VideoProgressBar';
export { default as VideoVolumeControl } from './components/VideoVolumeControl';
export { default as VideoPlaybackRateControl } from './components/VideoPlaybackRateControl';
export { default as VideoTimeDisplay } from './components/VideoTimeDisplay';

// Export context and hooks
export { VideoPlayerProvider, useVideoPlayer } from './context/VideoPlayerContext';

// Export types
export * from './types'; 