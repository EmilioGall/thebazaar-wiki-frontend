import React, { useEffect, useState } from 'react';
import axios from '../api/thebazaar-source';

export default function AdvancedFilters({ filters, onFilterChange, filterMode, onFilterModeChange, resetFilters }) {

    const [heroes, setHeroes] = useState([]);
    const [tags, setTags] = useState([]);
    const [tiers, setTiers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(null);
    const [groupedTags, setGroupedTags] = useState({});

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

    useEffect(() => {

        Promise.all([

            fetchHeroes(),
            fetchTags(),
            fetchTiers(),

        ])
            .then(() => setLoading(false))
            .catch((err) => console.error('Error loading data:', err));
    }, []);

    useEffect(() => {

        const groupedTags = {};

        tags.forEach(tag => {

            if (!groupedTags[tag.tag_type]) {

                groupedTags[tag.tag_type] = [];

            };

            groupedTags[tag.tag_type].push(tag);

        });

        setGroupedTags(groupedTags);

    }, [tags]);

    const printedTierLabels = [];

    console.log('filters', filters);
    // console.log('groupedTags', groupedTags);
    // console.log('onFilterChange', onFilterChange);
    // console.log('tiers', tiers);
    // console.log('tags', tags);
    // console.log('heroes', heroes);

    if (loading) {

        return <div className='bg-gray-100 rounded rounded-tl-0 p-2 text-center mx-auto py-5'>Loading filters. Please wait...</div>;

    };

    if (loadingError) {

        return <div className='bg-gray-100 rounded rounded-tl-0 p-2 text-center mx-auto py-5'>Loading error occurred while fetching filters. Please retry.</div>;

    };

    return (
        <div className="bg-gray-100 rounded rounded-tl-0 p-2 space-y-2">

            {/* SearchMode Selection & Reset Button */}
            <div className="rounded flex items-center justify-between bg-gray-200 p-2">

                <div className='flex items-center basis-6/12 space-x-1'>

                    <h4 className="font-semibold">Search Mode ( <span className='text-sm'>{filterMode}</span> )</h4>

                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={filterMode === 'OR'}
                            onChange={onFilterModeChange}
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-none rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-500"></div>
                    </label>

                </div>

                <div className='flex justify-end basis-6/12'>

                    <button
                        onClick={resetFilters}
                        className="border font-semibold px-4 py-1 rounded-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                        Reset Filters
                    </button>

                </div>

            </div>
            {/* SearchMode Selection & Reset Button */}

            {/* Hero Selection */}
            {
                filters.heroIds ?
                    <div className="rounded flex items-center bg-gray-200 p-2">

                        <h4 className="font-semibold basis-2/12">Heroes</h4>

                        <div className="flex items-center space-x-2 basis-10/12">
                            {
                                heroes.map((hero) => (
                                    <label key={hero.id} className={`flex items-center px-3 py-1 rounded-full cursor-pointer hover:bg-gray-400 hover:text-white ${filters.heroIds.includes((hero.id).toString()) ? 'bg-yellow-500' : 'bg-gray-300 text-gray-700'}`}>

                                        <input
                                            type="checkbox"
                                            name="heroIds"
                                            value={hero.id}
                                            checked={filters.heroIds.includes((hero.id).toString())}
                                            onChange={onFilterChange}
                                            className="sr-only"
                                        />
                                        
                                        <span className='text-sm'>{hero.hero_name}</span>

                                    </label>
                                ))
                            }
                        </div>
                    </div>
                    : null
            }
            {/* Hero Selection */}

            {/* Tier Selection */}
            {
                filters.minTierNames ?
                    <div className="rounded flex items-center bg-gray-200 p-2">

                        <h4 className="font-semibold basis-2/12">Tiers</h4>

                        <div className="flex items-center space-x-2 basis-10/12">
                            {
                                tiers.map((tier) => {

                                    if (printedTierLabels.includes(tier.tier_label)) {

                                        return null;

                                    } else {

                                        printedTierLabels.push(tier.tier_label);

                                        return (
                                            <label key={tier.id} className={`flex items-center px-3 py-1 rounded-full cursor-pointer hover:bg-gray-400 hover:text-white ${filters.minTierNames.includes(tier.tier_label) ? 'bg-yellow-500' : 'bg-gray-300 text-gray-700'}`}>

                                                <input
                                                    type="checkbox"
                                                    name="minTierNames"
                                                    value={tier.tier_label}
                                                    checked={filters.minTierNames.includes(tier.tier_label)}
                                                    onChange={onFilterChange}
                                                    className="sr-only"
                                                />

                                                <span className='text-sm'>{String(tier.tier_label).charAt(0).toUpperCase() + String(tier.tier_label).slice(1)}</span>

                                            </label>
                                        );
                                    }
                                })
                            }
                        </div>
                    </div>
                    : null
            }
            {/* Tier Selection */}

            {/* Size Selection */}
            {
                filters.minTierSizes ?
                    <div className="rounded flex items-center bg-gray-200 p-2">

                        <h4 className="font-semibold basis-2/12">Sizes</h4>

                        <div className="flex items-center space-x-2 basis-10/12">
                            {
                                ['small', 'medium', 'large'].map((size) => (
                                    <label key={size} className={`flex items-center px-3 py-1 rounded-full cursor-pointer hover:bg-gray-400 hover:text-white ${filters.minTierSizes.includes(size) ? 'bg-yellow-500' : 'bg-gray-300 text-gray-700'}`}>

                                        <input
                                            type="checkbox"
                                            name="minTierSizes"
                                            value={size}
                                            checked={filters.minTierSizes.includes(size)}
                                            onChange={onFilterChange}
                                            className="sr-only"
                                        />

                                        <span className='text-sm'>{size.charAt(0).toUpperCase() + size.slice(1)}</span>

                                    </label>
                                ))
                            }
                        </div>

                    </div>
                    : null
            }
            {/* Size Selection */}

            {/* Tag Selection */}

            {
                filters.tagTypes ?
                    <div className="rounded flex bg-gray-200 p-2">

                        <h4 className="font-semibold srink basis-2/12">Tags</h4>

                        <div className="flex flex-col space-y-2 basis-10/12">
                            {
                                Object.entries(groupedTags).map(([type, tags]) => (
                                    <div key={type} className="flex space-x-2 rounded bg-gray-100 px-2 py-1">

                                        <h5 className="italic basis-2/12">{String(type).charAt(0).toUpperCase() + String(type).slice(1) + ':'}</h5>

                                        <div className="flex items-center flex-wrap gap-2 basis-10/12">
                                            {
                                                tags.map((tag) => (
                                                    <label key={tag.id} className={`flex items-center px-3 rounded-full cursor-pointer hover:bg-gray-400 hover:text-white ${filters.tagTypes.includes(tag.tag_type + ':' + tag.tag_name) ? 'bg-yellow-500' : 'bg-gray-200 text-gray-700'}`}>

                                                        <input
                                                            type="checkbox"
                                                            name="tagTypes"
                                                            value={tag.tag_type + ':' + tag.tag_name}
                                                            checked={filters.tagTypes.includes(tag.tag_type + ':' + tag.tag_name)}
                                                            onChange={onFilterChange}
                                                            className="sr-only"
                                                        />

                                                        <span className='text-sm'>{tag.tag_name}</span>

                                                    </label>
                                                ))
                                            }
                                        </div>

                                    </div>
                                ))
                            }
                        </div>

                    </div>
                    : null
            }
            {/* Tag Selection */}

        </div>
    );
}