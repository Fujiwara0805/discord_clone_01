import React, { useEffect, useState } from 'react'
import './Chat.scss';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useAppSelector } from '../../app/hooks';
import { collection, CollectionReference, DocumentData, serverTimestamp, DocumentReference, addDoc, onSnapshot, Timestamp, query, orderBy } from "firebase/firestore";
import { db } from '../../firebase';
import useSubCollection from '../../hooks/useSubCollection';

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string; 
    displayName: string; 
  }
}

const Chat = () => {
  const [inputText, setInputText] = useState<string>("");
  const channelName = useAppSelector((state) => (state.channel.channelName));
  const user = useAppSelector((state) => state.user.user );
  const channelId = useAppSelector((state) => (state.channel.channelId));
  const {subDocuments: messages} = useSubCollection("channels", "messages"); 

    //Channelsコレクションの中にあるMessagesコレクションの中にメッセージを入れる
  const sendMessage = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const collectionRef: CollectionReference<DocumentData> = collection(db, "channels", String(channelId), "messages"); 
    const docRef: DocumentReference<DocumentData> = await addDoc(collectionRef, {
      message: inputText,
      Timestamp: serverTimestamp(),
      user: user,
    });
    setInputText("");
  };

  return (
    <div className="chat">
      {/* chatHeader */}
      <ChatHeader channelName={channelName}></ChatHeader>

      {/* chatMessage */}
      <div className="chatMessage">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.message} timestamp={message.timestamp} user={message.user}></ChatMessage>
        ))}
      </div>

      {/* chatInput */}
      <div className="chatInput">
        <AddCircleIcon></AddCircleIcon>
        <form action="">
          <input type="text" placeholder="#Udemyにmessageを送信" onChange={(e :React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)} value={inputText}/>
          <button type="submit" className="ChatInputButton" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => sendMessage(e)}>送信</button>
        </form>

        <div className="ChatInputIcons">
          <CardGiftcardIcon></CardGiftcardIcon>
          <GifIcon></GifIcon>
          <SentimentVerySatisfiedIcon></SentimentVerySatisfiedIcon>
        </div>
      </div>
    </div>
    
  )
}

export default Chat