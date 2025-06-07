export interface Question {
  id: number;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    language: 'JavaScript',
    difficulty: 'beginner',
    question: 'What will be the output of the following code?',
    code: `console.log(typeof null);`,
    options: ['null', 'undefined', 'object', 'boolean'],
    correctAnswer: 2,
    explanation: 'In JavaScript, typeof null returns "object". This is a well-known quirk in the language.',
    category: 'Data Types'
  },
  {
    id: 2,
    language: 'Python',
    difficulty: 'intermediate',
    question: 'What is the output of this Python code?',
    code: `x = [1, 2, 3]
y = x
y.append(4)
print(x)`,
    options: ['[1, 2, 3]', '[1, 2, 3, 4]', 'Error', 'None'],
    correctAnswer: 1,
    explanation: 'In Python, lists are mutable objects. When you assign x to y, both variables reference the same list object.',
    category: 'Data Structures'
  },
  {
    id: 3,
    language: 'JavaScript',
    difficulty: 'advanced',
    question: 'What will this code output?',
    code: `const obj = {
  a: 1,
  b: function() { return this.a; },
  c: () => { return this.a; }
};
console.log(obj.b(), obj.c());`,
    options: ['1 1', '1 undefined', 'undefined undefined', 'Error'],
    correctAnswer: 1,
    explanation: 'Regular functions have their own "this" context, while arrow functions inherit "this" from the enclosing scope.',
    category: 'Functions'
  },
  {
    id: 4,
    language: 'Python',
    difficulty: 'beginner',
    question: 'Which of the following is the correct way to create a dictionary in Python?',
    code: '',
    options: [
      'dict = {key: value}',
      'dict = [key: value]',
      'dict = (key: value)',
      'dict = <key: value>'
    ],
    correctAnswer: 0,
    explanation: 'Dictionaries in Python are created using curly braces {} with key-value pairs separated by colons.',
    category: 'Data Structures'
  },
  {
    id: 5,
    language: 'JavaScript',
    difficulty: 'intermediate',
    question: 'What is the result of this expression?',
    code: `console.log(0.1 + 0.2 === 0.3);`,
    options: ['true', 'false', 'undefined', 'Error'],
    correctAnswer: 1,
    explanation: 'Due to floating-point precision issues, 0.1 + 0.2 equals 0.30000000000000004, not exactly 0.3.',
    category: 'Numbers'
  },
  {
    id: 6,
    language: 'Python',
    difficulty: 'advanced',
    question: 'What will this code print?',
    code: `def func(x=[]):
    x.append(1)
    return x

print(func())
print(func())`,
    options: ['[1] [1]', '[1] [1, 1]', 'Error', 'None None'],
    correctAnswer: 1,
    explanation: 'Mutable default arguments are evaluated only once when the function is defined, creating a shared reference.',
    category: 'Functions'
  }
];

export const languages = ['All', 'JavaScript', 'Python'];
export const difficulties = ['All', 'beginner', 'intermediate', 'advanced'];
export const categories = ['All', 'Data Types', 'Data Structures', 'Functions', 'Numbers'];