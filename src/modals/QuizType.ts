export interface QuizType {
    _id: string;
    quizSerial: number;
    question: string;
    answers: string[];
    correct: string;
}