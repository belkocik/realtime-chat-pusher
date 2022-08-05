import { useState, useEffect } from "react";
import Pusher from "pusher-js"; // client side
import axios from "axios";
import { useRouter } from "next/router";
import SignOutButton from "../components/SignOutButton";
import ChatList from "../components/ChatList";
import Notifications from "../components/Notifications";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ username, room }) => {
  const router = useRouter();
  const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
    cluster: "eu",
    authEndpoint: "api/pusher/auth",
    auth: { params: { username, room } },
  });

  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [usersRemoved, setUsersRemoved] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const channel = pusher.subscribe(`presence-${room}`);
      // when a user subscribes to the channel
      channel.bind("pusher:subscription_succeeded", (members) => {
        setOnlineUsersCount(members.count);
      });

      // when a new member joins the chat

      channel.bind("pusher:member_added", (member) => {
        // console.log("count",channel.members.count)
        setOnlineUsersCount(channel.members.count);
        setOnlineUsers((prevState) => [
          ...prevState,
          { username: member.info.username },
        ]);
      });

      // when a member leaves the chat
      channel.bind("pusher:member_removed", (member) => {
        setOnlineUsersCount(channel.members.count);
        setUsersRemoved((prevState) => [...prevState, member.info.username]);
      });

      // when somebody sends a message
      channel.bind("chat-update", (data) => {
        const { message, username, room } = data;

        setChats((prevState) => [...prevState, { username, message, room }]);
      });
    }

    return () => {
      pusher.unsubscribe(`presence-${room}`);
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/pusher/chat-update", {
      message,
      username,
      room,
    });
    setMessage("");
  };

  const handleSignOut = () => {
    pusher.unsubscribe("presence-channel");
    router.push("/");
  };

  return (
    <div className="m-auto h-screen bg-cyan-600 shadow-lg p-2 lg:p-0 ">
      <div className="max-w-5xl m-auto pt-10  ">
        <div className="flex flex-col bg-white px-4 py-4  rounded-lg  ">
          <div className="flex align-center justify-center text-4xl text-teal-400 font-bold p-4 ">
            Secret Chat Room
          </div>
          <ScrollToBottom>
            <div className=" flex w-full rounded-lg px-5 py-5 lg:h-[54rem]  min-h-[18rem] h-screen max-h-[24rem] lg:max-h-[48rem] ">
              <div className="flex-1  ">
                {chats.map((chat, id) => (
                  <ChatList key={id} chat={chat} currentUser={username} />
                ))}
              </div>
            </div>
          </ScrollToBottom>
        </div>
        <div className="mt-4 ">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-4 items-baseline  "
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="col-span-3 focus:outline-none focus:ring-1 focus:ring-purple-500 border-2 w-full border-gray-200 rounded-l-md px-2 py-2"
              placeholder="Text here"
              required
            />
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 duration-500 transition ease-in-out px-2 rounded-r-md text-white max-w-sm h-full font-semibold"
            >
              Send
            </button>
          </form>
          <div className="flex justify-between align-center mt-4 border-gray-200 rounded-md px-2 py-2 bg-teal-50 align-center">
            <div>
              <div className="font-bold">
                Hello, <span className="text-yellow-400"> {username}</span>
                {" 😊"}
              </div>
              <SignOutButton onSignOut={handleSignOut} />
            </div>
            <div>
              <Notifications
                onlineUsersCount={onlineUsersCount}
                usersRemoved={usersRemoved}
                onlineUsers={onlineUsers}
              />
            </div>
            <div className="text-gray-700 font-bold">
              <div>
                Room ID: <span className="text-yellow-400"> {room}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
