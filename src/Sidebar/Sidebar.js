import { useState, useEffect } from "react";
import db from "../firebase";
import "./Sidebar.css"
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat/SidebarChat";

const Sidebar = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // onSnapshot takes the snapshot of the document we have added in our database and in real time too whenever our database gets updated it take a snap
        // returns all the created rooms (documents) in our rooms constant ( its a listner)
        
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        ));
        
        return () => { // clean up function that means we will always detach the above real time listner after we are done using it.
            unsubscribe(); 
        }
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src="https://avatars.githubusercontent.com/u/69106317?v=4" />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new Chat" type="text" />
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {/* adding the rooms already created */}
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;