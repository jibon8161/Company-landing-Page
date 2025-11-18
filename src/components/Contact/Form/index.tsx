"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getImgPath } from "@/utils/image";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    specialist: "",
    date: "",
    time: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("FORM DATA:", formData);
  };

  return (
    <>
      <section className="dark:bg-darkmode md:pb-24 pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-8">
            <div className="col-span-6">
              <h2 className="max-w-72 text-[40px] leading-tight font-bold mb-9 text-midnight_text dark:text-white">
                Get Online Consultation
              </h2>

              <form
                className="flex flex-wrap w-full m-auto justify-between"
                onSubmit={handleSubmit}
              >
                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="first-name"
                      className="pb-3 inline-block text-base"
                    >
                      First Name*
                    </label>
                    <input
                      className="w-full text-base px-4 rounded-lg py-2.5 border-border dark:border-dark_border border-solid dark:text-white dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="last-name"
                      className="pb-3 inline-block text-base"
                    >
                      Last Name*
                    </label>
                    <input
                      className="w-full text-base px-4 py-2.5 rounded-lg border-border dark:border-dark_border border-solid dark:text-white dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="email"
                      className="pb-3 inline-block text-base"
                    >
                      Email address*
                    </label>
                    <input
                      type="email"
                      className="w-full text-base px-4 py-2.5 rounded-lg border-border dark:border-dark_border border-solid dark:text-white dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary focus:border-solid focus:outline-0"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="Specialist"
                      className="pb-3 inline-block text-base"
                    >
                      Specialist*
                    </label>
                    <select
                      className="w-full text-base px-4 py-2.5 rounded-lg border-border dark:text-white border-solid dark:bg-darkmode border transition-all duration-500 focus:border-primary dark:focus:border-primary dark:border-dark_border focus:border-solid focus:outline-0"
                      name="specialist"
                      value={formData.specialist}
                      onChange={handleChange}
                    >
                      <option value="">Choose a specialist</option>
                      <option value="Baking & Pastry">Baking & Pastry</option>
                      <option value="Exotic Cuisine">Exotic Cuisine</option>
                      <option value="French Desserts">French Desserts</option>
                      <option value="Seafood & Wine">Seafood & Wine</option>
                    </select>
                  </div>
                </div>

                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="date"
                      className="pb-3 inline-block text-base"
                    >
                      Date*
                    </label>
                    <input
                      className="w-full text-base px-4 rounded-lg py-2.5 outline-hidden dark:text-white dark:bg-darkmode border-border border-solid border transition-all duration-500 focus:border-primary dark:focus:border-primary dark:border-dark_border focus:border-solid focus:outline-0"
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mx-0 my-2.5 flex-1">
                    <label
                      htmlFor="time"
                      className="pb-3 inline-block text-base"
                    >
                      Time*
                    </label>
                    <input
                      className="w-full text-base px-4 rounded-lg py-2.5 border-border outline-hidden dark:text-white dark:bg-darkmode border-solid border transition-all duration-500 focus:border-primary dark:focus:border-primary dark:border-dark_border focus:border-solid focus:outline-0"
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mx-0 my-2.5 w-full">
                  <button
                    className="bg-primary rounded-lg text-white py-4 px-8 mt-4 inline-block hover:bg-blue-700 w-full text-center"
                    type="submit"
                  >
                    Make an appointment
                  </button>
                </div>
              </form>
            </div>

            {/* IMAGE */}
            <div className="col-span-6">
              <Image
                src={getImgPath("/images/contact-page/contact.jpg")}
                alt="Contact"
                width={1300}
                height={0}
                quality={100}
                style={{ width: "100%", height: "auto" }}
                className="bg-no-repeat bg-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
