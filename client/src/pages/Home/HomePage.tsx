import React from "react";
import Header from "../../components/Header";
import MainContent from "../../components/MainContent";
import Footer from "../../components/Footer";

export default function HomePage() {
  return (
    <div className="font-sans bg-gray-50">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
