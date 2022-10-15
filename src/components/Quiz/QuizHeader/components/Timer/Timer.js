import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useTimer } from "hooks/useTimer";
import { updateTimerFinished } from "features/quizSlice";
import "./Timer.css";

export default function Timer({ submit}) {
  const { isTimerComplete, timeElapsed, isTimerFinished } = useSelector(
    (state) => state.quiz
  );
  const dispatch = useDispatch();
  const LENGTH_PER_QUESTION = 6000;
  const INCREMENT = 100;
  const limit = useTimer(
    LENGTH_PER_QUESTION - INCREMENT,
    INCREMENT
  );

  useEffect(() => {
    if (timeElapsed >= limit) {
      dispatch(updateTimerFinished(true));
    }
  }, [timeElapsed, limit, dispatch]);

  return (
    <h2
      className={
        "timer " +
        (isTimerComplete && isTimerFinished
          ? "quiz-end"
          : isTimerComplete && submit
          ? "quiz-submit"
          : "")
      }
    >
      {!(isTimerComplete && isTimerFinished) ? (
        <>
          Time: {((limit - timeElapsed) / 1000).toFixed(1)}s
        </>
      ) : (
        <> Time's Up! </>
      )}
    </h2>
  );
}
