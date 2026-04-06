export const handlePayment = (amount: number, onSuccess: () => void) => {
  const options = {
    key: "rzp_test_SZx7XxHMycOLSE", // your key
    amount: amount * 100,
    currency: "INR",
    name: "NutriCart",

    handler: function () {
      onSuccess();
    },

    method: {
      upi: true,
      card: true,
      netbanking: true,
      wallet: true,
    },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
};