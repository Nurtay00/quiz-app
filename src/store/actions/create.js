import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from './actionTypes';
import Axios from 'axios';
export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item,
  };
}
export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION,
  };
}
export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    Axios.post(
      'https://sdfs-d9937.firebaseio.com/quizes.json',
      getState().create.quiz
    );
    dispatch(resetQuizCreation());
  };
}
