import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RiStarFill } from "react-icons/ri";
import { useReviewMutation } from "../hooks/useReviewMutation";

const reviewSchema = Yup.object().shape({
  rating: Yup.number().min(1, "Please give a rating").max(5).required(),
  title: Yup.string().min(5, "Title too short").required("Title is required"),
  description: Yup.string()
    .min(10, "Description too short")
    .required("Description is required"),
  isAnonymous: Yup.boolean(),
});

interface ReviewFormProps {
  orderId: string;
  eventId: string;
}

export default function ReviewForm({ orderId, eventId }: ReviewFormProps) {
  const { mutate, isPending } = useReviewMutation();

  return (
    <div className="bg-gray-50 p-6 rounded-3xl space-y-4">
      <div className="space-y-1">
        <h3 className="font-bold text-gray-900">Leave a Review</h3>
        <p className="text-[11px] text-gray-500">
          Share your experience with others
        </p>
      </div>

      <Formik
        initialValues={{
          rating: 0,
          title: "",
          description: "",
          isAnonymous: false,
        }}
        validationSchema={reviewSchema}
        onSubmit={(values) => mutate({ ...values, orderId, eventId })}>
        {({ setFieldValue, values }) => (
          <Form className="space-y-4">
            {/* RATING STARS */}
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFieldValue("rating", star)}
                  className={`transition-all ${values.rating >= star ? "text-amber-400" : "text-gray-200"}`}>
                  <RiStarFill size={28} />
                </button>
              ))}
            </div>

            {/* TITLE */}
            <div className="space-y-1">
              <Field
                name="title"
                placeholder="Review Title (e.g. Amazing Event!)"
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
              />
              <ErrorMessage
                name="title"
                component="p"
                className="text-[10px] text-red-500 ml-2"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-1">
              <Field
                as="textarea"
                name="description"
                rows={3}
                placeholder="Tell us more about the event..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
              />
              <ErrorMessage
                name="description"
                component="p"
                className="text-[10px] text-red-500 ml-2"
              />
            </div>

            {/* ANONYMOUS TOGGLE */}
            <label className="flex items-center gap-2 cursor-pointer w-fit">
              <Field
                type="checkbox"
                name="isAnonymous"
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs text-gray-600 font-medium">
                Post as Anonymous
              </span>
            </label>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all disabled:bg-gray-300">
              {isPending ? "Submitting..." : "Submit Review"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
