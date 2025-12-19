"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ModalWrapper } from "./ModalWrapper";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  orderNo?: string;
  orderDate?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: any) => Promise<void>;
  orderStatus?: string
}

const schema = Yup.object().shape({
  comment: Yup.string().min(5, "Too short").required("Please enter a reason"),
});

export const ClaimRefundModal: React.FC<Props> = ({ isOpen, onClose, orderNo, orderDate, onSubmit, orderStatus = "FAILED" }) => {
  return (
    <ModalWrapper title="Claim Refund Request" isOpen={isOpen} onClose={onClose} widthClass="min-w-2xl max-w-4xl">
      <div className="text-md text-gray-500 mb-3 space-y-2">
        <div className="flex justify-between">
          <span>Order No</span>
          <span className="font-medium text-gray-900">{orderNo}</span>
        </div>

        <div className="flex justify-between">
          <span>Order Date</span>
          <span className="font-medium text-gray-900">{orderDate}</span>
        </div>

        <div className="flex justify-between">
          <span>Order Status</span>
          <span className="font-medium text-red-500">{orderStatus.toUpperCase()}</span>
        </div>
      </div>


      <Formik
        initialValues={{ comment: "" }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await onSubmit(values);
            onClose();
          } catch (err) {
            console.error(err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="text-md font-semibold text-gray-600">Add Comment</label>
              <Field name="comment" as="textarea" rows={4} className="mt-1 w-full rounded-md border px-3 py-2 text-sm" />
              <div className="text-xs text-rose-500 mt-1"><ErrorMessage name="comment" /></div>
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="px-5 py-2 rounded-lg bg-green-500 text-white">
                {isSubmitting ? "Sending..." : "Send Claim Refund Request"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};
