function CreateEvent() {
  return (
    <main>
      <form>
        {/* Event name */}
        <div>
          <label className="text-zinc-600">Event Name</label>
          <div className="py-3">
            <input
              placeholder="Type event title"
              className="border border-zinc-400 rounded-full w-[80%] h-10 px-4 py-2 text-zinc-600 focus:outline-none focus:ring focus:ring-indigo-400"
            />
          </div>
        </div>
        {/* Description */}
        <div>
          <label className="text-zinc-600">Description</label>
          <div className="py-3">
            <textarea
              className="border border-zinc-400 rounded-xl w-[80%] h-40 px-4 py-2 text-zinc-600 focus:outline-none focus:ring focus:ring-indigo-400"
              placeholder="Type event description"
            />
          </div>
        </div>
        {/* Available slot */}
        <div>
          <label className="text-zinc-600">Avaliable slot</label>
          <div className="py-3">
            <input
              type="number"
              className="border border-zinc-400 rounded-full w-[80%] h-10 px-4 py-2 text-zinc-600 focus:outline-none focus:ring focus:ring-indigo-400"
              required
              placeholder="Type a number between 1 to 10"
              min="1"
              max="1000"
            />
          </div>
        </div>
      </form>
    </main>
  );
}

export default CreateEvent;
