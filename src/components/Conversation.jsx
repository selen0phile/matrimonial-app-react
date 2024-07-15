import { useEffect, useRef, useState } from "react"
import { useParams, useLocation } from 'react-router-dom';
import { getApiResponse, getImageURL } from "../utils/API";
import { userIdAtom } from "../atoms/Persistent";
import { useAtom, useAtomValue } from 'jotai';
import { Avatar, IconButton } from '@mui/material';
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { IoMdClose, IoMdSend } from "react-icons/io";
import TextInput from "./TextInput";
import Modal from "./Modal";
import { AnimatePresence } from 'framer-motion';
import { modalOpenAtom } from "../atoms/General";

function Message({ text, me }) {
    return (
        <div className={me ? "message me" : "message other"}>
            {text}
        </div>
    )
}
function TopBar({ name, photo }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useAtom(modalOpenAtom);

    return (
        <div className="sticky shadow-md shadow-gray-400 top-0 z-20 gd-right w-full h-14 flex p-2 gap-2 items-center">
            <AnimatePresence initial={false} mode="wait">
                {isOpen && (
                    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                        <div className='w-[80vw] relative rounded-lg max-h-[90vh] overflow-auto bg-white mx-auto p-4'>
                            <div className="absolute top-1 right-1">
                                <IconButton onClick={() => setIsOpen(false)}>
                                    <IoMdClose />
                                </IconButton>
                            </div>
                            <div className="flex flex-col items-center">
                                <Avatar src={getImageURL(photo)} sx={{ height: 128, width: 128 }} />
                                <div className="mt-4">{name}</div>
                            </div>
                        </div>
                    </Modal>
                )}
            </AnimatePresence>
            <IconButton onClick={() => navigate(-1)}>
                <MdOutlineArrowBack color="white" />
            </IconButton>
            <div className="cursor-pointer flex gap-4 items-center" onClick={() => setIsOpen(true)} >
                <Avatar src={getImageURL(photo)} />
                <div className="text-white cursor-pointer" onClick={() => setIsOpen(true)}>
                    {name}
                </div>
            </div>
        </div>
    )
}
export default function Conversation() {
    const [messages, setMessages] = useState([]);
    const location = useLocation();
    const { name, photo } = location.state;

    const textRef = useRef();
    const messageEndRef = useRef();

    const { id } = useParams();
    const userId = useAtomValue(userIdAtom);
    useEffect(() => {
        updateChatMessages();
        const timer = setInterval(updateChatMessages, 5000);
        return () => {
            clearTimeout(timer);
        };
    }, [])

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function updateChatMessages() {
        const d = await getApiResponse('chatMessages', id);
        setMessages(d.data.messages.reverse());
    }

    async function sendMessage() {
        const text = textRef.current.value;
        setMessages([...messages, { message: text, sender_user_id: userId }]);
        textRef.current.value = "";
        await getApiResponse('sendMessage', text, parseInt(id));
    }
    return (
        <div className="flex flex-col no-scrollbar h-[100vh]">
            <TopBar name={name} photo={photo} />
            <div className="flex flex-col p-4 flex-1 overflow-y-scroll no-scrollbar">
                {
                    messages && messages.length > 0 &&
                    messages.map((msg, index) =>
                        <Message key={index} text={msg.message} me={String(msg.sender_user_id) === String(userId)} />
                    )
                }
                <div ref={messageEndRef}></div>
            </div>
            <div className="sticky bg-white bottom-0 z-20 h-14 flex items-center w-full p-2 gap-1">
                <TextInput height='10' inputRef={textRef} />
                <IconButton onClick={sendMessage}>
                    <IoMdSend />
                </IconButton>
            </div>
        </div>
    )
}
