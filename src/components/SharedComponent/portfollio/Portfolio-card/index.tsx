"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { portfolioinfo } from "@/app/api/data";

const PortfolioCard = () => {
  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div id="portfolio" className="dark:bg-darkmode relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="lg:px-9 m-auto px-4 max-w-[1600px] slider-container relative z-10">
        <Slider {...settings}>
          {portfolioinfo.map((item, index) => (
            <div key={index} className="px-3">
              <PortfolioSlide item={item} index={index} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const PortfolioSlide = ({ item, index }: { item: any; index: number }) => {
  return (
    <Link href={`/portfolio/${item.slug}`} passHref>
      <div
        className={`group relative overflow-hidden min-h-[420px] ${
          index % 2 !== 0 ? "lg:mt-24" : ""
        }`}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-700/50"></div>

        {/* Animated Border Gradient */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-blue-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Shine Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col p-6">
          {/* Image Container */}
          <div className="relative overflow-hidden rounded-2xl mb-6 group-hover:cursor-pointer flex-shrink-0">
            {/* Image Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-2xl blur-md group-hover:blur-lg transition-all duration-500 z-0"></div>

            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={item.image}
                alt={item.alt}
                width={1200}
                height={800}
                style={{ width: "100%", height: "auto" }}
                className="transform group-hover:scale-110 transition-transform duration-500 relative z-10"
              />

              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

              {/* View Project Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Icon
                    icon="ei:arrow-right"
                    width="24"
                    height="24"
                    className="text-primary transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Title */}
              <h4 className="pb-2 pt-4 group-hover:text-primary group-hover:cursor-pointer text-xl font-bold text-midnight_text dark:text-white bg-gradient-to-r from-midnight_text to-primary dark:from-white dark:to-primary bg-clip-text text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-secondary font-normal text-base group-hover:text-primary group-hover:cursor-pointer dark:text-white/50 line-clamp-2">
                {item.info}
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="inline-flex items-center gap-2 text-primary hover:text-blue-700 font-semibold group/btn text-sm">
                <span>View Details</span>
                <Icon
                  icon="ei:chevron-right"
                  width="16"
                  height="16"
                  className="group-hover/btn:translate-x-1 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-primary/30 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-500/30 rounded-full group-hover:scale-150 transition-transform duration-500 delay-100"></div>
      </div>
    </Link>
  );
};

export default PortfolioCard;
