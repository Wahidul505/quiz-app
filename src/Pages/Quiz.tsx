import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import { QuizType } from '../modals/QuizType';
import { TbArrowLeft } from 'react-icons/tb'
import { TbArrowRight } from 'react-icons/tb'
import '../App.css';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { pushScore } from '../features/scoreSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';

const Quiz = () => {
    const [quiz, setQuiz] = useState<QuizType>();
    const [serial, setSerial] = useState<number>(1);
    const [currentAnswer, setCurrentAnswer] = useState<string>();
    const [currentScore, setCurrentScore] = useState<number | null>(null);
    const dispatch = useAppDispatch();
    const { score } = useAppSelector(state => state.score);
    const [user] = useAuthState(auth);

    const navigate = useNavigate();
    useEffect(() => {
        fetch(`https://quizzz-app-server.herokuapp.com/quiz/${serial}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    navigate('/login');
                    signOut(auth);
                }
                else {
                    return res.json();
                }
            })
            .then(data => setQuiz(data));
    }, [serial, navigate]);

    useEffect(() => {
        currentAnswer === quiz?.correct ? setCurrentScore(1) : setCurrentScore(0);
    }, [currentAnswer, quiz]);

    useEffect(() => {
        dispatch(pushScore([serial - 1, currentScore ? currentScore : 0]))
    }, [currentScore, serial, dispatch])

    const handleSubmit = async () => {
        const scoreArray = [...score];
        const totalScore = scoreArray.reduce((previous, next) => previous + next, 0)
        await fetch(`https://quizzz-app-server.herokuapp.com/user-score?email=${user?.email}&score=${totalScore}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                }
                else {
                    return res.json();
                }
            })
            .then(data => {
                if (data) {
                    toast.success('Quiz Completed', { id: 'quizCompleted' });
                    navigate('/result');
                }
            })
    }


    return (
        <div className=' bg-white w-11/12 md:w-2/3 mx-auto rounded shadow py-4 '>
            <div className='px-8'>
                <p className='secondary-text mb-6'>Question {serial} of 5</p>
                <h1 className='text-2xl font-semibold neutral-text mb-1'>{quiz?.question}</h1>
                <p className='secondary-text'>Answer the question!</p>
                <div>
                    {
                        quiz?.answers.map((answer: string, index: number) => {
                            return <div
                                key={index}
                                onClick={() => {
                                    setCurrentAnswer(answer)
                                }}
                                className='flex flex-row-reverse items-center gap-3 cursor-pointer border rounded-lg h-16 px-4 mt-3'>
                                <label htmlFor={answer}
                                    className="w-full h-full accent-text text-lg cursor-pointer flex items-center">{answer}</label>
                                <input
                                    type="radio" name="answer" id={answer} className='checkbox-round'
                                />
                            </div>
                        })
                    }
                </div>
            </div>
            <div className='flex justify-between px-5 mt-20'>
                <button
                    onClick={() => signOut(auth)}
                    className='primary-text text-sm font-semibold'>Logout</button>
                <div className='flex gap-4'>
                    {
                        serial > 1 && <button
                            onClick={() => setSerial(serial - 1)}
                            className='flex items-center font-semibold text-sm gap-2 border rounded-xl px-4 py-2'>
                            <TbArrowLeft className='text-lg' />
                            Back
                        </button>
                    }
                    {
                        serial < 5 ?
                            <button
                                onClick={() => {
                                    setSerial(serial + 1)
                                }}
                                disabled={currentScore === null}
                                className='flex items-center font-semibold text-sm gap-2 primary-bg text-white rounded-xl px-4 py-2'>
                                Next
                                <TbArrowRight className='text-lg' />
                            </button>
                            :
                            <button
                                onClick={handleSubmit}
                                disabled={currentScore === null}
                                className='flex items-center font-semibold text-sm gap-2 primary-bg text-white rounded-xl px-4 py-2'>
                                Finish
                                <TbArrowRight className='text-lg' />
                            </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Quiz;