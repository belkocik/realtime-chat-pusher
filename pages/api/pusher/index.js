import { pusher } from "../../../lib";

// channel handler
export default async function handler(req, res) {
  const { username, room } = req.body;
  await pusher.trigger(`${room}`, "chat-event", {
    username,
    room,
  });

  res.json({ message: "completed" });
}
