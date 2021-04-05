import { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { MoreVert, SearchOutlined, InsertEmoticon, Mic } from "@material-ui/icons";
// useParams returns an object of key/value pairs of URL parameters. Use it to access match.params of the current <Route>.
import { useParams } from "react-router-dom";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import firebase from "firebase";
import moment from "moment";
import FileUploader from "./FileUploader";


const Chat = () => {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState(0);
    const { roomId } = useParams();// this will give us the roomId that we have passsed in the link /rooms/:roomId
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const [theme, setTheme] = useState(false);
    const theme1 = "https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png";
    const theme2 = "https://i.redd.it/ts7vuoswhwf41.jpg";
    // console.log(roomId);

    useEffect(() => {
        if (roomId) {
            
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (setRoomName(snapshot.data().name)));

            db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));

        }
    }, [roomId]) // whenever roomId changes we load the messages of that room

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const handleSubmit = (e) => {
        e.preventDefault();
       // console.log(input);
        if (input.length > 0) {
            db.collection("rooms").doc(roomId).collection("messages").add({
                message: input,
                name: user.displayName.split(' ')[0],
                file: "",
                // server's time is always going to be same but users' time can pe different according to there location so user in US gets msgs in his time 
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }
        setInput("");
    };

    const handleTheme = () => {
        setTheme(prev => !prev);
    }

    const handleFile = (uploadedFile) => {

        db.collection("rooms").doc(roomId).collection("messages").add({
            message: "",
            name: user.displayName.split(' ')[0],
            file: URL.createObjectURL(uploadedFile),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
    }


    return (
        <div className="chat">

            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h5>{roomName}</h5>
                    <p>{messages.length ? `Last message at ${moment(new Date(messages[messages.length - 1]?.timestamp?.toDate())).format("LT")}` : "New room created"} </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton><SearchOutlined /></IconButton>
                    <FileUploader handleFile={handleFile} />
                    <div onClick={handleTheme}><IconButton><MoreVert/></IconButton></div>
                </div>
                
            </div>

            <div className="chat__body" style={{ backgroundImage: theme ? `url(${theme1})` : `url(${theme2})` }}>
                {messages.map((message, index) => (
                    <p key={index} className={`chat__message ${message.name === user?.displayName.split(' ')[0] && "chat__reciever"}`}>
                        <span style={{ color: theme ? "black" : "orange"}} className="chat__name">{message.name}</span>
                        {message.message.length ? message.message : <img className="chat__image" src={message.file} alt="couldn't load" />}
                        <span className="chat__timestamp">{moment(new Date(message.timestamp?.toDate()).toUTCString()).format("LT")}</span>
                    </p>
                ))}

            </div>


            <div className="chat__footer">
                <IconButton><InsertEmoticon /></IconButton>
                <form>
                    <input placeholder="Type a message" type="input" value={input} onChange={(e) => setInput(e.target.value)} />
                    <button type="submit" onClick={handleSubmit} >Send the message</button>
                </form>
                <Mic />
            </div>

        </div>
    );
}

export default Chat;
