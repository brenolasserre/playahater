# PlayaHater

A beautiful, accessible, and customizable video player component for React. Built with modern UI/UX principles, this video player is designed to be easy to use while providing powerful features.

## Features

- 🎨 Beautiful design with Tailwind CSS
- 🧩 Composable components for maximum flexibility
- ♿ Fully accessible with keyboard navigation
- 🎛️ Comprehensive controls (play/pause, volume, progress, fullscreen, etc.)
- 📑 Chapters support for easy navigation
- 🔄 Picture-in-Picture support
- ⏱️ Playback rate control
- 📱 Responsive design
- 🎬 Built on top of react-player for wide format support

## Installation

```bash
npm install playahater
# or
yarn add playahater
```

### Note for Node.js v23+ Users

If you're using Node.js v23+ (especially on macOS) and encounter permission errors during installation, you can use one of these alternative installation methods:

```bash
# Using npx
npx -y npm install playahater

# Or using yarn
yarn add playahater
```

This is due to a known issue with Node.js v23+ on certain operating systems and is not specific to this package.

## Usage

### Basic Usage

```jsx
import { VideoPlayer } from 'playahater';
import 'playahater/dist/index.css';

function App() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <VideoPlayer 
        url="https://www.example.com/video.mp4" 
        controls={true}
      />
    </div>
  );
}
```

### Advanced Usage with Chapters

```jsx
import { VideoPlayer } from 'playahater';
import 'playahater/dist/index.css';

function App() {
  const chapters = [
    { title: "Introduction", start: "0:00", end: "0:32" },
    { title: "Main Content", start: "0:32", end: "0:56" },
    { title: "Conclusion", start: "0:56", end: "1:19" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <VideoPlayer 
        url="https://www.example.com/video.mp4"
        autoPlay={false}
        loop={true}
        muted={false}
        controls={true}
        volume={0.8}
        playbackRate={1.0}
        width="100%"
        height="auto"
        containerClassName="rounded-2xl shadow-lg"
        chapters={chapters}
        videoTitle="My Video Title"
        showPlayPause={true}
        showVolumeControl={true}
        showProgressBar={true}
        showFullscreenButton={true}
        showPlaybackRateControl={true}
        showPipButton={true}
        showTimeDisplay={true}
        onPlay={() => console.log('Video started playing')}
        onPause={() => console.log('Video paused')}
        onEnded={() => console.log('Video ended')}
        onProgress={(state) => console.log('Progress:', state)}
        onDuration={(duration) => console.log('Duration:', duration)}
      />
    </div>
  );
}
```

### Using Individual Components

```jsx
import {
  VideoPlayerProvider,
  VideoProgressBar,
  VideoVolumeControl,
  VideoPlaybackRateControl,
  VideoTimeDisplay,
  useVideoPlayer
} from 'playahater';
import 'playahater/dist/index.css';

function CustomControls() {
  const { playing, togglePlay } = useVideoPlayer();
  
  return (
    <div className="flex items-center space-x-4">
      <button onClick={togglePlay}>
        {playing ? 'Pause' : 'Play'}
      </button>
      <VideoProgressBar className="flex-grow" />
      <VideoVolumeControl />
      <VideoTimeDisplay showDuration={true} />
    </div>
  );
}

function App() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <VideoPlayerProvider>
        <div className="relative">
          {/* Your custom video player implementation */}
          <CustomControls />
        </div>
      </VideoPlayerProvider>
    </div>
  );
}
```

## Props

### VideoPlayer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| url | string | - | URL of the video to play (required) |
| autoPlay | boolean | false | Whether to play the video automatically |
| loop | boolean | false | Whether to loop the video |
| muted | boolean | false | Whether to mute the video |
| controls | boolean | true | Whether to show controls |
| volume | number | 0.8 | Initial volume of the player (between 0 and 1) |
| playbackRate | number | 1.0 | Initial playback rate |
| width | string \| number | '100%' | Width of the player |
| height | string \| number | 'auto' | Height of the player |
| containerClassName | string | '' | Custom class name for the player container |
| controlsClassName | string | '' | Custom class name for the controls container |
| videoClassName | string | '' | Custom class name for the video element |
| videoTitle | string | '' | Title of the video (for accessibility) |
| chapters | Array | [] | Array of chapter objects with title, start, and end times |
| showPlayPause | boolean | true | Whether to show play/pause button |
| showVolumeControl | boolean | true | Whether to show volume control |
| showProgressBar | boolean | true | Whether to show progress bar |
| showFullscreenButton | boolean | true | Whether to show fullscreen button |
| showPlaybackRateControl | boolean | false | Whether to show playback rate control |
| showPipButton | boolean | false | Whether to show picture-in-picture button |
| showTimeDisplay | boolean | true | Whether to show time display |
| onPlay | () => void | - | Callback when video starts playing |
| onPause | () => void | - | Callback when video is paused |
| onEnded | () => void | - | Callback when video ends |
| onProgress | (state) => void | - | Callback when video progress changes |
| onDuration | (duration) => void | - | Callback when video duration is loaded |
| onReady | () => void | - | Callback when video is ready to play |
| onError | (error) => void | - | Callback when video encounters an error |
| config | object | - | Additional config for react-player |
| children | ReactNode | - | Children to render inside the player (for custom overlays) |

## License

MIT 