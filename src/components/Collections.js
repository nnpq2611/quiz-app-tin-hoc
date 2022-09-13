import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

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
    navigate("/test", { state: { id: id, title: title } });
  };

  const deleteCollection = async (id) => {
    await axios
      .delete(`http://localhost:8000/collections/${id}`)
      .then((res) => {
        setCollections(
          collections.filter((collection) => collection.id !== id)
        );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    setCollections(collections.filter((collection) => collection.id !== id));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this collection?") === true) {
      deleteCollection(id);
    }
  }

  return loading ? (
    <p>Loading ...</p>
  ) : (
    <div className="collections">
      {collections.map((collection) => (
        <div
          className="collection"
          key={collection.id}
        >
          <h2>{collection.title}</h2>
          <Button variant="primary" onClick={() => handleCollectionClick(collection.id, collection.title)}>Làm bài</Button>
          <Button variant="danger" onClick={() => handleDelete(collection.id)}>
            Xóa bài
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Collections;
