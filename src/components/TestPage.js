import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Question from "./Question";
// import Button from "react-bootstrap/Button";

const TestPage = () => {
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);

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

  // const handleAnswerChange = (id, answer) => {
  //   setAnswers(
  //     answers.map((answer) => {
  //       if (answer.id === id) {
  //         return {
  //           id: answer,
  //           answer: answer,
  //         };
  //       } else {
  //         return answer;
  //       }
  //     })
  //   );
  //   console.log(answers);
  // };

  return loading ? (
    <p>Loading ...</p>
  ) : (
    <div className="test">
      {console.log(answers, questions)}
      <h1>{location.state.title}</h1>
      {questions.map((question) => (
        <Question
          id={question.id}
          key={question.id}
          title={question.title}
          answers={question.answers}
          // handleAnswerChange={handleAnswerChange(question.id, question.answers)}
        />
      ))}
      {/* <Button variant="primary">Nộp bài</Button> */}
    </div>
  );
};

export default TestPage;
