import { useEffect, useState } from "react";
import CurvedTextIta from "../SVG/CurvedTextIta";
import CurvedTextEng from "../SVG/CurvedTextEng";
import CustomButton from "../CustomButton";

/**
 * Initial hero content displayed on the front page, under the navigation bar.
 */
const Slider = ({ slides }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {slides && (
        <section
          id="hero"
          className="grid grid-cols-1 w-full md:h-screen md:grid-cols-12 bg-primary"
        >
          <div
            className="col-span-1 h-96 md:h-full md:col-span-1  bg-cover "
            style={{ backgroundImage: `url(images/col-hero-1.gif)` }}
          ></div>

          <div
            className="col-span-1 h-96 md:col-span-3 md:h-full bg-cover flex items-end justify-center"
            style={{ backgroundImage: `url(${slides[0].image.mediaItemUrl})` }}
          >
            <CustomButton
              text={slides[0].buttonText || ""}
              path={slides[0].buttonLink || "#"}
              color="primary"
            />
          </div>

          <div className="col-span-1 md:col-span-4 h-96 md:h-full flex align-center justify-center items-center">
            <div
              className="absolute pt-5 pl-5"
              style={{ transform: `rotate(${scrollPosition * 0.05}deg)` }}
            >
              <CurvedTextIta />
            </div>
            <div
              className="absolute px-2"
              style={{ transform: `rotate(-${scrollPosition * 0.05}deg)` }}
            >
              <CurvedTextEng />
            </div>
          </div>
          <div
            className="col-span-1 h-96 md:col-span-2 md:h-full bg-cover flex items-end justify-center"
            style={{ backgroundImage: `url(${slides[1].image.mediaItemUrl})` }}
          >
            <CustomButton
              text={slides[1].buttonText || ""}
              path={slides[1].buttonLink || "#"}
              color="brown"
            />
          </div>
          <div
            className="col-span-1 h-96 md:col-span-2 md:h-full bg-cover flex items-end justify-center"
            style={{ backgroundImage: `url(${slides[2].image.mediaItemUrl})` }}
          >
            <CustomButton
              text={slides[2].buttonText || ""}
              path={slides[2].buttonLink || "#"}
              color="violet"
            />
          </div>
        </section>
      )}
    </>
  );
};

export default Slider;
