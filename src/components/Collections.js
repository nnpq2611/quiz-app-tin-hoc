import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCollections = async () => {
      await axios
        .get("http://localhost:8000/collections/")
        .then((res) => {
          setCollections(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCollections();
  }, []);

  const navigate = useNavigate();
  const handleCollectionClick = (id, title) => {
    navigate("/test", { state: { id: id, title: title} });
  };

  return loading ? (
    <p>Loading ...</p>
  ) : (
    <div className="collections">
      {collections.map((collection) => (
        <div
          className="collection"
          key={collection.id}
          onClick={() => handleCollectionClick(collection.id, collection.title)}
        >
          <h2>{collection.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default Collections;
