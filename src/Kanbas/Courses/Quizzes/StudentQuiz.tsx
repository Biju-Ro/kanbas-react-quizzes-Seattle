import { useParams } from "react-router";
import QuizDisplay from "./Display/QuizDisplay";
import { useEffect, useState } from "react";
import * as client from "./client";

export default function StudentQuiz() {
  const { qid } = useParams<string>();
  const [quiz, setQuiz] = useState<any>({});

  const fetchQuiz = async () => {
    const fetchedQuiz = await client.findQuiz(qid as string);
    setQuiz(fetchedQuiz);
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  return (
    <div>
      <h3>{quiz.name}</h3>
      <QuizDisplay />
    </div>
  );
}
