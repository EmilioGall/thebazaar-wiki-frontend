import React, { useEffect, useState } from 'react';
import axios from '../api/thebazaar-source';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import AdvancedFilters from '../components/AdvancedFilters';

function Items() {

   const [heroes, setHeroes] = useState([]);
   const [items, setItems] = useState([]);
   const [tags, setTags] = useState([]);
   const [tiers, setTiers] = useState([]);
   const [loading, setLoading] = useState(true);
   const [loadingError, setLoadingError] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');
   const [filters, setFilters] = useState({
      tagTypes: [],
      minTierId: null,
      minTierSize: null,
      heroId: null,
   });
   const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

   async function fetchItems() {

      try {

         setLoading(true);

         const response = await axios.get('/items');

         const result = await response.data.result;

         setItems(result.items);

      } catch (err) {

         console.error('Error fetching items:', err);

         setLoadingError(err.message);

      } finally {

         setLoading(false);

      };

   };

   async function fetchTiers() {

      try {

         setLoading(true);

         const response = await axios.get('/tiers');

         const result = await response.data.result;

         setTiers(result.tiers);

      } catch (err) {

         console.error('Error fetching tiers:', err);

         setLoadingError(err.message);

      } finally {

         setLoading(false);

      };

   };

   async function fetchTags() {

      try {

         setLoading(true);

         const response = await axios.get('/tags');

         const result = await response.data.result;

         setTags(result.tags);

      } catch (err) {

         console.error('Error fetching tags:', err);

         setLoadingError(err.message);

      } finally {

         setLoading(false);

      };

   };

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

   function handleSearchChange(value) {

      setSearchTerm(value);

   };

   function handleFilterChange(e) {

      const { name, value, checked, type } = e.target;

      if (type === 'checkbox') {

         setFilters((prevFilters) => {

            if (checked) {

               return { ...prevFilters, [name]: [...prevFilters[name], value] };

            } else {

               return { ...prevFilters, [name]: prevFilters[name].filter((v) => v !== value) };

            };

         });

      } else {

         setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));

      };

   };

   function handleToggleFilters() {

      if (showAdvancedFilters) {
         // Reset filters when hiding advanced filters
         setFilters({
            tagTypes: [],
            minTierId: null,
            minTierSize: null,
            heroId: null,
         });
      };

      setShowAdvancedFilters(!showAdvancedFilters);

   };

   const filteredItems = items.filter((item) => {

      const matchesSearchTerm = item.item_name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTagTypes = filters.tagTypes.length === 0 || item.tags.some((tag) => filters.tagTypes.includes(tag.tag_type + ':' + tag.tag_name));

      const matchesMinTierId = !filters.minTierId || item.min_tier_id === parseInt(filters.minTierId);

      const matchesMinTierSize = !filters.minTierSize || item.min_tier.tier_size === filters.minTierSize;

      const matchesHeroId = !filters.heroId || item.hero_id === parseInt(filters.heroId);

      return matchesSearchTerm && matchesTagTypes && matchesMinTierId && matchesMinTierSize && matchesHeroId;

   });

   useEffect(() => {

      fetchHeroes();

      fetchItems();

      fetchTags();

      fetchTiers();

   }, []);

   // console.log('heroes', heroes);

   // console.log('items', items);

   // console.log('tiers', tiers);

   // console.log('tags', tags);

   return (

      <div className="container mx-auto my-5">

         <h1 className="text-2xl font-bold">Items Page</h1>

         <div className="my-5">

            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

            <button onClick={handleToggleFilters} className="mt-2 p-2 bg-blue-500 text-white rounded">

               {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}

            </button>

            {showAdvancedFilters && <AdvancedFilters filters={filters} onFilterChange={handleFilterChange} heroes={heroes} tiers={tiers} tags={tags} />}

         </div>

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
               filteredItems.length > 0 ?
                  filteredItems.map((item) => (

                     <ItemCard key={item.id} item={item} />

                  )) :
                  <div className="w-full border rounded overflow-hidden shadow-md bg-white">

                     <p className="font-bold text-center text-xl my-2">No Item found.</p>

                  </div>
            }

         </div>

      </div>

   );

}

export default Items;