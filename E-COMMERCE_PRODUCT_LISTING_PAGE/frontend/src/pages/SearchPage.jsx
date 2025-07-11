import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector ,useDispatch } from "react-redux";
import ItemList from "../components/ItemList";
import { fetchMenWear } from "../redux/menSlice.js";
import { fetchWomenWear } from "../redux/womenSlice.js";
import { fetchKidsWear } from "../redux/kidsSlice.js";
import { fetchFootwear } from "../redux/footwearSlice.js";
import { fetchBeauty } from "../redux/beautySlice.js";

function SearchPage() {
  const { query } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
        dispatch(fetchMenWear());
        dispatch(fetchWomenWear());
        dispatch(fetchKidsWear());
        dispatch(fetchFootwear());
        dispatch(fetchBeauty());    
  }, []);

  const allItems = [
    ...useSelector((state) => state.men.items),
    ...useSelector((state) => state.women.items),
    ...useSelector((state) => state.kids.items),
    ...useSelector((state) => state.footwear.items),
    ...useSelector((state) => state.beauty.items),
  ];

  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (filteredItems.length == 0) {
      document.title = "No Result Found | Shophoria";
    } else {
      document.title = `Search results for '${query}' | Shophoria`;
    }
  }, [query]);

  return (
    <div className="pt-[20vh] px-4 pb-20 min-h-screen bg-[#f4f7fb]">
      <h2 className="text-2xl font-semibold mb-4">
        Search results for: <span className="text-blue-600">"{query}"</span>
      </h2>
      {filteredItems.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemList key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
