import React, { useState, useEffect } from 'react';
import VideoPlayer from '../../src/components/VideoPlayer';
import './App.css';

const App: React.FC = () => {
  const [ , setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [stars, setStars] = useState(null);

  useEffect(() => {
    async function fetchStars() {
      try {
        const response = await fetch("https://api.github.com/repos/brenolasserre/playahater");
        const data = await response.json();
        setStars(data.stargazers_count);
      } catch (error) {
        console.error("Error fetching GitHub stars:", error);
      }
    }
    fetchStars();
  }, []);

  const chapters = [
    { title: "Introduction", start: "0:00", end: "0:32" },
    { title: "Main Content", start: "0:32", end: "0:56" },
    { title: "Conclusion", start: "0:56", end: "1:19" },
  ];
  
  const handleCopy = () => {
    navigator.clipboard.writeText('npm i playahater');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-balance text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#1B1B18]">
              Showcase your videos in style.
            </h1>
            <p className="text-lg text-balance w-4/5 mx-auto text-[#1B1B18]/60 mb-8">
              Video player component for React. <br /> Beautiful. Accessible. Customizable. Open Source.
            </p>

            <div className="flex items-center justify-center gap-3">
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none border border-input bg-transparent hover:bg-[#f0f0f0] group-hover:text-white h-10 px-4 py-2" tabIndex={0}>
                <div className="pr-1">
                  <span className="text-[#1B1B18]/80">npm</span> i playahater
                </div>
                  <button className="inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-none relative z-10 h-6 w-6" type="button" onClick={handleCopy}>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3"><path d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                      <span className="sr-only">Copy</span>
                    </button>
                </div>

                <a target="_blank" rel="noreferrer" className="relative group text-[#1B1B18]/80 inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none border border-input bg-transparent hover:bg-[#f0f0f0] hover:text-black h-10 px-4 py-2" href="https://github.com/brenolasserre/playahater" tabIndex={1}>
                  <img src="/github.svg" alt="GitHub" className="h-4 w-4 mr-2" />
                  <div className="flex items-center h-full">
                    <div className="hidden md:[display:unset]">GitHub</div>
                      <div className="hidden md:[display:unset] h-full w-px bg-[#1B1B18]/10 group-hover:bg-foregrounds mx-4"></div>
                      <div>{stars !== null ? stars : <div className="animate-pulse rounded-md bg-[#75756c]/40"/>}</div>
                  </div>
                </a>
            </div>
          </div> 

          {/* w-4/5 mt-[30rem] */}
          {/* Video Player Demo */}
          <div className="mx-auto rounded-2xl overflow-hidden shadow-xl">
            <VideoPlayer
              url="https://family.co/videos/promo-collectibles.mp4"
              videoTitle="Family Collectibles"
              width="100%"
              containerClassName="rounded-2xl"
              chapters={chapters}
              showFullscreenButton={true}
              showVolumeControl={false}
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default App; 