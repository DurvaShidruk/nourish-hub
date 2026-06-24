import * as z from "zod";

export const getStartedSchema = z.object({
  age: z.coerce.number({ invalid_type_error: "Please enter a valid age" }).min(1, "Please enter a valid age"),
  weight: z.coerce.number({ invalid_type_error: "Please enter a valid weight" }).min(1, "Please enter a valid weight"),
  goal: z.string().min(1, "Please select a goal"),
  conditions: z.array(z.string()).min(1, "Please select at least one condition"),
});

export type GetStartedValues = z.infer<typeof getStartedSchema>;

export const checkoutSchema = z.object({
  delivery: z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    pincode: z.string().min(1, "PIN code is required"),
  }),
  paymentMethod: z.string().min(1, "Payment method is required"),
  card: z.object({
    cardNumber: z.string().optional(),
    expiry: z.string().optional(),
    cvv: z.string().optional(),
  }).optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "card") {
    if (!data.card?.cardNumber || data.card.cardNumber.trim() === "") {
      ctx.addIssue({
        path: ["card", "cardNumber"],
        message: "Card number is required",
        code: z.ZodIssueCode.custom,
      });
    }
    if (!data.card?.expiry || data.card.expiry.trim() === "") {
      ctx.addIssue({
        path: ["card", "expiry"],
        message: "Expiry date is required",
        code: z.ZodIssueCode.custom,
      });
    }
    if (!data.card?.cvv || data.card.cvv.trim() === "") {
      ctx.addIssue({
        path: ["card", "cvv"],
        message: "CVV is required",
        code: z.ZodIssueCode.custom,
      });
    }
  }
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
