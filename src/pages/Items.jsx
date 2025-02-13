import React, { useEffect, useState } from 'react';
import axios from '../api/thebazaar-source';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import AdvancedFilters from '../components/AdvancedFilters';

function Items() {

   const [items, setItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [loadingError, setLoadingError] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');
   const [filters, setFilters] = useState({
      tagTypes: [],
      minTierNames: [],
      minTierSizes: [],
      heroIds: [],
   });
   const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
   const [isLoaded, setIsLoaded] = useState(false);
   const [filterMode, setFilterMode] = useState('AND');

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

      setShowAdvancedFilters((prevShowAdvancedFilters) => {

         if (prevShowAdvancedFilters) {

            resetFilters();

         };

         return !prevShowAdvancedFilters;

      });

   };

   function handleFilterModeChange(e) {

      setFilterMode(e.target.checked ? 'OR' : 'AND');

      resetFilters();

   };

   function resetFilters() {

      setFilters({

         tagTypes: [],
         minTierNames: [],
         minTierSizes: [],
         heroIds: [],

      });

   };

   const filteredItems = items.filter((item) => {

      const matchesSearchTerm = item.item_name.toLowerCase().includes(searchTerm.toLowerCase());

      const filterKeys = ['tagTypes', 'minTierNames', 'minTierSizes', 'heroIds'];

      const matchesFilters = filterMode === 'AND'
         ? filterKeys.every((filterKey) => {
            if (filters[filterKey].length === 0) return true;

            return filters[filterKey].every((filterValue) => {

               if (filterKey === 'tagTypes') {
                  return item.tags.some((tag) => `${tag.tag_type}:${tag.tag_name}` === filterValue);
               } else if (filterKey === 'minTierNames') {
                  return item.min_tier.tier_label === filterValue;
               } else if (filterKey === 'minTierSizes') {
                  return item.min_tier.tier_size === filterValue;
               } else if (filterKey === 'heroIds') {
                  return item.hero_id.toString() === filterValue;
               };

               return false;

            });
         })
         : filterKeys.some((filterKey) => {

            if (filters[filterKey].length === 0) return false;

            return filters[filterKey].some((filterValue) => {

               if (filterKey === 'tagTypes') {
                  return item.tags.some((tag) => `${tag.tag_type}:${tag.tag_name}` === filterValue);
               } else if (filterKey === 'minTierNames') {
                  return item.min_tier.tier_label === filterValue;
               } else if (filterKey === 'minTierSizes') {
                  return item.min_tier.tier_size === filterValue;
               } else if (filterKey === 'heroIds') {
                  return item.hero_id.toString() === filterValue;
               };

               return false;

            });
         });

      return matchesSearchTerm && matchesFilters;

   });

   useEffect(() => {

      Promise.all([

         fetchItems(),

      ])
         .then(() => setIsLoaded(true))
         .catch((err) => console.error('Error loading data:', err));
      //

   }, []);

   // console.log('heroes', heroes);

   console.log('items', items);

   // console.log('tiers', tiers);

   // console.log('tags', tags);

   return (

      <div className="container mx-auto my-5">

         <h1 className="text-2xl font-bold">Items in the Bazaar</h1>

         <div className="my-2">

            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

            <button onClick={handleToggleFilters} className={`border font-semibold mt-2 px-4 ${showAdvancedFilters ? 'border-gray-100 bg-gray-100 text-gray-800 rounded-t' : 'rounded'}`}>

               Advanced Filters

            </button>

            {showAdvancedFilters && (
               <AdvancedFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  filterMode={filterMode}
                  onFilterModeChange={handleFilterModeChange}
                  resetFilters={resetFilters}
               />
            )}

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

         {
            !isLoaded && !loadingError && !loading ?

               <div className='text-center mx-auto my-5'>Still loading. Almost done...</div>

               : null
         }

         {
            isLoaded && !loadingError && !loading ?
               <div className="flex flex-col gap-5 my-5">

                  {
                     filteredItems.length > 0 ?
                        filteredItems.map((item) => (

                           <ItemCard key={`item-${item.id}`} item={item} />

                        )) :
                        <div className="w-full border rounded shadow-md bg-white">

                           <p className="font-bold text-center text-xl my-2">No Item found.</p>

                        </div>
                  }

               </div>
               : null
         }

      </div>

   );

}

export default Items;