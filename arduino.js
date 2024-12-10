// ESP32 IP address (replace with your ESP32's actual IP)
const esp32_ip = "http://192.168.188.203/ppm";

// Function to fetch PPM value from ESP32
async function fetchPPM() {
    try {
        const response = await fetch(`${esp32_ip}/ppm`); // ESP32 PPM endpoint
        const ppm = await response.text(); // Get the PPM value as plain text
        document.getElementById("ppm").innerText = ppm; // Update the webpage
    } catch (error) {
        console.error("Error fetching PPM data:", error);
        document.getElementById("ppm").innerText = "Error";
    }
}

// Update the PPM value every second
setInterval(fetchPPM, 1000);

// Fetch the initial value
fetchPPM();
