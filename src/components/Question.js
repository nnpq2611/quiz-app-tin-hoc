import React from "react";
import PropTypes from "prop-types";

const Question = (props) => {
  return (
    <div className="question">
      <h2>{props.title}</h2>
      {props.answers.map((answer, index) => (
        <div className="answer" key={index} onClick={() => props.handleAnswerClick(props.id, answer)}>
          <input type="radio" name={props.id} id={`${props.id}_${index}`}/>
          <label htmlFor={`${props.id}_${index}`}>{answer}</label>
        </div>
      ))}
    </div>
  );
};

Question.propTypes = {
  id: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
};

Question.defaultProps = {
  id: 0,
  question: "Question",
  answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  handleAnswerClick: () => {}
};

export default Question;
