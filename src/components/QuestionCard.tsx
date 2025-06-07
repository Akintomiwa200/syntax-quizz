import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { Question } from '../data/quizData';
import { useGSAP } from '../hooks/useGSAP';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
  showExplanation?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showExplanation = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { animateIn, staggerIn } = useGSAP();

  useEffect(() => {
    if (cardRef.current) {
      animateIn(cardRef.current);
      
      // Animate options with stagger
      const options = cardRef.current.querySelectorAll('.option-item');
      if (options.length > 0) {
        staggerIn(Array.from(options) as HTMLElement[], { delay: 0.2 });
      }
    }
  }, [question.id, animateIn, staggerIn]);

  const getOptionClassName = (index: number) => {
    let baseClass = "flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:bg-accent/50";
    
    if (showExplanation) {
      if (index === question.correctAnswer) {
        baseClass += " border-green-500 bg-green-50 dark:bg-green-900/20";
      } else if (index === selectedAnswer && index !== question.correctAnswer) {
        baseClass += " border-red-500 bg-red-50 dark:bg-red-900/20";
      } else {
        baseClass += " border-muted";
      }
    } else {
      baseClass += selectedAnswer === index 
        ? " border-primary bg-primary/10" 
        : " border-muted hover:border-primary/50";
    }
    
    return baseClass;
  };

  return (
    <Card ref={cardRef} className="glass-effect">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl leading-relaxed">
            {question.question}
          </CardTitle>
          <Badge variant="outline" className="shrink-0">
            {question.category}
          </Badge>
        </div>
        
        {question.code && (
          <div className="mt-4">
            <pre className="code-block syntax-highlight overflow-x-auto">
              <code>{question.code}</code>
            </pre>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <RadioGroup
          value={selectedAnswer?.toString()}
          onValueChange={(value) => onAnswerSelect(parseInt(value))}
          disabled={showExplanation}
        >
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`option-item ${getOptionClassName(index)}`}
                onClick={() => !showExplanation && onAnswerSelect(index)}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <label 
                  htmlFor={`option-${index}`} 
                  className="flex-1 cursor-pointer font-medium"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </RadioGroup>

        {showExplanation && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Explanation:
            </h4>
            <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};