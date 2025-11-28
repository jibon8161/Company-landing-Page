// app/services/[slug]/page.tsx
import React from "react";
import Link from "next/link";
import { serviceCategories } from "@/app/api/data";
import { Icon } from "@iconify/react";
import Image from "next/image";

// UPDATED: Props type for Next.js 15 - params is now a Promise
interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Static paths for dynamic routing
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return serviceCategories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // UPDATED: Await the params Promise
  const { slug } = await params;

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
    <section className="bg-section dark:bg-darklight min-h-screen relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto max-w-7xl px-4 py-12 relative z-10">
        {/* Back Button */}
        <div className="mb-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 text-primary hover:text-blue-700 font-semibold group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
          >
            <Icon
              icon="ei:chevron-left"
              width="20"
              height="20"
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            Back to All Services
          </Link>
        </div>

        {/* Category Header */}
        <div
          className="text-center mb-20"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="flex gap-2 items-center justify-center mb-6">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-blue-600"></span>
            <span className="font-medium text-midnight_text text-sm dark:text-white/50 tracking-wider uppercase">
              {category.title}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-midnight_text dark:text-white mb-8 bg-gradient-to-r from-midnight_text to-primary dark:from-white dark:to-primary bg-clip-text text-transparent">
            {category.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {category.shortDescription}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {category.services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const ServiceCard = ({
  service,
  category,
  index,
}: {
  service: string;
  category: (typeof serviceCategories)[number];
  index: number;
}) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={`${index * 100}`}
      data-aos-duration="800"
      className="group relative overflow-hidden min-h-[400px]"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-700/50"></div>

      {/* Animated Border Gradient */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-blue-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Shine Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

      <div className="relative z-10 h-full flex flex-col p-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Icon Container with Gradient */}
          <div className="inline-flex w-20 h-20 mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-600/30 rounded-2xl blur-md group-hover:blur-lg transition-all duration-500"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-all duration-500 border border-gray-200/50 dark:border-gray-600/50">
              <Image
                src={category.icon}
                alt={service}
                width={36}
                height={36}
                className="text-primary filter drop-shadow-sm"
              />
            </div>
          </div>

          {/* Service Title */}
          <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-4 bg-gradient-to-r from-midnight_text to-primary dark:from-white dark:to-primary bg-clip-text text-transparent">
            {service}
          </h3>
        </div>

        {/* Service Description */}
        <div className="mb-8 flex-1">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg text-center">
            Professional {service.toLowerCase()} services tailored to your
            specific business requirements and goals. We deliver exceptional
            quality and outstanding results for every project.
          </p>

          {/* Features List */}
          <div className="mt-6 space-y-3">
            {[
              "Customized Solutions",
              "Professional Quality",
              "Timely Delivery",
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 group/feature py-2 px-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                  <Icon
                    icon="ei:check"
                    width="10"
                    height="10"
                    className="text-white"
                  />
                </div>
                <span className="text-gray-700 dark:text-gray-200 text-sm font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-auto">
          <Link
            href="#"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold group/btn hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg w-full justify-center"
          >
            <span>Get Started</span>
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
