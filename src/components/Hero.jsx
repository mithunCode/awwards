import { useEffect, useRef } from "react";
import { useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, sethasClicked] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [loadedVideos, setloadedVideos] = useState(0);
  const totalvideos = 4;
  const nextVidref = useRef(null);

  const upComingVideoIndex = (currentIndex % totalvideos) + 1;
  useEffect(() => {
    if (loadedVideos === totalvideos - 1) {
      setisLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVidref.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const handleMiniVidClick = () => {
    sethasClicked(true);
    setCurrentIndex(upComingVideoIndex);
  };
  const getVideoSource = (index) => {
    return `videos/hero-${index}.mp4`;
  };
  const handleVideoLoad = () => {
    setloadedVideos((prev) => prev + 1);
  };
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute h-dvh w-screen overflow-hidden bg-voilet-50 z-[100]">
          {" "}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>{" "}
        </div>
      )}
      <div
        id="video-frame"
        className="relative z-10 h-dvh overflow-hidden bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer rounded-lg">
            <div
              onClick={handleMiniVidClick}
              className="origin-center  scale-50 opacity-0 transition-all duration-500  ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVidref}
                src={getVideoSource(upComingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          <video
            ref={nextVidref}
            src={getVideoSource(currentIndex)}
            loop
            muted
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
            id="next-video"
          />
          <video
            src={getVideoSource(
              currentIndex === totalvideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>
        <h1 className="special-font text-5xl hero-heading absolute bottom-5 right-5 z-40 text-[#dfdff2]">
          G<b>A</b>MING
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robertReg text-blue-100">
              Enter the MetaGame Layer <br /> Unleash The Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font text-5xl hero-heading absolute bottom-5 right-5  text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;
