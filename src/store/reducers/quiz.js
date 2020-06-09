import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  RETRY_HANDLER,
} from '../actions/actionTypes';

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
};
export default function quizReducer(state = initialState, action) {
  console.log('action', action.quiz);
  switch (action.type) {
    default:
      return state;
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.quizes,
      };
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        quizes: action.quizes,
        error: action.error,
      };
    case FETCH_QUIZ_SUCCESS:
      return { ...state, loading: false, quiz: action.quiz };
    case QUIZ_SET_STATE:
      return {
        ...state,
        results: action.results,
        answerState: action.answerState,
      };
    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true,
      };
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        activeQuestion: action.num,
        answerState: null,
      };
    case RETRY_HANDLER:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {},
      };
  }
}
