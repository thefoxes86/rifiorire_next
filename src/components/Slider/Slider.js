import { useEffect, useState } from "react";
import CurvedTextIta from "../SVG/CurvedTextIta";
import CurvedTextEng from "../SVG/CurvedTextEng";
import CustomButton from "../CustomButton";

/**
 * Initial hero content displayed on the front page, under the navigation bar.
 */
const Slider = () => {
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
          style={{ backgroundImage: `url(images/col-hero-2.png)` }}
        >
          <CustomButton
            text="new arrivals"
            path="/category/new-arrivals"
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
          style={{ backgroundImage: `url(images/col-hero-4.png)` }}
        >
          <CustomButton
            text="for everyday"
            path="/category/for-everyday"
            color="brown"
          />
        </div>
        <div
          className="col-span-1 h-96 md:col-span-2 md:h-full bg-cover flex items-end justify-center"
          style={{ backgroundImage: `url(images/col-hero-5.png)` }}
        >
          <CustomButton text="gift guide" path="#" color="violet" />
        </div>
      </section>
    </>
  );
};

export default Slider;
