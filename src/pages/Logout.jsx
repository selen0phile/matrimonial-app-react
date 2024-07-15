import { authTokenAtom } from '../atoms/Persistent'
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    const setAuthToken = useSetAtom(authTokenAtom);
    useEffect(() => {
        setAuthToken('');
        navigate('/');
    }, [])
    return (
        <div>Logout</div>
    )
}
