import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../../firebase_api';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import "./searchPage.css";

const ItemImage = lazy(() => import('../Item/ItemImage'));

let searchedParamLocal = null;

const renderLoader = () => (
    <div className="text-center"><p className="spinner-grow text-muted"></p></div>
);

//just used for reusing the code part
const filterFetch = (querySnapshot, searchedParamLocal, products) => {
    if (searchedParamLocal) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const imageData = doc.data();

            if (imageData.tags.includes(searchedParamLocal)) {
                products.push({
                    webp_url: imageData.webp_url,
                    jpeg_url: imageData.jpeg_url,
                    tags: imageData.tags
                });
            }
        });
    }
}

const getSearchedItems = async () => {
    if (searchedParamLocal) {
        /*
            products is an array of objects each containing url and tags and other details for an image
            All urls are for images in firebase storage
        */
        const products = [];

        try {
            let querySnapshot = await db.collection("products")
                .doc('most-popular')
                .collection('items')
                .get();

            filterFetch(querySnapshot, searchedParamLocal, products);
            querySnapshot = await db.collection('products').get();

            filterFetch(querySnapshot, searchedParamLocal, products);

        } catch (error) {
            console.log("Error getting products : ", error);
        }

        return products;
    }
}

export default function Search() {
    const { searchedParam } = useParams();

    const lowercaseSearched = searchedParam.toLowerCase();
    // const [tempSearched, setTempSearched] = searchedParam.toLowerCase();
    // const [mainSearched, setMainSearched] = searchedParam.toLowerCase();

    const capitalizedSearchedParam = searchedParam.charAt(0).toUpperCase() + searchedParam.slice(1);

    searchedParamLocal = lowercaseSearched;
    let [products, setProducts] = useState([]);
    let [loading, setLoading] = useState(true);

    // const setSearchedFunc = (e) => {
    //     setTempSearched(e.target.value);
    // }

    // const handleKeyDown = (e) => {
    //     if (e.keyCode === 32 || e.keyCode === 13) {
    //         setMainSearched(temp);
    //     }
    // }

    useEffect(() => {
        setLoading(true);

        async function getProducts() {
            const products = await getSearchedItems();
            setProducts([...products]);
        }

        getProducts().then(() => {
            setLoading(false);
        });

    }, [lowercaseSearched]);

    return (
        <Container className="searched-page">
            <article className="searched-article">
                {/* <input className="search-box" type="text" placeholder="Search any items"
                    ref={searchRef} value={mainSearched}
                    onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setSearchedFunc(e)} />
 */}

                <h2 className="article-title">{capitalizedSearchedParam}</h2>

                <div className="mt-4">
                    {loading ? renderLoader() :
                        (products.length === 0) ? (
                            <>
                                <h4>
                                    Oops! No Items found with tag {capitalizedSearchedParam}
                                </h4>
                                <Button variant="dark" className="mt-2 mb-3" href="/">Go Back Home</Button>
                            </>
                        ) : (
                                <ul className="searched-items">
                                    {products.map(({ webp_url, jpeg_url, tags }, index) => (
                                        <li key={index}>
                                            <Suspense fallback={renderLoader()}>
                                                <ItemImage imgSrc={{ webp_url, jpeg_url }} tags={tags} />
                                            </Suspense>
                                        </li>
                                    ))}
                                </ul>
                            )}
                </div>
            </article>
        </Container >
    )
}
