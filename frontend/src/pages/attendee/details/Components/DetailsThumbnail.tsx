import defaultThumnail from "../../../../assets/static/EventThumnailImage.jpg";

interface DetailsThumbnailProps {
  thumbnailUrl: string | null;
  title: string;
}

function DetailsThumbnail({ thumbnailUrl, title }: DetailsThumbnailProps) {
  return (
    <div>
      <div className="aspect-16/10 bg-gray-100 overflow-hidden border rounded-xl border-gray-200">
        <img
          src={thumbnailUrl || defaultThumnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default DetailsThumbnail;
