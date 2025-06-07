import React, { useEffect, useRef } from 'react';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Clock, Code, Trophy } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';

interface QuizHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  timer: number;
  score: number;
  language: string;
  difficulty: string;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  currentQuestion,
  totalQuestions,
  timer,
  score,
  language,
  difficulty
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { animateIn } = useGSAP();

  useEffect(() => {
    if (headerRef.current) {
      animateIn(headerRef.current);
    }
  }, [animateIn]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div ref={headerRef} className="glass-effect rounded-xl p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            <span className="font-semibold text-lg">Syntax Quiz</span>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            {language}
          </Badge>
          <Badge 
            variant={difficulty === 'beginner' ? 'default' : difficulty === 'intermediate' ? 'secondary' : 'destructive'}
            className="capitalize"
          >
            {difficulty}
          </Badge>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{formatTime(timer)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Trophy className="w-4 h-4" />
            <span>Score: {score}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Question {currentQuestion + 1} of {totalQuestions}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};