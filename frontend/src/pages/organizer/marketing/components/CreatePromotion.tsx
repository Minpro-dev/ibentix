import { useState } from "react";
import EventPromotionList from "./EventPromotionList";
import PromotionForm from "./PromotionForm";
import type { SelectedEventType } from "../types/selectedEventType";
import SelectedEventCard from "./SelectedEventCard";

function CreatePromotion() {
  const [selectedEvent, setSelectedEvent] = useState<SelectedEventType>({
    eventId: "",
    title: "",
    location: "",
  });

  const handleSelectEvent = (
    eventId: string,
    title: string,
    location: string,
  ) => {
    setSelectedEvent({ eventId, title, location });
  };

  return (
    <div>
      <p>Create Promotion</p>

      <div className="block md:flex gap-8">
        <div className="md:w-[50%] w-full">
          <p>List</p>
          <EventPromotionList
            onSelectEvent={handleSelectEvent}
            selectedEvent={selectedEvent}
          />
        </div>
        <div className="md:w-[50%] w-full">
          <SelectedEventCard selectedEvent={selectedEvent} />
          <PromotionForm />
        </div>
      </div>
    </div>
  );
}

export default CreatePromotion;
