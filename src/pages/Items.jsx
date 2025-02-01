import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../features/exampleSlice';
import axios from '../api/thebazaar-source';

function Items() {

   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   async function fetchItems() {

      try {

         const response = await axios.get('/items');

         setItems(response.data);

      } catch (err) {

         setError(err.message);

      } finally {

         setLoading(false);

      };

   };

   useEffect(() => {

      fetchItems();

   }, []);

   console.log(items);
   

   return (

      <div className="container mx-auto my-5">

         <h1 className="text-2xl font-bold">Items Page</h1>

      </div>

   );

}

export default Items;