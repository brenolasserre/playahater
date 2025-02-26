import './styles.css';
export { default as VideoPlayer } from './components/VideoPlayer';
export { default as VideoControls } from './components/VideoControls';
export { default as VideoProgressBar } from './components/VideoProgressBar';
export { default as VideoVolumeControl } from './components/VideoVolumeControl';
export { default as VideoPlaybackRateControl } from './components/VideoPlaybackRateControl';
export { default as VideoTimeDisplay } from './components/VideoTimeDisplay';
export { VideoPlayerProvider, useVideoPlayer } from './context/VideoPlayerContext';
export * from './types';
