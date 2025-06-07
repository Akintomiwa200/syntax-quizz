import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Trophy, Clock, Target, RotateCcw, Share } from 'lucide-react';
import { Question } from '../data/quizData';
import { useGSAP } from '../hooks/useGSAP';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  questions: Question[];
  selectedAnswers: (number | null)[];
  onRestart: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  timeSpent,
  questions,
  selectedAnswers,
  onRestart
}) => {
  const resultsRef = useRef<HTMLDivElement>(null);
  const { animateIn, staggerIn, scaleIn } = useGSAP();

  useEffect(() => {
    if (resultsRef.current) {
      scaleIn(resultsRef.current);
      
      const statCards = resultsRef.current.querySelectorAll('.stat-card');
      if (statCards.length > 0) {
        staggerIn(Array.from(statCards) as HTMLElement[], { delay: 0.3 });
      }
    }
  }, [animateIn, staggerIn, scaleIn]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const accuracy = Math.round((score / totalQuestions) * 100);
  const averageTimePerQuestion = Math.round(timeSpent / 1000 / totalQuestions);

  const getPerformanceMessage = () => {
    if (accuracy >= 90) return "Outstanding! 🎉";
    if (accuracy >= 80) return "Excellent work! 👏";
    if (accuracy >= 70) return "Good job! 👍";
    if (accuracy >= 60) return "Not bad! Keep practicing! 💪";
    return "Keep learning! You'll improve! 📚";
  };

  const getPerformanceColor = () => {
    if (accuracy >= 80) return "text-green-600 dark:text-green-400";
    if (accuracy >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div ref={resultsRef} className="space-y-8">
      <Card className="glass-effect text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl mb-2">Quiz Complete!</CardTitle>
          <p className={`text-xl font-semibold ${getPerformanceColor()}`}>
            {getPerformanceMessage()}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="stat-card">
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{score}/{totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
                <Badge variant="secondary" className="mt-2">
                  {accuracy}% Accuracy
                </Badge>
              </CardContent>
            </Card>

            <Card className="stat-card">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{formatTime(timeSpent)}</div>
                <div className="text-sm text-muted-foreground">Total Time</div>
                <Badge variant="secondary" className="mt-2">
                  {averageTimePerQuestion}s avg
                </Badge>
              </CardContent>
            </Card>

            <Card className="stat-card">
              <CardContent className="p-6 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">
                  {accuracy >= 80 ? 'A' : accuracy >= 70 ? 'B' : accuracy >= 60 ? 'C' : 'D'}
                </div>
                <div className="text-sm text-muted-foreground">Grade</div>
                <Badge 
                  variant={accuracy >= 80 ? 'default' : accuracy >= 60 ? 'secondary' : 'destructive'}
                  className="mt-2"
                >
                  {accuracy >= 80 ? 'Excellent' : accuracy >= 60 ? 'Good' : 'Needs Work'}
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onRestart} size="lg" className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              Take Quiz Again
            </Button>
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <Share className="w-5 h-5" />
              Share Results
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Question Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const isCorrect = selectedAnswers[index] === question.correctAnswer;
              const userAnswer = selectedAnswers[index];
              
              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">Q{index + 1}: {question.question}</h4>
                    <Badge variant={isCorrect ? 'default' : 'destructive'}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Your answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                      {userAnswer !== null ? question.options[userAnswer] : 'Not answered'}
                    </span></div>
                    {!isCorrect && (
                      <div>Correct answer: <span className="text-green-600">
                        {question.options[question.correctAnswer]}
                      </span></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};