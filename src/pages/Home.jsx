import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

function Home() {

   const [data, setData] = useState([]);

   useEffect(() => {

      axios.get('/posts')
         .then(response => setData(response.data))
         .catch(error => console.error(error));
   }, []);

   return (

      <div className="container mx-auto">

         <h1 className="text-2xl font-bold">Home Page</h1>

         <ul>

            {
               data.map(post => (

                  <li key={post.id}>{post.title}</li>

               ))
            }

         </ul>

      </div>

   );
   
}

export default Home;