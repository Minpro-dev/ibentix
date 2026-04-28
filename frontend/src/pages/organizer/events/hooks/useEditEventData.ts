import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleEditEventDetails } from "../../../../services/eventService";
import { toast } from "sonner";

export const useEditEventData = (eventId: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: FormData) => handleEditEventDetails(data, eventId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event edited succefully");
    },

    onError: (error: any) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";

      toast.error(errorMessage);
    },
  });

  return { mutateAsync, isPending };
};
