import { authTokenAtom, userIdAtom } from "../atoms/Persistent"
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Navigate } from 'react-router-dom';
import TextInput from "../components/TextInput";
import ButtonWrap from '../components/ButtonWrap';
import { useRef } from "react";
import { getApiResponse } from "../utils/API";
import { conlog } from "../utils/Utils";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loaderRefAtom } from "../atoms/General";

export default function Login() {
    const navigate = useNavigate();
    const setUserId = useSetAtom(userIdAtom);
    const [authToken, setAuthToken] = useAtom(authTokenAtom);
    const loaderRef = useAtomValue(loaderRefAtom);
    const userRef = useRef();
    const passRef = useRef();
    async function onLoginClick() {
        loaderRef.current.continuousStart();
        const user = userRef.current.value;
        const pass = passRef.current.value;
        const r = await getApiResponse('login', user, pass);
        loaderRef.current.complete();
        if (r.result) {
            toast.success(r.message);
            setAuthToken(r.access_token);
            setUserId(r.user.id);
            navigate('/');
        }
        else toast.error(r.message);
    }
    return (
        <>
            {
                authToken !== "" ? <Navigate to='/' /> :
                    <div className="flex flex-col items-center">
                        <div className="h-[40vh] gd-bottom flex flex-col items-center justify-center text-white w-full">
                            <div className="love-ya-like-a-sister-regular text-5xl">Meet&Marry</div>
                            <div className="text-lg">Login to your account</div>
                        </div>
                        <div className="w-[80%] mt-10 flex flex-col justify-center gap-6">
                            <TextInput label='Email or Phone' inputRef={userRef} defaultValue='lamiakhan@gmail.com' />
                            <TextInput label='Password' type='password' inputRef={passRef} defaultValue='newpassword456' />
                        </div>
                        <ButtonWrap onClick={onLoginClick} className='mt-10 flex w-[80%] h-12 items-center gd-right rounded-full text-white justify-center gap-2'>
                            Login
                        </ButtonWrap>
                    </div >
            }
        </>
    )
}
