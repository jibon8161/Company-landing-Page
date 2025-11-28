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
    <div id="portfolio" className=" relative overflow-hidden">
      {/* Background decorative elements - Cloud themed */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-400/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-300/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

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
        className={`group relative overflow-hidden min-h-[420px] rounded-3xl ${
          index % 2 !== 0 ? "lg:mt-24" : ""
        }`}
      >
        {/* Dark Green Background */}
        <div className="absolute inset-0 bg-[#051F20] rounded-3xl z-10"></div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shine rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

        {/* Content */}
        <div className="relative z-30 h-full flex flex-col p-6">
          {/* Image Container */}
          <div className="relative overflow-hidden rounded-2xl mb-6 group-hover:cursor-pointer flex-shrink-0">
            {/* Image Glow Effect */}
            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-md group-hover:blur-lg transition-all duration-500 z-0"></div>

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

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#051F20]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

              {/* View Project Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 border border-white/30">
                  <Icon
                    icon="ei:arrow-right"
                    width="24"
                    height="24"
                    className="text-[#051F20] transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Title */}
              <h4 className="pb-2 pt-4 group-hover:text-white cursor-pointer text-xl font-bold text-white">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-white/80 font-normal text-base group-hover:text-white cursor-pointer line-clamp-2">
                {item.info}
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="inline-flex items-center gap-2 text-white hover:text-white/80 font-semibold group/btn text-sm">
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
        <div className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full group-hover:scale-150 transition-transform duration-500 z-40"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/30 rounded-full group-hover:scale-150 transition-transform duration-500 delay-100 z-40"></div>
      </div>
    </Link>
  );
};

export default PortfolioCard;
