import React, { useEffect, useState } from 'react';

export default function ItemCard({ item }) {

   console.log('item', item);
   console.log('item.item_tiers[0].effects', item.item_tiers[0].effects);


   function getItemImagePlaceholder() {

      let itemImagePlaceholder = '';

      const itemSize = item.min_tier.tier_size;

      switch (itemSize) {

         case 'small':

            itemImagePlaceholder = 'small-item-placeholder_400x800.webp';

            break;

         case 'medium':

            itemImagePlaceholder = 'medium-item-placeholder_800x800.webp.webp.webp';

            break;

         case 'large':

            itemImagePlaceholder = 'large-item-placeholder_1200x800.webp.webp';

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

      }

      if (secondaryValues.length > 0) {

         description = description.replace('{ n2 }', `( ${secondaryValues.join(' > ')} )`);

      }

      return description;

   };

   return (
      <div className="w-full border rounded overflow-hidden shadow-md bg-white">

         <div className='flex justify-between gap-4'>

            <div>

               <div className="px-4 py-2">

                  <div className="font-bold text-xl mb-2">{item.item_name}</div>

                  {
                     item.item_tiers ?
                        item.item_tiers[0].effects.map((effect, index) => {

                           return (

                              <p key={index} className="text-gray-700 text-base">

                                 {effect.effect_description}

                              </p>

                           );

                        })
                        : null
                  }

               </div>

               <div className="flex gap-4 px-4 py-2">

                  {
                     item.item_cooldown ?

                        <div>

                           <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 me-2">

                              {item.item_cooldown}.00 s

                           </span>

                           Cooldown
                        </div>
                        : null
                  }

                  {
                     item.item_max_ammo ?

                        <div>

                           <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 me-2">

                              {item.item_max_ammo}

                           </span>

                           Ammo
                        </div>
                        : null
                  }

                  {
                     item.item_multicast ?

                        <div>

                           <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 me-2">

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

                  item.enchantments.map((enchantment) => (
                     <div key={enchantment.id} className="inline-block bg-gray-200 rounded-lg px-3 py-1 text-gray-700">

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