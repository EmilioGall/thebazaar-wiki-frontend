import React, { useEffect, useState } from 'react';
import axios from '../api/thebazaar-source';
import ItemCard from '../components/ItemCard';

function Items() {

   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [loadingError, setLoadingError] = useState(null);

   async function fetchItems() {

      try {

         setLoading(true);

         const response = await axios.get('/items');

         const result = await response.data.result;

         console.log('result', result);

         setItems(result.items);

      } catch (err) {

         setLoadingError(err.message);

      } finally {

         setLoading(false);

      };

   };

   useEffect(() => {

      fetchItems();

   }, []);

   console.log('items', items);

   return (

      <div className="container mx-auto my-5">

         <h1 className="text-2xl font-bold">Items Page</h1>

         {
            loading ?

               <div className='text-center mx-auto my-5'>Loading data. Please wait...</div>

               : null
         }

         {
            loadingError ?

               <div className='text-center mx-auto my-5'>Loading error occurred. Please retry.</div>

               : null
         }

         <div className="flex flex-col gap-5 my-5">

            {
               items.map((item) => (

                  <ItemCard key={item.id} item={item} />

               ))
            }

         </div>

      </div>

   );

}

export default Items;