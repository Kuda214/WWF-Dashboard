import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();

    const NavigateToDashboard = () => {
        console.log('Login button clicked');
        setShowLogin(false); 
        navigate('SB'); 
        console.log('Navigating to dashboard');
    }
  return (
    <div className="w-screen h-screen bg-white font-sans text-gray-800 overflow-x-hidden">
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
      <section className="flex flex-col md:flex-row items-center justify-around px-2 py-4">
        <div className="max-w-xl space-y-6 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Empowering Conservation through <span className="text-[#A8C83F]">Data</span> & Insights
          </h1>
          <p className="text-lg text-gray-600">
            WWF Dashboard helps track environmental projects, measure impact, and protect nature.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button onClick={() => setShowLogin(true)} className="bg-[#A8C83F] hover:bg-[#8AA42F] text-black px-12 py-3 rounded-xl font-bold shadow-lg transition">
              Login
            </button>
            <button className="text-[#00778B] font-semibold underline hover:text-[#005f6e]">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-10 md:mt-0">
          <img
            src="https://cdn.pixabay.com/photo/2022/04/15/07/58/sunset-7133867_960_720.jpg"
            alt="Nature Icon"
            className="w-72 h-72"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 py-5 px-3 text-center">
        <div className="w-[85%] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
            {["Oceans", "Wildlife", "Climate", "Water"].map((item, idx) => (
            <div className="text-center" key={idx}>
                <div className="text-lg font-bold text-[#5D3A6A]">500+</div>
                <div className="text-sm text-gray-600 mt-1">{item} Projects</div>
            </div>
            ))}
        </div>
       </section>

  

      {/* Discover Our Work */}
      <section className="bg-gray-100 py-5 px-3 text-center">
        {/* <div className="w-[85%] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 items-center"> */}
            <h2 className="text-2xl font-bold text-center mb-2">DISCOVER OUR WORK</h2> <br/>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
            WWF works to look after our natural resources — oceans, land and wildlife — so we
            can continue to benefit from food, water and a healthy climate.
            </p> <br/>

            <div className="w-[80%] mx-auto grid grid-cols-2 sm:grid-cols-6 gap-2 items-center ">
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
                    className="w-24 h-24 rounded-full object-cover shadow-md"
                />
                <button
                    className={`text-white font-bold py-2 px-4 rounded-md w-24 text-sm ${item.color} hover:opacity-90`}
                >
                    {item.label}
                </button>
                </div>
            ))}
            </div>
        {/* </div> */}
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6">
        &copy; {new Date().getFullYear()} WWF. All rights reserved.
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg relative">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                autoComplete="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C83F]"
              />
              <input
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C83F]"
              />
              <button
                onClick={NavigateToDashboard}
                type="button"
                className="w-full bg-[#A8C83F] hover:bg-[#94b736] text-black font-semibold py-3 rounded-lg transition"
              >
                Sign In
              </button>
            </form>
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
