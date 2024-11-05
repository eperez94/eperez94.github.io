var checkout = new AdyenCheckout({
  paymentMethodsResponse: {
    paymentMethods: [
      {
        name: "PayPal",
        type: "paypal"
      },
      {
        name: "Pay later with Klarna.",
        type: "klarna"
      },
      {
        name: "SEPA Direct Debit",
        type: "sepadirectdebit"
      }
    ]
  }
});

checkout.create("dropin").mount("#app");
