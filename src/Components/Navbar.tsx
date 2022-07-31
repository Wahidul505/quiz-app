import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import Logo from '../resources/Logo.png'
import { BsBoxArrowInLeft } from 'react-icons/bs';
import { HiMenuAlt2 } from 'react-icons/hi';
import { HiBell } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [user] = useAuthState(auth);
    const [show, setShow] = useState<boolean>(false);

    return (
        <nav className='flex justify-between px-6 bg-white shadow fixed top-0 right-0 left-0 items-center h-12'>
            <div className='flex items-center h-full'>
                <Link to='/'><h2 className='mr-4 md:mr-12 text-xl font-semibold'>Ionio Quiz</h2></Link>
                <Link to='/'><img src={Logo} alt="" /></Link>
                {user &&
                    <>
                        <button><HiMenuAlt2 className='text-3xl hidden md:block ml-6' /></button>
                        <input type="text" placeholder='🔍 Search' className='text-xl p-1 rounded-xl border ml-6 hidden md:block h-full' />
                    </>
                }
            </div>
            <div>
                {
                    user ?
                        <>
                            <div className='flex items-center gap-2 md:gap-3'>
                                <button><HiBell className='text-xl md:text-2xl' /></button>
                                <button
                                    onClick={() => setShow(!show)}
                                    className='flex items-center gap-1 md:gap-2 text-base md:text-lg'>
                                    {user?.displayName ? user.displayName : ''}{show ? <IoIosArrowUp className='text-lg md:text-2xl' /> : <IoIosArrowDown className='text-lg md:text-2xl' />}
                                </button>
                            </div>
                            <div
                                onBlur={() => setShow(false)}
                                className={show ? 'block absolute bg-white w-40 rounded-lg shadow-lg right-2 text-lg p-3 border' : 'hidden'}>
                                <button onClick={() => signOut(auth)}>SignOut</button>
                            </div>
                        </>
                        :
                        <NavLink to="/login" className="flex items-center gap-1 md:gap-2"><BsBoxArrowInLeft className='font-bold text-xl md:text-2xl' />Login/Register</NavLink>
                }
            </div>
        </nav>
    );
};

export default Navbar;