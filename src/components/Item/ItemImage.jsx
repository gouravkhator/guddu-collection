import React from 'react';
import { Link } from 'react-router-dom';
import './item-image.css';

export default function ItemImage({ imgSrc, tags }) {

    const tagsArr = tags.split(',');
    const { webp_url, jpeg_url } = imgSrc;

    return (
        <div className="item-card">
            <picture>
                <source width="200" height="250" type="image/webp" srcSet={webp_url} />
                <source width="200" height="250" type="image/jpeg" srcSet={jpeg_url} />
                <img loading="lazy" src={jpeg_url} alt={tags} width="200" height="250" />
            </picture>

            {/* <img loading="lazy" src={imgSrc} alt={tags}
                width="200" height="250" /> */}

            <ul className="item-tags-list">
                {tags && tagsArr.map(tag => (
                    <li key={tag}>
                        <Link to={'/search/' + tag} className="tag">
                            {tag}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

    )
}
