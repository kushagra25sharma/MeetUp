import { useState, useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from "../../firebase";
import { Link } from "react-router-dom";


const SidebarChat = ({ addNewChat, id, name }) => {
    const [seed, setSeed] = useState(0);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection("rooms").doc(id).collection("messages").orderBy("timestamp", "desc").onSnapshot((snapshot) => 
           setMessages(snapshot.docs.map((doc) => doc.data())));

        return () => {
            unsubscribe();
        }   
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);


    const createChat = () => {
        const roomName = prompt("Enter the room name");

        if(roomName){
            db.collection('rooms').add({
                name: roomName,
            });
        }
    }

    return (
        (!addNewChat) ? (
            <Link to={`/rooms/${id}`} >
                <div className="sidebarChat">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                    <div key={id} className="sidebarChat__info" >
                        <h1>{name}</h1>
                        <p className={!messages[0]?.message ? "sidebarChat__photo" : "sidebarChat__lastMessage"}>{messages[0]?.message || (messages[0]?.file && "Photo")}</p> 
                    </div>
                </div>
            </Link>
        ) : (
            <div className="sidebarChat" onClick={createChat} >
                <h2>Add new Chat</h2>
            </div>
        )
    );
}

export default SidebarChat;