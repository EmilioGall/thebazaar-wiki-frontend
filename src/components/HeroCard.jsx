import React, { useEffect, useState } from 'react';

export default function HeroCard({ hero }) {

   // console.log('hero', hero);

   const imageUrl = hero.hero_img ? hero.hero_img : 'rounded_hero_placeholder_800x800.webp';

   return (
      <div className="w-full border rounded overflow-hidden shadow-md bg-white">

         <div className='flex justify-between gap-4'>

            {/* Infos Blocks */}
            <div key={hero.id} className="px-4 py-2">

               {/* Name, MinTier and Hero Block */}
               <div className='flex space-x-2'>

                  <h2 className="font-bold text-xl">{hero.hero_name}</h2>

               </div>
               {/* Name, MinTier and Hero Block */}

            </div>
            {/* Infos Blocks */}

            {/* Image Block */}
            <div className="px-4 py-2">

               <img className="h-28 text-center rounded-full" src={imageUrl} alt={hero.hero_name} />

            </div>
            {/* Image Block */}

         </div>

      </div>

   );

}