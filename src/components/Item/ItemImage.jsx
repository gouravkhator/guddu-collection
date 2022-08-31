import React from "react";
import { Link } from "react-router-dom";
import "./item-image.scss";

export default function ItemImage({ imgSrc, tags }) {
  const tagsArr = tags.split(",");
  const { webp_url, jpeg_url } = imgSrc;

  return (
    <div className="item-card">
      {/* 200*250 for item images */}
      <picture className="image-wrapper">
        <source
          className="item-image"
          width="200"
          height="250"
          type="image/webp"
          srcSet={webp_url}
        />

        <source
          className="item-image"
          width="200"
          height="250"
          type="image/jpeg"
          srcSet={jpeg_url}
        />

        <img
          className="item-image"
          loading="lazy"
          src={jpeg_url}
          alt={tags}
          width="200"
          height="250"
        />
      </picture>

      {/* <img loading="lazy" src={imgSrc} alt={tags}
                width="200" height="250" /> */}

      <h4 className="m-2">
        <b>Tags</b>
      </h4>

      <ul className="item-tags-list">
        {tags &&
          tagsArr.map((tag) => (
            <li key={tag}>
              <Link to={"/search/" + tag} className="tag">
                {tag}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
