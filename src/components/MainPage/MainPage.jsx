import React, { lazy, Suspense } from 'react';
import Container from 'react-bootstrap/Container';
import "./mainpage.css";

const MostPopular = lazy(() => import('./MostPopular'));
const Categories = lazy(() => import('./Categories'));

const renderLoader = () => (
    <div><p className="spinner-grow text-muted"></p></div>
);

export default function MainPage() {
    return (
        <>
            <article className="banner">
                <h2>Live the way U Like</h2>
                <div className="banner-img"></div>
            </article>
            <Container className="mainpage">

                <article className="featured-article">
                    <h2 className="article-title">Featured Products</h2>
                    <Suspense fallback={renderLoader()}>
                        <MostPopular />
                    </Suspense>
                </article>

                <article className="categories-article">
                    <h2 className="article-title">Categories To Bag</h2>
                    <Suspense fallback={renderLoader()}>
                        <Categories />
                    </Suspense>
                </article>
            </Container>
        </>
    );
}