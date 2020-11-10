import React, { useEffect, useState } from "react";
import { storageRef, otherConfig } from '../../firebase_api';

const getAllItems = async (foldername) => {
    const downloadURLs = [];
    const adminUserId = otherConfig.adminUID;

    const listRef = storageRef.child(`${adminUserId}/${foldername}`);

    try {
        //Find all the prefixes and items.
        const res = await listRef.listAll();

        for (const itemRef of res.items) {
            let imageDownloadURL = null, imageMetadata = null;
            try {
                imageDownloadURL = await itemRef.getDownloadURL();
                imageMetadata = await itemRef.getMetadata();

                downloadURLs.push(imageDownloadURL);
            } catch {
                //error in getting download url or metadata
                if (imageDownloadURL == null) {
                    console.log('Image download url fetch error');
                }

                if (imageMetadata == null) {
                    console.log('Image metadata fetch error');
                }
            }
        }
    } catch {
        console.log(`Error fetching files from folder ${foldername}`);
    }

    return downloadURLs;
}

export default function OtherItems() {
    let [imgdownloadURLs, setImgdownloadURLs] = useState([]);

    useEffect(() => {
        async function getFolders() {
            setImgdownloadURLs(await getAllItems('leggings'));
        }

        getFolders();
    }, []);

    return (
        <article>
            <h2>Other Items</h2>
            <ul>

                {imgdownloadURLs.map((downloadurl, index) =>
                    (<li key={index}><img src={downloadurl} alt="other items" width="500" height="500" /></li>)
                )}
            </ul>
        </article>
    );
}