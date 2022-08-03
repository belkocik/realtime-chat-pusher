const Notifications = ({ onlineUsersCount }) => {
  return (
    <>
      <div>
        <span className="text-purple-700"> {onlineUsersCount} </span> user(s)
        online now
      </div>
    </>
  );
};

export default Notifications;
