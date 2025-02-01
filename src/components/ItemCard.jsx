import React, { useEffect, useState } from 'react';

export default function ItemCard({ item, effects }) {

   // console.log('item', item);

   const [itemEffects, setItemEffects] = useState([]);


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

   const imageUrl = item.img ? item.img : getItemImagePlaceholder();

   function getItemEffects() {

      let itemEffects = [];

      effects.forEach(effect => {

         if (effect.item_id === item.id) {

            itemEffects.push(effect);

         };

      });

      setItemEffects(itemEffects);

   };

   console.log('itemEffects', itemEffects);

   return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">

         <div className="flex justify-center">

            <img className="h-28 text-center" src={imageUrl} alt={item.item_name} />

         </div>

         <div className="px-6 py-4">

            <div className="font-bold text-xl mb-2">{item.item_name}</div>


            {
               itemEffects ?

                  itemEffects.map((item) => (
                     <p className="text-gray-700 text-base">
                        blabla
                     </p>
                  ))

                  : null
            }


         </div>

         <div className="px-6 pt-4 pb-2">


            {
               item.item_cooldown ?

                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                     {item.item_cooldown}.00 s
                  </span>
                  : null
            }


         </div>

      </div>

   );

}