import { useState, useCallback, useEffect } from 'react';
import { Question } from '../data/quizData';

export interface QuizState {
  currentQuestion: number;
  selectedAnswers: (number | null)[];
  score: number;
  isCompleted: boolean;
  timeSpent: number;
  startTime: number | null;
}

export const useQuiz = (questions: Question[]) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswers: new Array(questions.length).fill(null),
    score: 0,
    isCompleted: false,
    timeSpent: 0,
    startTime: null
  });

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizState.startTime && !quizState.isCompleted) {
      interval = setInterval(() => {
        setTimer(Date.now() - quizState.startTime!);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizState.startTime, quizState.isCompleted]);

  const startQuiz = useCallback(() => {
    setQuizState(prev => ({
      ...prev,
      startTime: Date.now()
    }));
  }, []);

  const selectAnswer = useCallback((answerIndex: number) => {
    setQuizState(prev => {
      const newSelectedAnswers = [...prev.selectedAnswers];
      newSelectedAnswers[prev.currentQuestion] = answerIndex;
      return {
        ...prev,
        selectedAnswers: newSelectedAnswers
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setQuizState(prev => {
      if (prev.currentQuestion < questions.length - 1) {
        return {
          ...prev,
          currentQuestion: prev.currentQuestion + 1
        };
      }
      return prev;
    });
  }, [questions.length]);

  const previousQuestion = useCallback(() => {
    setQuizState(prev => {
      if (prev.currentQuestion > 0) {
        return {
          ...prev,
          currentQuestion: prev.currentQuestion - 1
        };
      }
      return prev;
    });
  }, []);

  const completeQuiz = useCallback(() => {
    const score = quizState.selectedAnswers.reduce((acc, answer, index) => {
      if (answer === questions[index].correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    setQuizState(prev => ({
      ...prev,
      score,
      isCompleted: true,
      timeSpent: timer
    }));
  }, [quizState.selectedAnswers, questions, timer]);

  const resetQuiz = useCallback(() => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswers: new Array(questions.length).fill(null),
      score: 0,
      isCompleted: false,
      timeSpent: 0,
      startTime: null
    });
    setTimer(0);
  }, [questions.length]);

  const goToQuestion = useCallback((questionIndex: number) => {
    setQuizState(prev => ({
      ...prev,
      currentQuestion: questionIndex
    }));
  }, []);

  return {
    quizState,
    timer,
    startQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    resetQuiz,
    goToQuestion
  };
};