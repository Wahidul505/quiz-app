import React, { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import auth from '../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from './Loading';


const RequireAuth: FC = () => {
    const [user, loading] = useAuthState(auth);
    const email = user?.email;
    const location = useLocation();
    if (loading) {
        return <Loading />
    }
    if (email) {
        return <Outlet />;
    }
    else {
        return <Navigate to='/login' state={{ from: location }} replace />
    }
};

export default RequireAuth;