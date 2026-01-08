"use client";
import { getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

const Hero = () => {
  return (
    <section className="relative md:pt-44 pt-28 bg-white dark:bg-darklight overflow-hidden">
      {/* Background Floating Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl -z-10 animate-[float_6s_ease-in-out_infinite]"></div>
      <div
        className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl -z-10 animate-[float_6s_ease-in-out_infinite]"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-500/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl -z-10 animate-[float_6s_ease-in-out_infinite]"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="container mx-auto max-w-6xl px-4 grid grid-cols-12 gap-8 relative z-20">
        {/* Left Content */}
        <div className="md:col-span-6 col-span-12 p-4 md:px-4 px-0 space-y-6 flex flex-col items-start justify-center">
          {/* Badge */}
          <div className="flex gap-2 items-center">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-blue-600"></span>
            <span className="font-medium text-midnight_text text-sm dark:text-[#FFD230] tracking-wider uppercase">
              From Concept to Completion
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-midnight font-bold dark:text-white text-4xl md:text-5xl md:leading-[1.15] bg-linear-to-r from-midnight_text to-primary dark:from-white dark:to-primary bg-clip-text text-transparent">
            The Silent Partner in Your{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Success.
            </span>
          </h1>

          {/* Subheading */}
          <p className="dark:text-white/70 text-xl font-semibold bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
            Your Engine for Ambition
          </p>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="relative z-30 pointer-events-auto inline-flex items-center gap-3 bg-gradient-to-r from-primary to-orange-300 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg mt-4"
          >
            <span>Get Started</span>
            <Icon icon="ei:chevron-right" width="20" height="20" />
          </Link>

          {/* Contact Section */}
          <div className="flex items-center mt-12 gap-6">
            <div className="flex items-center relative">
              <div className="relative flex items-center">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-full blur-md"></div>

                <Image
                  src={getImgPath("/images/hero/hero-profile-1.jpg")}
                  alt="hero-image"
                  width={44}
                  height={44}
                  quality={100}
                  className="w-11 h-11 rounded-full border-2 border-white dark:border-gray-800 relative z-10 shadow-lg"
                />
                <Image
                  src={getImgPath("/images/hero/hero-profile-2.jpg")}
                  alt="hero-image"
                  width={44}
                  height={44}
                  quality={100}
                  className="w-11 h-11 rounded-full border-2 border-white dark:border-gray-800 -ml-3 relative z-20 shadow-lg"
                />
                <Image
                  src={getImgPath("/images/hero/hero-profile-3.jpg")}
                  alt="hero-image"
                  width={44}
                  height={44}
                  quality={100}
                  className="w-11 h-11 rounded-full border-2 border-white dark:border-gray-800 -ml-3 relative z-30 shadow-lg"
                />
                <div className="w-11 h-11 rounded-full border-2 border-white dark:border-gray-800 -ml-3 bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center relative z-40 shadow-lg">
                  <span className="text-white font-bold text-sm">+50</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <p className="text-sm font-normal text-grey max-w-56 relative z-10">
                Need help?{" "}
                <Link
                  href="/contact"
                  className="text-primary font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text"
                >
                  Contact our experts
                </Link>{" "}
                Tell us about your project
              </p>
            </div>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="md:col-span-6 col-span-12 relative">
          {/* Floating Gradient Overlays */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-blue-600/20 rounded-3xl blur-2xl scale-105 animate-[float_6s_ease-in-out_infinite]"></div>
          <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-primary/20 via-blue-500/10 to-purple-500/20 animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: "1s" }}></div>

          {/* Small Accent Circles */}
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary/30 rounded-full animate-[float_6s_ease-in-out_infinite]"></div>
          <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-blue-500/30 rounded-full animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: "2s" }}></div>
          <div className="absolute top-1/2 -right-6 w-3 h-3 bg-purple-500/30 rounded-full animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: "3s" }}></div>

          {/* Hero Image */}
          <div className="relative animate-[float_6s_ease-in-out_infinite]">
            <Image
              src={getImgPath("/images/hero/hero-image.png")}
              alt="hero-image"
              width={350}
              height={150}
              quality={100}
              style={{ width: "100%", height: "auto" }}
              className="relative z-10 drop-shadow-2xl mt-8"
            />
            <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-50"></div>
    </section>
  );
};

export default Hero;
