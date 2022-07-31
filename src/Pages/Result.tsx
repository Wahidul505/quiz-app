import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import QuizImg from '../resources/quiz.png';

const Result = () => {
    const [user] = useAuthState(auth);
    const [userScore, setUserScore] = useState<number | undefined>();
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`https://quizzz-app-server.herokuapp.com/user/${user?.email}`, {
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
                setUserScore(data.score)
            })
    }, [navigate, user]);
    return (
        <div className='bg-white w-11/12 md:w-2/3 mx-auto rounded shadow py-6 px-4'>
            <div className='flex flex-col items-center'>
                <p className='secondary-text mb-1'>Quiz Completed</p>
                <h1 className='text-2xl font-semibold neutral-text mb-1'>Good job!</h1>
                <img src={QuizImg} alt="" width={457} height={413} />
                <p className='secondary-text'>You Scored <span className='font-semibold'>{userScore}/5</span> points</p>
            </div>
            <div className='flex justify-between px-5 mt-20'>
                <button
                    onClick={() => signOut(auth)}
                    className='primary-text text-sm font-semibold'>Logout</button>
                <div className='flex gap-4'>
                    <button
                        onClick={() => navigate('/leader-board')}
                        className='flex items-center font-semibold text-sm gap-2 border rounded-xl px-4 py-2'>
                        Compare Results
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Result;