import { useEffect, useState } from "react";

const useToken = (user: any, name?: string) => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const email = user?.user?.email;
        if (email && name) {
            fetch(`http://localhost:5000/user?email=${email}&name=${name}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => res.json()).then(data => {
                if (data.result.acknowledged || data.token) {
                    setToken(data.token);
                    localStorage.setItem('accessToken', data.token);
                }
            });
        }
    }, [user, name])
    return [token];
};

export default useToken;