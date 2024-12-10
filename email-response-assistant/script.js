document.getElementById('generateResponse').addEventListener('click', async () => {
  const emailInput = document.getElementById('emailInput').value;
  const contextInput = document.getElementById('contextInput').value;

  if (!emailInput) {
    alert('Please enter the email you received.');
    return;
  }

  try {
    // Show a loading message
    document.getElementById('responseOutput').value = 'Generating a response...';

    // Call the Firebase Function
    const response = await fetch('https://generatereply-tjxmtwhs4a-uc.a.run.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailInput, context: contextInput }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response from the server');
    }

    const data = await response.json();

    // Display the generated reply
    document.getElementById('responseOutput').value = data.reply || 'No reply generated.';
  } catch (error) {
    console.error(error);
    document.getElementById('responseOutput').value = 'Error generating response. Please try again.';
  }
});
