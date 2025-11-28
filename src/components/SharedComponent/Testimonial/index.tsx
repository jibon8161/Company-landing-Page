"use client";

import React from "react";

interface CardData {
  image: string;
  name: string;
  handle: string;
  date: string;
  comment: string;
}

interface CreateCardProps {
  card: CardData;
}

const Testimonial = () => {
  const cardsData: CardData[] = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Briar Martin",
      handle: "@neilstellar",
      date: "April 20, 2025",
      comment:
        "Radiant made undercutting all of our competitors an absolute breeze.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Avery Johnson",
      handle: "@averywrites",
      date: "May 10, 2025",
      comment:
        "The service exceeded all our expectations and delivered outstanding results.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
      name: "Jordan Lee",
      handle: "@jordantalks",
      date: "June 5, 2025",
      comment:
        "Incredible value and exceptional quality that transformed our business.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
      name: "Taylor Smith",
      handle: "@taylorinnovates",
      date: "May 10, 2025",
      comment:
        "Outstanding performance and reliability that we can always count on.",
    },
  ];

  const CreateCard: React.FC<CreateCardProps> = ({ card }) => (
    <div className="p-4 rounded-lg mx-2 sm:mx-3 md:mx-4 shadow-xl hover:shadow-lg transition-all duration-200 w-[280px] sm:w-64 md:w-72 shrink-0 bg-white dark:bg-darklight shadow-[#87ceeb]">
      <div className="flex gap-2">
        <img
          className="size-10 sm:size-11 rounded-full"
          src={card.image}
          alt="User Image"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="text-white dark:text-white text-sm sm:text-base">
              {card.name}
            </p>
            <svg
              className="mt-0.5"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
                fill="#2196F3"
              />
            </svg>
          </div>
          <span className="text-xs text-slate-500 dark:text-white/50">
            {card.handle}
          </span>
        </div>
      </div>
      <p className="text-sm py-3 sm:py-4 text-white dark:text-white">
        {card.comment}
      </p>
      <div className="flex items-center justify-between text-slate-500 dark:text-white/50 text-xs">
        <div className="flex items-center gap-1">
          <span>Posted on</span>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-500"
          >
            <svg
              width="11"
              height="10"
              viewBox="0 0 11 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m.027 0 4.247 5.516L0 10h.962l3.742-3.926L7.727 10H11L6.514 4.174 10.492 0H9.53L6.084 3.616 3.3 0zM1.44.688h1.504l6.64 8.624H8.082z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
        <p>{card.date}</p>
      </div>
    </div>
  );

  return (
    <section
      className="scroll-mt-24 bg-section dark:bg-darklight border-none w-full py-12 sm:py-16"
      id="testimonials"
    >
      <div className="w-full px-4 sm:px-6 ">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-midnight_text dark:text-white mb-3 sm:mb-4">
            Testimonials
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            See what our customers are saying about their experience with our
            services
          </p>
        </div>

        <style jsx global>{`
          @keyframes marqueeScroll {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .marquee-inner {
            animation: marqueeScroll 25s linear infinite;
          }

          .marquee-reverse {
            animation-direction: reverse;
          }

          @keyframes shine {
            0% {
              transform: translateX(-100%) skewX(-12deg);
            }
            100% {
              transform: translateX(200%) skewX(-12deg);
            }
          }

          .animate-shine {
            animation: shine 3s ease-in-out infinite;
          }

          .auto-glow-border {
            transition: opacity 0.3s ease-in-out;
          }

          .auto-glow-shine {
            transition: opacity 0.3s ease-in-out;
          }

          @media (max-width: 640px) {
            .marquee-inner {
              animation-duration: 20s;
            }
          }
        `}</style>

        {/* First Marquee Row */}
        <div className="container mx-auto marquee-row overflow-hidden relative">
          <div className="absolute left-0 top-0 h-full w-8 sm:w-12 md:w-20 z-10 pointer-events-none bg-gradient-to-r from-transparent dark:from-transparent"></div>
          <div className="marquee-inner flex transform-gpu min-w-[300%] sm:min-w-[250%] md:min-w-[200%] py-6 sm:py-8 md:py-10">
            {[...cardsData, ...cardsData].map((card, index) => (
              <div
                key={index}
                className="relative group mx-2 sm:mx-3 md:mx-4 overflow-hidden rounded-xl md:rounded-2xl w-[280px] sm:w-64 md:w-72 shrink-0"
              >
                {/* Dark Green Background */}
                <div className="absolute inset-0 bg-[#051F20] rounded-xl md:rounded-2xl z-10"></div>

                {/* Card Content */}
                <div className="relative z-20">
                  <CreateCard card={card} />
                </div>

                {/* Moving Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shine rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-8 sm:w-12 md:w-20 z-10 pointer-events-none bg-gradient-to-l "></div>
        </div>

        {/* Second Marquee Row (Reverse) */}
        <div className="marquee-row container mx-auto overflow-hidden relative mt-4 sm:mt-6">
          <div className="absolute left-0 top-0 h-full w-8 sm:w-12 md:w-20 z-10 pointer-events-none bg-gradient-to-r "></div>
          <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[300%] sm:min-w-[250%] md:min-w-[200%] py-6 sm:py-8 md:py-10">
            {[...cardsData, ...cardsData].map((card, index) => (
              <div
                key={index}
                className="relative group mx-2 sm:mx-3 md:mx-4 overflow-hidden rounded-xl md:rounded-2xl w-[280px] sm:w-64 md:w-72 shrink-0"
              >
                {/* Dark Green Background */}
                <div className="absolute inset-0 bg-[#051F20] rounded-xl md:rounded-2xl z-10"></div>

                {/* Card Content */}
                <div className="relative z-20">
                  <CreateCard card={card} />
                </div>

                {/* Moving Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shine rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-8 sm:w-12 md:w-20 z-10 pointer-events-none bg-gradient-to-l "></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
