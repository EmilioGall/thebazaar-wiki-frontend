import React, { useEffect, useState } from 'react';

export default function ItemCard({ item }) {

   // console.log('item', item);

   const tierColors = {
      bronze: 0,
      silver: 1,
      gold: 2,
      diamond: 3,
      legendary: 4,
   };

   function getItemImagePlaceholder() {

      let itemImagePlaceholder = '';

      const itemSize = item.min_tier.tier_size;

      switch (itemSize) {

         case 'small':

            itemImagePlaceholder = 'small-item-placeholder_400x800.webp';

            break;

         case 'medium':

            itemImagePlaceholder = 'medium-item-placeholder_800x800.webp';

            break;

         case 'large':

            itemImagePlaceholder = 'large-item-placeholder_1200x800.webp';

            break;

         default:

            break;
      };

      return itemImagePlaceholder;

   };

   const imageUrl = item.item_img ? item.item_img : getItemImagePlaceholder();

   function replacePlaceholders(description, primaryValues, secondaryValues) {

      if (primaryValues.length > 0) {

         description = description.replace('{ n1 }', `( ${primaryValues.join(' > ')} )`);

         description = description.replace('{ Tier1 }', `( ${primaryValues.join(' > ')} )`);

      }

      if (secondaryValues.length > 0) {

         description = description.replace('{ n2 }', `( ${secondaryValues.join(' > ')} )`);

         description = description.replace('{ Tier2 }', `( ${primaryValues.join(' > ')} )`);

      }

      return description;

   };

   function coloredEffectString(effectString, minTier) {

      const openParenIndex = effectString.indexOf('(');
      const closeParenIndex = effectString.indexOf(')');

      if (openParenIndex === -1 || closeParenIndex === -1) {

         return <p className="text-gray-700 text-base py-1 px-2">{effectString}</p>;

      };

      const beforeParentheses = effectString.slice(0, openParenIndex + 2);
      const insideParentheses = effectString.slice(openParenIndex + 1, closeParenIndex).split('>');
      const afterParentheses = effectString.slice(closeParenIndex - 2 + 1);

      const colors = ['text-red-800', 'text-blue-300', 'text-yellow-500', 'text-sky-500', 'text-pink-900'];
      const startIndex = tierColors[minTier] || 0;

      return (

         <p className="text-gray-700 text-base py-1 px-2">

            {beforeParentheses}
            {
               insideParentheses.map((value, index) => (

                  <span key={`${item.id}-${minTier}-${index}`}>

                     <span className={`font-bold ${colors[(startIndex + index) % colors.length]}`}>

                        {value.trim()}

                     </span>

                     {index < insideParentheses.length - 1 && <span className="text-black"> {' > '} </span>}

                  </span>

               ))
            }
            {afterParentheses}

         </p>
      );
   };

   return (
      <div key={item.id} className="w-full border rounded shadow-md bg-white">

         <div className='flex justify-between gap-4'>

            <div>

               <div className="px-4 py-2">

                  <div className='flex space-x-2 mb-2'>

                     <h2 className="font-bold text-xl">{item.item_name}</h2>

                     <span className="text-gray-700 text-base border rounded-lg px-2">

                        {String(item.min_tier.tier_label).charAt(0).toUpperCase() + String(item.min_tier.tier_label).slice(1)}

                     </span>

                     <span className="text-gray-700 text-base border rounded-lg px-2">

                        {item.hero.hero_name}

                     </span>

                  </div>

                  {
                     item.tags ?
                        <div className='flex gap-2 py-2'>
                           {
                              item.tags.map((tag) => {

                                 return (

                                    <p key={`${item.id}-${tag.tag_type}-${tag.tag_name}`} className="text-gray-700 text-base border rounded-lg px-2">

                                       {tag.tag_name}

                                    </p>

                                 );

                              })
                           }
                        </div>
                        : null
                  }

                  {
                     item.item_tiers ?
                        item.item_tiers[0].effects.map((effect, index) => {

                           const primaryValues = item.item_tiers.map(tier => tier.effects[index].pivot.primary_value).filter(value => value !== null);
                           const secondaryValues = item.item_tiers.map(tier => tier.effects[index].pivot.secondary_value).filter(value => value !== null);


                           return (

                              <div key={`${item.id}-effect-${index}`}>
                                 {
                                    coloredEffectString(replacePlaceholders(effect.effect_description, primaryValues, secondaryValues), item.min_tier.tier_label)
                                 }
                              </div>

                           );

                        })
                        : null
                  }

               </div>

               <div className="flex gap-4 px-4 py-2">

                  {
                     item.item_cooldown ?

                        <div>

                           <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 me-2">

                              {item.item_cooldown}.0 s

                           </span>

                           Cooldown
                        </div>
                        : null
                  }

                  {
                     item.item_max_ammo ?

                        <div>

                           <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 me-2">

                              {item.item_max_ammo}

                           </span>

                           Ammo
                        </div>
                        : null
                  }

                  {
                     item.item_multicast ?

                        <div>

                           <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 me-2">

                              {item.item_multicast}x

                           </span>

                           Multicast
                        </div>
                        : null
                  }

               </div>

            </div>

            <div className="px-4 py-2">

               <img className="h-28 text-center" src={imageUrl} alt={item.item_name} />

            </div>

         </div>

         <div className="grid grid-cols-5 gap-2 px-4 py-2">

            {
               item.enchantments ?

                  item.enchantments.map((enchantment, index) => (

                     <div key={`${enchantment.id}-${index}`} className="inline-block bg-gray-200 rounded-lg px-2 py-1 text-gray-700">

                        <h4 className='text-sm font-bold'>{enchantment.enchantment_name}</h4>

                        <p className='text-xs '>{enchantment.enchantment_description}</p>

                     </div>
                  ))

                  : null
            }

         </div>

      </div>

   );

}