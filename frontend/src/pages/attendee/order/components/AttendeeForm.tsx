import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { orderAttendeeSchema } from "../schemas/OrderAttendeeSchme";
import { RiMailLine, RiTicket2Line, RiUser3Line } from "react-icons/ri";

interface AttendeeFormProps {
  qty: number;
  handleSubmit: (values: any) => void;
}

function AttendeeForm({ qty, handleSubmit }: AttendeeFormProps) {
  const initialValues = {
    attendees: Array.from({ length: qty }, () => ({
      attendeeName: "",
      attendeeEmail: "",
    })),
  };
  return (
    <section className="space-y-6">
      <Formik
        initialValues={initialValues}
        validationSchema={orderAttendeeSchema}
        onSubmit={handleSubmit}>
        {({ values, errors, touched }) => (
          <Form id="order-submit" className="lg:col-span-7 space-y-8">
            <FieldArray name="attendees">
              {() => (
                <div className="space-y-6">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    Ticket Holder Details
                  </h3>

                  {values.attendees.map((_, index) => (
                    <div
                      key={index}
                      className="p-8 border border-gray-100 rounded-3xl bg-white space-y-6 transition-all hover:border-indigo-100">
                      <div className="flex items-center gap-2 mb-3 text-indigo-600">
                        <RiTicket2Line size={18} />
                        <span className="text-xs uppercase">
                          Ticket {index + 1}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* INPUT NAME */}
                        <div className="space-y-2">
                          <div className="relative">
                            <RiUser3Line className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <Field
                              name={`attendees.${index}.attendeeName`}
                              placeholder="Full Name"
                              className={`w-full pl-11 pr-4 py-3 bg-gray-50 border ${
                                touched.attendees?.[index]?.attendeeName &&
                                errors.attendees?.[index]
                                  ? "border-red-300"
                                  : "border-transparent"
                              } rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all`}
                            />
                          </div>
                          <ErrorMessage
                            name={`attendees.${index}.attendeeName`}
                            component="p"
                            className="text-[10px] text-red-500 font-medium ml-2"
                          />
                        </div>

                        {/* INPUT EMAIL */}
                        <div className="space-y-2">
                          <div className="relative">
                            <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <Field
                              name={`attendees.${index}.attendeeEmail`}
                              placeholder="Email Address"
                              className={`w-full pl-11 pr-4 py-3 bg-gray-50 border ${
                                touched.attendees?.[index]?.attendeeEmail &&
                                errors.attendees?.[index]
                                  ? "border-red-300"
                                  : "border-transparent"
                              } rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all`}
                            />
                          </div>
                          <ErrorMessage
                            name={`attendees.${index}.attendeeEmail`}
                            component="p"
                            className="text-[10px] text-red-500 font-medium ml-2"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default AttendeeForm;
