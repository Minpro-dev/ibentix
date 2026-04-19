import { Star, Edit3, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import type { Review } from '../types/reviewType';

interface ReviewCardProps {
  review: Review;
  onDelete: (id: string) => Promise<void> | void;
  featured?: boolean;
  className?: string;
}

export default function ReviewCard({
  review,
  onDelete,
  featured = false,
  className = "",
}: ReviewCardProps) {

  const stars = Array(5).fill(0).map((_, i) => (
    <Star
      key={i}
      size={featured ? 18 : 14}
      className={
        i < review.rating
          ? 'fill-primary text-primary'
          : 'text-gray-300'
      }
    />
  ));

  /* ================= FEATURED ================= */
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${className}`}
      >
        <div className="flex flex-col md:flex-row gap-6 h-full">

          {/* Image */}
          <div className="w-full md:w-1/3 h-48 rounded-lg overflow-hidden relative">
            <img
              src={review.image}
              alt={review.title}
              className="w-full h-full object-cover"
            />
            {review.price && (
              <span className="absolute bottom-2 left-2 bg-white text-primary text-xs font-semibold px-2 py-1 rounded-md shadow">
                Rp {review.price.toLocaleString('id-ID')}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col">

            {/* Title + rating */}
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-900 leading-snug">
                {review.title}
              </h3>
              <div className="flex gap-1">{stars}</div>
            </div>

            {/* Date */}
            <p className="text-xs text-gray-400 mb-3">
              {review.date}
            </p>

            {/* Comment */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {review.comment}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto">

              <div className="flex gap-4">
                <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <Edit3 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => onDelete(review.id)}
                  className="flex items-center gap-1 text-sm text-red-500 hover:underline"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>

              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                {review.status}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  /* ================= NORMAL CARD ================= */
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4 h-full ${className}`}
    >

      {/* Image */}
      <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
        <img
          src={review.image}
          alt={review.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">

        {/* Title + stars */}
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
            {review.title}
          </h3>
          <div className="flex gap-0.5">{stars}</div>
        </div>

        {/* Date */}
        <p className="text-[11px] text-gray-400 mb-2">
          {review.date}
        </p>

        {/* Comment */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {review.comment}
        </p>

        {/* Actions */}
        <div className="flex gap-4 mt-auto text-xs">
          <button className="text-primary hover:underline flex items-center gap-1">
            <Edit3 size={12} />
            Edit
          </button>
          <button
            onClick={() => onDelete(review.id)}
            className="text-red-500 hover:underline flex items-center gap-1"
          >
            <Trash2 size={12} />
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}