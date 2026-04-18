import { RiDeleteBack2Fill } from "react-icons/ri";
import type { organizerProfileProps } from "../types/organizerProfile";

function OrganizerProfileCard({ name, image }: organizerProfileProps) {
  return (
    <div>
      <div className="flex justify-between items-center py-3 px-5 border-b border-slate-200 hover:bg-slate-100 transition-all duration-300">
        <div className="flex gap-4 items-center">
          {/* Avatar */}
          {image ? (
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-9 rounded-full ring-2 ring-offset-2">
                <img src={image} />
              </div>
            </div>
          ) : (
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-9 rounded-full ring-2 ring-offset-2 flex items-center justify-center">
                <div>
                  <p className="text-lg font-semibold text-indigo-400">
                    {name.at(0)?.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Name */}
          <div>
            <h4 className="text-base text-zinc-600">{name}</h4>
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
