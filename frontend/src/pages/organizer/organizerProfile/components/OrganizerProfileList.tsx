import { useQuery } from "@tanstack/react-query";
import OrganizerProfileCard from "./OrganizerProfileCard";
import { handleGetOrganizerProfiles } from "../../../../services/organizerProfileService";
import type { OrganizerProfile } from "../../../../types/organizerProfileType";
import { OrganizerProfileCardSkeleton } from "./OrganizerProfileCardSkeleton";

function OrganizerProfileList() {
  const { data, isLoading } = useQuery({
    queryKey: ["organizer-profiles"],
    queryFn: handleGetOrganizerProfiles,
  });

  const organizerProfiles = data?.data.data;
  return (
    <div>
      <div className="py-5">
        <h1>Your Profile</h1>
      </div>

      <div className="border py-2 border-slate-200 h-75 md:h-80 overflow-y-auto rounded-xl">
        {/* CARD */}
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <OrganizerProfileCardSkeleton key={index} />
            ))
          : organizerProfiles?.map((profile: OrganizerProfile) => (
              <OrganizerProfileCard
                key={profile.organizerId}
                name={profile.name}
                image={profile.image}
              />
            ))}
      </div>
    </div>
  );
}

export default OrganizerProfileList;
