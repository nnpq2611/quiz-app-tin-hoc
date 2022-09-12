import React from "react";
import { useLocation } from "react-router-dom";

const Results = (props) => {
  const location = useLocation();
  return (
    <div className="results">
      <h1 className="header">Kết quả kiểm tra</h1>
      <h2>
        Tổng điểm: <span className="score">{location.state.results.score}</span>
      </h2>
      <h3>Các câu sai:</h3>
      {location.state.results.wrong_answer.map((answer, index) => (
        <div key={index}>
          <p>
            <b>{answer.question}</b>
          </p>
          <p className="answer">
            <b>Đáp án của bạn:</b>
            <span className="wrong-answer">
              {" "}
              {answer.answer || "Không có câu trả lời"}
            </span>
          </p>
          <p className="answer">
            <b>Đáp án đúng:</b>
            <span className="correct-answer">
              {" " + answer.correct_answer}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Results;
