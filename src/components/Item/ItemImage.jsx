import React from 'react';
import { Link } from 'react-router-dom';
import './item-image.css';

export default function ItemImage({ imgSrc, tags }) {

    const tagsArr = tags.split(',');

    return (
        <div className="item-card">
            <img loading="lazy" src={imgSrc} alt={tags}
                width="200" height="250" />

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
