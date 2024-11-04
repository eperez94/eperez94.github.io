// Hardcode your clientKey and session data directly for demo purposes
const clientKey = 'test_LN74HPRZCRAX5N2Y25A7GYYU7454VV2F';  // Replace with your actual test client key
const sessionData = { // Replace with the session details from your Adyen account for demo purposes
  id: 'CSD9CAC34EBAE225DD',
  sessionData: 'Ab02b4c...'
};

// Main function to start checkout
async function startCheckout() {
  try {
    // Create the AdyenCheckout instance with session details
    const checkout = await createAdyenCheckout(sessionData);
    checkout.create('dropin').mount('#dropin-container');
  } catch (error) {
    console.error("Failed to initialize AdyenCheckout:", error);
    alert("Error occurred. Check the console for details.");
  }
}

// Finalize checkout if redirected
async function finalizeCheckout() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('sessionId');
  const redirectResult = urlParams.get('redirectResult');

  if (sessionId && redirectResult) {
    try {
      const checkout = await createAdyenCheckout({ id: sessionId });
      checkout.submitDetails({ details: { redirectResult } });
    } catch (error) {
      console.error("Failed to finalize AdyenCheckout:", error);
      alert("Error occurred during redirection. Check the console for details.");
    }
  }
}

// Create AdyenCheckout instance
async function createAdyenCheckout(session) {
  return new AdyenCheckout({
    clientKey: clientKey,
    locale: "en_US",
    environment: "test",
    session: session,
    showPayButton: true,
    paymentMethodsConfiguration: {
      ideal: {
        showImage: true,
      },
      card: {
        hasHolderName: true,
        holderNameRequired: true,
        name: "Credit or debit card",
      },
      paypal: {
        amount: {
          value: 10000, // in minor units (100.00 USD)
          currency: "USD",
        },
        environment: "test",
        countryCode: "US"
      }
    },
    onPaymentCompleted: (result, component) => {
      console.info("onPaymentCompleted");
      const message = result.resultCode === "Authorised" ? "Payment Successful!" :
                      result.resultCode === "Pending" ? "Payment is pending, please wait." :
                      result.resultCode === "Refused" ? "Payment Refused. Please try again." :
                      "Payment status: " + result.resultCode;
      alert(message);
    },
    onError: (error, component) => {
      console.error("Error handling payment:", error);
      alert("Payment error. Check console for details.");
    }
  });
}

// Start the checkout process when the page loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded. Starting checkout...");

  const sessionId = new URLSearchParams(window.location.search).get('sessionId');
  if (!sessionId) {
    startCheckout();
  } else {
    finalizeCheckout();
  }
});
