import React, { lazy, Suspense, useEffect, useState } from "react";
import { db } from '../../firebase_api';

const ItemImage = lazy(() => import('../Item/ItemImage'));

const renderLoader = () => (
    <p className="spinner-grow text-muted"></p>
);

const removeTag = (tags, tagToRemove) => {
    let index = tags.indexOf(tagToRemove);
    if (index !== -1)
        tags.splice(index, 1);
}

const getAllItems = async () => {
    /*
        products is an object having arrays of objects each containing url and tags and other details for an image
        All urls are for images in firebase storage
    */
    const products = {};
    try {
        //adding featured products to see in each categories
        let querySnapshot = await db.collection("products").doc('most-popular').collection('items').get();

        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const imageData = doc.data();

            const prevAddedProds = products[imageData.product_category] ?? [];

            const tags = imageData.tags.split(',');
            removeTag(tags, 'women');
            removeTag(tags, 'men');
            removeTag(tags, 'girls');

            products[imageData.product_category] = [...prevAddedProds, {
                webp_url: imageData.webp_url,
                jpeg_url: imageData.jpeg_url,
                tags: tags.join(',')
            }];
        });

        querySnapshot = await db.collection("products").get();

        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const imageData = doc.data();

            const prevAddedProds = products[imageData.product_category] ?? [];

            //remove folder tag from displaying in categories section
            //remove other tags which we will not show in categories and most popular section
            //but other tags would be there for search section etc.
            const tags = imageData.tags.split(',');
            removeTag(tags, imageData.product_category);
            removeTag(tags, 'women');
            removeTag(tags, 'men');
            removeTag(tags, 'girls');

            products[imageData.product_category] = [...prevAddedProds, {
                webp_url: imageData.webp_url,
                jpeg_url: imageData.jpeg_url,
                tags: tags.join(',')
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
                (Object.keys(products).length === 0 && products.constructor === Object) ? (
                    <div>
                        <h5>
                            Oops! It's empty<br /> <br />
                            You may be offline.. <br />Please connect to internet for exploring
                        </h5>

                        <p></p>
                        <h5>Come to our shop for bagging products</h5>

                        <h3><b>Address</b></h3>
                        <h5 id="address">
                            <b>89/173, Bangur Park, Near Mother Dairy</b><br />
                            <b>Rishra, Hooghly</b>
                        </h5>
                        <br />
                        <h5>
                            <b>Paul Complex, Mio Amore Market</b><br />
                            <b>Rishra, Hooghly</b>
                        </h5>
                    </div>
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
