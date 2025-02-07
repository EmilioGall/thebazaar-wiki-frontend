import React from 'react';

export default function AdvancedFilters({ filters, onFilterChange, tiers, tags, heroes, filterMode, onFilterModeChange }) {

    // const groupedTags = tags.reduce((acc, tag) => {

    //     (acc[tag.tag_type] = acc[tag.tag_type] || []).push(tag);

    //     return acc;

    // }, {});

    const printedTierLabels = [];

    console.log('filters', filters);
    // console.log('onFilterChange', onFilterChange);
    console.log('tiers', tiers);
    // console.log('tags', tags);
    // console.log('heroes', heroes);


    return (
        <div className="p-4 bg-gray-100 rounded">

            <h3 className="text-lg font-bold mb-2">Advanced Filters</h3>

            {/* SearchMode Selection */}
            <div className="mb-4">

                <h4 className="font-semibold mb-2">Search Mode</h4>

                <label>

                    <input
                        type="checkbox"
                        checked={filterMode === 'OR'}
                        onChange={onFilterModeChange}
                    />

                    {' '}OR mode (At least one filter must match)

                </label>

            </div>
            {/* SearchMode Selection */}

            {/* Hero Selection */}
            <div className="mb-4">
                <h4 className="font-semibold mb-2">Heroes</h4>

                <div className="flex items-center gap-4">
                    {
                        heroes.map((hero) => (
                            <div key={hero.id} className="flex items-center mb-1">
                                <input
                                    type="checkbox"
                                    name="heroIds"
                                    value={hero.id}
                                    checked={filters.heroIds.includes((hero.id).toString())}
                                    onChange={onFilterChange}
                                    className="mr-2"
                                />
                                <label>{hero.hero_name}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Hero Selection */}

            {/* Tier Selection */}
            <div className="mb-4">
                <h4 className="font-semibold mb-2">Tiers</h4>
                <div className="flex items-center gap-4">
                    {
                        tiers.map((tier) => {
                            
                            // Controllo se il nome del tier è già presente nell'array
                            if (printedTierLabels.includes(tier.tier_label)) {
                                // Se il nome del tier è già presente, salto la stampa della checkbox
                                return null;
                            } else {
                                // Se il nome del tier non è presente, aggiungo il nome all'array e stampo la checkbox
                                printedTierLabels.push(tier.tier_label);
                                return (
                                    <div key={tier.id} className="flex items-center mb-1">
                                        <input
                                            type="checkbox"
                                            name="minTierNames"
                                            value={tier.tier_label}
                                            checked={filters.minTierNames.includes(tier.tier_label)}
                                            onChange={onFilterChange}
                                            className="mr-2"
                                        />
                                        <label>{String(tier.tier_label).charAt(0).toUpperCase() + String(tier.tier_label).slice(1)}</label>
                                    </div>
                                );
                            }
                        })
                    }
                </div>
            </div>
            {/* Tier Selection */}

            {/* Size Selection */}
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
            {/* Size Selection */}

            {/* Tag Selection */}
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
            {/* Tag Selection */}

        </div>
    );
}