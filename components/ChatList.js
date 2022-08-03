const ChatList = ({ chat, currentUser }) => {
  const flexClasses =
    chat.username !== currentUser ? "flex flex-col justify-end items-end" : "";

  const chatBgClasses =
    chat.username === currentUser
      ? "bg-slate-900 text-white animate-fade-in-up"
      : "bg-slate-300 w-full text-gray-800 animate-fade-in-down";

  return (
    <div className={flexClasses}>
      <div
        className={`${chatBgClasses} max-w-xs rounded-md mt-2 px-3 py-3 text-md`}
      >
        <p>{chat.message}</p>
      </div>
      <div
        className={`${
          chat.username !== currentUser
            ? "w-full text-right text-red-400 "
            : "text-yellow-400"
        }  font-bold`}
      >
        <small>{chat.username}</small>
      </div>
    </div>
  );
};

export default ChatList;
