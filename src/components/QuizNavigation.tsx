import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Check, RotateCcw } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  isCompleted: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onComplete: () => void;
  onReset: () => void;
}

export const QuizNavigation: React.FC<QuizNavigationProps> = ({
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  isCompleted,
  onPrevious,
  onNext,
  onComplete,
  onReset
}) => {
  const navRef = useRef<HTMLDivElement>(null);
  const { animateIn } = useGSAP();

  useEffect(() => {
    if (navRef.current) {
      animateIn(navRef.current, { delay: 0.3 });
    }
  }, [animateIn]);

  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const canProceed = selectedAnswer !== null;

  return (
    <div ref={navRef} className="flex justify-between items-center mt-8">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <div className="flex gap-2">
        {isCompleted ? (
          <Button
            onClick={onReset}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Restart Quiz
          </Button>
        ) : isLastQuestion ? (
          <Button
            onClick={onComplete}
            disabled={!canProceed}
            className="flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Complete Quiz
          </Button>
        ) : (
          <Button
            onClick={onNext}
            disabled={!canProceed}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};