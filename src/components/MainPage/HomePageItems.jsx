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
                } else if (imageMetadata == null) {
                    console.log('Image metadata fetch error');
                }
            }
        }
    } catch {
        console.log(`Error fetching files from database folder ${foldername}`);
    }

    return downloadURLs;
}

export default function HomePageItems() {
    let [folders, setFolders] = useState({});

    useEffect(() => {
        async function getFolders() {

            //TODO : get all folders and then call getAllItems
            const downloadURLs = await getAllItems('leggings');
            setFolders({ 'leggings': downloadURLs });
        }

        getFolders();
    }, []);

    return (
        <>
            {Object.keys(folders).map(folder => (
                <div>
                    <h2>{folder}</h2>

                    <ul>
                        {folders[folder].map((downloadurl, index) => (
                            <li key={index}>
                                <img src={downloadurl} alt="Other Items Images that you might not have viewed or liked" width="500" height="500" />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
}