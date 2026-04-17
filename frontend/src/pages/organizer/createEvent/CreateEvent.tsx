import { Link } from "react-router-dom";
import Button from "../../../ui/Button";
// import api from "../../../api/axiosInstance";
import { Field, Form, Formik } from "formik";
import { createEventSchema } from "./schema/createEventSchema";

// const handleCreateEvent = async () => {
//   try {
//     await api.post("");
//   } catch (error) {
//     console.log(error);
//   }
// };
function CreateEvent() {
  const inputClass =
    "w-full border border-zinc-300 rounded-xl px-4 py-2 text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white";
  const labelClass = "block text-sm font-semibold text-zinc-700 mb-2";

  // 2. FORMIK INITIALIZATION
  // const formik = useFormik({});

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
          availableSlot: "",
          organizerId: "",
          locationName: "",
          address: "",
          city: "",
          eventDate: "",
          startSellingDate: "",
          endSellingDate: "",
          isFree: false,
          price: "",
          thumbnail: null,
        }}
        validationSchema={createEventSchema}
        onSubmit={(values) => {
          console.log("Form Submitted:", values);
          // Logic hit API
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
                  <option disabled selected>
                    Select a profile
                  </option>
                  <option>Purwadhika</option>
                  <option>BSD Event</option>
                </Field>
                <Link
                  to="/"
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
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFieldValue("isFree", checked);

                      // PENGKONDISIAN: Jika checked, paksa price jadi 0
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
                type="submit"
                className="w-full py-4 text-base font-bold shadow-lg shadow-indigo-200">
                Create Event Now
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
