"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getImgPath } from "@/utils/image";

const Contactform = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    message: "",
    termsAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData({
        ...formData,
        [target.name]: target.checked,
      });
      return;
    }

    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      alert("Please accept the Terms and Conditions");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to Brevo API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("FORM SUBMITTED SUCCESSFULLY TO BREVO:", formData);

        // Clear form after successful submit
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          country: "",
          message: "",
          termsAccepted: false,
        });

        // Optional: Show success message
        alert("Thank you! Your message has been sent successfully.");
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "Sorry, there was an error sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="overflow-x-hidden bg-gray-100 dark:bg-darkmode font-bold">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-12 grid-cols-1 md:gap-7 gap-0">
          {/* LEFT SIDE CONTENT */}
          <div
            className="row-start-1 col-start-1 row-end-2 md:col-end-7 col-end-12"
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-duration="1000"
          >
            <div className="flex gap-2 items-center justify-start">
              <span className="w-3 h-3 rounded-full bg-success"></span>
              <span className="font-medium text-sm text-blue-600 dark:text-blue-400">
                build everything
              </span>
            </div>

            <h2 className="sm:text-4xl text-[28px] leading-tight font-bold text-gray-900 dark:text-white py-12">
              Let's discuss about your project and take it to the next level.
            </h2>

            <div className="grid grid-cols-6 pb-12 border-b border-gray-300 dark:border-dark_border">
              <div className="col-span-3">
                <span className="text-blue-600 dark:text-blue-400 text-lg">
                  Phone
                </span>
                <p className="bg-transparent border-0 text-gray-900 dark:text-white text-lg">
                  +323-25-8964
                </p>
              </div>

              <div className="col-span-3">
                <span className="text-blue-600 dark:text-blue-400 text-lg">
                  Email
                </span>
                <p className="bg-transparent border-0 text-gray-900 dark:text-white text-lg">
                  me@landingpro.com
                </p>
              </div>

              <div className="col-span-6 pt-8">
                <span className="text-gray-900 dark:text-white text-lg">
                  Location
                </span>
                <p className="bg-transparent border-0 text-gray-900 dark:text-white text-lg">
                  Mark Avenue, Dallas Road, New York
                </p>
              </div>
            </div>

            <div className="pt-12">
              <p className="text-blue-600 dark:text-blue-400 pb-4 text-base">
                Trusted by
              </p>

              <div className="flex items-center flex-wrap md:gap-14 gap-7">
                <Image
                  src={getImgPath("/images/contact/google-pay.png")}
                  alt="Google-pay"
                  width={100}
                  height={20}
                  style={{ width: "auto", height: "auto" }}
                  quality={100}
                  className="w_f max-w-28 w-full h-5"
                />
                <Image
                  src={getImgPath("/images/contact/play-juction.png")}
                  alt="play-juction"
                  width={100}
                  height={20}
                  style={{ width: "auto", height: "auto" }}
                  quality={100}
                  className="w_f max-w-24 w-full h-6"
                />
                <Image
                  src={getImgPath("/images/contact/stripe.png")}
                  alt="stripe"
                  width={100}
                  height={20}
                  style={{ width: "auto", height: "auto" }}
                  quality={100}
                  className="w_f max-w-14 w-full h-6"
                />
                <Image
                  src={getImgPath("/images/contact/wise.png")}
                  alt="wise"
                  width={100}
                  height={20}
                  style={{ width: "auto", height: "auto" }}
                  quality={100}
                  className="w_f max-w-16 w-full h-4"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div
            data-aos="fade-right"
            data-aos-delay="200"
            data-aos-duration="1000"
            className="relative before:content-[''] before:absolute before:bg-[url('/images/contact/form-line.png')] before:bg-no-repeat before:w-[13rem] before:h-24 before:top-5% before:bg-contain before:left-[35%] before:z-1 before:translate-x-full lg:before:inline-block before:hidden after:content-[''] after:absolute after:bg-[url('/images/contact/from-round-line.png')] after:bg-no-repeat after:w-[6.3125rem] after:h-[6.3125rem] after:bg-contain after:top-1/2 after:-left-[25%] after:z-1 after:translate-x-1/2 after:translate-y-1/2 md:after:inline-block after:hidden md:row-start-1 row-start-2 md:col-start-8 col-start-1 row-end-2 col-end-13"
          >
            <div className="lg:mt-0 mt-8 bg-[#235146] dark:bg-[#8BB297] max-w-[50rem] m-auto pt-[2.1875rem] pb-8 px-[2.375rem] rounded-md relative z-10 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="sm:text-3xl text-lg font-bold text-white dark:text-white mb-3">
                Start the project
              </h2>

              <form
                className="flex w-full m-auto justify-between flex-wrap gap-4"
                onSubmit={handleSubmit}
              >
                <div className="flex gap-4 w-full">
                  <input
                    className="text-white w-full text-base transition-[0.5s] bg-white/10 backdrop-blur-sm dark:border-gray-600 px-[0.9375rem] py-[0.830rem] border border-white/30 border-solid focus:border-white focus:bg-white/20 dark:focus:border-primary placeholder:text-black rounded-lg focus-visible:outline-0"
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="text"
                    className="text-white w-full text-base transition-[0.5s] bg-white/10 backdrop-blur-sm dark:border-gray-600 px-[0.9375rem] py-[0.830rem] border border-white/30 border-solid focus:border-white focus:bg-white/20 dark:focus:border-primary placeholder:text-black rounded-lg focus-visible:outline-0"
                    placeholder="Last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="w-full">
                  <input
                    type="email"
                    className="text-white w-full text-base transition-[0.5s] bg-white/10 backdrop-blur-sm dark:border-gray-600 px-[0.9375rem] py-[0.830rem] border border-white/30 border-solid focus:border-white focus:bg-white/20 dark:focus:border-primary placeholder:text-black rounded-lg focus-visible:outline-0"
                    placeholder="youremail@website.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="w-full">
                  <input
                    className="text-white w-full text-base transition-[0.5s] bg-white/10 backdrop-blur-sm dark:border-gray-600 px-[0.9375rem] py-[0.830rem] border border-white/30 border-solid focus:border-white focus:bg-white/20 dark:focus:border-primary placeholder:text-black rounded-lg focus-visible:outline-0"
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>

                <div className="w-full">
                  <textarea
                    className="text-white h-[9.375rem] w-full text-base transition-[0.5s] bg-white/10 backdrop-blur-sm dark:border-gray-600 px-[0.9375rem] py-[0.830rem] border border-white/30 border-solid focus:border-white focus:bg-white/20 dark:focus:border-primary placeholder:text-black rounded-lg focus-visible:outline-0"
                    placeholder="Let us know about your project"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="flex items-center w-full">
                  <input
                    id="wp-comment-cookies-consent"
                    name="termsAccepted"
                    type="checkbox"
                    value="yes"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="hover:opacity-100 checked:bg-white checked:border-white relative border-2 border-solid border-white rounded-xs bg-transparent cursor-pointer leading-none mr-3 outline-0 p-0 align-text-top h-5 w-5 transition-all duration-300"
                    required
                  />
                  <label
                    htmlFor="wp-comment-cookies-consent"
                    className="text-white dark:text-white cursor-pointer text-sm"
                  >
                    I have read and acknowledge the{" "}
                    <span className="text-white font-semibold underline hover:no-underline cursor-pointer">
                      Terms and Conditions
                    </span>
                  </label>
                </div>

                <div className="w-full">
                  <button
                    className="w-full bg-[#FFFFFF] text-[#235146] hover:bg-gray-100 font-semibold py-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Submit Inquiry"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactform;
