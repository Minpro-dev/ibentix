import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  handleEditProfile,
  handleGetProfile,
} from "../../../../services/profileService";

export const useProfile = () => {
  const queryClient = useQueryClient();

  // Fetch Data
  const { data: user, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: handleGetProfile,
  });

  // Update Mutation
  const updateProfile = useMutation({
    mutationFn: handleEditProfile,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: res.message,
        confirmButtonColor: "#4f46e5",
      });
    },
    onError: (err: any) => {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    },
  });

  return { user, isLoading, updateProfile };
};
