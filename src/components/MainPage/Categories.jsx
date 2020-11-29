import React, { Suspense, useEffect, useState } from "react";
import { db } from '../../firebase_api';

const renderLoader = () => (
    <p className="spinner-grow text-muted"></p>
);

const handleCategoryClick = (category_name) => {
    //TODO : make the click to search page
}

const fetchCategories = async () => {
    /*
        categories is an array of categories names and their cover images
        All urls are for images in firebase storage
    */
    const categories = [];
    try {
        //categories and their cover images
        let querySnapshot = await db.collection("product_categories").get();

        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const categoryData = doc.data();

            categories.push({
                category_name: doc.id,
                webp_url: categoryData.webp_url,
                jpeg_url: categoryData.jpeg_url
            });
        });
    } catch (error) {
        console.log("Error getting categories : ", error);
    }

    return categories;
}

export default function Categories() {
    let [categories, setCategories] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        async function getCategories() {
            const categories = await fetchCategories();
            setCategories([...categories]);
        }

        getCategories().then(() => {
            setLoading(false);
        });

    }, []);

    return (
        <div className="mt-4">
            {loading ? renderLoader() :
                (categories.length === 0) ? (
                    <div className="p-4">
                        <h4 className="mb-3">
                            <strong>Oops! It's empty</strong>
                        </h4>

                        <h4 className="mt-3 mb-3">
                            <strong>You may be offline.. <br />Please connect to internet for exploring</strong>
                        </h4>

                        <h4>Come to our shop for bagging products</h4>

                        <h3 className="text-left mt-4"><b>Address</b></h3>
                        <h5 id="address" className="text-left mb-3">
                            <b>89/173, Bangur Park, Near Mother Dairy</b><br />
                            <b>Rishra, Hooghly</b>
                        </h5>
                        <h5 className="text-left">
                            <b>Paul Complex, Mio Amore Market</b><br />
                            <b>Rishra, Hooghly</b>
                        </h5>
                    </div>
                ) : (
                        <div>
                            <ul className="categories-list">
                                {categories.map(({ category_name, webp_url, jpeg_url }, index) => (
                                    <li key={index} onClick={() => handleCategoryClick(category_name)}>
                                        <Suspense fallback={renderLoader()}>
                                            <div className="cover_image_wrapper">
                                                {/* 200*200 for cover images */}
                                                <picture>
                                                    <source className="cover_image" width="200" height="200" type="image/webp" srcSet={webp_url} />
                                                    <source className="cover_image" width="200" height="200" type="image/jpeg" srcSet={jpeg_url} />
                                                    <img loading="lazy" src={jpeg_url} alt={category_name}
                                                        width="200" height="200" className="cover_image" />
                                                </picture>
                                            </div>
                                        </Suspense>

                                        <b className="category_name">{category_name.charAt(0).toUpperCase() + category_name.slice(1)}</b>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
        </div>
    );
}
