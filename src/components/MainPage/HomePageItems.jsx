import React, { useEffect, useState } from "react";
import { storageRef, otherConfig } from '../../firebase_api';

import ItemImage from '../Item/ItemImage';

const getAllItems = async () => {
    const folders = {};
    let tempDownloadURLs = [];
    const adminUserId = otherConfig.adminUID;

    const listRef = storageRef.child(`${adminUserId}`);

    try {
        //Find all the prefixes and items.
        const res = await listRef.listAll();

        for (const folderRef of res.prefixes) {
            tempDownloadURLs = [];
            const resFolder = await folderRef.listAll();

            for (const itemRef of resFolder.items) {
                let imageDownloadURL = null, imageMetadata = null;
                try {
                    imageDownloadURL = await itemRef.getDownloadURL();
                    imageMetadata = await itemRef.getMetadata();

                    const tags = imageMetadata?.customMetadata?.tags;
                    tempDownloadURLs.push({ imageDownloadURL, tags });
                } catch {
                    //error in getting download url or metadata
                    if (imageDownloadURL == null) {
                        console.log('Image download url fetch error');
                    } else if (imageMetadata == null) {
                        console.log('Image metadata fetch error');
                    }
                }
            }

            folders[folderRef.name] = [...tempDownloadURLs];
        }

    } catch {
        console.log(`Error fetching files from database folders`);
    }

    return folders;
}

export default function HomePageItems() {
    let [folders, setFolders] = useState({});

    useEffect(() => {
        async function getFolders() {
            const folders = await getAllItems();
            setFolders({ ...folders });
        }

        getFolders();
    }, []);

    return (
        <div>
            {Object.keys(folders).map(folder => (
                <div>
                    <h2>{folder.charAt(0).toUpperCase() + folder.slice(1)}</h2>

                    <ul className="homepage-items">
                        {folders[folder].map(({ imageDownloadURL, tags }, index) => (
                            <li key={index}>
                                <ItemImage imgSrc={imageDownloadURL} tags={tags} />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}