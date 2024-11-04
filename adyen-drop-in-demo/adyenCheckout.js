document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed. Ready to initialize AdyenCheckout.");

  // Add a click event listener to the button
  const purchaseButton = document.querySelector("button[onclick='initializeAdyenCheckout()']");
  if (purchaseButton) {
    purchaseButton.addEventListener("click", initializeAdyenCheckout);
  } else {
    console.error("Complete Purchase button not found.");
  }
});

// Define the global configuration object
const configuration = {
  session: {
    id: 'CSD9CAC34EBAE225DD', // Replace with the session ID from your backend
    sessionData: 'Ab02b4c...' // Replace with the session data from your backend
  },
  environment: 'test', // Use 'live' for the production environment
  clientKey: 'test_LN74HPRZCRAX5N2Y25A7GYYU7454VV2F', // Replace with your actual client-side key from Adyen
  amount: {
    value: 1000, // Amount in minor units (e.g., 1000 = 10.00 EUR)
    currency: 'EUR'
  },
  locale: 'en_US',
  countryCode: 'US',
  showPayButton: true,

  paymentMethodsConfiguration: {
    ideal: {
      showImage: true
    },
    card: {
      hasHolderName: true,
      holderNameRequired: true,
      name: "Credit or debit card"
    },
    paypal: {
      amount: {
        value: 10000, // Amount in minor units (e.g., 10000 = 100.00 USD)
        currency: "USD"
      },
      environment: "test",
      countryCode: "US"
    }
  },

  onPaymentCompleted: (result, component) => {
    const message =
      result.resultCode === "Authorised" ? "Payment Successful!" :
      result.resultCode === "Pending" ? "Payment is pending, please wait." :
      result.resultCode === "Refused" ? "Payment Refused. Please try again." :
      "Payment status: " + result.resultCode;
    alert(message);
  },

  onError: (error, component) => {
    console.error("Error handling payment:", error);
  }
};

// Function to initialize AdyenCheckout and mount Drop-in
async function initializeAdyenCheckout() {
  try {
    console.log("Initializing AdyenCheckout...");
    const checkout = await AdyenCheckout(configuration);
    const dropin = checkout.create("dropin");
    dropin.mount("#dropin-container");
    console.log("AdyenCheckout instance initialized and Drop-in mounted.");
  } catch (error) {
    console.error("Failed to initialize AdyenCheckout:", error);
  }
}
