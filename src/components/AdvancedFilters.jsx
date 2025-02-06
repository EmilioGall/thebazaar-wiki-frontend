import React from 'react';

function AdvancedFilters({ filters, onFilterChange, tiers, tags, heroes }) {
    const groupedTags = tags.reduce((acc, tag) => {
        (acc[tag.tag_type] = acc[tag.tag_type] || []).push(tag);
        return acc;
    }, {});

    return (
        <div className="mt-5 p-5 border border-gray-300 rounded">
            <h2 className="text-xl font-bold mb-3">Advanced Filters</h2>
            <div className="flex flex-col gap-3">
                <div>
                    {Object.keys(groupedTags).map((tagType) => (
                        <div key={tagType}>
                            <label className="block text-gray-700">{tagType}:</label>
                            <div className="flex flex-wrap gap-2">
                                {groupedTags[tagType].map((tag) => (
                                    <label key={tag.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="tagTypes"
                                            value={tag.tag_type}
                                            checked={filters.tagTypes.includes(tag.tag_type)}
                                            onChange={onFilterChange}
                                            className="mr-2"
                                        />
                                        {tag.tag_name}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <label className="block text-gray-700">Min Tier:</label>
                    <select
                        name="minTierId"
                        value={filters.minTierId || ''}
                        onChange={onFilterChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Tier</option>
                        {tiers.map((tier) => (
                            <option key={tier.id} value={tier.id}>
                                {tier.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Min Tier Size:</label>
                    <select
                        name="minTierSize"
                        value={filters.minTierSize || ''}
                        onChange={onFilterChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Size</option>
                        {tiers.map((tier) => (
                            <option key={tier.id} value={tier.tier_size}>
                                {tier.tier_size}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Hero:</label>
                    <select
                        name="heroId"
                        value={filters.heroId || ''}
                        onChange={onFilterChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Hero</option>
                        {heroes.map((hero) => (
                            <option key={hero.id} value={hero.id}>
                                {hero.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default AdvancedFilters;