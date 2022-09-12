import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Question from "./Question";
import Button from "react-bootstrap/Button";

const TestPage = () => {
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getQuestions = async () => {
      await axios
        .get(
          `http://localhost:8000/questions/?collections_id=${location.state.id}`
        )
        .then((res) => {
          setQuestions(res.data);
          setAnswers(
            res.data.map((question) => {
              return {
                id: question.id,
                answer: "",
              };
            })
          );
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getQuestions();
  }, [location.state.id]);

  const handleAnswerClick = (id, answer) => {
    let newAnswer = answers.find((answer) => answer.id === id);
    newAnswer.answer = answer;
    setAnswers([...answers]);
  };

  const handleSubmit = async () => {
    const data = {
      answers: answers,
      collections_id: location.state.id,
    };
    console.log(data);
    await axios
      .post("http://localhost:8000/results/", data)
      .then((res) => {
        console.log(res.data);
        navigate("/results", { state: { results: res.data } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel?") === true) {
      navigate("/");
    }
  };

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
          handleAnswerClick={handleAnswerClick}
        />
      ))}
      <Button variant="danger" onClick={handleCancel}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default TestPage;
