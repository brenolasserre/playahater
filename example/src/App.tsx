import React, { useState } from 'react';
import VideoPlayer from '../../src/components/VideoPlayer';
import './App.css';

const App: React.FC = () => {
  const [copied, setCopied] = useState(false);
  
  const chapters = [
    { title: "Introduction", start: "0:00", end: "0:32" },
    { title: "Main Content", start: "0:32", end: "0:56" },
    { title: "Conclusion", start: "0:56", end: "1:19" },
  ];
  
  const handleCopy = () => {
    navigator.clipboard.writeText('npm install shadcn-video-player');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeExample = `import { VideoPlayer } from 'shadcn-video-player';
import 'shadcn-video-player/dist/index.css';

function App() {
  return (
    <VideoPlayer 
      url="https://example.com/video.mp4"
      containerClassName="rounded-2xl shadow-lg"
      width="100%"
      height="auto"
    />
  );
}`;

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-balance text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#1B1B18] ">
              Showcase your videos in style.
            </h1>
            <p className="text-lg text-balance text-[#1B1B18]/60 mb-8">
              Video player component for React. Beautiful. Accessible. Unstyled. Customizable. Open Source.
            </p>

            <div className='flex items-center justify-center gap-2'>
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                <div className="text-muted-foreground pr-1">
                  <span className="text-foreground">npm</span> install playahater
                </div>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative z-10 h-6 w-6 hover:bg-primary hover:text-primary-foreground" type="button" id="radix-:Rj3ffadta:" aria-haspopup="menu" aria-expanded="false" data-state="closed">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3"><path d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                      <span className="sr-only">Copy</span>
                    </button>
                </div>
                <a target="_blank" rel="noreferrer" className="relative group inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2" href="https://github.com/guilhermerodz/input-otp">
                  <img src="/github.svg" alt="GitHub" className="h-4 w-4 mr-2" />
                  <div className="flex items-center h-full"><div className="hidden md:[display:unset]">GitHub</div><div className="hidden md:[display:unset] h-full w-px bg-input group-hover:bg-foregrounds mx-4"></div><div>2.7K</div></div></a>
            </div>
          </div>
        
          {/* Video Player Demo */}
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <VideoPlayer
              url="https://family.co/videos/promo-collectibles.mp4"
              videoTitle="Family Collectibles"
              containerClassName="rounded-2xl shadow-md"
              width="100%"
              chapters={chapters}
              height="auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-[#1B1B18]">
              Powerful Features
            </h2>
            <p className="text-xl text-[#1B1B18]/60 mb-8">
              Everything you need for a professional video experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1: Chapters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#1B1B18]">Chapters Support</h3>
                <p className="text-[#1B1B18]/60 mb-4">
                  Navigate through video content with ease using customizable chapters. Jump to specific sections instantly.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-sm">
                  <code className="text-indigo-600 dark:text-indigo-400">
                    chapters={`[{ title: "Intro", start: "0:00" }]`}
                  </code>
                </div>
              </div>
            </div>
            
            {/* Feature 2: Keyboard Shortcuts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#1B1B18]">Keyboard Shortcuts</h3>
                <p className="text-[#1B1B18]/60 mb-4">
                  Control playback with intuitive keyboard shortcuts for a seamless viewing experience.
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mr-2 font-mono">Space</span>
                    <span className="text-[#1B1B18]/60">Play/Pause</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mr-2 font-mono">M</span>
                    <span className="text-[#1B1B18]/60">Mute/Unmute</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mr-2 font-mono">→</span>
                    <span className="text-[#1B1B18]/60">Forward 10s</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mr-2 font-mono">←</span>
                    <span className="text-[#1B1B18]/60">Rewind 10s</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature 3: Accessibility */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#1B1B18]">Accessibility First</h3>
                <p className="text-[#1B1B18]/60 mb-4">
                  Built with accessibility in mind, including keyboard navigation, ARIA attributes, and screen reader support.
                </p>
                <ul className="text-sm text-[#1B1B18]/60 space-y-2">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    ARIA compliant controls
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Screen reader announcements
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Focus management
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Feature 4: Customization */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#1B1B18]">Fully Customizable</h3>
                <p className="text-[#1B1B18]/60 mb-4">
                  Tailor the player to match your brand with customizable UI elements, colors, and behaviors.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-sm">
                  <code className="text-indigo-600 dark:text-indigo-400">
                    containerClassName="rounded-2xl shadow-lg"
                  </code>
                </div>
              </div>
            </div>
            
            {/* Feature 5: Responsive Design */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#1B1B18]">Responsive Design</h3>
                <p className="text-[#1B1B18]/60 mb-4">
                  Looks great on any device, from mobile phones to desktop monitors, with adaptive controls.
                </p>
                <div className="flex justify-between items-center">
                  <svg className="w-5 h-5 text-[#1B1B18]/60" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                  <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 mx-2"></div>
                  <svg className="w-5 h-5 text-[#1B1B18]/60" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Feature 6: Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="p-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#1B1B18]">Optimized Performance</h3>
                <p className="text-[#1B1B18]/60 mb-4">
                  Lightweight and fast with minimal bundle size impact and efficient rendering.
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                </div>
                <div className="flex justify-between text-xs mt-2 text-[#1B1B18]/60">
                  <span>Bundle size</span>
                  <span>~12kb gzipped</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section id="usage" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">
              Usage
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Simple to implement in your React application
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-700">
                <div className="text-sm font-medium">Basic Example</div>
                <button 
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  aria-label="Copy to clipboard"
                  onClick={() => {
                    navigator.clipboard.writeText(codeExample);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 font-mono text-sm overflow-x-auto">
                <pre>{codeExample}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section id="docs" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">
              Documentation
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Explore the full documentation to learn about all available options
            </p>
            <a 
              href="https://github.com/playahater/playahater#readme" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">PlayaHater</span>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                A beautiful video player for React
              </p>
            </div>
            <div className="flex space-x-6">
              <a 
                href="https://github.com/playahater/playahater" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                aria-label="GitHub repository"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://www.npmjs.com/package/shadcn-video-player" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                aria-label="NPM package"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M0 0v24h24V0H0zm19.2 19.2H4.8V4.8h14.4v14.4z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} PlayaHater. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App; 