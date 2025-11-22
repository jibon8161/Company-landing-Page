"use client";
import { getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

const Hero = () => {
  return (
    <section className="relative md:pt-44 pt-28 bg-white dark:bg-darklight overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-500/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>

      <div className="container mx-auto max-w-6xl px-4 grid grid-cols-12 gap-8 relative z-10">
        <div
          className="md:col-span-6 col-span-12 p-4 md:px-4 px-0 space-y-6 flex flex-col items-start justify-center"
          data-aos="fade-right"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          {/* Badge */}
          <div className="flex gap-2 items-center group">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-blue-600 group-hover:scale-125 transition-transform duration-300"></span>
            <span className="font-medium text-midnight_text text-sm dark:text-white/50 tracking-wider uppercase">
              From Concept to Completion
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-midnight_text font-bold dark:text-white text-4xl md:text-5xl md:leading-[1.15] bg-gradient-to-r from-midnight_text to-primary dark:from-white dark:to-primary bg-clip-text text-transparent">
            The Silent Partner in Your{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Success.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-grey dark:text-white/70 text-xl font-semibold bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
            Your Engine for Ambition
          </p>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold group/btn hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg mt-4"
          >
            <span>Get Started</span>
            <Icon
              icon="ei:chevron-right"
              width="20"
              height="20"
              className="group-hover/btn:translate-x-1 transition-transform duration-300"
            />
          </Link>

          {/* Contact Section */}
          <div className="flex items-center mt-12 gap-6 group">
            <div className="flex items-center relative">
              {/* Profile Images with Hover Effects */}
              <div className="relative flex items-center">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-full blur-md group-hover:blur-lg transition-all duration-500"></div>
                <Image
                  src={getImgPath("/images/hero/hero-profile-1.jpg")}
                  alt="hero-image"
                  width={44}
                  height={44}
                  quality={100}
                  className="w-11 h-11 rounded-full border-2 border-white dark:border-gray-800 relative z-10 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                />
                <Image
                  src={getImgPath("/images/hero/hero-profile-2.jpg")}
                  alt="hero-image"
                  width={44}
                  height={44}
                  quality={100}
                  className="w-11 h-11 rounded-full border-2 border-white dark:border-gray-800 -ml-3 relative z-20 group-hover:scale-110 transition-transform duration-300 delay-75 shadow-lg"
                />
                <Image
                  src={getImgPath("/images/hero/hero-profile-3.jpg")}
                  alt="hero-image"
                  width={44}
                  height={44}
                  quality={100}
                  className="w-11 h-11 rounded-full border-2 border-white dark:border-gray-800 -ml-3 relative z-30 group-hover:scale-110 transition-transform duration-300 delay-150 shadow-lg"
                />
                <div className="w-11 h-11 rounded-full border-2 border-white dark:border-gray-800 -ml-3 bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center relative z-40 group-hover:scale-110 transition-transform duration-300 delay-200 shadow-lg">
                  <span className="text-white font-bold text-sm">+50</span>
                </div>
              </div>
            </div>

            {/* Contact Text */}
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <p className="text-sm font-normal text-grey max-w-56 relative z-10 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">
                Need help?{" "}
                <Link
                  href="/contact"
                  className="text-primary hover:text-blue-700 font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 inline-block"
                >
                  Contact our experts
                </Link>{" "}
                Tell us about your project
              </p>
            </div>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="md:col-span-6 col-span-12 relative group">
          {/* Background Decorations */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-600/5 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>

          {/* Animated Border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-blue-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary/30 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-blue-500/30 rounded-full group-hover:scale-150 transition-transform duration-500 delay-200"></div>
          <div className="absolute top-1/2 -right-6 w-3 h-3 bg-purple-500/30 rounded-full group-hover:scale-150 transition-transform duration-500 delay-100"></div>

          <div className="relative before:absolute before:content-[''] before:bg-[url('/images/hero/line-leyar.svg')] before:bg-no-repeat before:left-1/2 before:top-0 before:h-24 before:w-52 before:-z-10 before:translate-x-70% before:-translate-y-40% lg:before:inline-block before:hidden after:absolute after:content-[''] after:bg-[url('/images/hero/round-leyar.svg')] after:bg-no-repeat xl:after:inline-block after:hidden after:left-0 after:bottom-0 after:h-6.25 after:w-6.25 after:-z-10 after:-translate-x-1/2 after:translate-y-1/2">
            <div className="relative group/image">
              {/* Image Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-3xl blur-2xl group-hover/image:blur-3xl transition-all duration-500 scale-105"></div>

              {/* Main Image */}
              <Image
                src={getImgPath("/images/hero/hero-image.png")}
                alt="hero-image"
                width={350}
                height={150}
                quality={100}
                style={{ width: "100%", height: "auto" }}
                className="relative z-10 transform group-hover/image:scale-105 transition-transform duration-500 drop-shadow-2xl"
              />

              {/* Shine Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/image:translate-x-full transition-transform duration-1000 z-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
    </section>
  );
};

export default Hero;
