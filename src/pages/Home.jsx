import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../features/exampleSlice';
import axios from '../api/axios';

function Home() {

   const [data, setData] = useState([]);

   const count = useSelector(state => state.example.value);
   const dispatch = useDispatch();

   useEffect(() => {

      axios.get('/posts')
         .then(response => setData(response.data))
         .catch(error => console.error(error));
         
   }, []);

   return (

      <div className="container mx-auto">

         <h1 className="text-2xl font-bold">Home Page</h1>

         <div>

            <p>Count: {count}</p>

            <button onClick={() => dispatch(increment())}>Increment</button>

            <button onClick={() => dispatch(decrement())}>Decrement</button>

         </div>

         <ul>

            {
               data.map(post => (

                  <li key={post.id}>- {post.title}</li>

               ))
            }

         </ul>

      </div>

   );

}

export default Home;