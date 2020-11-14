import React, { lazy, Suspense } from 'react';
import { Container } from 'react-bootstrap';
import "./mainpage.css";

const MostLiked = lazy(() => import('./MostLiked'));
const HomePageItems = lazy(() => import('./HomePageItems'));

const renderLoader = () => (
    <p className="loading">Loading...</p>
);

export default function MainPage() {
    return (
        <Container className="mainpage">
            <article className="most-liked-article">
                <h2>Most Liked</h2>
                <Suspense fallback={renderLoader()}>
                    <MostLiked />
                </Suspense>
            </article>

            <article>
                <h2>Products We Sell</h2>
                <Suspense fallback={renderLoader()}>
                    <HomePageItems />
                </Suspense>
            </article>
        </Container>
    );
}