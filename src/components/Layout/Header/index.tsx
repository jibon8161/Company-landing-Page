"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "../Header/Navigation/HeaderLink";
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink";

import { useTheme } from "next-themes";
import { Icon } from "@iconify/react/dist/iconify.js";

const Header: React.FC = () => {
  const pathUrl = usePathname();
  const { theme, setTheme } = useTheme();
  const [isRaining, setIsRaining] = useState(false);

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setSticky(window.scrollY >= 80);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen]);

  // Rain effect
  useEffect(() => {
    if (isRaining) {
      const rainContainer = document.createElement("div");
      rainContainer.id = "rain-container";
      rainContainer.style.position = "fixed";
      rainContainer.style.top = "0";
      rainContainer.style.left = "0";
      rainContainer.style.width = "100%";
      rainContainer.style.height = "100%";
      rainContainer.style.pointerEvents = "none";
      rainContainer.style.zIndex = "40";
      rainContainer.style.overflow = "hidden";

      document.body.appendChild(rainContainer);

      const createRaindrop = () => {
        const drop = document.createElement("div");
        drop.style.position = "absolute";
        drop.style.top = "-50px";
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.width = "2px";
        drop.style.height = `${10 + Math.random() * 40}px`;
        drop.style.background =
          "linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.6))";
        drop.style.borderRadius = "0 0 5px 5px";
        drop.style.animation = `fall ${
          0.5 + Math.random() * 1
        }s linear forwards`;

        const splash = document.createElement("div");
        splash.style.position = "absolute";
        splash.style.bottom = "0";
        splash.style.left = drop.style.left;
        splash.style.width = "15px";
        splash.style.height = "10px";
        splash.style.background = "rgba(59, 130, 246, 0.4)";
        splash.style.borderRadius = "50%";
        splash.style.opacity = "0";
        splash.style.animation = `splash ${
          0.5 + Math.random() * 0.5
        }s ease-out forwards`;

        rainContainer.appendChild(drop);
        rainContainer.appendChild(splash);

        setTimeout(() => {
          if (drop.parentNode) drop.parentNode.removeChild(drop);
          if (splash.parentNode) splash.parentNode.removeChild(splash);
        }, 2000);
      };

      const style = document.createElement("style");
      style.textContent = `
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
        @keyframes splash {
          0% {
            opacity: 1;
            transform: scale(0);
          }
          80% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }
      `;
      document.head.appendChild(style);

      const rainInterval = setInterval(createRaindrop, 50);

      return () => {
        clearInterval(rainInterval);
        const existingRain = document.getElementById("rain-container");
        if (existingRain) {
          document.body.removeChild(existingRain);
        }
        if (style.parentNode) {
          document.head.removeChild(style);
        }
      };
    }
  }, [isRaining]);

  const toggleRain = () => {
    setIsRaining(!isRaining);
  };

  const path = usePathname();

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [navbarOpen]);

  return (
    <header
      // Standard Tailwind CSS (correct)
      className={`fixed h-24 top-0 py-1 z-50 w-full dark:bg-transparent transition-all ${
        sticky
          ? "shadow-lg bg-linear-to-r from-[#8BB398] to-white dark:shadow-dark-md dark:bg-linear-to-r dark:from-black dark:to-[#596E3B]"
          : "shadow-none"
      }`}
    >
      <div className="container mx-auto max-w-6xl flex items-center justify-between p-6">
        <Logo />
        <nav className="hidden lg:flex grow items-center justify-center gap-6">
          {headerData.map((item, index) => (
            <HeaderLink key={index} item={item} />
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {/* Make it Rain Button */}
          <button
            onClick={toggleRain}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
              isRaining
                ? "bg-[#8BB398] text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-[#596E3B] dark:text-white dark:hover:bg-gray-600"
            } ${
              !sticky && pathUrl === "/" && !isRaining
                ? "text-black bg-white/20 hover:bg-white/30"
                : ""
            }`}
            aria-label={isRaining ? "Stop rain effect" : "Start rain effect"}
          >
            <Icon
              icon={isRaining ? "ph:cloud-rain-fill" : "ph:cloud-rain-light"}
              width="16"
              height="16"
            />
            <span className="hidden sm:inline">
              {isRaining ? "Stop Rain" : "Rain"}
            </span>
          </button>

          {/* Dark Mode Toggle Button */}
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-8 w-8 items-center justify-center text-body-color duration-300 dark:text-white"
          >
            <svg
              viewBox="0 0 16 16"
              className={`hidden h-6 w-6 dark:block ${
                !sticky && pathUrl === "/" && "text-white"
              }`}
            >
              <path
                d="M4.50663 3.2267L3.30663 2.03337L2.36663 2.97337L3.55996 4.1667L4.50663 3.2267ZM2.66663 7.00003H0.666626V8.33337H2.66663V7.00003ZM8.66663 0.366699H7.33329V2.33337H8.66663V0.366699V0.366699ZM13.6333 2.97337L12.6933 2.03337L11.5 3.2267L12.44 4.1667L13.6333 2.97337ZM11.4933 12.1067L12.6866 13.3067L13.6266 12.3667L12.4266 11.1734L11.4933 12.1067ZM13.3333 7.00003V8.33337H15.3333V7.00003H13.3333ZM7.99996 3.6667C5.79329 3.6667 3.99996 5.46003 3.99996 7.6667C3.99996 9.87337 5.79329 11.6667 7.99996 11.6667C10.2066 11.6667 12 9.87337 12 7.6667C12 5.46003 10.2066 3.6667 7.99996 3.6667ZM7.33329 14.9667H8.66663V13H7.33329V14.9667ZM2.36663 12.36L3.30663 13.3L4.49996 12.1L3.55996 11.16L2.36663 12.36Z"
                fill="currentColor"
              />
            </svg>
            <svg
              viewBox="0 0 23 23"
              className={`h-8 w-8 text-dark dark:hidden ${
                !sticky && pathUrl === "/" && "text-white"
              }`}
            >
              <path
                d="M16.6111 15.855C17.591 15.1394 18.3151 14.1979 18.7723 13.1623C16.4824 13.4065 14.1342 12.4631 12.6795 10.4711C11.2248 8.47905 11.0409 5.95516 11.9705 3.84818C10.8449 3.9685 9.72768 4.37162 8.74781 5.08719C5.7759 7.25747 5.12529 11.4308 7.29558 14.4028C9.46586 17.3747 13.6392 18.0253 16.6111 15.855Z"
                fill="currentColor"
              />
            </svg>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="block lg:hidden p-2 rounded-lg"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`block w-6 h-0.5 ${
                !sticky && pathUrl === "/"
                  ? "bg-white"
                  : "bg-black dark:bg-white"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 ${
                !sticky && pathUrl === "/"
                  ? "bg-white"
                  : "bg-black dark:bg-white"
              } mt-1.5`}
            ></span>
            <span
              className={`block w-6 h-0.5 ${
                !sticky && pathUrl === "/"
                  ? "bg-white"
                  : "bg-black dark:bg-white"
              } mt-1.5`}
            ></span>
          </button>
        </div>
      </div>
      {navbarOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/70 z-40" />
      )}

      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-full bg-green-100  dark:bg- shadow-lg transform transition-transform duration-300 max-w-xs text-red-500 ${
          navbarOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-bold text-midnight_text dark:text-black">
            Menu
          </h2>
          <button
            onClick={() => setNavbarOpen(false)}
            aria-label="Close mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="dark:text-white"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col items-start p-4">
          {headerData.map((item, index) => (
            <MobileHeaderLink key={index} item={item} />
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
