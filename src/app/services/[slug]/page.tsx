import React from "react";
import Link from "next/link";
import { serviceCategories } from "@/app/api/data";
import { Icon } from "@iconify/react";
import Image from "next/image";

export async function generateStaticParams() {
  return serviceCategories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const category = serviceCategories.find((cat) => cat.slug === slug);

  if (!category) {
    return (
      <section className="bg-section dark:bg-darklight min-h-screen flex items-center justify-center">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-4xl font-bold text-midnight_text dark:text-white mb-4">
            Category Not Found
          </h1>
          <Link
            href="/services"
            className="text-primary hover:text-blue-700 font-semibold"
          >
            Return to Services
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-section dark:bg-darklight min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-primary hover:text-blue-700 font-semibold group"
          >
            <Icon
              icon="ei:chevron-left"
              width="20"
              height="20"
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to All Services
          </Link>
        </div>

        {/* Category Header */}
        <div className="text-center mb-16">
          <div className="flex gap-2 items-center justify-center mb-4">
            <span className="w-3 h-3 rounded-full bg-success"></span>
            <span className="font-medium text-midnight_text text-sm dark:text-white/50">
              {category.title}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-midnight_text dark:text-white mb-6">
            {category.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-white/70 max-w-3xl mx-auto leading-relaxed">
            {category.shortDescription}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.services.map((service, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
              className="bg-white rounded-xl shadow-service p-8 text-center hover:shadow-xl transition-all duration-300 dark:bg-darkmode group"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={category.icon}
                  alt={service}
                  width={40}
                  height={40}
                />
              </div>

              <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-4">
                {service}
              </h3>

              <p className="text-gray-600 dark:text-white/50 mb-6 leading-relaxed">
                Professional {service.toLowerCase()} services tailored to your
                specific business requirements and goals.
              </p>

              <Link
                href="#"
                className="hover:text-blue-700 text-lg font-medium text-primary group/btn flex items-center justify-center"
              >
                Get Started
                <Icon
                  icon="ei:chevron-right"
                  width="30"
                  height="30"
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
