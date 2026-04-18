import { Field, Form, Formik } from "formik";
import { inputClass, labelClass } from "../../../../utils/InputStylingConstant";
import { createOrganizerProfileShema } from "../schema/createOrganizerProfileSchema";
import Button from "../../../../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { handleCreateOrganizerProfile } from "../../../../services/organizerProfileService";
import { toast } from "sonner";

function CreateOrganizerProfile() {
  // organizer mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => handleCreateOrganizerProfile(data),

    onSuccess: () => {
      toast.success(`Organizer profile created`);
    },

    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <div>
      <div className="py-5">
        <p>Fill the form to create</p>
      </div>

      <Formik
        initialValues={{
          name: "",
          image: null,
        }}
        validationSchema={createOrganizerProfileShema}
        onSubmit={(values) => {
          const formData = new FormData();

          formData.append("name", values.name);
          if (values.image) {
            formData.append("image", values.image);
          }

          //   console.log(values);
          mutate(formData);
        }}>
        {({ errors, touched, setFieldValue }) => (
          <Form>
            {/* Name */}
            <div className="pb-5">
              <label className={labelClass}>Profile Name</label>
              <Field
                name="name"
                type="text"
                placeholder="e.g. Jakarta Tech Conference 2026"
                className={inputClass}
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>
              )}
            </div>

            {/* Profile */}
            <div className="pb-5">
              <label className={labelClass}>Profile Image</label>
              <input
                name="image"
                type="file"
                className="w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                onChange={(e) => {
                  // Access the first selected file
                  setFieldValue("image", e.currentTarget.files?.[0]);
                }}
              />
              <p className="text-[10px] text-zinc-400 mt-2 uppercase font-bold">
                JPG, PNG, JPEG ONLY
              </p>
              {errors.image && touched.image && (
                <p className="text-red-500 text-[10px] mt-1">{errors.image}</p>
              )}
            </div>
            <Button disabled={isPending}>
              {isPending ? "Hold on..." : "Create Profile"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateOrganizerProfile;
