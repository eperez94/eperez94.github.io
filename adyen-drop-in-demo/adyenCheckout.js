// Define the global configuration object
const configuration = {
  session: {
    id: 'CSD9CAC3...', // Unique identifier for the payment session.
    sessionData: 'Ab02b4c...' // The payment session data.
  },
  environment: 'test', // Change to 'live' for the live environment.
  amount: {
    value: 1000,
    currency: 'USD'
  },
  locale: 'en-US',
  countryCode: 'US',
  clientKey: 'test_LN74HPRZCRAX5N2Y25A7GYYU7454VV2F', // Public key used for client-side authentication
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

// Initialize the payment session, create and mount Drop-in
async function initializeAdyenCheckout() {
  try {
    console.log("Initializing AdyenCheckout...");
    // 1. Create an instance of AdyenCheckout using the configuration object
    const checkout = await AdyenCheckout(configuration);

    // 2. Create an instance of Drop-in and mount it to the container you created
    const dropin = checkout.create('dropin', {
      onReady: () => {
        console.info("Drop-in is ready for use.");
      },
      onSelect: (component) => {
        console.info("Payment method selected:", component.props.type);
      },
      onDisableStoredPaymentMethod: (storedPaymentMethodId, resolve, reject) => {
        console.info("Disabling stored payment method:", storedPaymentMethodId);
        // Simulate disable response - in a real implementation, make a /disable request to your backend here
        const success = true; // replace with actual disable response success check
        if (success) {
          resolve(); // call resolve if successful
        } else {
          reject(); // call reject if unsuccessful
        }
      }
    }).mount('#dropin-container'); // Mounts Drop-in to the container

    console.log("Drop-in component initialized and mounted.");
  } catch (error) {
    console.error("Failed to initialize AdyenCheckout:", error);
  }
}
