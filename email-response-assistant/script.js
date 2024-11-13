// script.js

async function generateResponse() {
    const emailText = document.getElementById("emailInput").value;
    const contextText = document.getElementById("contextInput").value;

    if (!emailText) {
        alert("Please enter the email you received.");
        return;
    }

    // Construct the payload for the API request
    const data = {
        model: "gpt-3.5-turbo", // Specify the model
        messages: [
            { role: "system", content: "You are an assistant helping with email responses." },
            { role: "user", content: `Email received: ${emailText}. Context: ${contextText}. Generate a professional and relevant response.` }
        ]
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer YOUR_API_KEY` // Replace with your actual API key
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Error in API request");
        }

        const result = await response.json();
        const responseText = result.choices[0].message.content;

        // Display the response in the output section
        document.getElementById("responseOutput").value = responseText;
        document.getElementById("responseSection").style.display = "block";
    } catch (error) {
        console.error("Error generating response:", error);
        alert("There was an issue generating the response. Please try again later.");
    }
}
