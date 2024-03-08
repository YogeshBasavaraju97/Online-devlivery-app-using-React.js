import React from 'react';
import RestaurantCard from './RestaurantCard';

import { useState, useEffect } from 'react';
import Shimmer from './Shimmer';

const Body = () => {
  const [List, setList] = useState([]);
  const [serachValue, setSearchValue] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      'https://www.swiggy.com/api/seo/getListing?lat=18.621055599465002&lng=73.8306423049214'
    );
    const json = await data.json();

    console.log(json);

    setList(
      json?.data?.success?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );

    setFilteredList(
      json?.data?.success?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };

  //conditional rendering
  // if (List.length === 0) {
  //   return <shimmer />;
  // }
  console.log('render');
  return List.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="search">
        <input
          className="searchbox"
          value={serachValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <button
          onClick={() => {
            console.log(serachValue);
            const filterList = List.filter((res) =>
              res.info.name.toLowerCase().includes(serachValue)
            );
            console.log(filterList);
            setFilteredList(filterList);
          }}
        >
          Search
        </button>
      </div>
      <button
        onClick={() => {
          const list = List.filter((res) => res.stars > 4);
          setList(list);
        }}
      >
        Top Rated restaurant
      </button>
      <div className="resto-Container">
        {filteredList.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;