import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { afterAnswer } from 'app/utils';
import { setPage } from 'features/appSlice';
import { stopTimer } from 'features/timerSlice';
import { useQuestionsFetch } from 'hooks/useQuestionsFetch';
import QuizFooter from './QuizFooter/QuizFooter';
import Question from '../Question/Question';
import QuizModal from './QuizModal/QuizModal';
import './Quiz.css';

export default function Quiz() {
  const { isLoading, isError, questions, currentIndex } = useAppSelector(
    (state) => state.quiz
  );
  useQuestionsFetch();

  const { isTimerComplete } = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError || !isTimerComplete) return;
    dispatch(stopTimer());
    afterAnswer(dispatch, currentIndex, questions);
  }, [questions, currentIndex, isTimerComplete]);

  return isLoading ? (
    <div className='loader-container'>
      <div className='loader-bars'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            className='loader-bar'
            key={i}
            style={{
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      <h1 className='loader'>Loading...</h1>
    </div>
  ) : isError ? (
    <div className='no-questions page'>
      <h1 className='loader'>No Questions Found</h1>
      <p>
        Sorry, there are no questions available for the selected options. This
        is most likely due to the selected category not having enough questions,
        or questions of the selected difficulty or type. Please try again with
        different options.
      </p>
      <button onClick={() => dispatch(setPage('home'))}>home</button>
    </div>
  ) : (
    <>
      <QuizModal />
      <div className='quiz page'>
        <Question {...questions[currentIndex]} />
        <QuizFooter />
      </div>
    </>
  );
}
