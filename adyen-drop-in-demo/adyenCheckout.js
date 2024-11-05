var checkout = new window.AdyenCheckout({
  environment: 'test',
  clientKey: 'test_LN74HPRZCRAX5N2Y25A7GYYU7454VV2F', // Replace with your actual client key
  paymentMethodsResponse: {
    paymentMethods: [
      {
        name: "PayPal",
        type: "paypal"
      },
      {
        name: "Pay later with Klarna",
        type: "klarna"
      },
      {
        name: "SEPA Direct Debit",
        type: "sepadirectdebit"
      }
    ]
  }
});

// Create and mount the Drop-in component
checkout.create("dropin").mount("#app");
