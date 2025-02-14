import React, { useEffect, useState } from 'react';
import axios from '../api/thebazaar-source';
import HeroCard from '../components/HeroCard';

function Home() {

   const [heroes, setHeroes] = useState([]);
   const [loading, setLoading] = useState(true);
   const [loadingError, setLoadingError] = useState(null);
   const [isLoaded, setIsLoaded] = useState(false);

   async function fetchHeroes() {

      try {

         setLoading(true);

         const response = await axios.get('/heroes');

         const result = await response.data.result;

         setHeroes(result.heroes);

      } catch (err) {

         console.error('Error fetching heroes:', err);

         setLoadingError(err.message);

      } finally {

         setLoading(false);

      };

   };

   useEffect(() => {

      Promise.all([

         fetchHeroes(),

      ])
         .then(() => setIsLoaded(true))
         .catch((err) => console.error('Error loading data:', err));
      //

   }, []);

   console.log('heroes', heroes);

   return (

      <div className="container mx-auto my-5">

         <h1 className="text-2xl font-bold">Heroes Page</h1>

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

         {
            !isLoaded && !loadingError && !loading ?

               <div className='text-center mx-auto my-5'>Still loading. Almost done...</div>

               : null
         }

         {
            isLoaded && !loadingError && !loading ?
               <div className="flex flex-col gap-5 my-5">

                  {
                     heroes.length > 0 ?
                     heroes.filter((hero) => hero.id !== 1).map((hero) => (
                        <HeroCard hero={hero} />
                     )) :
                        null
                  }

               </div>
               : null
         }

      </div>

   );

}

export default Home;