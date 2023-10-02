import Navbar from "@/components/common/navbar";
import Brands from "@/components/hero/brands";
import Choose from "@/components/hero/choose";
import FeaturedProperties from "@/components/hero/featured-properties";
import HeroSection from "@/components/hero/hero-section";
import PopularProperties from "@/components/hero/popular-properties";
import React from "react";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Brands />
      <Choose />
      <FeaturedProperties />
      <PopularProperties />
    </>
  );
}
