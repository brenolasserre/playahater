import { ReactNode, HTMLAttributes } from 'react';
/**
 * Chapter interface for video chapters
 */
export interface Chapter {
    /**
     * Title of the chapter
     */
    title: string;
    /**
     * Start time of the chapter in format "mm:ss" or seconds
     */
    start: string | number;
    /**
     * End time of the chapter in format "mm:ss" or seconds
     */
    end: string | number;
}
export interface VideoPlayerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onProgress'> {
    /**
     * URL of the video to play
     */
    url: string;
    /**
     * Title of the video
     */
    videoTitle?: string;
    /**
     * Chapters for the video
     */
    chapters?: Chapter[];
    /**
     * Whether to play the video automatically
     * @default false
     */
    autoPlay?: boolean;
    /**
     * Whether to loop the video
     * @default false
     */
    loop?: boolean;
    /**
     * Whether to mute the video
     * @default false
     */
    muted?: boolean;
    /**
     * Whether to show controls
     * @default true
     */
    controls?: boolean;
    /**
     * Whether to auto-hide controls after 2 seconds when video is playing
     * @default true
     */
    autoHideControls?: boolean;
    /**
     * Initial volume of the player (between 0 and 1)
     * @default 0.8
     */
    volume?: number;
    /**
     * Initial playback rate
     * @default 1.0
     */
    playbackRate?: number;
    /**
     * Width of the player
     * @default '100%'
     */
    width?: string | number;
    /**
     * Height of the player
     * @default 'auto'
     */
    height?: string | number;
    /**
     * Custom class name for the player container
     */
    containerClassName?: string;
    /**
     * Custom class name for the controls container
     */
    controlsClassName?: string;
    /**
     * Custom class name for the video element
     */
    videoClassName?: string;
    /**
     * Whether to show play/pause button
     * @default false
     */
    showPlayPause?: boolean;
    /**
     * Whether to show volume control
     * @default true
     */
    showVolumeControl?: boolean;
    /**
     * Whether to show progress bar
     * @default true
     */
    showProgressBar?: boolean;
    /**
     * Whether to show fullscreen button
     * @default false
     */
    showFullscreenButton?: boolean;
    /**
     * Whether to show playback rate control
     * @default false
     */
    showPlaybackRateControl?: boolean;
    /**
     * Whether to show time display
     * @default true
     */
    showTimeDisplay?: boolean;
    /**
     * Whether to show replay button when video ends and loop is false
     * @default false
     */
    replayIfNotLooped?: boolean;
    /**
     * Callback when video starts playing
     */
    onPlay?: () => void;
    /**
     * Callback when video is paused
     */
    onPause?: () => void;
    /**
     * Callback when video ends
     */
    onEnded?: () => void;
    /**
     * Callback when video progress changes
     */
    onProgress?: (state: {
        played: number;
        playedSeconds: number;
        loaded: number;
        loadedSeconds: number;
    }) => void;
    /**
     * Callback when video duration is loaded
     */
    onDuration?: (duration: number) => void;
    /**
     * Callback when video is ready to play
     */
    onReady?: () => void;
    /**
     * Callback when video encounters an error
     */
    onError?: (error: any) => void;
    /**
     * Additional config for react-player
     */
    config?: any;
    /**
     * Children to render inside the player (for custom overlays)
     */
    children?: ReactNode;
}
export interface VideoPlayerContextType {
    playing: boolean;
    muted: boolean;
    volume: number;
    playbackRate: number;
    played: number;
    loaded: number;
    duration: number;
    seeking: boolean;
    fullscreen: boolean;
    togglePlay: () => void;
    toggleMute: () => void;
    setVolume: (volume: number) => void;
    setPlaybackRate: (rate: number) => void;
    seekTo: (fraction: number, type?: 'seconds' | 'fraction') => void;
    toggleFullscreen: () => void;
    formatTime: (seconds: number) => string;
    setPlayed: (played: number) => void;
    setLoaded: (loaded: number) => void;
    setDuration: (duration: number) => void;
    setPlaying: (playing: boolean) => void;
}
export interface VideoControlsProps {
    className?: string;
    videoTitle?: string;
    /**
     * Chapters for the video
     */
    chapters?: Chapter[];
    showPlayPause?: boolean;
    showVolumeControl?: boolean;
    showProgressBar?: boolean;
    showFullscreenButton?: boolean;
    showPlaybackRateControl?: boolean;
    showTimeDisplay?: boolean;
    autoHideControls?: boolean;
    isHovering?: boolean;
    /**
     * Callback when user seeks to a specific position in the video
     */
    onSeek?: (fraction: number) => void;
}
export interface VideoProgressBarProps {
    className?: string;
    /**
     * Chapters for the video
     */
    chapters?: Chapter[];
    /**
     * Callback when user seeks to a specific position in the video
     */
    onSeek?: (fraction: number) => void;
}
export interface VideoVolumeControlProps {
    className?: string;
    /**
     * Whether to display the volume control vertically
     * @default false
     */
    vertical?: boolean;
}
export interface VideoPlaybackRateControlProps {
    className?: string;
    rates?: number[];
}
export interface VideoTimeDisplayProps {
    className?: string;
    showDuration?: boolean;
}
export interface VideoPlayerRootProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}
export interface VideoPlayerTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    className?: string;
}
export interface VideoPlayerContentProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}
