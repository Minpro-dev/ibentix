import { RiDeleteBack2Fill } from "react-icons/ri";
import type { organizerProfileProps } from "../types/organizerProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleDeleteOrganizerProfile } from "../../../../services/organizerProfileService";
import { toast } from "sonner";
import Swal from "sweetalert2";

function OrganizerProfileCard({ id, name, image }: organizerProfileProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => handleDeleteOrganizerProfile(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizer-profiles"] });
      toast.success("Profile has been deleted");
    },

    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this Profile!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Yes, delete it!",

      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-xl px-5 py-2.5",
        cancelButton: "rounded-xl px-5 py-2.5",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id);
      }
    });
  };
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
          {isPending ? (
            <span className="loading loading-spinner text-indigo-300 text-2xl"></span>
          ) : (
            <RiDeleteBack2Fill
              onClick={() => handleDelete(id)}
              className="text-2xl text-red-500 cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default OrganizerProfileCard;
