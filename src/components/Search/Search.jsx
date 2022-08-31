import React, { lazy, Suspense, useRef, useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../../firebase_api";
import Button from "react-bootstrap/Button";
import "./searchPage.scss";

const ItemImage = lazy(() => import("../Item/ItemImage"));

const renderLoader = () => (
  <div className="text-center">
    <p className="spinner-grow text-muted"></p>
  </div>
);

const removeTag = (tags, tagToRemove) => {
  let index = tags.indexOf(tagToRemove);

  if (index !== -1) tags.splice(index, 1);
};

const handleSearchInput = (e, searchInputRef, setMainSearched) => {
  e.preventDefault();

  const searchInput = searchInputRef.current.value;
  if (searchInput && searchInput.trim() !== "") {
    setMainSearched(searchInput.toLowerCase());
  }
};

// created `filterFetch` function, for code reuse
const filterFetch = (querySnapshot, mainSearched, products) => {
  if (mainSearched) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      const imageData = doc.data();

      const currentTagsList = imageData.tags.toLowerCase(); //converting saved tags string to lowercase

      /*
        If I search for men I should not get images with women (those contain men as a substring) as tags,
        so adding an exception
      */
      const tagsContainMen = currentTagsList.includes("women");

      // if tags (other than men) contains men as substring and mainSearched is men
      // then return and don't add this product
      if (tagsContainMen && mainSearched.toLowerCase() === "men") {
        return;
      }

      if (currentTagsList.includes(mainSearched.toLowerCase())) {
        let tags = currentTagsList.split(",");

        tags = tags.map((tag) => tag.trim());
        removeTag(tags, "women");
        removeTag(tags, "men");
        removeTag(tags, "girls");
        removeTag(tags, "lady");
        removeTag(tags, mainSearched);

        products.push({
          webp_url: imageData.webp_url,
          jpeg_url: imageData.jpeg_url,
          tags: tags.join(","),
        });
      }
    });
  }
};

const getSearchedItems = async (mainSearched) => {
  if (mainSearched) {
    /*
    products is an array of objects each containing url and tags and other details for an image
    All urls are for images in firebase storage
    */
    const products = [];

    try {
      let querySnapshot = await db
        .collection("products")
        .doc("most-popular")
        .collection("items")
        .get();

      filterFetch(querySnapshot, mainSearched, products);
      querySnapshot = await db.collection("products").get();

      filterFetch(querySnapshot, mainSearched, products);
    } catch (error) {
      console.log("Error getting products");
    }

    return products;
  }
};

export default function Search() {
  const { searchedParam } = useParams();
  const searchInputRef = useRef();

  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  let [mainSearched, setMainSearched] = useState(searchedParam.toLowerCase());

  // on change in searched param, update main searched
  useEffect(() => {
    setMainSearched(searchedParam.toLowerCase());
  }, [searchedParam]);

  //on change in main searched, fetch products
  useEffect(() => {
    setLoading(true);

    async function getProducts() {
      const products = await getSearchedItems(mainSearched);
      setProducts([...products]);
    }

    getProducts().then(() => {
      setLoading(false);
    });
  }, [mainSearched]);

  return (
    <div className="searched-page">
      <article className="searched-article">
        <h2 className="article-title">
          {mainSearched.charAt(0).toUpperCase() + mainSearched.slice(1)}
        </h2>

        <section className="search-input">
          <form
            onSubmit={(e) =>
              handleSearchInput(e, searchInputRef, setMainSearched)
            }
          >
            <input
              type="text"
              ref={searchInputRef}
              placeholder="Search products"
              maxLength="25"
            />
          </form>
        </section>
        <div className="mt-4">
          {loading ? (
            renderLoader()
          ) : products.length === 0 ? (
            <>
              <h4>
                Oops! No Items found with tag{" "}
                {mainSearched.charAt(0).toUpperCase() + mainSearched.slice(1)}
              </h4>
              <Button variant="dark" className="mt-2 mb-3" href="/">
                Go Back Home
              </Button>
            </>
          ) : (
            <ul className="searched-items">
              {products.map(({ webp_url, jpeg_url, tags }, index) => (
                <li className="searched-item-card" key={index}>
                  <Suspense fallback={renderLoader()}>
                    <ItemImage imgSrc={{ webp_url, jpeg_url }} tags={tags} />
                  </Suspense>
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </div>
  );
}
