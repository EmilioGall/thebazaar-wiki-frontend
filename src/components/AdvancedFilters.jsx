import React from 'react';

function AdvancedFilters({ filters, onFilterChange, tiers, tags, heroes }) {

    // const groupedTags = tags.reduce((acc, tag) => {

    //     (acc[tag.tag_type] = acc[tag.tag_type] || []).push(tag);

    //     return acc;

    // }, {});

    // console.log('groupedTags', groupedTags);

    return (
        <div className="p-4 bg-gray-100 rounded">
            <h3 className="text-lg font-bold mb-2">Advanced Filters</h3>

            <div className="mb-4">
                <h4 className="font-semibold mb-2">Heroes</h4>

                <div className="flex items-center gap-4">
                    {
                        heroes.map((hero) => (
                            <div key={hero.id} className="flex items-center mb-1">
                                <input
                                    type="checkbox"
                                    name="heroNames"
                                    value={hero.hero_name}
                                    checked={filters.heroNames.includes(hero.hero_name)}
                                    onChange={onFilterChange}
                                    className="mr-2"
                                />
                                <label>{hero.hero_name}</label>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="mb-4">
                <h4 className="font-semibold mb-2">Tiers</h4>
                <div className="flex items-center gap-4">
                    {
                        tiers.map((tier) => (
                            <div key={tier.id} className="flex items-center mb-1">
                                <input
                                    type="checkbox"
                                    name="minTierNames"
                                    value={tier.tier_name}
                                    checked={filters.minTierNames.includes(tier.tier_name)}
                                    onChange={onFilterChange}
                                    className="mr-2"
                                />
                                <label>{tier.tier_name}</label>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="mb-4">
                <h4 className="font-semibold mb-2">Sizes</h4>

                <div className="flex items-center gap-4">
                    {
                        ['small', 'medium', 'large'].map((size) => (
                            <div key={size} className="flex items-center mb-1">
                                <input
                                    type="checkbox"
                                    name="minTierSizes"
                                    value={size}
                                    checked={filters.minTierSizes.includes(size)}
                                    onChange={onFilterChange}
                                    className="mr-2"
                                />
                                <label>{size.charAt(0).toUpperCase() + size.slice(1)}</label>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="mb-4">
                <h4 className="font-semibold mb-2">Tags</h4>
                <div className="flex items-center flex-wrap gap-2">
                    {
                        tags.map((tag) => (
                            <div key={tag.id} className="flex items-center mb-1">
                                <input
                                    type="checkbox"
                                    name="tagTypes"
                                    value={tag.tag_type + ':' + tag.tag_name}
                                    checked={filters.tagTypes.includes(tag.tag_type + ':' + tag.tag_name)}
                                    onChange={onFilterChange}
                                    className="mr-2"
                                />
                                <label>{tag.tag_name}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}