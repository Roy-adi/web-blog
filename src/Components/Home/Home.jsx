import React from 'react'
import Categories from '../Categories/Categories'

import { fetchDataFromApi } from '../../Utils/api';
import { myContext } from '../../Utils/Context';
import { useState , useEffect , useContext } from 'react'
const Home = () => {
 
  const {categories , setCategories  } = useContext(myContext)
  
  useEffect(() => {
    getCategories();
}, []);
   
  const getCategories = () => {
    fetchDataFromApi("/api/categories?populate=*").then((res) => {
        console.log(res);
        setCategories(res)
    });
};

  return (
    <div>
      <Categories categories={categories} />
    </div>
  )
}

export default Home
