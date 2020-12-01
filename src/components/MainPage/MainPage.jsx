import React, { lazy, Suspense } from 'react';
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
                <h2>Live the way<br />U Like</h2>

                <section className="banner-actions">
                    <a href="tel:9748044991">Contact Us</a>
                    <a href="/about#address">Visit Us</a>
                </section>
            </article>

            <div className="mainpage">
                <article className="featured-article">
                    <h2 className="article-title">Featured Products</h2>
                    <Suspense fallback={renderLoader()}>
                        <MostPopular />

                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                    </Suspense>
                </article>

                <article className="categories-article">
                    <h2 className="article-title">Categories To Bag</h2>
                    <Suspense fallback={renderLoader()}>
                        <Categories />
                        <div className="circle4"></div>
                    </Suspense>
                </article>
            </div>
        </>
    );
}