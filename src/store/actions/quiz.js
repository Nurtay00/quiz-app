import axios from 'axios';
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  RETRY_HANDLER,
} from './actionTypes';
export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const responce = await axios.get(
        'https://sdfs-d9937.firebaseio.com/quizes.json'
      );
      const quizes = [];
      Object.keys(responce.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test ${index + 1}`,
        });
      });
      dispatch(fetchQuizesSuccess(quizes));
      console.log(responce);
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}
export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}
export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  };
}
export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e,
  };
}
export function fetchQuizById(quizId) {
  console.log('quizId', quizId);
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(
        `https://sdfs-d9937.firebaseio.com/quizes/${quizId}.json`
      );
      const quiz = response.data;
      console.log('quiz', response.data);
      dispatch(fetchQuizSuccess(quiz));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}
export function fetchQuizSuccess(quiz) {
  console.log('asybc', quiz);
  return {
    quiz: quiz,
    type: FETCH_QUIZ_SUCCESS,
  };
}
export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
}
export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  };
}
export function quizNextQuestion(num) {
  return {
    type: QUIZ_NEXT_QUESTION,
    num,
  };
}
export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }
      dispatch(quizSetState({ [answerId]: 'success' }, results));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      dispatch(quizSetState({ [answerId]: 'error' }, results));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(isQuizFinished(state));
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 1000);
    }
  };
}
function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}
export function retryHandler() {
  return {
    type: RETRY_HANDLER,
  };
}
