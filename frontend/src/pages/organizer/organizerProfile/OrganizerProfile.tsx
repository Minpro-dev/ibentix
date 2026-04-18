import CreateOrganizerProfile from "./components/CreateOrganizerProfile";
import OrganizerProfileList from "./components/OrganizerProfileList";

function OrganizerProfile() {
  return (
    <main className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8">
      <div>
        <OrganizerProfileList />
      </div>
      <div>
        <CreateOrganizerProfile />
      </div>
    </main>
  );
}

export default OrganizerProfile;
