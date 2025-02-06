import React from 'react';

function AdvancedFilters({ filters, onFilterChange }) {
    return (
        <div className="mt-5 p-5 border border-gray-300 rounded">
            <h2 className="text-xl font-bold mb-3">Advanced Filters</h2>
            <div className="flex flex-col gap-3">
                <div>
                    <label className="block text-gray-700">Tag Types:</label>
                    <div className="flex flex-wrap gap-2">
                        {['action', 'category'].map((tagType) => (
                            <label key={tagType} className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="tagTypes"
                                    value={tagType}
                                    checked={filters.tagTypes.includes(tagType)}
                                    onChange={onFilterChange}
                                    className="mr-2"
                                />
                                {tagType}
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700">Min Tier ID:</label>
                    <input
                        type="number"
                        name="minTierId"
                        value={filters.minTierId || ''}
                        onChange={onFilterChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
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
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Hero ID:</label>
                    <input
                        type="number"
                        name="heroId"
                        value={filters.heroId || ''}
                        onChange={onFilterChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
            </div>
        </div>
    );
}

export default AdvancedFilters;