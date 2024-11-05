// Define the global configuration object
const configuration = {
  session: {
    id: 'CSD9CAC3...', // Replace with your session ID
    sessionData: 'Ab02b4c...' // Replace with your session data
  },
  environment: 'test',
  amount: {
    value: 1000,
    currency: 'USD'
  },
  locale: 'en-US',
  countryCode: 'US',
  clientKey: 'test_LN74HPRZCRAX5N2Y25A7GYYU7454VV2F',
  onPaymentCompleted: (result, component) => {
    console.info("Payment completed:", result, component);
  },
  onPaymentFailed: (result, component) => {
    console.info("Payment failed:", result, component);
  },
  onError: (error, component) => {
    console.error("Error during payment:", error.name, error.message, error.stack, component);
  }
};

// Initialize the payment session, create, and mount Drop-in
async function initializeAdyenCheckout() {
  try {
    console.log("Initializing AdyenCheckout...");
    const checkout = await new AdyenCheckout(configuration);

    // Create and mount the Drop-in component
    checkout.create("dropin", {
      onReady: () => console.info("Drop-in is ready for use."),
      onSelect: (component) => console.info("Payment method selected:", component.props.type),
      onDisableStoredPaymentMethod: (storedPaymentMethodId, resolve, reject) => {
        console.info("Disabling stored payment method:", storedPaymentMethodId);
        const success = true;
        success ? resolve() : reject();
      }
    }).mount("#dropin-container");

    console.log("Drop-in component initialized and mounted.");
  } catch (error) {
    console.error("Failed to initialize AdyenCheckout:", error);
  }
}

// Initialize AdyenCheckout after DOM loads
document.addEventListener("DOMContentLoaded", initializeAdyenCheckout);
