import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Filter, RotateCcw } from 'lucide-react';
import { languages, difficulties, categories } from '../data/quizData';
import { useGSAP } from '../hooks/useGSAP';

interface QuizFiltersProps {
  selectedLanguage: string;
  selectedDifficulty: string;
  selectedCategory: string;
  onLanguageChange: (language: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onCategoryChange: (category: string) => void;
  onReset: () => void;
  questionCount: number;
}

export const QuizFilters: React.FC<QuizFiltersProps> = ({
  selectedLanguage,
  selectedDifficulty,
  selectedCategory,
  onLanguageChange,
  onDifficultyChange,
  onCategoryChange,
  onReset,
  questionCount
}) => {
  const filtersRef = useRef<HTMLDivElement>(null);
  const { animateIn, staggerIn } = useGSAP();

  useEffect(() => {
    if (filtersRef.current) {
      animateIn(filtersRef.current);
      
      const filterGroups = filtersRef.current.querySelectorAll('.filter-group');
      if (filterGroups.length > 0) {
        staggerIn(Array.from(filterGroups) as HTMLElement[], { delay: 0.2 });
      }
    }
  }, [animateIn, staggerIn]);

  return (
    <Card ref={filtersRef} className="glass-effect mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <CardTitle>Quiz Filters</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{questionCount} questions</Badge>
            <Button variant="outline" size="sm" onClick={onReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="filter-group">
            <h4 className="font-medium mb-3">Language</h4>
            <div className="flex flex-wrap gap-2">
              {languages.map((language) => (
                <Button
                  key={language}
                  variant={selectedLanguage === language ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onLanguageChange(language)}
                >
                  {language}
                </Button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4 className="font-medium mb-3">Difficulty</h4>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onDifficultyChange(difficulty)}
                  className="capitalize"
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4 className="font-medium mb-3">Category</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};