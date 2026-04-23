import defaultThumbnail from "../../../../assets/static/EventThumnailImage.jpg";

interface OrderEventPreviewProps {
  thumbnailUrl: string | null;
  locationName: string;
  title: string;
  city: string;
  qty: number;
}
function OrderEventPreview({
  thumbnailUrl,
  locationName,
  title,
  city,
  qty,
}: OrderEventPreviewProps) {
  return (
    <section className="flex gap-4 p-4 border border-gray-100 rounded-2xl bg-white shadow-sm">
      <img
        src={thumbnailUrl || defaultThumbnail}
        className="w-24 h-24 object-cover rounded-xl"
        alt="Event"
      />
      <div className="flex flex-col justify-center">
        <h2 className="font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">
          {locationName}, {city}
        </p>
        <p className="text-xs font-medium text-indigo-600 mt-2">
          {qty} Ticket{qty > 1 ? "(s)" : ""}
        </p>
      </div>
    </section>
  );
}

export default OrderEventPreview;
