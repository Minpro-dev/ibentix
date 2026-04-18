import { Field, Form, Formik } from "formik";
import { inputClass, labelClass } from "../../../../utils/InputStylingConstant";
import { promotionSchema } from "../schema/promotionSchema";
import Button from "../../../../ui/Button";

function PromotionForm() {
  return (
    <div>
      <Formik
        initialValues={{
          couponCode: "",
          discountAmount: 0,
          validFrom: "",
          validUntil: "",
        }}
        validationSchema={promotionSchema}
        onSubmit={(values) => {
          console.log(values);
        }}>
        {({ errors, touched }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div>
                <label className={labelClass}>Address</label>
                <Field
                  name="couponCode"
                  type="text"
                  placeholder="e.g CODEX120"
                  className={inputClass}
                />
                {errors.couponCode && touched.couponCode && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.couponCode}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass}>City</label>
                <Field
                  name="discountAmount"
                  type="number"
                  placeholder="e.g 10"
                  className={inputClass}
                />
                {errors.discountAmount && touched.discountAmount && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.discountAmount}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div>
                <label className={labelClass}>Valid from</label>
                <Field name="validFrom" type="date" className={inputClass} />
                {errors.validFrom && touched.validFrom && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.validFrom}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>Valid Until</label>
                <Field name="validUntil" type="date" className={inputClass} />
                {errors.validUntil && touched.validUntil && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.validUntil}
                  </p>
                )}
              </div>
            </div>
            <div className="py-4">
              <Button type="submit">Create Promotion</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PromotionForm;
