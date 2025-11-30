"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getImgPath } from "@/utils/image";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    timezone: "",
    specialist: "",
    date: "",
    time: "",
    message: "",
  });

  const [userTimezone, setUserTimezone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Detect user's actual timezone on component mount
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(timezone);
    setFormData((prev) => ({
      ...prev,
      timezone: timezone,
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   setIsSubmitting(true);

   try {
     console.log("Submitting form data:", formData);

     const response = await fetch("/api/consultation", {
       // ← TRAILING SLASH ADDED
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(formData),
     });

     console.log("Response status:", response.status);

     if (response.ok) {
       const result = await response.json();
       console.log("SUCCESS:", result);

       // Clear form after successful submit
       setFormData({
         firstName: "",
         lastName: "",
         email: "",
         country: "",
         timezone: userTimezone,
         specialist: "",
         date: "",
         time: "",
         message: "",
       });

       alert(
         "Thank you! Your consultation request has been sent successfully. We'll contact you soon to confirm the meeting."
       );
     } else {
       throw new Error(`Server responded with status: ${response.status}`);
     }
   } catch (error) {
     console.error("Error submitting consultation form:", error);
     alert(
       "Sorry, there was an error sending your consultation request. Please try again."
     );
   } finally {
     setIsSubmitting(false);
   }
 };

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 py-16 text-black">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Get Expert Consultation
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-6 leading-tight">
              Let's Build Something
              <span className="block bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text dark:text-[#D5ECD9]">
                Amazing Together
              </span>
            </h1>
            <p className="text-xl  dark:text-[#ffffff] max-w-3xl mx-auto leading-relaxed">
              Schedule a personalized consultation with our experts. We'll
              discuss your project needs, provide tailored solutions, and help
              you achieve your goals. Your timezone is automatically detected
              for seamless scheduling.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Form Section */}
            <div className="lg:col-span-8">
              <div className="dark:bg-[#396359] bg-[#596E3B] rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold dark:text-black text-white">
                      Schedule Your Consultation
                    </h2>
                    <p className="text-gray-600">
                      Fill in your details and preferred meeting time
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white border-l-4 border-emerald-500 pl-4">
                      Personal Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-black">
                          First Name*
                        </label>
                        <input
                          className="w-full px-4 py-4 rounded-2xl border border-black focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-[#D5ECD9] placeholder-gray-400"
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          placeholder="Enter your first name"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-black">
                          Last Name*
                        </label>
                        <input
                          className="w-full px-4 py-4 rounded-2xl border border-black focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-[#D5ECD9] placeholder-gray-400"
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-black">
                          Email Address*
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-4 rounded-2xl border border-black focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-[#D5ECD9] placeholder-gray-400"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-black">
                          Country*
                        </label>
                        <input
                          className="w-full px-4 py-4 rounded-2xl border border-black focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-[#D5ECD9] placeholder-gray-400"
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          placeholder="Your country"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Timezone Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white border-l-4 border-blue-500 pl-4">
                      Timezone Information
                    </h3>

                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                            <label className="block text-sm font-semibold text-blue-800">
                              Your Auto-detected Timezone
                            </label>
                          </div>
                          <p className="text-blue-700 font-medium text-lg">
                            {userTimezone || "Detecting your timezone..."}
                          </p>
                          <p className="text-blue-600 text-sm">
                            We'll schedule according to your local time and
                            convert it to Our time automatically
                          </p>
                        </div>
                        <div className="text-3xl">🌍</div>
                      </div>
                      <input
                        type="hidden"
                        name="timezone"
                        value={userTimezone}
                      />
                    </div>
                  </div>

                  {/* Consultation Details Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white border-l-4 border-purple-500 pl-4">
                      Consultation Details
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-black">
                          Service Needed*
                        </label>
                        <select
                          className="w-full px-4 py-4 rounded-2xl border border-black focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-[#D5ECD9] text-black"
                          name="specialist"
                          value={formData.specialist}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Choose a service</option>
                          <option value="Website Development">
                            Website Development
                          </option>
                          <option value="Virtual Assistant">
                            Virtual Assistant
                          </option>
                          <option value="Product Listing">
                            Product Listing
                          </option>
                          <option value="Data Entry">Data Entry</option>
                          <option value="SEO Optimization">
                            SEO Optimization
                          </option>
                          <option value="Social Media Management">
                            Social Media Management
                          </option>
                          <option value="E-commerce Solutions">
                            E-commerce Solutions
                          </option>
                          <option value="Custom Software">
                            Custom Software
                          </option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-black">
                          Preferred Date*
                        </label>
                        <input
                          className="w-full px-4 py-4 rounded-2xl border border-black focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-[#D5ECD9] text-black"
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-black">
                        Preferred Time* (Your Local Time)
                      </label>
                      <input
                        className="w-full px-4 py-4 rounded-2xl border border-black focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-[#D5ECD9] text-black"
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      />
                      <p className="text-white text-sm mt-2">
                        This will be automatically converted to Our time (UTC+6)
                        for our team
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-black">
                        Project Details & Requirements
                      </label>
                      <textarea
                        className="w-full px-4 py-4 rounded-2xl border border-black text-black focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-[#D5ECD9] placeholder-gray-400 resize-none"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your project, specific requirements, goals, or any questions you'd like to discuss during the consultation..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white py-5 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Scheduling Your Consultation...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          Schedule Consultation
                        </>
                      )}
                    </button>
                  </div>

                  {/* Timezone Note */}
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <p className="text-gray-600 text-sm">
                      <span className="font-semibold">Your timezone:</span>{" "}
                      {userTimezone} •
                      <span className="font-semibold"> Our timezone:</span>{" "}
                      Asia/Dhaka (UTC+6) •
                      <span className="font-semibold">
                        {" "}
                        Real-time conversion
                      </span>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Info Section */}
            <div className="lg:col-span-4 space-y-8">
              {/* Benefits Card */}
              <div className="bg-[#D5ECD9] rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Why Choose Our Consultation?
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: "🎯",
                      title: "Expert Guidance",
                      desc: "Get advice from industry professionals with years of experience",
                    },
                    {
                      icon: "⚡",
                      title: "Quick Start",
                      desc: "Begin your project immediately after our initial discussion",
                    },
                    {
                      icon: "💡",
                      title: "Tailored Solutions",
                      desc: "Customized strategies that fit your specific business needs",
                    },
                    {
                      icon: "🌐",
                      title: "Global Support",
                      desc: "We work with clients across all timezones seamlessly",
                    },
                    {
                      icon: "🛠️",
                      title: "Technical Excellence",
                      desc: "Latest technologies and best practices implementation",
                    },
                    {
                      icon: "📈",
                      title: "Growth Focused",
                      desc: "Solutions designed to scale with your business growth",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-2xl flex-shrink-0">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold text-white">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-3xl shadow-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Need Immediate Help?
                </h3>
                <p className="mb-6 opacity-90">
                  Can't wait for a scheduled call? Reach out to us directly.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D5ECD9]/20 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Phone Support</p>
                      <p className="font-semibold">+880 1234-567890</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D5ECD9]/20 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Email Support</p>
                      <p className="font-semibold">support@beeszone.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "50+", label: "Countries Served" },
              { number: "99%", label: "Client Satisfaction" },
              { number: "24/7", label: "Global Support" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-[#D5ECD9]/80 backdrop-blur-sm rounded-2xl p-6 border border-black shadow-lg"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
