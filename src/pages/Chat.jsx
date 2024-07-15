
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { cacheApiResponse, getApiCache, getApiResponse, getImageURL } from '../utils/API';
import { loaderRefAtom } from '../atoms/General';
import { useAtomValue } from 'jotai';
import { Link } from 'react-router-dom';

function Inbox({ name, photo, lastMsg, lastTime, active, threadId }) {
  return (
    <Link to={`/conversation/${threadId}`} state={{name, photo}}>
      <div className='flex p-4 gap-4 border-b cursor-pointer hover:bg-gray-200 border'>
        <div>
          <Avatar src={getImageURL(photo)} sx={{ width: '3rem', height: '3rem' }} />
        </div>
        <div className='flex-1'>
          <div className='flex justify-between items-center text-sm'>
            <div>{name}</div>
            <div className='text-xs'>{lastTime}</div>
          </div>
          <div className='text-xs'>{lastMsg}</div>
        </div>
      </div>
    </Link>
  )
}

export default function Chat() {
  const [chatList, setChatList] = useState(getApiCache('chatList'));
  const loaderRef = useAtomValue(loaderRefAtom);
  useEffect(() => {
    async function initialize() {
      loaderRef.current.continuousStart();
      const d = await cacheApiResponse('chatList');
      if (d != chatList) setChatList(d);
      loaderRef.current.complete();
    }
    initialize();
  }, [])
  return (
    <div>
      {
        chatList && chatList.data.map((inbox, index) =>
          <Inbox key={index} threadId={inbox.id} name={inbox.member_name} photo={inbox.member_photo} lastTime={inbox.last_message_time} lastMsg={inbox.last_message} active={inbox.active} />
        )
      }
    </div>
  )
}
