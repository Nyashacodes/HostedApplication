import "../styles/Chat.css"
import { useEffect, useState } from "react";
import{addDoc, collection, serverTimestamp, onSnapshot, query, where, doc, orderBy} from "firebase/firestore"  //a doc is like a row in a db table, it just adds a document to a collection
import {auth, db} from "../firebase-config"

//onSnapshot:will listen/receive all the msgs and requires 2 things, query and 

export const Chat = (props)=>{

    const{room} = props
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const messagesRef = collection(db, "messages") //collection is a fucntion that we import from firestoree & while using addDoc, we have to specify which collection we wanted to add a document to, so to make a reference of which collectoion you are talking about
    
    useEffect(() => {
        const queryMessages = query(messagesRef, 
            where("room", "==", room),
        orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });
    
        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, [room]);
    

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(newMessage === "")return;
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,            
        });
        setNewMessage("")
        // console.log(newMessage);
    };

    return(
        <>
            <div className="chat-app">
                <div className="header">
                    <h1>Welcome to : {room.toUpperCase()}</h1>
                </div>
                <h1>All messages are below</h1>
                <div className="messages">
                    {messages.map((message)=>
                    <div className="message" key = {message.id}>
                        <span className="user">{message.user} : </span>
                        {message.text}
                       
                    </div>
                    )}
                </div>
                <form 
                onSubmit={handleSubmit}
                className="new-message-form">
                    <input className="new-message-input" 
                    placeholder="Type your message here..."
                    onChange={(e)=>setNewMessage(e.target.value)}
                    value={newMessage}
                    />
                    <button type="submit" className="send-button">Send</button>
                </form>
            </div>
            
        </>
    )
}