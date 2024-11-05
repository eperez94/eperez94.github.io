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

// Load Adyen CSS and JavaScript, then initialize checkout
function loadAdyenDependencies() {
  // Load the Adyen CSS
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://checkoutshopper-test.cdn.adyen.com/checkoutshopper/sdk/6.5.0/adyen.css";
  link.integrity = "sha384-uufhzWG2RuRQO7+XOvcalWqc1tuu9jdTMeO5nMwXTHB1p/EJuxTwRfhA3Q8aLEGe";
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);

  // Load the Adyen JavaScript
  const script = document.createElement("script");
  script.src = "https://checkoutshopper-test.cdn.adyen.com/checkoutshopper/sdk/6.5.0/adyen.js";
  script.integrity = "sha384-XS7xTa1zeFadKWQceyCI+If+qgqSpiE2z7fnFJyznti1yloAmaxHFUkf3K8/Av0+";
  script.crossOrigin = "anonymous";
  script.async = true;

  // Initialize AdyenCheckout once the script has loaded
  script.onload = initializeAdyenCheckout;
  document.body.appendChild(script);
}

// Initialize the payment session, create, and mount Drop-in
async function initializeAdyenCheckout() {
  try {
    console.log("Initializing AdyenCheckout...");
    const checkout = await new window.AdyenCheckout(configuration);

    // Create and mount the Drop-in component
    checkout.create("dropin", {
      onReady: () => {
        console.info("Drop-in is ready for use.");
      },
      onSelect: (component) => {
        console.info("Payment method selected:", component.props.type);
      },
      onDisableStoredPaymentMethod: (storedPaymentMethodId, resolve, reject) => {
        console.info("Disabling stored payment method:", storedPaymentMethodId);
        // Simulate disable response
        const success = true;
        if (success) {
          resolve();
        } else {
          reject();
        }
      }
    }).mount("#dropin-container");

    console.log("Drop-in component initialized and mounted.");
  } catch (error) {
    console.error("Failed to initialize AdyenCheckout:", error);
  }
}

// Load Adyen dependencies on page load
document.addEventListener("DOMContentLoaded", loadAdyenDependencies);
