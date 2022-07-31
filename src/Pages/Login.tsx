import React, { useEffect, useState } from 'react';
import loginImg from '../resources/login.png';
import '../App.css';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import useToken from '../hooks/useToken';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();
    const location: any = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [token] = useToken(user, user?.user?.displayName ? user?.user?.displayName : '');


    useEffect(() => {
        if (token) {
            toast.success('Login Success', { id: 'loginSuccess' });
            navigate(from, { replace: true });
        }
        if (error) {
            toast.error("Something went wrong", { id: 'loginError' });
        }
    }, [token, error, navigate, from]);

    const handleLogin = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    }


    if (loading) {
        return <Loading />
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 bg-white w-11/12 md:w-2/3 mx-auto rounded-xl shadow items-center'>
            <div>
                <img src={loginImg} alt="" className='rounded-xl' />
            </div>
            <form onSubmit={handleLogin}>
                <div className='flex flex-col pl-4 py-8 pr-8 gap-4'>
                    <h2 className='text-xl font-extrabold mb-2'>Sign In</h2>

                    <div className='w-full'>
                        <label htmlFor="email">Your email</label>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            placeholder='name@example.com' type="text" name='email' id='email' className='block input-bg border rounded-lg px-2 py-1 text-base mt-1 w-full' required />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={e => setPassword(e.target.value)}
                            placeholder='••••••••••' type="password" name='password' id='password' className='block input-bg border rounded-lg px-2 py-1 text-base mt-1 w-full' required />
                    </div>

                    <div className='flex gap-2'>
                        <input
                            type="checkbox" name="condition" id="condition" />
                        <label htmlFor="condition" className='secondary-text text-xs'>Remember me</label>
                    </div>
                    <button
                        type='submit'
                        className='primary-bg text-white rounded-xl w-full py-2'>
                        Sign In
                    </button>
                    <hr className='primary-border-b w-1/2 mx-auto' />
                    <Link to='/sign-up' className='primary-text text-center font-semibold text-sm'>Sign Up</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;