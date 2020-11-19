import React, { lazy, Suspense } from 'react';
import Container from 'react-bootstrap/Container';
import "./mainpage.css";

const MostPopular = lazy(() => import('./MostPopular'));
const HomePageItems = lazy(() => import('./HomePageItems'));

const renderLoader = () => (
    <div><p className="spinner-grow text-muted"></p></div>
);

export default function MainPage() {
    return (
        <Container className="mainpage">
            <article className="most-popular-article">
                <h2 className="mb-3">Most Popular Products</h2>
                <Suspense fallback={renderLoader()}>
                    <MostPopular />
                </Suspense>
            </article>

            <article className="homepage-items-article">
                <h2 className="mb-3">Products We Sell</h2>
                <Suspense fallback={renderLoader()}>
                    <HomePageItems />
                </Suspense>
            </article>
        </Container>
    );
}