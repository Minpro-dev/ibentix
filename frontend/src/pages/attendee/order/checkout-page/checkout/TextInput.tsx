import { Field, ErrorMessage } from "formik";
import { inputClass, labelClass, errorTextClass } from "./formStyle";

export const TextInput = ({ label, name, type = "text", placeholder }: any) => {
  return (
    <div>
      <label className={labelClass}>{label}</label>

      <Field name={name}>
        {({ field, meta }: any) => (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={inputClass(meta.touched && meta.error)}
          />
        )}
      </Field>

      <ErrorMessage name={name}>
        {(msg) => <p className={errorTextClass}>{msg}</p>}
      </ErrorMessage>
    </div>
  );
};