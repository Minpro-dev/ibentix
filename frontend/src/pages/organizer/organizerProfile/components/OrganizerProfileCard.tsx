import { RiDeleteBack2Fill } from "react-icons/ri";

function OrganizerProfileCard() {
  return (
    <div>
      <div className="flex justify-between items-center py-3 px-5 border-b border-slate-200 hover:bg-slate-100 transition-all duration-300">
        <div className="flex gap-4 items-center">
          {/* Avatar */}
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-9 rounded-full ring-2 ring-offset-2">
              <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
          </div>

          {/* Name */}
          <div>
            <h4 className="text-base text-zinc-600">Purwadhika</h4>
          </div>
        </div>

        <div>
          <RiDeleteBack2Fill className="text-2xl text-red-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default OrganizerProfileCard;
