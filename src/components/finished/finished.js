import React from 'react';
import classes from './finished.css';
import Button from './../UI/Button/Button';
import { NavLink } from 'react-router-dom';
export default (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++;
    }

    return total;
  }, 0);
  return (
    <div className={classes.finished}>
      <ul>
        {props.quiz.map((item, index) => {
          return (
            <li key={index}>
              <strong>{index + 1} </strong>
              {item.question}
              {props.results[item.id] !== 'error' ? (
                <span className={classes.succses}>
                  <i className={'fas fa-check'} />
                </span>
              ) : (
                <span className={classes.fail}>
                  <i className={'fas fa-times'} />
                </span>
              )}
            </li>
          );
        })}
      </ul>
      <div style={{ marginBottom: '10px' }}>
        Правильно {successCount} из {props.quiz.length}
      </div>
      <Button onClick={props.onRetry} type={'primary'}>
        повторить
      </Button>

      <Button type={'succses'}>
        <NavLink to="/">Список тестов</NavLink>
      </Button>
    </div>
  );
};
