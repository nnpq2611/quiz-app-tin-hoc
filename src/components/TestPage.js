import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Question from "./Question";

const TestPage = () => {
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuestions = async () => {
      await axios
        .get(
          `http://localhost:8000/questions/?collections_id=${location.state.id}`
        )
        .then((res) => {
          setQuestions(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getQuestions();
  }, [location.state.id]);

  return loading ? (
    <p>Loading ...</p>
  ) : (
    <div className="test">
      <h1>{location.state.title}</h1>
      {questions.map((question) => (
        <Question
          id={question.id}
          key={question.id}
          title={question.title}
          answers={question.answers}
        />
      ))}
    </div>
  );
};

export default TestPage;
