import React, { useEffect, useState } from 'react';

export default function SkillCard({ skill }) {

   console.log('skill', skill);

   const tierColors = {
      bronze: 0,
      silver: 1,
      gold: 2,
      diamond: 3,
      legendary: 4,
   };

   const imageUrl = skill.skill_img ? skill.skill_img : 'rounded_skill_placeholder_800x800.webp';

   function replacePlaceholders(description, primaryValues, secondaryValues) {

      if (primaryValues.length > 0) {

         description = description.replace('{ n1 }', `( ${primaryValues.join(' > ')} )`);

      }

      if (secondaryValues.length > 0) {

         description = description.replace('{ n2 }', `( ${secondaryValues.join(' > ')} )`);

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

                  <span key={`${skill.id}-${minTier}-${index}`}>

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
      <div className="w-full border rounded overflow-hidden shadow-md bg-white">

         <div className='flex justify-between gap-4'>

            <div>

               <div key={skill.id} className="px-4 py-2">

                  <div className="font-bold text-xl mb-2">{skill.skill_name}</div>

                  {
                     skill.tags ?
                        <div className='flex gap-2 py-2'>
                           {
                              skill.tags.map((tag, index) => {

                                 return (

                                    <p key={`${skill.id}-${tag.tag_type}-${tag.tag_name}`} className="text-gray-700 text-base border rounded-lg px-2">

                                       {tag.tag_name}

                                    </p>

                                 );

                              })
                           }
                        </div>
                        : null
                  }

                  {
                     skill.skill_tiers ?
                        skill.skill_tiers[0].effects.map((effect, index) => {

                           const primaryValues = skill.skill_tiers.map(tier => tier.effects[index].pivot.primary_value).filter(value => value !== null);
                           const secondaryValues = skill.skill_tiers.map(tier => tier.effects[index].pivot.secondary_value).filter(value => value !== null);

                           return (

                              <div key={`${skill.id}-effect-${index}`}>
                                 {
                                    coloredEffectString(replacePlaceholders(effect.effect_description, primaryValues, secondaryValues), skill.min_tier.tier_label)
                                 }
                              </div>

                           );

                        })
                        : null
                  }

               </div>

            </div>

            <div className="px-4 py-2">

               <img className="h-28 text-center" src={imageUrl} alt={skill.skill_name} />

            </div>

         </div>

      </div>

   );

}