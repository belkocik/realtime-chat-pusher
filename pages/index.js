export default function Home({ handleLogin, handleLoginChange, handleRoomId }) {
  return (
    <div className="flex flex-col items-center justify-center  min-h-screen">
      <div className="text-4xl text-teal-400 font-bold">Secret Chat Room</div>
      <div className="font-semibold">
        You can share a <span className="text-violet-500">room id</span> with
        others!
      </div>
      <div className="">
        <form
          onSubmit={handleLogin}
          className="px-3 py-20 rounded-md w-full max-w-2xl bg-white"
        >
          <input
            type="text"
            onChange={handleLoginChange}
            className=" rounded-md px-2 py-2 w-full border-2 border-teal-500 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            placeholder="Your name"
            required
          />
          <input
            type="text"
            onChange={handleRoomId}
            className=" rounded-md px-2 py-2 w-full border-2 border-teal-500 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 mt-2"
            placeholder="Your room id"
            required
          />
          <button className="bg-teal-400 hover:bg-teal-500 duration-500 transition ease-in-out items-center w-full py-3 px-3 mt-2 text-white rounded-md font-bold  ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
