import React, { ReactNode } from 'react';
import { VideoPlayerContextType } from '../types';
declare const VideoPlayerContext: React.Context<VideoPlayerContextType>;
interface VideoPlayerProviderProps {
    children: ReactNode;
    initialPlaying?: boolean;
    initialMuted?: boolean;
    initialVolume?: number;
    initialPlaybackRate?: number;
}
export declare const VideoPlayerProvider: React.FC<VideoPlayerProviderProps>;
export declare const useVideoPlayer: () => VideoPlayerContextType;
export default VideoPlayerContext;
