import React from "react";

const SignOutButton = ({ onSignOut }) => {
  return (
    <div className="mt-2">
      <button
        onClick={onSignOut}
        className="text-white px-5 text-md py-3 rounded-md bg-red-400 hover:bg-red-600 duration-500 transition ease-in-out font-semibold"
      >
        Sign out
      </button>
    </div>
  );
};

export default SignOutButton;
