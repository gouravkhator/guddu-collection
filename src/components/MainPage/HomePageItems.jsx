import React, { lazy, Suspense, useEffect, useState } from "react";
import { db } from '../../firebase_api';

const ItemImage = lazy(() => import('../Item/ItemImage'));

const renderLoader = () => (
    <p className="spinner-grow text-muted"></p>
);

const getAllItems = async () => {
    /*
        products is an object having arrays of objects each containing url and tags and other details for an image
        All urls are for images in firebase storage
    */
    const products = {};
    try {
        const querySnapshot = await db.collection("products").get();

        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const imageData = doc.data();

            const prevAddedProds = products[imageData.product_category] ?? [];
            products[imageData.product_category] = [...prevAddedProds, {
                webp_url: imageData.webp_url,
                jpeg_url: imageData.jpeg_url,
                tags: imageData.tags
            }];
        });

    } catch (error) {
        console.log("Error getting products : ", error);
    }

    return products;
}

export default function HomePageItems() {
    let [products, setProducts] = useState({});
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        async function getProducts() {
            const products = await getAllItems();
            setProducts({ ...products });
        }

        getProducts().then(() => {
            setLoading(false);
        });

    }, []);

    return (
        <div className="mt-4">
            {loading ? renderLoader() :
                (products.length === 0) ? (
                    <h4>
                        Oops! It's empty
                    </h4>
                ) :
                    Object.keys(products).map((product) => (
                        <div>
                            <h3><b>{product.charAt(0).toUpperCase() + product.slice(1)}</b></h3>

                            <ul className="homepage-items">
                                {products[product].map(({ webp_url, jpeg_url, tags }, index) => (
                                    <li key={index}>
                                        <Suspense fallback={renderLoader()}>
                                            <ItemImage imgSrc={{ webp_url, jpeg_url }} tags={tags} />
                                        </Suspense>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
        </div>
    );
}
