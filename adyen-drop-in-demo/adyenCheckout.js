// Step 1: Define the global configuration object
const configuration = {
  session: {
    id: 'CSD9CAC34EBAE225DD', // Replace with the session ID from your backend
    sessionData: 'Ab02b4c...' // Replace with the session data from your backend
  },
  environment: 'test',
  clientKey: 'test_LN74HPRZCRAX5N2Y25A7GYYU7454VV2F',
  amount: { value: 1000, currency: 'EUR' },
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
        value: 10000, 
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

// Step 3: Function to initialize AdyenCheckout and mount Drop-in
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

// Optional: Handle redirect if payment method requires shopper redirection
function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

async function handleRedirect() {
  const sessionId = getQueryParameter('sessionId');
  const redirectResult = getQueryParameter('redirectResult');

  if (sessionId && redirectResult) {
    console.log("Handling redirect...");
    const checkout = await AdyenCheckout({ ...configuration, session: { id: sessionId } });
    checkout.submitDetails({ details: { redirectResult } });
  }
}

// Call handleRedirect if page reloads after a redirect
handleRedirect();
