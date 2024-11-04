// Step 1: Define the global configuration object
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

  // Configure individual payment methods
  paymentMethodsConfiguration: {
    ideal: {
      showImage: true
    },
    card: {
      hasHolderName: true,
      holderNameRequired: true,
      name: "Credit or debit card",
      amount: {
        value: 10000, // Amount in minor units (e.g., 10000 = 100.00 EUR)
        currency: "EUR"
      }
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

  // Event handler for successful payment completion with manual messaging (no backend setup for demo)
  onPaymentCompleted: (result, component) => {
    const message =
      result.resultCode === "Authorised" ? "Payment Successful!" :
      result.resultCode === "Pending" ? "Payment is pending, please wait." :
      result.resultCode === "Refused" ? "Payment Refused. Please try again." :
      "Payment status: " + result.resultCode;
    alert(message);
  },

  // Global error handler for unexpected issues with manual message (no backend setup for demo)
  onError: (error, component) => {
    console.error("Error handling payment:", error);
  }
};

// Step 2: Define Drop-in configuration
const dropinConfiguration = {
  // Required if you import individual payment methods.
  paymentMethodComponents: [PayPal, GooglePay, ApplePay, Ideal],
  
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

    // Create and mount Drop-in without specifying individual components
    const dropin = checkout.create("dropin");
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
