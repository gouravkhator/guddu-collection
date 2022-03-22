import React, { lazy, Suspense, useEffect, useState } from 'react';
import { db } from '../../firebase_api';

const ItemImage = lazy(() => import('../Item/ItemImage'));

const renderLoader = () => (
    <div><p className="spinner-grow text-muted"></p></div>
);

const removeTag = (tags, tagToRemove) => {
    let index = tags.indexOf(tagToRemove);
    if (index !== -1)
        tags.splice(index, 1);
}

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

            let tags = imageData.tags.toLowerCase().split(',');
            tags = tags.map(tag => tag.trim());

            removeTag(tags, 'women');
            removeTag(tags, 'men');
            removeTag(tags, 'girls');
            removeTag(tags, 'lady');

            products.push({
                webp_url: imageData.webp_url,
                jpeg_url: imageData.jpeg_url,
                tags: tags.join(',')
            });
        });

    } catch (error) {
        console.log("Error fetching products");
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
        <div className="mt-4 mb-3">
            {loading ? renderLoader() :
                (products.length === 0) ? (
                    <h4>
                        <strong>Oops! It's empty. <br/>We are developing a way to make some categories work offline</strong>
                    </h4>
                ) : (
                        <ul className="featured-items">
                            {products.map(({ webp_url, jpeg_url, tags }, index) => (
                                <li key={index} className="featured-item-card">
                                    <Suspense fallback={renderLoader()}>
                                        <ItemImage imgSrc={{ webp_url, jpeg_url }} tags={tags} />
                                    </Suspense>
                                </li>
                            ))}
                        </ul>
                    )}
        </div>
    );
}