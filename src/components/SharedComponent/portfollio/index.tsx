import React from "react";
import PortfolioCard from "@/components/SharedComponent/portfollio/Portfolio-card";
import { Icon } from "@iconify/react";

const Portfolio = () => {
  return (
    <section
      id="portfolio"
      className="dark:bg-darkmode relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="text-center lg:px-0 px-8 relative z-10">
        {/* Badge */}
        <div
          className="flex gap-2 items-center justify-center group"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          <span className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-blue-600 group-hover:scale-125 transition-transform duration-300"></span>
          <span className="font-medium text-midnight_text text-sm dark:text-white/50 tracking-wider uppercase">
            Portfolio
          </span>
        </div>

        {/* Main Heading */}
        <h2
          className="sm:text-4xl text-[28px] leading-tight font-bold text-midnight text-center pt-7 pb-4 md:w-4/6 w-full m-auto dark:text-white bg-gradient-to-r from-midnight_text to-primary dark:from-white dark:to-primary bg-clip-text text-transparent"
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="1000"
        >
          Explore My{" "}
          <span className="bg-gradient-to-r from-[#0B2A24] to-[#225045] bg-clip-text dark:text-[#FFFFFF] text-transparent">
            Portfolio
          </span>{" "}
          Showcase
        </h2>

        {/* Description */}
        <div
          className="pb-14 inline-flex relative group"
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-duration="1000"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <p className="text-lg font-normal text-[#051f20]  max-w-2xl dark:text-white/50 relative z-10 leading-relaxed">
            Dive into a curated collection of my finest work, showcasing
            expertise across various industries and delivering exceptional
            results for every client.
          </p>
        </div>

        {/* Stats Bar */}
      </div>

      {/* Portfolio Cards */}
      <div className="relative z-10">
        <PortfolioCard />
      </div>
    </section>
  );
};

export default Portfolio;
