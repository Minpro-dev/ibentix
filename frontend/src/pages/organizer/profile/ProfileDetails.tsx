import { useRef } from "react";
import { Formik, Form, Field } from "formik";
import { RiCameraSwitchLine, RiLockLine, RiMailLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { useProfile } from "./hooks/useProfile";
import { ProfileSchema } from "./schemas/profileSchema";
import Button from "../../../ui/Button";

export default function ProfileDetails() {
  const { user, isLoading, updateProfile } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (isLoading)
    return <div className="p-10 text-zinc-400">Loading Profile...</div>;

  const handleSubmit = (values: any) => {
    Swal.fire({
      title: "Update Profile?",
      text: "Are you sure you want to save these changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#f4f4f5",
      cancelButtonText: "<span style='color: #71717a'>Cancel</span>",
      confirmButtonText: "Yes, Update It",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        if (values.avatarFile) {
          formData.append("avatar", values.avatarFile);
        }
        updateProfile.mutate(formData);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-10 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
          Account Settings
        </h1>
        <p className="text-zinc-500 text-sm py-3">
          Manage your public information and account data.
        </p>
      </div>

      <Formik
        initialValues={{
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          email: user?.email || "", // Read only
          phone: user?.phone || "", // Read only
          avatarUrl: user?.avatar || "",
          avatarFile: null,
        }}
        validationSchema={ProfileSchema}
        onSubmit={handleSubmit}>
        {({ values, setFieldValue, errors, touched, dirty }) => (
          <Form className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* LEFT: AVATAR EDIT */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <div className="w-32 h-32 rounded-[40px] bg-indigo-50 border-4 border-white shadow-xl overflow-hidden">
                  <img
                    src={
                      values.avatarFile
                        ? URL.createObjectURL(values.avatarFile)
                        : values.avatarUrl
                    }
                    className="w-full h-full object-cover"
                    alt="Avatar"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-3 bg-indigo-600 text-white rounded-2xl shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  <RiCameraSwitchLine size={20} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    setFieldValue("avatarFile", e.currentTarget.files?.[0])
                  }
                />
              </div>
              <p className="text-[10px] text-zinc-400 text-center">
                Click icon to change <br /> profile picture
              </p>
            </div>

            {/* RIGHT: FORM FIELDS */}
            <div className="md:col-span-2 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Editable Fields */}
                <div className="space-y-2">
                  <label className="text-sm text-zinc-500 tracking-widest ml-1">
                    First Name
                  </label>
                  <Field
                    name="firstName"
                    className={`w-full px-5 py-4 bg-white border ${touched.firstName && errors.firstName ? "border-red-500" : "border-zinc-300"} rounded-2xl text-sm focus:ring-2 focus:ring-indigo-300 outline-none transition-all mt-2 text-zinc-600 `}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-500 tracking-widest ml-1">
                    Last Name
                  </label>
                  <Field
                    name="lastName"
                    className={`w-full px-5 py-4 bg-white border ${touched.lastName && errors.lastName ? "border-red-500" : "border-zinc-300"} rounded-2xl text-sm focus:ring-2 focus:ring-indigo-300 outline-none transition-all mt-2 text-zinc-600`}
                  />
                </div>
              </div>

              {/* Read Only Fields */}
              <div className="space-y-6 pt-6 border-t border-zinc-50">
                <div className="space-y-2 opacity-60">
                  <label className="text-sm text-zinc-500 tracking-widest ml-1 flex gap-3 items-center">
                    <RiMailLine /> Email Address (Private)
                  </label>
                  <input
                    disabled
                    value={values.email}
                    className="w-full px-5 py-4 bg-zinc-50 border border-zinc-300 rounded-2xl text-sm text-zinc-500 cursor-not-allowed mt-2 items-center"
                  />
                </div>
                <div className="space-y-2 opacity-60">
                  <label className="text-sm text-zinc-500 tracking-widest ml-1 flex gap-3">
                    <RiLockLine /> Account Role
                  </label>
                  <input
                    disabled
                    value={user?.role}
                    className="w-full px-5 py-4 bg-zinc-50 border border-zinc-300 rounded-2xl text-sm text-zinc-500 cursor-not-allowed mt-2 items-center"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={!dirty || updateProfile.isPending}>
                  {updateProfile.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
