import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { CheckCircle, Circle, XCircle } from 'lucide-react';
import { Question } from '../data/quizData';
import { useGSAP } from '../hooks/useGSAP';

interface QuizSidebarProps {
  questions: Question[];
  currentQuestion: number;
  selectedAnswers: (number | null)[];
  isCompleted: boolean;
  onQuestionSelect: (index: number) => void;
}

export const QuizSidebar: React.FC<QuizSidebarProps> = ({
  questions,
  currentQuestion,
  selectedAnswers,
  isCompleted,
  onQuestionSelect
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { animateIn, staggerIn } = useGSAP();

  useEffect(() => {
    if (sidebarRef.current) {
      animateIn(sidebarRef.current, { delay: 0.1 });
      
      const questionButtons = sidebarRef.current.querySelectorAll('.question-btn');
      if (questionButtons.length > 0) {
        staggerIn(Array.from(questionButtons) as HTMLElement[], { delay: 0.3 });
      }
    }
  }, [animateIn, staggerIn]);

  const getQuestionStatus = (index: number) => {
    if (!isCompleted) {
      return selectedAnswers[index] !== null ? 'answered' : 'unanswered';
    }
    
    const isCorrect = selectedAnswers[index] === questions[index].correctAnswer;
    return isCorrect ? 'correct' : 'incorrect';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'correct':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'incorrect':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'answered':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getButtonVariant = (index: number) => {
    if (index === currentQuestion) return 'default';
    
    const status = getQuestionStatus(index);
    if (status === 'correct') return 'default';
    if (status === 'incorrect') return 'destructive';
    if (status === 'answered') return 'secondary';
    return 'outline';
  };

  return (
    <Card ref={sidebarRef} className="glass-effect h-fit sticky top-4">
      <CardHeader>
        <CardTitle className="text-lg">Question Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {questions.map((question, index) => (
            <Button
              key={question.id}
              variant={getButtonVariant(index)}
              size="sm"
              onClick={() => onQuestionSelect(index)}
              className="question-btn flex items-center justify-between h-auto p-3"
            >
              <span className="text-xs font-medium">Q{index + 1}</span>
              {getStatusIcon(getQuestionStatus(index))}
            </Button>
          ))}
        </div>
        
        {isCompleted && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Correct:</span>
              <Badge variant="default">
                {selectedAnswers.filter((answer, index) => 
                  answer === questions[index].correctAnswer
                ).length}
              </Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span>Incorrect:</span>
              <Badge variant="destructive">
                {selectedAnswers.filter((answer, index) => 
                  answer !== null && answer !== questions[index].correctAnswer
                ).length}
              </Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span>Accuracy:</span>
              <Badge variant="secondary">
                {Math.round((selectedAnswers.filter((answer, index) => 
                  answer === questions[index].correctAnswer
                ).length / questions.length) * 100)}%
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};