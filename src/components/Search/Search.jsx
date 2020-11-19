// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';

// const getSearchedItems = async () => {
//     /*
//         products is an array of objects each containing url and tags and other details for an image
//         All urls are for images in firebase storage
//     */
//     const products = [];

//     try {
//         // const querySnapshot = await db.collection("products").doc('most-popular').collection('items').limit(10).get();

//         // querySnapshot.forEach(function (doc) {
//         //     // doc.data() is never undefined for query doc snapshots
//         //     // console.log(doc.id, " => ", doc.data());
//         //     const imageData = doc.data();

//         //     products.push({
//         //         url: imageData.url,
//         //         tags: imageData.tags
//         //     });
//         // });

//     } catch (error) {
//         console.log("Error getting products : ", error);
//     }

//     return products;
// }

// export default function Search() {
//     const { searchParam } = useParams();

//     let [products, setProducts] = useState([]);
//     let [loading, setLoading] = useState(true);

//     useEffect(() => {
//         setLoading(true);

//         async function getProducts() {
//             const products = await getSearchedItems();
//             setProducts([...products]);
//         }

//         getProducts().then(() => {
//             setLoading(false);
//         });

//     }, []);

//     return (
//         <article>
//             {searchParam}
//         </article>
//     )
// }
