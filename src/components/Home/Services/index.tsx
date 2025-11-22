import React from "react";
import Link from "next/link";
import { serviceCategories } from "@/app/api/data";
import { Icon } from "@iconify/react";
import Image from "next/image";

const Services = () => {
  return (
    <section className="bg-section dark:bg-darklight" id="services">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div
          className="flex gap-2 items-center justify-center"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          <span className="w-3 h-3 rounded-full bg-success"></span>
          <span className="font-medium text-midnight_text text-sm dark:text-white/50">
            our services
          </span>
        </div>

        <h2
          className="sm:text-4xl text-[28px] leading-tight font-bold text-midnight_text md:text-center text-start pt-7 pb-20 md:w-4/6 w-full m-auto dark:text-white"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          Services specifically designed to meet your business needs
        </h2>

        {/* Categories Grid - Replaces your current Servicebox grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category, index) => (
            <div
              key={category.id}
              data-aos="fade-up"
              data-aos-delay={`${index * 200}`}
              data-aos-duration="1000"
              className="bg-white rounded-xl shadow-service p-8 hover:shadow-lg transition-all duration-300 dark:bg-darkmode group"
            >
              {/* Category Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={category.icon}
                  alt={category.title}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>

              {/* Category Title */}
              <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">
                {category.title}
              </h3>

              {/* Short Description */}
              <p className="text-gray-600 dark:text-white/50 mb-6 leading-relaxed">
                {category.shortDescription}
              </p>

              {/* Services List */}
              <div className="mb-6">
                <ul className="space-y-3">
                  {category.services
                    .slice(0, 3)
                    .map((service, serviceIndex) => (
                      <li
                        key={serviceIndex}
                        className="flex items-center gap-3 text-gray-700 dark:text-white/80"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></span>
                        <span className="text-sm">{service}</span>
                      </li>
                    ))}
                  {category.services.length > 3 && (
                    <li className="text-primary font-medium text-sm pl-5">
                      +{category.services.length - 3} more services
                    </li>
                  )}
                </ul>
              </div>

              {/* View Services Button */}
              <Link
                href={`/services/${category.slug}`}
                className="hover:text-blue-700 text-lg font-medium text-primary group/link flex items-center"
              >
                Get Started
                <span>
                  <Icon
                    icon="ei:chevron-right"
                    width="30"
                    height="30"
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
