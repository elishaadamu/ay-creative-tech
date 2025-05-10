import React from "react";
import "./heroSection.css";
import HeroImage from "./ay-landing-page.webp";

const HeroSection = () => {
  return (
    <section id="heroSection" className="hero--section">
      <div className="hero--section--content--box">
        <div className="hero--section--content">
          <p className="text-5xl text-center md:text-left ">
            {" "}
            AY <span className="text-amber-600 ">Creative</span> Technologies
          </p>
          <h1 className="hero--section--title">
            <span className="hero--section-title--color">
              {" "}
              Empowering Brands{" "}
            </span>{" "}
            <br />
            Through Smart Tech and Bold Ideas.
          </h1>
        </div>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center md:justify-start"
        >
          <button className="consult--button w-[250px] h-[50px] rounded-xl  hover:bg-amber-600  bg-amber-500 text-white mt-5 font-bold text-3xl">
            Get a Free Consultation
          </button>
        </a>
      </div>
      <div className="hero--section--img">
        <img src={HeroImage} alt="Hero Section" />
      </div>
    </section>
  );
};

export default HeroSection;
