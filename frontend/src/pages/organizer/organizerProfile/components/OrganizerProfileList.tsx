import OrganizerProfileCard from "./OrganizerProfileCard";

function OrganizerProfileList() {
  return (
    <div>
      <div className="py-5">
        <h1>Your Profile</h1>
      </div>

      <div className="border py-2 border-slate-200 h-75 md:h-80 overflow-y-auto rounded-xl">
        {/* CARD */}
        <OrganizerProfileCard />
        <OrganizerProfileCard />
      </div>
    </div>
  );
}

export default OrganizerProfileList;
