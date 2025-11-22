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
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto max-w-6xl px-4 py-16 relative z-10">
        <div
          className="flex gap-2 items-center justify-center"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          <span className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-blue-600"></span>
          <span className="font-medium text-midnight_text text-sm dark:text-white/50 tracking-wider">
            OUR SERVICES
          </span>
        </div>

        <h2
          className="sm:text-5xl text-3xl leading-tight font-bold text-midnight_text md:text-center text-start pt-7 pb-20 md:w-4/6 w-full m-auto dark:text-white bg-gradient-to-r from-midnight_text to-primary dark:from-white dark:to-primary bg-clip-text text-transparent"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          Tailored Solutions for Your Business Success
        </h2>

        {/* Elegant 2-1-2 Layout */}
        <div className="flex flex-col gap-12">
          {/* Row 1: 2 cards */}
          <div
            className="grid md:grid-cols-2 gap-8"
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
            className="grid md:grid-cols-2 gap-8"
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
      className={`group relative overflow-hidden ${
        featured ? "min-h-[480px]" : "min-h-[420px]"
      }`}
    >
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl ${
          featured
            ? "border-2 border-primary/20"
            : "border border-gray-200/50 dark:border-gray-700/50"
        }`}
      ></div>

      {/* Animated Border Gradient */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-blue-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Shine Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

      <div className="relative z-10 h-full flex flex-col p-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Icon Container with Gradient */}
          <div
            className={`inline-flex ${
              featured ? "w-24 h-24" : "w-20 h-20"
            } mb-6 relative`}
          >
            {/* Icon Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-600/30 rounded-2xl blur-md group-hover:blur-lg transition-all duration-500"></div>

            {/* Icon Container */}
            <div
              className={`relative w-full h-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-all duration-500 ${
                featured
                  ? "border-2 border-primary/20"
                  : "border border-gray-200/50 dark:border-gray-600/50"
              }`}
            >
              <Image
                src={category.icon}
                alt={category.title}
                width={featured ? 48 : 36}
                height={featured ? 48 : 36}
                className="text-primary filter drop-shadow-sm"
              />
            </div>
          </div>

          {/* Title */}
          <h3
            className={`font-bold text-midnight_text dark:text-white mb-4 bg-gradient-to-r from-midnight_text to-primary dark:from-white dark:to-primary bg-clip-text text-transparent ${
              featured ? "text-3xl" : "text-2xl"
            }`}
          >
            {category.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            {category.shortDescription}
          </p>
        </div>

        {/* Services List */}
        <div className="mb-8 flex-1">
          <ul className="space-y-3">
            {category.services
              .slice(0, featured ? 4 : 3)
              .map((service: string, serviceIndex: number) => (
                <li
                  key={serviceIndex}
                  className="flex items-center gap-4 group/item py-2 px-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/30 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                    <Icon
                      icon="ei:check"
                      width="12"
                      height="12"
                      className="text-white"
                    />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium group-hover/item:text-primary dark:group-hover/item:text-blue-300 transition-colors duration-300">
                    {service}
                  </span>
                </li>
              ))}
          </ul>

          {/* More Services Indicator */}
          {category.services.length > (featured ? 4 : 3) && (
            <div className="text-center mt-4">
              <span className="inline-flex items-center gap-2 text-primary dark:text-blue-300 font-semibold text-sm bg-primary/10 dark:bg-blue-500/10 px-4 py-2 rounded-full">
                <Icon icon="ei:plus" width="16" height="16" />
                {category.services.length - (featured ? 4 : 3)} more services
              </span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-auto">
          <Link
            href={`/services/${category.slug}`}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold group/btn hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <span>Explore Services</span>
            <Icon
              icon="ei:chevron-right"
              width="20"
              height="20"
              className="group-hover/btn:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-primary/30 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-500/30 rounded-full group-hover:scale-150 transition-transform duration-500 delay-100"></div>
    </div>
  );
};

export default Services;
