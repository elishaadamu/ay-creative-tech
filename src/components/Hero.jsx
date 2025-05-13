import React from "react";
import "./heroSection.css";
import HeroImage from "./ay-landing-page.webp";
import { NavLink } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero">
      <div
        id="heroSection"
        className="hero--section items-start mx-auto max-w-[1500px]"
      >
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
            <div className="flex gap-3">
              <NavLink
                className="consult--button w-[150px]  h-[50px] rounded-xl bg-amber-500 text-white mt-5 font-bold text-xl hover:bg-amber-600 hover:text-amber-100 transition-all duration-500"
                to="/signup"
              >
                Signup
              </NavLink>

              <NavLink
                className="consult--button w-[150px] h-[50px] rounded-xl bg-[#fff]  mt-5 font-bold text-xl hover:bg-amber-600 hover:text-[#fff] transition-all duration-500"
                to="/login"
              >
                Login
              </NavLink>
            </div>
          </a>
        </div>
        <div className="hero--section--img">
          <img src={HeroImage} alt="Hero Section" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
