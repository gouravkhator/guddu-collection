import React, { lazy, Suspense, useEffect, useState } from 'react';
import { db } from '../../firebase_api';

const ItemImage = lazy(() => import('../Item/ItemImage'));

const renderLoader = () => (
    <p className="spinner-grow text-muted"></p>
);

const getMostPopularItems = async () => {
    /*
        products is an array of objects each containing url and tags and other details for an image
        All urls are for images in firebase storage
    */
    const products = [];

    try {
        const querySnapshot = await db.collection("products").doc('most-popular').collection('items').limit(10).get();

        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const imageData = doc.data();

            products.push({
                url: imageData.url,
                tags: imageData.tags
            });
        });

    } catch (error) {
        console.log("Error fetching products : ", error);
    }

    return products;
}

export default function MostPopular() {
    let [products, setProducts] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        async function getProducts() {
            const products = await getMostPopularItems();
            setProducts([...products]);
        }

        getProducts().then(() => {
            setLoading(false);
        });

    }, []);

    /* Show first 10 images in a section and add view all button */
    return (
        <div>
            {loading ? renderLoader() : (
                <ul className="most-popular-items">
                    {products.map(({ url, tags }, index) => (
                        <li key={index}>
                            <Suspense fallback={renderLoader()}>
                                <ItemImage imgSrc={url} tags={tags} />
                            </Suspense>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}