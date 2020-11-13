import React from 'react';

export default function MostLiked() {
    const image1 = 'https://images-na.ssl-images-amazon.com/images/I/61vr-HB9cvL._UL1500_.jpg';
    const image2 = 'https://i.pinimg.com/originals/82/f1/f4/82f1f4df775718ad18a288517d968a3f.jpg';
    /* Show first 10 or 6 images in a section and add view all button */
    return (
        <div>
            <ul className="most-liked-items">
                <li><img src={image1} alt="most liked" width="200" height="auto" /></li>
                <li><img src={image2} alt="most liked" width="200" height="auto" /></li>
                <li><img src={image1} alt="most liked" width="200" height="auto" /></li>
                <li><img src={image2} alt="most liked" width="200" height="auto" /></li>
                <li><img src={image1} alt="most liked" width="200" height="auto" /></li>
                <li><img src={image2} alt="most liked" width="200" height="auto" /></li>
                <li><img src={image1} alt="most liked" width="200" height="auto" /></li>
                <li><img src={image2} alt="most liked" width="200" height="auto" /></li>
            </ul>
        </div>
    );
}