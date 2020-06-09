import React from 'react';
import classes from './AnswerList.css';
import AnswerItem from './AnswerItem/AnswerItem';
export default (props) => {
  return (
    <ul className={classes.AnswerList}>
      {props.answers.map((answer, index) => {
        return (
          <AnswerItem
            key={index}
            answer={answer}
            onAnswerClick={props.onAnswerClick}
            statusOfAnswer={
              props.statusOfAnswer ? props.statusOfAnswer[answer.id] : null
            }
          />
        );
      })}
    </ul>
  );
};
