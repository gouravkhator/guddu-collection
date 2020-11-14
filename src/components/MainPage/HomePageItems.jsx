import React, { useEffect, useState } from "react";
import { storageRef, otherConfig } from '../../firebase_api';

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

                    tempDownloadURLs.push(imageDownloadURL);
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
        <div className="homepage">
            {Object.keys(folders).map(folder => (
                <div>
                    <h2>{folder.charAt(0).toUpperCase() + folder.slice(1)}</h2>

                    <ul>
                        {folders[folder].map((downloadurl, index) => (
                            <li key={index}>
                                <img src={downloadurl} alt="Other Items Images that you might not have viewed or liked"
                                    width="200" height="auto" />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}