import React, { useEffect, useState } from 'react';
import { UserType } from '../modals/UserType';
import '../App.css';

const LeaderBoard = () => {
    const [users, setUsers] = useState<UserType[]>();
    useEffect(() => {
        fetch('https://quizzz-app-server.herokuapp.com/user')
            .then(res => res.json())
            .then(data => {
                const quizUsers = data.filter((user: UserType) => user.score);
                setUsers(quizUsers);
            });
    }, [])
    return (
        <div className='bg-white w-5/6 md:w-2/5 mx-auto rounded shadow p-4'>
            <h1 className='font-bold text-xl'>Other Results</h1>
            <div>
                {
                    users?.map(user => <div key={user._id} className='border-b border-gray-300 flex justify-between items-center mt-8 pb-1 mb-2'>
                        <div>
                            <h3 className='text-lg font-semibold'>{user.name}</h3>
                            <h4 className='secondary-text'>{user.email}</h4>
                        </div>
                        <h1 className='font-semibold text-lg'>{user.score}/5</h1>
                    </div>)
                }
            </div>
        </div>
    );
};

export default LeaderBoard;