document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");
  const message = document.getElementById("message");

  function checkInternetConnection() {
    // Check if the browser is online
    if (navigator.onLine) {
      message.textContent = "Loading...";
      setTimeout(() => {
        loader.style.display = "none";
        content.style.display = "block";
      }, 3000); // Simulate a 3-second loading time
    } else {
      message.textContent = "No internet connection. Please check your network.";
      content.style.display = "none";
      loader.style.display = "flex";
    }
  }

  // Initial check
  checkInternetConnection();

  // Listen for changes in network status
  window.addEventListener("online", checkInternetConnection);
  window.addEventListener("offline", checkInternetConnection);
});


// Function to handle the speech synthesis
function speakMessage() {
  const message = "Welcome to my portfolio"; // The message to be spoken
  const speech = new SpeechSynthesisUtterance(message);

  // Check if SpeechSynthesis API is available
  if ('speechSynthesis' in window) {
    // Get all available voices
    const voices = window.speechSynthesis.getVoices();
    console.log("Available voices:", voices); // Debugging: Check available voices

    // Wait for voices to load if they are not yet available
    if (voices.length === 0) {
      console.log("No voices found, retrying in 1 second...");
      setTimeout(speakMessage, 1000); // Retry after 1 second
      return;
    }

    // Try to find a male voice
    speech.voice = voices.find(voice => voice.name.toLowerCase().includes('male'));

    // If no male voice found, use a default voice (Google UK English Male)
    if (!speech.voice) {
      speech.voice = voices.find(voice => voice.name === 'Google UK English Male');
    }

    // Set language, pitch, and rate
    speech.lang = 'en-US'; // Language: English (US)
    speech.pitch = 1; // Normal pitch (0 to 2)
    speech.rate = 1; // Normal speed

    // Speak the message
    window.speechSynthesis.speak(speech);
    console.log("Speaking message now..."); // Debugging: Speaking message
  } else {
    console.log("Speech Synthesis API is not supported in this browser.");
    // Fallback method: alert or other mechanism to show the message
    alert("Welcome to my portfolio");
  }
}

// Wait for the page to load and then speak the message
window.onload = function () {
  speakMessage(); // Speak the message every time the page loads
};

// Ensure voices are loaded
window.speechSynthesis.onvoiceschanged = function () {
  const voices = window.speechSynthesis.getVoices();
  console.log("Updated voices:", voices);
};
