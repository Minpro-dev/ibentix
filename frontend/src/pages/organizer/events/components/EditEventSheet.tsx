import { Formik, Form, Field } from "formik";
import { RiCloseLine } from "react-icons/ri";
import Button from "../../../../ui/Button";
import type { Event } from "../../../../types/eventType";
import { inputClass, labelClass } from "../../../../utils/InputStylingConstant";
import { useEditEventData } from "../hooks/useEditEventData";
import Swal from "sweetalert2";

interface EditEventSheetProps {
  isOpen: boolean;
  onClose: () => void;
  eventData: Event | null;
}

export default function EditEventSheet({
  isOpen,
  onClose,
  eventData,
}: EditEventSheetProps) {
  const { mutateAsync, isPending } = useEditEventData(eventData!.eventId);

  const handleDelete = (data: FormData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You can edit this later",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Yes, save it!",

      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-xl px-5 py-2.5",
        cancelButton: "rounded-xl px-5 py-2.5",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync(data);
        onClose();
      }
    });
  };

  if (!eventData) return null;

  return (
    <>
      {/* Overlay / Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-60 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sheet Container */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-2/3 lg:w-1/2 bg-white z-70 shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        {/* Header Sheet */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Edit Event</h2>
            <p className="text-zinc-500 text-xs">
              Update your event information below.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer">
            <RiCloseLine size={24} className="text-zinc-400" />
          </button>
        </div>

        {/* Scrollable Form Area */}
        <div className="h-[calc(100%-80px)] overflow-y-auto p-8">
          <Formik
            initialValues={{
              title: eventData.title || "",
              description: eventData.description || "",
              availableSlot: eventData.availableSlot || 0,
              thumbnail: eventData.thumbnailUrl || null,
              isFree: Number(eventData.price) === 0,
              price: Number(eventData.price) || 0,
            }}
            enableReinitialize={true} // PENTING: agar form update saat eventData berubah
            onSubmit={(values) => {
              const formData = new FormData();

              formData.append("title", values.title);
              formData.append("description", values.description);
              formData.append("availableSlot", values.availableSlot.toString());
              formData.append("isFree", values.isFree.toString());
              formData.append("price", values.price.toString());
              console.log("Updating event:", values);
              if (values.thumbnail !== null) {
                formData.append("thumbnail", values.thumbnail);
              }
              handleDelete(formData);
            }}>
            {({ errors, touched, values, setFieldValue }) => (
              <Form className="space-y-6 pb-20">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      Event Title
                    </label>
                    <Field
                      name="title"
                      className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      Description
                    </label>
                    <Field
                      name="description"
                      as="textarea"
                      className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-sm h-32 resize-none"
                    />
                  </div>

                  {/* FILE */}
                  <div className="py-4">
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
                    {/* {errors.thumbnail && touched.thumbnail && (
                      <p className="text-red-500 text-[10px] mt-1">
                        {errors.thumbnail}
                      </p>
                    )} */}
                  </div>

                  {/* Pricing Section Minimalist */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100/50">
                      <div className="flex items-center gap-3 mb-4">
                        <Field
                          type="checkbox"
                          name="isFree"
                          id="edit-isFree"
                          className="w-5 h-5 accent-indigo-600"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>,
                          ) => {
                            const checked = e.target.checked;
                            setFieldValue("isFree", checked);

                            if (checked) {
                              setFieldValue("price", 0);
                            }
                          }}
                        />
                        <label
                          htmlFor="edit-isFree"
                          className="text-sm font-bold text-indigo-900">
                          This is a Free Event
                        </label>
                      </div>
                      {!values.isFree && (
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 font-bold">
                            Rp
                          </span>
                          <Field
                            name="price"
                            type="number"
                            className="w-full pl-12 pr-4 py-3 bg-white border border-indigo-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      )}
                    </div>

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
                  </div>
                </div>

                {/* Fixed Footer Action */}
                <div className="fixed bottom-0 right-0 w-full  p-6 bg-white border-t border-zinc-100 flex gap-3">
                  <Button type="button" variant="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Hold on..." : "Save Changes"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
