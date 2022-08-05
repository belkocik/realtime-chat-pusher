import { pusher } from "../../../lib";

// presence channel handler
export default async function handler(req, res) {
  const { message, username, room } = req.body;
  // trigger a new post event via pusher
  await pusher.trigger(`presence-${room}`, "chat-update", {
    message,
    username,
  });

  res.json({ status: 200 });
}
