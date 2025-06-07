import React, { useState, useEffect, useRef } from 'react';
import { QuizHeader } from './components/QuizHeader';
import { QuestionCard } from './components/QuestionCard';
import { QuizNavigation } from './components/QuizNavigation';
import { QuizSidebar } from './components/QuizSidebar';
import { QuizFilters } from './components/QuizFilters';
import { QuizResults } from './components/QuizResults';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Play, Code2 } from 'lucide-react';
import { quizQuestions } from './data/quizData';
import { useQuiz } from './hooks/useQuiz';
import { useGSAP } from './hooks/useGSAP';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quizStarted, setQuizStarted] = useState(false);
  
  const appRef = useRef<HTMLDivElement>(null);
  const { animateIn, staggerIn } = useGSAP();

  // Filter questions based on selected filters
  const filteredQuestions = quizQuestions.filter(question => {
    return (selectedLanguage === 'All' || question.language === selectedLanguage) &&
           (selectedDifficulty === 'All' || question.difficulty === selectedDifficulty) &&
           (selectedCategory === 'All' || question.category === selectedCategory);
  });

  const {
    quizState,
    timer,
    startQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    resetQuiz,
    goToQuestion
  } = useQuiz(filteredQuestions);

  useEffect(() => {
    if (appRef.current && !quizStarted) {
      const elements = appRef.current.querySelectorAll('.animate-on-load');
      staggerIn(Array.from(elements) as HTMLElement[]);
    }
  }, [staggerIn, quizStarted]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    startQuiz();
  };

  const handleResetFilters = () => {
    setSelectedLanguage('All');
    setSelectedDifficulty('All');
    setSelectedCategory('All');
  };

  const handleRestartQuiz = () => {
    resetQuiz();
    setQuizStarted(false);
  };

  if (filteredQuestions.length === 0) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <Card className="glass-effect max-w-md w-full text-center">
          <CardContent className="p-8">
            <Code2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">No Questions Found</h2>
            <p className="text-muted-foreground mb-4">
              No questions match your current filter selection. Please adjust your filters.
            </p>
            <Button onClick={handleResetFilters}>Reset Filters</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div ref={appRef} className="min-h-screen gradient-bg p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-on-load">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Code2 className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Syntax Quiz
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Test your programming knowledge with interactive coding challenges
            </p>
          </div>

          <div className="animate-on-load">
            <QuizFilters
              selectedLanguage={selectedLanguage}
              selectedDifficulty={selectedDifficulty}
              selectedCategory={selectedCategory}
              onLanguageChange={setSelectedLanguage}
              onDifficultyChange={setSelectedDifficulty}
              onCategoryChange={setSelectedCategory}
              onReset={handleResetFilters}
              questionCount={filteredQuestions.length}
            />
          </div>

          <div className="text-center animate-on-load">
            <Card className="glass-effect max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Ready to Start?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  You have {filteredQuestions.length} questions selected. 
                  Good luck with your quiz!
                </p>
                <Button 
                  onClick={handleStartQuiz} 
                  size="lg" 
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (quizState.isCompleted) {
    return (
      <div className="min-h-screen gradient-bg p-4">
        <div className="max-w-4xl mx-auto">
          <QuizResults
            score={quizState.score}
            totalQuestions={filteredQuestions.length}
            timeSpent={quizState.timeSpent}
            questions={filteredQuestions}
            selectedAnswers={quizState.selectedAnswers}
            onRestart={handleRestartQuiz}
          />
        </div>
      </div>
    );
  }

  const currentQuestion = filteredQuestions[quizState.currentQuestion];
  const selectedAnswer = quizState.selectedAnswers[quizState.currentQuestion];

  return (
    <div className="min-h-screen gradient-bg p-4">
      <div className="max-w-7xl mx-auto">
        <QuizHeader
          currentQuestion={quizState.currentQuestion}
          totalQuestions={filteredQuestions.length}
          timer={timer}
          score={quizState.score}
          language={currentQuestion.language}
          difficulty={currentQuestion.difficulty}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={selectAnswer}
            />
            
            <QuizNavigation
              currentQuestion={quizState.currentQuestion}
              totalQuestions={filteredQuestions.length}
              selectedAnswer={selectedAnswer}
              isCompleted={quizState.isCompleted}
              onPrevious={previousQuestion}
              onNext={nextQuestion}
              onComplete={completeQuiz}
              onReset={handleRestartQuiz}
            />
          </div>

          <div className="lg:col-span-1">
            <QuizSidebar
              questions={filteredQuestions}
              currentQuestion={quizState.currentQuestion}
              selectedAnswers={quizState.selectedAnswers}
              isCompleted={quizState.isCompleted}
              onQuestionSelect={goToQuestion}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;