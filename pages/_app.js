import "../styles/globals.css";
import { useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push(`/${room}`);
  };

  return (
    <Component
      handleLoginChange={(e) => setUsername(e.target.value)}
      handleRoomId={(e) => setRoom(e.target.value)}
      username={username}
      room={room}
      handleLogin={handleLogin}
      {...pageProps}
    />
  );
}

export default MyApp;
