// Step 1: Define the global configuration object
const configuration = {
  session: {
    id: 'CSD9CAC3...', // Replace with the session ID from your backend
    sessionData: 'Ab02b4c...' // Replace with the session data from your backend
  },
  environment: 'test', // Use 'live' for the production environment
  clientKey: 'test_870be2...', // Replace with your actual client-side key from Adyen
  amount: {
    value: 1000, // Amount in minor units (e.g., 1000 = 10.00 EUR)
    currency: 'EUR'
  },
  locale: 'nl-NL',
  countryCode: 'NL',

  // Event handler for successful payment completion with manual messaging (no backend setup for demo)
  onPaymentCompleted: (result, component) => {
    const message =
      result.resultCode === "Authorised" ? "Payment Successful!" :
      result.resultCode === "Pending" ? "Payment is pending, please wait." :
      result.resultCode === "Refused" ? "Payment Refused. Please try again." :
      "Payment status: " + result.resultCode;
    alert(message);
  },

  // Event handler for failed payment with manual message (no backend setup for demo)
  onPaymentFailed: (result, component) => {
    alert("Payment failed. Please try again.");
  },

  // Global error handler for unexpected issues with manual message (no backend setup for demo)
  onError: (error, component) => {
    console.error("Error handling payment:", error);
  }
};

// Step 2: Define Drop-in configuration
const dropinConfiguration = {
  // Required if you import individual payment methods.
  paymentMethodComponents: [Card, PayPal, GooglePay, ApplePay, Ideal],
  
  // Drop-in configuration only has properties and events related to itself. Drop-in configuration cannot contain global configuration.
  onReady: () => {
    console.log("Drop-in is ready.");
  },
  instantPaymentTypes: ['applepay', 'googlepay'],

  // Configuration for individual payment methods.
  paymentMethodsConfiguration: {
    card: {
      // onError configuration for card payments. Overrides the global configuration.
      onError: (error) => {
        console.error("Card-specific error:", error);
      }
    }
  }
};

// Step 3: Function to initialize AdyenCheckout and mount Drop-in
async function initializeAdyenCheckout() {
  try {
    // Create an instance of AdyenCheckout with the global configuration, to pass when you create an instance of Drop-in.
    const checkout = await AdyenCheckout(configuration);

    // Create and mount Drop-in with the Drop-in configuration
    const dropin = checkout.create("dropin", dropinConfiguration);
    dropin.mount("#dropin-container");
  } catch (error) {
    console.error("Failed to initialize AdyenCheckout:", error);
  }
}

// Optional: Handle redirect if payment method requires shopper redirection
function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

async function handleRedirect() {
  const sessionId = getQueryParameter('sessionId');
  const redirectResult = getQueryParameter('redirectResult');

  if (sessionId && redirectResult) {
    const checkout = await AdyenCheckout({
      ...configuration,
      session: { id: sessionId }
    });

    checkout.submitDetails({
      details: { redirectResult }
    });
  }
}

// Call handleRedirect if page reloads after a redirect
handleRedirect();
