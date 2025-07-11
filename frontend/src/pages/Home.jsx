import React from "react";
import { Link } from "react-router-dom";
import { PiDressFill } from "react-icons/pi";
import { FaTshirt } from "react-icons/fa";
import { FaChildDress } from "react-icons/fa6";

const categories = [
  {
    name: "WOMEN'S FASHION",
    path: "/women%20clothing",
    image: "/images/woman-clothes.png",
  },
  {
    name: "MEN'S FASHION",
    path: "/men%20clothing",
    image: "/images/male-clothes.png",
  },
  {
    name: "KID'S FASHION",
    path: "/kids%20clothing",
    image: "/images/kids-dress.png",
  },
  {
    name: "FOOTWEAR",
    path: "/footwear",
    image: "/images/footwear.png",
  },
  {
    name: "BEAUTY",
    path: "/beauty",
    image: "/images/makeup-pouch.png",
  },
];

const Home = () => {
  document.title = 'Shophoria | Home'

  return (
    <div className="min-h-screen relative w-screen bg-[#f2f8fd] flex flex-col items-center  pt-40">
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold tracking-wide border-y-2 border-black py-2 px-6 ">
          SHOPHORIA
        </h1>
        <div className="mt-10 bg-[#1d2939] text-white px-6 py-3 rounded-lg inline-block text-2xl font-medium">
          ONE STOP FOR ALL SHOPPING PURPOSE
        </div>
      </div>

      <div className="absolute  right-5 flex flex-col items-center">
        <img src="/images/tag.png" alt="tag" className="h-56" />
      </div>

      <div className="absolute left-3 top-72">
        <img
          src="/images/cartImg.png"
          alt="Mobile Shopping"
          className="w-46 h-50 mx-auto"
        />
      </div>

      <div className="flex items-center justify-evenly mt-10 w-full max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-24 w-full max-w-6xl px-4">
          {categories.map((cat, idx) => (
            <Link
              to={cat.path}
              key={idx}
              className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center hover:scale-105 transition duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-16 h-16 object-contain mb-2"
              />
              <p className="text-sm text-center font-semibold">{cat.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
