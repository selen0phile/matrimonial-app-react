import { Drawer } from '@mui/material'
import { useAtom, useAtomValue } from 'jotai';
import { sidebarOpenAtom } from '../atoms/General';
import Avatar from '@mui/material/Avatar';
import { MdOutlineExplore, MdOutlineSearch, MdOutlineAccountCircle, MdOutlineLocalOffer } from "react-icons/md";
import { FaUsers, FaUser } from "react-icons/fa6";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import ButtonWrap from './ButtonWrap';
import { RiShutDownLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { cacheApiResponse, getApiResponse, getImageURL } from '../utils/API';
import { useEffect } from 'react';
import { myDataAtom, userIdAtom } from '../atoms/Persistent';

export function SidebarItem({ onClick, title, icon, url }) {
    return (
        <Link to={url}>
            <ButtonWrap onClick={onClick} className='flex w-[60vw] h-12 items-center gd-right rounded-full text-white justify-center gap-2'>
                <div className='text-3xl'>
                    {icon}
                </div>
                <div>
                    {title}
                </div>
            </ButtonWrap>
        </Link>
    )
}
export default function Sidebar() {
    const userId = useAtomValue(userIdAtom);
    const [open, setOpen] = useAtom(sidebarOpenAtom);
    const [myData, setMyData] = useAtom(myDataAtom);
    useEffect(() => {
        async function initialize() {
            const R = await cacheApiResponse('profile', userId);
            const d = {
                name: R.data.basic_info.firs_name + " " + R.data.basic_info.last_name,
                photoURL: R.data.basic_info.photo,
            };
            if (d != myData) setMyData(d);
        }
        initialize();
    }, [])
    const sideBarOptions = [
        { title: 'Explore', url: '/', icon: <MdOutlineExplore /> },
        { title: 'Account', url: '/account', icon: <MdOutlineAccountCircle /> },
        { title: 'Search', url: '/search', icon: <MdOutlineSearch /> },
        { title: 'Members', url: '/members', icon: <FaUsers /> },
        { title: 'Chat', url: '/chat', icon: <IoChatbubbleEllipsesOutline /> },
        { title: 'Packages', url: '/packages', icon: <MdOutlineLocalOffer /> },
        { title: 'Logout', url: '/logout', icon: <RiShutDownLine /> }
    ];
    return (
        <Drawer open={open} onClose={() => setOpen(false)}>
            <div className='w-[70vw] overflow-auto pb-12 no-scrollbar'>
                <div className='h-60 gd-bottom flex items-center justify-center flex-col gap-2 text-white'>
                    <Avatar sx={{ width: 100, height: 100 }} src={getImageURL(myData.photoURL)} />
                    <div>
                        {myData.name}
                    </div>
                    <Link to='/profile'>
                        <ButtonWrap onClick={() => setOpen(false)} className='tp flex w-[40vw] h-12 items-center bg-white rounded-full justify-center gap-2'>
                            <div className='text-lg'>
                                <FaUser />
                            </div>
                            <div>
                                Profile
                            </div>
                        </ButtonWrap></Link>
                </div>
                <div className='mt-8 flex justify-center flex-col items-center gap-4'>
                    {
                        sideBarOptions.map((item, index) => <SidebarItem onClick={() => setOpen(false)} key={index} title={item.title} url={item.url} icon={item.icon} />)
                    }
                </div>
            </div>
        </Drawer>
    )
}
