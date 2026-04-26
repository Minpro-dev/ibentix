import { Link, useNavigate } from "react-router-dom";
import Button from "../../../ui/Button";
import { Field, Form, Formik } from "formik";
import { createEventSchema } from "./schema/createEventSchema";
import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axiosInstance";
import type { OrganizerProfile } from "../../../types/organizerProfileType";
import { EventCategory } from "../../../types/eventCategory";
import { handleCreateEvent } from "../../../services/eventService";
import { useState } from "react";
import { toast } from "sonner";
import { formatEnum } from "../../../utils/eventEnumFormatter";
import { inputClass, labelClass } from "../../../utils/InputStylingConstant";

function CreateEvent() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useQuery({
    queryKey: ["organizer-profile"],
    queryFn: async () => {
      return await api.get("/organizer-profile");
    },
  });

  const organizerProfiles = data?.data.data;

  return (
    <main className="max-w-4xl mx-auto py-10 px-6">
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-zinc-900">Create New Event</h1>
        <p className="text-zinc-500 text-sm">
          Fill in the details below to host your amazing event.
        </p>
      </header>

      <Formik
        initialValues={{
          title: "",
          description: "",
          availableSlot: 0,
          organizerId: "",
          locationName: "",
          address: "",
          city: "",
          category: "",
          eventDate: "",
          startSellingDate: "",
          endSellingDate: "",
          isFree: false,
          price: 0,
          thumbnail: null,
        }}
        validationSchema={createEventSchema}
        onSubmit={async (values, { resetForm }) => {
          const formData = new FormData();

          formData.append("title", values.title);
          formData.append("description", values.description);
          formData.append("availableSlot", values.availableSlot.toString());
          formData.append("organizerId", values.organizerId);
          formData.append("locationName", values.locationName);
          formData.append("address", values.address);
          formData.append("city", values.city);
          formData.append("eventDate", values.eventDate);
          formData.append("startSellingDate", values.startSellingDate);
          formData.append("endSellingDate", values.endSellingDate);
          formData.append("isFree", values.isFree.toString());
          formData.append("price", values.price.toString());

          if (values.thumbnail !== null) {
            formData.append("thumbnail", values.thumbnail);
          }

          try {
            setIsLoading(true);
            const response: any = await handleCreateEvent(formData);

            setIsLoading(false);
            if (response.status === 201) {
              navigate("/organizer/events");
            }

            toast.success("Your event is now live");
          } catch (error) {
            setIsLoading(false);

            console.log(error);
          }

          resetForm();
        }}>
        {({ values, errors, touched, setFieldValue }) => (
          <Form className="space-y-8">
            {/* SECTION 1: BASIC INFO */}
            <section className="space-y-6">
              <div>
                <label className={labelClass}>Event Name</label>
                <Field
                  name="title"
                  type="text"
                  placeholder="e.g. Jakarta Tech Conference 2026"
                  className={inputClass}
                />
                {errors.title && touched.title && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <Field
                  name="description"
                  as="textarea"
                  className={`${inputClass} h-32 resize-none`}
                  placeholder="Tell us more about the event..."
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Event category */}
              <div>
                <label className={labelClass}>Event Category</label>
                <Field
                  name="category"
                  as="select"
                  className={`${inputClass} appearance-none`}>
                  <option value="" disabled>
                    Select event category
                  </option>
                  {Object.values(EventCategory).map((cat) => (
                    <option key={cat} value={cat}>
                      {formatEnum(cat)}
                    </option>
                  ))}
                </Field>
                {errors.category && touched.category && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.category}
                  </p>
                )}
              </div>
            </section>

            {/* SECTION 2: LOGISTICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Available Slot</label>
                <Field
                  name="availableSlot"
                  type="number"
                  className={inputClass}
                  placeholder="100"
                  min="1"
                />
                {errors.availableSlot && touched.availableSlot && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.availableSlot}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>Organizer Profile</label>
                <Field
                  name="organizerId"
                  as="select"
                  className={`${inputClass} appearance-none`}>
                  <option value="" disabled>
                    Select a profile
                  </option>
                  {organizerProfiles?.map((profile: OrganizerProfile) => (
                    <option
                      key={profile.organizerId}
                      value={profile.organizerId}>
                      {profile.name}
                    </option>
                  ))}
                </Field>
                <Link
                  to="/organizer/organizer-profile"
                  className="text-xs text-indigo-600 hover:underline mt-2 inline-block">
                  + Create new organizer profile
                </Link>
                {errors.organizerId && touched.organizerId && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.organizerId}
                  </p>
                )}
              </div>
            </div>

            {/* SECTION 3: MEDIA & LOCATION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Event Poster/Thumbnail</label>
                <input
                  name="thumbnail"
                  type="file"
                  className="w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                  onChange={(e) => {
                    // Access the first selected file
                    setFieldValue("thumbnail", e.currentTarget.files?.[0]);
                  }}
                />
                <p className="text-[10px] text-zinc-400 mt-2 uppercase font-bold">
                  JPG, PNG, JPEG ONLY
                </p>
                {errors.thumbnail && touched.thumbnail && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.thumbnail}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>Location Name</label>
                <Field
                  name="locationName"
                  type="text"
                  placeholder="e.g. Grand Indonesia"
                  className={inputClass}
                />
                {errors.locationName && touched.locationName && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.locationName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Address</label>
                <Field
                  name="address"
                  type="text"
                  placeholder="Full address"
                  className={inputClass}
                />
                {errors.address && touched.address && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.address}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass}>City</label>
                <Field
                  name="city"
                  type="text"
                  placeholder="e.g. Jakarta Pusat"
                  className={inputClass}
                />
                {errors.city && touched.city && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.city}</p>
                )}
              </div>
            </div>

            {/* SECTION 4: DATES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Event Date & Time</label>
                <Field
                  name="eventDate"
                  type="datetime-local"
                  className={inputClass}
                />
                {errors.eventDate && touched.eventDate && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.eventDate}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass}>Start Selling Date</label>
                <Field
                  name="startSellingDate"
                  type="date"
                  className={inputClass}
                />
                {errors.startSellingDate && touched.startSellingDate && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.startSellingDate}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass}>End Selling Date</label>
                <Field
                  name="endSellingDate"
                  type="date"
                  className={inputClass}
                />
                {errors.endSellingDate && touched.endSellingDate && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.endSellingDate}
                  </p>
                )}
              </div>
            </div>

            {/* SECTION 5: PRICING */}
            <div className="pt-6 border-t border-zinc-100">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-200 min-w-50">
                  <Field
                    name="isFree"
                    type="checkbox"
                    id="isFree"
                    className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 border-zinc-300"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const checked = e.target.checked;
                      setFieldValue("isFree", checked);

                      if (checked) {
                        setFieldValue("price", 0);
                      }
                    }}
                  />
                  <label
                    htmlFor="isFree"
                    className="font-semibold text-zinc-700">
                    Free Event
                  </label>
                  {errors.isFree && touched.isFree && (
                    <p className="text-red-500 text-[10px] mt-1">
                      {errors.isFree}
                    </p>
                  )}
                </div>

                <div className="flex-1 w-full">
                  <label className={labelClass}>Price (IDR)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-medium">
                      Rp
                    </span>
                    <Field
                      name="price"
                      disabled={values.isFree}
                      type="number"
                      placeholder="0"
                      className={`${inputClass} pl-12`}
                    />
                  </div>
                  {errors.price && touched.price && (
                    <p className="text-red-500 text-[10px] mt-1">
                      {errors.price}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-10">
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full py-4 text-base font-bold shadow-lg shadow-indigo-200">
                {isLoading ? "Loading..." : "Create Event Now"}
              </Button>
            </div>
            {/* </form> */}
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default CreateEvent;
