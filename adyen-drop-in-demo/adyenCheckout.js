// Basic configuration object
const configuration = {
  environment: 'test',
  clientKey: 'test_LN74HPRZCRAX5N2Y25A7GYYU7454VV2F', // Replace with your client key
  paymentMethodsResponse: {
    paymentMethods: [
      { name: "PayPal", type: "paypal" },
      { name: "Pay later with Klarna", type: "klarna" },
      { name: "SEPA Direct Debit", type: "sepadirectdebit" }
    ]
  },
  onPaymentCompleted: (result, component) => {
    console.info("Payment completed:", result, component);
  },
  onError: (error, component) => {
    console.error("Error during payment:", error);
  }
};

// Initialize AdyenCheckout and mount Drop-in
function initializeAdyenCheckout() {
  const checkout = new window.AdyenCheckout(configuration);
  checkout.create("dropin").mount("#app");
}

// Call the function to initialize Adyen checkout after SDK loads
initializeAdyenCheckout();
