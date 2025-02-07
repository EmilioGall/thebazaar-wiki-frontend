import React, { useEffect, useState } from 'react';

export default function AdvancedFilters({ filters, onFilterChange, tiers, tags, heroes, filterMode, onFilterModeChange }) {

    const printedTierLabels = [];
    const [groupedTags, setGroupedTags] = useState({});

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


    console.log('filters', filters);
    // console.log('onFilterChange', onFilterChange);
    // console.log('tiers', tiers);
    console.log('tags', tags);
    // console.log('heroes', heroes);

    console.log('groupedTags', groupedTags);

    return (
        <div className="bg-gray-100 rounded rounded-tl-0 p-2 space-y-2">

            {/* SearchMode Selection */}
            <div className="rounded flex items-center bg-gray-200 p-2">

                <h4 className="font-semibold basis-2/12">Search Mode</h4>

                <div className='flex items-center space-x-1 basis-10/12'>

                    <input
                        type="checkbox"
                        checked={filterMode === 'OR'}
                        onChange={onFilterModeChange}
                    />

                    <label className='text-sm'>

                        {' '}OR mode (At least one filter must match)

                    </label>

                </div>

            </div>
            {/* SearchMode Selection */}

            {/* Hero Selection */}
            <div className="rounded flex items-center bg-gray-200 p-2">

                <h4 className="font-semibold basis-2/12">Heroes</h4>

                <div className="flex items-center space-x-2 basis-10/12">
                    {
                        heroes.map((hero) => (
                            <div key={hero.id} className="flex space-x-1">
                                <input
                                    type="checkbox"
                                    name="heroIds"
                                    value={hero.id}
                                    checked={filters.heroIds.includes((hero.id).toString())}
                                    onChange={onFilterChange}
                                />
                                <label className='text-sm'>{hero.hero_name}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Hero Selection */}

            {/* Tier Selection */}
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
                                    <div key={tier.id} className="flex space-x-1">

                                        <input
                                            type="checkbox"
                                            name="minTierNames"
                                            value={tier.tier_label}
                                            checked={filters.minTierNames.includes(tier.tier_label)}
                                            onChange={onFilterChange}
                                        />

                                        <label className='text-sm'>
                                            {String(tier.tier_label).charAt(0).toUpperCase() + String(tier.tier_label).slice(1)}
                                        </label>

                                    </div>
                                );
                            }
                        })
                    }
                </div>
            </div>
            {/* Tier Selection */}

            {/* Size Selection */}
            <div className="rounded flex items-center bg-gray-200 p-2">

                <h4 className="font-semibold basis-2/12">Sizes</h4>

                <div className="flex items-center space-x-2 basis-10/12">
                    {
                        ['small', 'medium', 'large'].map((size) => (
                            <div key={size} className="flex space-x-1">

                                <input
                                    type="checkbox"
                                    name="minTierSizes"
                                    value={size}
                                    checked={filters.minTierSizes.includes(size)}
                                    onChange={onFilterChange}
                                />

                                <label className='text-sm'>{size.charAt(0).toUpperCase() + size.slice(1)}</label>

                            </div>
                        ))
                    }
                </div>

            </div>
            {/* Size Selection */}

            {/* Tag Selection */}
            <div className="rounded flex bg-gray-200 p-2">

                <h4 className="font-semibold srink basis-2/12">Tags</h4>

                <div className="flex flex-col space-y-2 basis-10/12">
                    {
                        Object.entries(groupedTags).map(([type, tags]) => (
                            <div key={type} className="flex space-x-2 rounded bg-gray-300 px-2">

                                <h5 className="italic basis-2/12">{String(type).charAt(0).toUpperCase() + String(type).slice(1) + ':'}</h5>

                                <div className="flex items-center flex-wrap gap-2 basis-10/12">
                                    {
                                        tags.map((tag) => (
                                            <div key={tag.id} className="flex items-center">

                                                <input
                                                    type="checkbox"
                                                    name="tagTypes"
                                                    value={tag.tag_type + ':' + tag.tag_name}
                                                    checked={filters.tagTypes.includes(tag.tag_type + ':' + tag.tag_name)}
                                                    onChange={onFilterChange}
                                                    className="mr-2"
                                                />

                                                <label className='text-sm'>{tag.tag_name}</label>

                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Tag Selection */}

        </div>
    );
}