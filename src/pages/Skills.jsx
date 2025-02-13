import React, { useEffect, useState } from 'react';
import axios from '../api/thebazaar-source';
import SkillCard from '../components/SkillCard';
import SearchBar from '../components/SearchBar';
import AdvancedFilters from '../components/AdvancedFilters';

function Skills() {

   const [skills, setSkills] = useState([]);
   const [loading, setLoading] = useState(true);
   const [loadingError, setLoadingError] = useState(null);
   const [searchTerm, setSearchTerm] = useState('');
   const [filters, setFilters] = useState({
      tagTypes: [],
      minTierNames: [],
      heroIds: [],
   });
   const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
   const [isLoaded, setIsLoaded] = useState(false);
   const [filterMode, setFilterMode] = useState('AND');

   async function fetchSkills() {

      try {

         setLoading(true);

         const response = await axios.get('/skills');

         const result = await response.data.result;

         setSkills(result.skills);

      } catch (err) {

         console.error('Error fetching skills:', err);

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

            setFilters({
               tagTypes: [],
               minTierNames: [],
               heroIds: [],
            });
         }

         return !prevShowAdvancedFilters;

      });

   };

   function handleFilterModeChange(e) {

      setFilterMode(e.target.checked ? 'OR' : 'AND');

      setFilters({
         tagTypes: [],
         minTierNames: [],
         heroIds: [],
      });

   }

   const filteredSkills = skills.filter((skill) => {

      const matchesSearchTerm = skill.skill_name.toLowerCase().includes(searchTerm.toLowerCase());

      const filterKeys = ['tagTypes', 'minTierNames', 'heroIds'];

      const matchesFilters = filterMode === 'AND'
         ? filterKeys.every((filterKey) => {
            if (filters[filterKey].length === 0) return true;

            return filters[filterKey].every((filterValue) => {

               if (filterKey === 'tagTypes') {
                  return skill.tags.some((tag) => `${tag.tag_type}:${tag.tag_name}` === filterValue);
               } else if (filterKey === 'minTierNames') {
                  return skill.min_tier.tier_label === filterValue;
               } else if (filterKey === 'heroIds') {
                  return skill.heroes.some((hero) => hero.id.toString() === filterValue);
               };

               return false;

            });
         })
         : filterKeys.some((filterKey) => {

            if (filters[filterKey].length === 0) return false;

            return filters[filterKey].some((filterValue) => {

               if (filterKey === 'tagTypes') {
                  return skill.tags.some((tag) => `${tag.tag_type}:${tag.tag_name}` === filterValue);
               } else if (filterKey === 'minTierNames') {
                  return skill.min_tier.tier_label === filterValue;
               } else if (filterKey === 'heroIds') {
                  return skill.heroes.some((hero) => hero.id.toString() === filterValue);
               };

               return false;

            });
         });

      return matchesSearchTerm && matchesFilters;

   });

   useEffect(() => {

      Promise.all([

         fetchSkills(),

      ])
         .then(() => setIsLoaded(true))
         .catch((err) => console.error('Error loading data:', err));
      //

   }, []);

   // console.log('heroes', heroes);

   console.log('skills', skills);

   // console.log('tiers', tiers);

   // console.log('tags', tags);

   return (

      <div className="container mx-auto my-5">

         <h1 className="text-2xl font-bold">Skills in the Bazaar</h1>

         <div className="my-2">

            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

            <button onClick={handleToggleFilters} className={`border mt-2 p-2 ${showAdvancedFilters ? 'border-gray-100 bg-gray-100 text-gray-800 rounded-t' : 'rounded'}`}>

               Advanced Filters

            </button>

            {showAdvancedFilters && (
               <AdvancedFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  filterMode={filterMode}
                  onFilterModeChange={handleFilterModeChange}
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
                     filteredSkills.length > 0 ?
                        filteredSkills.map((skill) => (

                           <SkillCard key={`skill-${skill.id}`} skill={skill} />

                        )) :
                        <div className="w-full border rounded shadow-md bg-white">

                           <p className="font-bold text-center text-xl my-2">No Skill found.</p>

                        </div>
                  }

               </div>
               : null
         }

      </div>

   );

}

export default Skills;