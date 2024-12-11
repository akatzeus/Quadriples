#include <WiFi.h>
#include <WebServer.h>
#include "MQ135.h"

#define MQ135_PIN 34  // Analog pin connected to MQ135 sensor
#define MQ7_PIN 35    // Analog pin connected to MQ7 sensor
#define Q2_PIN 32     // Analog pin connected to Q2 sensor
#define MQ135_D0 26   // Digital output pin for MQ135 sensor
#define MQ7_D0 27     // Digital output pin for MQ7 sensor
#define Q2_D0 25      // Digital output pin for Q2 sensor

const char* ssid = "Redmi Note 9 Pro Max";       // Replace with your Wi-Fi SSID
const char* password = "17052004"; // Replace with your Wi-Fi Password

WebServer server(80);  // HTTP server on port 80
MQ135 sensorMQ135 = MQ135(MQ135_PIN);

// Function to handle the root ("/") endpoint
void handleRoot() {
    server.send(200, "text/html", "<h1>ESP32 Gas Sensor Server</h1>"
                               "<p>Access the following endpoint for all sensor data:</p>"
                               "<ul>"
                               "<li><a href='/all'>/all</a> - All Sensor Data</li>"
                               "</ul>");
}

// Function to handle all sensors and return combined data
void handleAllSensors() {
    // MQ135 Sensor Readings
    int mq135Analog = analogRead(MQ135_PIN);
    int mq135Digital = digitalRead(MQ135_D0);
    float mq135PPM = mq135Analog / 10.0; // Example conversion

    // MQ7 Sensor Readings
    int mq7Analog = analogRead(MQ7_PIN);
    int mq7Digital = digitalRead(MQ7_D0);
    float mq7PPM = mq7Analog / 10.0; // Example conversion

    // Q2 Sensor Readings
    int q2Analog = analogRead(Q2_PIN);
    int q2Digital = digitalRead(Q2_D0);
    float q2PPM = q2Analog / 10.0; // Example conversion

    // Prepare JSON response
    String jsonResponse = "{";
    jsonResponse += "\"CO2(Carbon-j\": {\"analog\": " + String(mq135Analog) + ", \"digital\": " + String(mq135Digital) + ", \"ppm\": " + String(mq135PPM) + "}, ";
    jsonResponse += "\"CO(Carbon Monoxide)\": {\"analog\": " + String(mq7Analog) + ", \"digital\": " + String(mq7Digital) + ", \"ppm\": " + String(mq7PPM) + "}, ";
    jsonResponse += "\"SMOKE\": {\"analog\": " + String(q2Analog) + ", \"digital\": " + String(q2Digital) + ", \"ppm\": " + String(q2PPM) + "}";
    jsonResponse += "}";

    // Print to Serial Monitor
    Serial.println("Sensor Data: " + jsonResponse);

    // Send response to client
    server.send(200, "application/json", jsonResponse);
}

void setup() {
    Serial.begin(115200); // Start serial communication

    // Set D0 pins as INPUT
    pinMode(MQ135_D0, INPUT);
    pinMode(MQ7_D0, INPUT);
    pinMode(Q2_D0, INPUT);

    // Connect to Wi-Fi
    WiFi.begin(ssid, password);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("\nWi-Fi connected.");
    Serial.print("ESP32 IP Address: ");
    Serial.println(WiFi.localIP());

    // Define server endpoints
    server.on("/", handleRoot);         // Root endpoint
    server.on("/all", handleAllSensors); // All sensors combined endpoint

    // Start the server
    server.begin();
    Serial.println("HTTP server started.");
}

void loop() {
    server.handleClient(); // Handle incoming client requests
}
