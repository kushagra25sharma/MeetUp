import { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { MoreVert, SearchOutlined, AttachFile, InsertEmoticon, Mic } from "@material-ui/icons";
// useParams returns an object of key/value pairs of URL parameters. Use it to access match.params of the current <Route>.
import { useParams } from "react-router-dom";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";

const Chat = () => {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState(0);
    const { roomId } = useParams();// this will give us the roomId that we have passsed in the link /rooms/:roomId
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    // console.log(roomId);

    useEffect(() => {
        if(roomId){
            // go into specific doc and get the snapshot
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (setRoomName(snapshot.data().name)));

            db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
        }
    }, [roomId]) // whenever roomId changes we load the messages of that room

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, [roomId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            // server's time is always going to be same but users' time can pe different according to there location so user in US gets msgs in his time 
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
        setInput("");
    };


    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h5>{roomName}</h5>
                    <p>{messages.length ? `Last seen at ${new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}`: "New room created"} </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton><SearchOutlined /></IconButton>
                    <IconButton><AttachFile /></IconButton>
                    <IconButton><MoreVert /></IconButton>
                </div>
            </div>
            
            <div className="chat__body" >
                {messages.map((message) => (
                    <p className={`chat__message ${message.name === user?.displayName && "chat__reciever"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
                
            </div>
            

            <div className="chat__footer">
                <IconButton><InsertEmoticon /></IconButton>
                <form>
                    <input placeholder="Type a message" type="input" value={input} onChange={(e) => setInput(e.target.value)}/>
                    <button type="submit" onClick={handleSubmit} >Send the message</button>
                </form>
                <Mic />
            </div>

        </div>
    );
}

export default Chat;
