import React, { FC } from 'react';
import '../App.css'

const Loading: FC = () => {
    return (
        <div className='flex justify-center items-center h-96'>
            <div className='rounded-full primary-border-b animate-spin duration-300 h-24 w-24'></div>
        </div>
    );
};

export default Loading;