import React from "react";
import Link from "next/link";
import { serviceCategories } from "@/app/api/data";
import { Icon } from "@iconify/react";
import Image from "next/image";

const Services = () => {
  return (
    <section
      className="bg-section dark:bg-darklight relative overflow-hidden"
      id="services"
    >
      {/* Cloud-themed background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-sky-400/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto max-w-6xl px-4 py-16 relative z-10">
        <div
          className="flex gap-2 items-center justify-center"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          <span className="w-3 h-3 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"></span>
          <span className="font-medium text-midnight_text text-sm dark:text-white/50 tracking-wider">
            OUR SERVICES
          </span>
        </div>

        <h2
          className="sm:text-5xl text-3xl leading-tight font-bold text-[#051f20] md:text-center text-start pt-7 pb-20 md:w-4/6 w-full m-auto dark:text-white bg-gradient-to-r from-midnight_text to-sky-500 dark:from-white  bg-clip-text"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          Tailored Solutions for Your Business Success
        </h2>

        {/* Elegant 2-1-2 Layout with Compact Cards */}
        <div className="flex flex-col gap-8">
          {/* Row 1: 2 cards */}
          <div
            className="grid md:grid-cols-2 gap-6"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {serviceCategories.slice(0, 2).map((category, index) => (
              <ServiceCard
                key={category.id}
                category={category}
                index={index}
              />
            ))}
          </div>

          {/* Row 2: 1 featured card */}
          <div
            className="flex justify-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="w-full max-w-2xl">
              <ServiceCard
                key={serviceCategories[2].id}
                category={serviceCategories[2]}
                index={2}
                featured
              />
            </div>
          </div>

          {/* Row 3: 2 cards */}
          <div
            className="grid md:grid-cols-2 gap-6"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            {serviceCategories.slice(3, 5).map((category, index) => (
              <ServiceCard
                key={category.id}
                category={category}
                index={index + 3}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({
  category,
  index,
  featured = false,
}: {
  category: any;
  index: number;
  featured?: boolean;
}) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={`${index * 100}`}
      data-aos-duration="800"
      className={`group relative overflow-hidden rounded-2xl ${
        featured ? "min-h-[360px]" : "min-h-[320px]"
      }`}
    >
      {/* Dark Green Background */}
      <div className="absolute inset-0 bg-[#2d9790]  rounded-2xl z-10"></div>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shine rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

      <div className="relative z-30 h-full flex flex-col p-6">
        {/* Header Section - Compact */}
        <div className="text-center mb-6">
          {/* Icon Container - Compact */}
          <div
            className={`inline-flex ${
              featured ? "w-20 h-20" : "w-16 h-16"
            } mb-4 relative`}
          >
            {/* Icon Background Glow */}
            <div className="absolute inset-0 bg-white/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-500"></div>

            {/* Icon Container */}
            <div
              className={`relative w-full h-full bg-white/10 backdrop-blur-sm rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-all duration-500 border border-white/20 ${
                featured ? "border-2 border-white/30" : ""
              }`}
            >
              <Image
                src={category.icon}
                alt={category.title}
                width={featured ? 32 : 28}
                height={featured ? 32 : 28}
                className="text-white filter drop-shadow-sm"
              />
            </div>
          </div>

          {/* Title - Compact */}
          <h3
            className={`font-bold text-white mb-3 ${
              featured ? "text-2xl" : "text-xl"
            }`}
          >
            {category.title}
          </h3>

          {/* Description - Compact */}
          <p className="text-white/80 leading-relaxed text-sm line-clamp-2">
            {category.shortDescription}
          </p>
        </div>

        {/* Services List - Compact */}
        <div className="mb-6 flex-1">
          <ul className="space-y-2">
            {category.services
              .slice(0, featured ? 4 : 3)
              .map((service: string, serviceIndex: number) => (
                <li
                  key={serviceIndex}
                  className="flex items-center gap-3 group/item py-1 px-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Icon
                      icon="ei:check"
                      width="10"
                      height="10"
                      className="text-[#235146]"
                    />
                  </div>
                  <span className="text-white/90 font-medium group-hover/item:text-white transition-colors duration-300 text-sm">
                    {service}
                  </span>
                </li>
              ))}
          </ul>

          {/* More Services Indicator - Compact */}
          {category.services.length > (featured ? 4 : 3) && (
            <div className="text-center mt-3">
              <span className="inline-flex items-center gap-1 text-white font-medium text-xs bg-white/20 px-3 py-1 rounded-full">
                <Icon icon="ei:plus" width="12" height="12" />
                {category.services.length - (featured ? 4 : 3)} more
              </span>
            </div>
          )}
        </div>

        {/* CTA Button - Compact */}
        <div className="text-center mt-auto">
          <Link
            href={`/services/${category.slug}`}
            className={`inline-flex items-center gap-2 bg-[#FFD230] text-black font-semibold group/btn hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md text-sm ${
              featured ? "px-8 py-3 rounded-xl" : "px-6 py-3 rounded-lg"
            }`}
          >
            <span>{featured ? "Explore Services" : "Explore"}</span>
            <Icon
              icon="ei:chevron-right"
              width="16"
              height="16"
              className="group-hover/btn:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>

      {/* Floating Elements - Compact */}
      <div className="absolute top-3 right-3 w-2 h-2 bg-white/30 rounded-full group-hover:scale-150 transition-transform duration-500 z-40"></div>
      <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-white/30 rounded-full group-hover:scale-150 transition-transform duration-500 delay-100 z-40"></div>
    </div>
  );
};

export default Services;
