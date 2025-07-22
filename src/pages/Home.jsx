import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [userType, setUserType] = useState("employee");
  const navigate = useNavigate();

  const NavigateToDashboard = () => {
    setShowLogin(false);
    navigate("SB/dashboard");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="w-full h-16 bg-black text-white flex items-center justify-between px-8 shadow-md">
        <div className="flex items-center space-x-3">
          <img
            src="https://icon2.cleanpng.com/lnd/20241123/kw/4c9122edfb53fff6770a8c8c679680.webp"
            alt="WWF Logo"
            className="h-10 w-10"
          />
          <span className="text-2xl font-semibold">WWF Dashboard</span>
        </div>
        <button
          onClick={() => setShowLogin(true)}
          className="bg-[#A8C83F] hover:bg-[#8AA42F] text-black font-semibold px-6 py-2 rounded-lg transition-all duration-200"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section
        className="relative w-full h-[90vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2022/04/15/07/58/sunset-7133867_960_720.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            Empowering Conservation through{" "}
            <span className="text-[#A8C83F]">Data</span> & Insights
          </h1>
          <p className="text-lg text-gray-200 mb-6">
            WWF Dashboard helps track environmental projects, measure impact,
            and protect nature.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <button
              onClick={() => setShowLogin(true)}
              className="bg-[#A8C83F] hover:bg-[#8AA42F] text-black px-8 py-3 rounded-xl font-bold shadow transition"
            >
              Login
            </button>
            <button className="text-white underline font-medium hover:text-[#A8C83F]">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-100 py-10 text-center">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {["Oceans", "Wildlife", "Climate", "Water"].map((item, idx) => (
            <div key={idx}>
              <div className="text-2xl font-bold text-[#5D3A6A]">500+</div>
              <div className="text-sm text-gray-600 mt-1">{item} Projects</div>
            </div>
          ))}
        </div>
      </section>

      {/* Discover Section */}
      <section className="bg-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">DISCOVER OUR WORK</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          WWF works to look after our natural resources — oceans, land, and
          wildlife — so we can continue to benefit from food, water, and a
          healthy climate.
        </p>
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-6 gap-6">
          {[
            {
              label: "Oceans",
              img: "https://cdn.pixabay.com/photo/2021/02/20/18/11/sea-6034191_1280.jpg",
              color: "bg-[#00778B]",
            },
            {
              label: "Land",
              img: "https://cdn.pixabay.com/photo/2014/11/16/15/15/field-533541_960_720.jpg",
              color: "bg-[#7D872E]",
            },
            {
              label: "Wildlife",
              img: "https://cdn.pixabay.com/photo/2020/04/03/07/58/rhino-4997858_1280.jpg",
              color: "bg-[#A30050]",
            },
            {
              label: "Food",
              img: "https://cdn.pixabay.com/photo/2022/06/19/21/21/grain-7272712_1280.jpg",
              color: "bg-[#007A30]",
            },
            {
              label: "Climate",
              img: "https://cdn.pixabay.com/photo/2019/08/01/07/18/desert-4376898_1280.jpg",
              color: "bg-[#692860]",
            },
            {
              label: "Water",
              img: "https://cdn.pixabay.com/photo/2018/03/19/15/04/faucet-3240211_1280.jpg",
              color: "bg-[#00778B]",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-3">
              <img
                src={item.img}
                alt={item.label}
                className="w-24 h-24 rounded-full object-cover shadow-md hover:scale-105 transition-transform"
              />
              <button
                className={`text-white font-bold py-2 px-4 rounded-md w-24 text-sm ${item.color} hover:opacity-90`}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6">
        &copy; {new Date().getFullYear()} WWF. All rights reserved.
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <LoginModal onClose={() => setShowLogin(false)} />
        </div>
      )}
    </div>
  );
}
