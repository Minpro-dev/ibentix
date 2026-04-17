import { Link } from "react-router-dom";

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

        {/* Organizer profile */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-zinc-600 font-normal text-base">
            Organizer Profile
          </legend>
          <select
            defaultValue="Pick a browser"
            className="select border-zinc-400 bg-white text-zinc-600 focus:outline-none focus:ring focus:ring-indigo-400">
            <option disabled={true}>Select a profile</option>
            <option>Purwadhika</option>
            <option>BSD Event</option>
          </select>
          <span className="label text-zinc-600 hover:underline">
            <Link to="/">
              If you don't have any organizer profile, click here to create
            </Link>
          </span>
        </fieldset>

        {/* UPLOAD FILE */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Pick a picture</legend>
          <input
            type="file"
            className="file-input border-zinc-400 bg-white text-zinc-600 focus:outline-none focus:ring focus:ring-indigo-400"
          />
          <label className="label text-zinc-600">
            Accepted format: jpg, png, jpeg only
          </label>
        </fieldset>
      </form>
    </main>
  );
}

export default CreateEvent;
