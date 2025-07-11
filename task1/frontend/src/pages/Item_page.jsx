import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenWear } from "../redux/menSlice.js";
import { fetchWomenWear } from "../redux/womenSlice.js";
import { fetchKidsWear } from "../redux/kidsSlice.js";
import { fetchFootwear } from "../redux/footwearSlice.js";
import { fetchBeauty } from "../redux/beautySlice.js";
import ItemList from "../components/ItemList";
import { FaFilter } from "react-icons/fa";
import { PiMaskSadLight } from "react-icons/pi";

function Item_page() {
  const location = useLocation();
  const curr_category = decodeURIComponent(location.pathname.split("/")[1]);
  const dispatch = useDispatch();
  const [filteredItems, setFilteredItems] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [availableGenders, setAvailableGenders] = useState([]);
  const [availableSize , setAvailableSize] = useState([]);
  const [selectedSize , setSelectedsize] = useState("");
  const [sortBy, setSortBy] = useState("");

  const state = useSelector((state) => {
    switch (curr_category) {
      case "men clothing":
        return state.men;
      case "women clothing":
        return state.women;
      case "kids clothing":
        return state.kids;
      case "footwear":
        return state.footwear;
      case "beauty":
        return state.beauty;
      default:
        return { items: [], loading: false, error: null };
    }
  });
  const { items, loading, error } = state;

  useEffect(() => {
    document.title = curr_category + " | Shop";
    switch (curr_category) {
      case "men clothing":
        dispatch(fetchMenWear());
        break;
      case "women clothing":
        dispatch(fetchWomenWear());
        break;
      case "kids clothing":
        dispatch(fetchKidsWear());
        break;
      case "footwear":
        dispatch(fetchFootwear());
        break;
      case "beauty":
        dispatch(fetchBeauty());
        break;
    }
  }, [curr_category]);

  useEffect(() => {
    const uniqueSubCategories = [
      ...new Set(items.map((item) => item.subCategory)),
    ];
    setSubCategories(uniqueSubCategories);

    if (items.length > 0 && "gender" in items[0]) {
      const genders = [...new Set(items.map((item) => item.gender))];
      setAvailableGenders(genders);
    } else {
      setAvailableGenders([]);
    }

    if (items.length > 0 && "size" in items[0]) {
      const sizes = [...new Set(items.map((item) => item.size))];
      setAvailableSize(sizes);
    } else {
      setAvailableSize([]);
    }

  }, [items]);

  useEffect(() => {
    let tempItems = [...items];

    if (selectedSubCategory) {
      tempItems = tempItems.filter(
        (item) => item.subCategory === selectedSubCategory
      );
    }
    if (selectedGender) {
      tempItems = tempItems.filter(
        (item) => item.gender === selectedGender
      );
    }
    if (selectedSize) {
      tempItems = tempItems.filter(
        (item) => item.size === selectedSize
      );
    }

    if (sortBy === "lowToHigh") {
      tempItems.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highToLow") {
      tempItems.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      tempItems.sort((a, b) => b.rating - a.rating);
    }

    setFilteredItems(tempItems);
  }, [items, selectedSubCategory, sortBy , selectedGender , selectedSize]);

  return (
    <div className="flex justify-between w-full min-h-screen pt-[19vh] pb-10 bg-[#eff6fc]">
      <div className="left-0 shadow-[0.2rem_0_0.2rem_#1b1b1bd3] w-[20%] min-h-full p-4 bg-[#ddf0ff]">
        <div className="flex flex-col fixed">
          <span className="text-xl inline-flex items-center self-center gap-1.5">
            Filter & sort <FaFilter />
          </span>
          <h2 className="mt-4 text-lg">filter By</h2>
          <label htmlFor="select" className="mt-2">subCategory</label>
          <select
            className="mt-1 border p-2 "
            onChange={(e) => {
              setSelectedSubCategory(e.target.value);
              window.scroll(0, 0);
            }}
          >
            <option value="">All</option>
            {subCategories.map((subCat, index) => (
              <option key={index} value={subCat}>
                {subCat}
              </option>
            ))}
          </select>
          
          {availableGenders.length > 0 && (
            <>
            <label htmlFor="select" className="mt-2">Genders</label>
            <select
              className="mt-1 border p-2 w-full"
              value={selectedGender}
              onChange={(e) => {
              setSelectedGender(e.target.value);
              window.scroll(0, 0);
            }}
            >
              <option value="">All Genders</option>
              {availableGenders.map((gender, index) => (
                <option key={index} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            </>
          )}

          {availableSize.length > 0 && (
            <>
            <label htmlFor="select" className="mt-2">size</label>
            <select
              className="mt-1 border p-2 w-full"
              value={selectedSize}
              onChange={(e) => {
              setSelectedsize(e.target.value);
              window.scroll(0, 0);
            }}
            >
              <option value="">All size</option>
              {availableSize.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
            </>
          )}

          <h2 className="mt-8 text-lg">Sort By</h2>
          <select
            className="mt-1 border p-2"
            onChange={(e) => {
              setSortBy(e.target.value);
              window.scroll(0, 0);
            }}
          >
            <option value="">default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col border-r w-[80%] p-5 overflow-y-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (filteredItems.length >0 )? (
          filteredItems.map((item) => <ItemList item={item} key={item.id} />)
        ): (
          <span className="text-5xl self-center flex gap-1 my-auto "><PiMaskSadLight/> No item found</span>
        ) }
      </div>
    </div>
  );
}

export default Item_page;
