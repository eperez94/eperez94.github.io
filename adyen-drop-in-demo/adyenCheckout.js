var checkout = new window.AdyenCheckout({
  paymentMethodsResponse: {
    paymentMethods: [
      {
        name: "Card",
        type: "scheme"
      },
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
