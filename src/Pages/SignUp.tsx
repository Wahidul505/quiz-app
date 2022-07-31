import React, { useEffect, useState } from 'react';
import signUPImg from '../resources/signUp.png';
import '../App.css';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import useToken from '../hooks/useToken';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';

const SignUp = () => {
    const [checked, setChecked] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [token] = useToken(user, name);
    const navigate = useNavigate();


    useEffect(() => {
        password !== confirmPassword ? setPasswordError("Password didn't match") : setPasswordError('');
    }, [password, confirmPassword]);

    useEffect(() => {
        if (token) {
            toast.success('Account Created', { id: 'registerSuccess' });
            navigate('/');
            window.location.reload();
        }
        else if (error) {
            toast.error("Something went wrong", { id: 'registerError' });
        }
        else if (updateError) {
            toast.error("Something went wrong", { id: 'profileUpdateError' });
        }
    }, [token, error, updateError, navigate]);

    const handleSignUp = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        if (!passwordError && checked) {
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: name });
        }
        else {
            return toast.error('Something went wrong', { id: 'submitError' });
        }
    }


    if (updating || loading) {
        return <Loading />
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 bg-white w-11/12 md:w-2/3 mx-auto rounded-xl shadow items-center'>
            <div>
                <img src={signUPImg} alt="" className='rounded-xl' />
            </div>
            <form onSubmit={handleSignUp}>
                <div className='flex flex-col pl-4 pb-4 pt-8 pr-8 gap-4'>
                    <h2 className='text-xl font-extrabold mb-2'>Create your Free Account</h2>
                    <div className='w-full'>
                        <label htmlFor="name">Your name</label>
                        <input
                            onChange={e => setName(e.target.value)}
                            placeholder='Rohan Sawant' type="text" name='name' id='name' className='block input-bg border rounded-lg px-2 py-1 text-base mt-1 w-full' required />
                    </div>
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
                    <div className='w-full'>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder='••••••••••' type="password" name='confirmPassword' id='confirmPassword' className='block input-bg border rounded-lg px-2 py-1 text-base mt-1 w-full' required />
                        <p className='text-sm text-red-500'>{passwordError && passwordError}</p>
                    </div>
                    <div className='flex gap-2'>
                        <input
                            onClick={() => setChecked(!checked)}
                            type="checkbox" name="condition" id="condition" />
                        <label htmlFor="condition" className='secondary-text text-xs'>I accept the <span className='primary-text underline font-semibold'>Terms and Condition</span></label>
                    </div>
                    <button
                        type='submit'
                        disabled={!checked}
                        className='primary-bg text-white rounded-xl w-full py-2'>Create account</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;