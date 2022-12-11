import { useAppSelector } from 'app/hooks';
import { useTimer } from 'hooks/useTimer';

export default function Timer() {
  const { isTimerStopped, isTimerComplete, timeElapsed } = useAppSelector(
    (state) => state.timer
  );
  const questionDuration = 10000,
    increment = 100,
    delay = 3000;
  useTimer(questionDuration - increment, increment, delay);
  return (
    <h3
      className={
        'timer ' +
        (isTimerComplete ? 'quiz-end' : isTimerStopped ? 'quiz-submit' : '')
      }
    >
      {!(isTimerStopped && isTimerComplete) ? (
        <>Time: {((questionDuration - timeElapsed) / 1000).toFixed(1)}</>
      ) : (
        <> Time's Up! </>
      )}
    </h3>
  );
}
