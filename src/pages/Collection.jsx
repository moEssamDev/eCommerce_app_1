import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (event) => {
    if (category.includes(event.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== event.target.value));
    } else {
      setCategory((prev) => [...prev, event.target.value]);
    }
  };

  const toggleSubCategory = (event) => {
    if (subCategory.includes(event.target.value)) {
      setSubCategory((prev) =>
        prev.filter((item) => item !== event.target.value)
      );
    } else {
      setSubCategory((prev) => [...prev, event.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => {
        subCategory.includes(item.subCategory);
      });
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options(Left Side) */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt="dropdown icon"
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>

        {/* ---- Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                id="men"
                type="checkbox"
                className="w-3"
                value={"Men"}
                onClick={toggleCategory}
              />
              <label htmlFor="men" className="cursor-pointer">
                Men
              </label>
            </p>
            <p className="flex gap-2">
              <input
                id="women"
                type="checkbox"
                className="w-3"
                value={"Women"}
                onClick={toggleCategory}
              />
              <label htmlFor="women" className="cursor-pointer">
                Women
              </label>
            </p>
            <p className="flex gap-2">
              <input
                id="kids"
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onClick={toggleCategory}
              />
              <label htmlFor="kids" className="cursor-pointer">
                Kids
              </label>
            </p>
          </div>
        </div>

        {/* ---- SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                id="topwear"
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onClick={toggleSubCategory}
              />
              <label htmlFor="topwear" className="cursor-pointer">
                Topwear
              </label>
            </p>
            <p className="flex gap-2">
              <input
                id="bottomwear"
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onClick={toggleSubCategory}
              />
              <label htmlFor="bottomwear" className="cursor-pointer">
                Bottomwear
              </label>
            </p>
            <p className="flex gap-2">
              <input
                id="winter"
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onClick={toggleSubCategory}
              />
              <label htmlFor="winter" className="cursor-pointer">
                Winter
              </label>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* ---- Product sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 bg-white border-gray-300 text-sm px-0 sm:px-2"
          >
            <option value={"relavent"}>Sort by: Relavent</option>
            <option value={"low-high"}>Sort by: Low to High</option>
            <option value={"high-low"}>Sort by: High to Low</option>
          </select>
        </div>

        {/*---- Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => {
            return (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default collection;
