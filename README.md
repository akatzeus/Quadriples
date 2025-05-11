# 🚦 Smart Traffic Management System using ESP32-CAM

An intelligent traffic control system using **ESP32-CAM for vehicle counting**, **air quality sensors for pollution monitoring**, and **dynamic traffic light timing**. The system also supports **real-time rerouting suggestions** to manage congestion and pollution levels effectively.

---

## 📌 Project Highlights

- 📸 **Car Counting with ESP32-CAM** using computer vision
- ⏱️ **Adaptive Signal Timings** based on vehicle density
- 🌫️ **AQI Monitoring** with sensors (e.g., MQ135)
- 📍 **Smart Rerouting** decisions to optimize traffic flow and reduce exposure to polluted zones
- 📡 **IoT-enabled ESP32** for real-time data transfer
- 📊 Optional Web Dashboard for visualization (using HTML/CSS/JS + backend)

---

## 🧠 System Architecture
[ ESP32-CAM ] --> [ Vehicle Count ]
|
v
[ ESP32 AQI Unit ] --> [ Air Quality (e.g., MQ135) ]
|
v
[ Main ESP32 Unit ] --> [ Controls traffic signals, rerouting logic ]
|
v
[ Web Dashboard / Alerts ]


---

## 🔧 Hardware Used

- 📷 **ESP32-CAM** – For real-time car detection via OpenCV model
- 🌫️ **MQ135 Air Quality Sensor** – For AQI measurement
- 🌐 **ESP32 (main unit)** – To coordinate data and manage signals
- 🚦 **Traffic Light Module or Relays** – For physical signal control
- 🪛 Misc: Breadboards, Resistors, Jumper Wires, Power Supply

---

## 📂 Folder Structure
├── car_counter/
│ └── esp32cam_car_count.ino # Camera-based vehicle detection
├── aqi_monitor/
│ └── esp32_aqi.ino # MQ135-based air quality data
├── traffic_control/
│ └── signal_controller.ino # Signal duration logic and rerouting
├── web_dashboard/
│ ├── index.html
│ ├── style.css
│ └── script.js
├── README.md


---

## ⚙️ Functionality Overview

### 🚘 Car Counting
- Captures video via **ESP32-CAM**
- Uses **OpenCV + Haar Cascade or ML model (TinyYOLO)** on edge or external processor
- Counts vehicles entering/exiting a lane
- Sends count to central ESP32

### 🌬️ AQI Monitoring
- Reads air quality values from **MQ135**
- Converts raw value to AQI category (Good, Moderate, Poor)
- Publishes AQI to traffic unit and/or web dashboard

### ⏱️ Adaptive Signal Control
- Dynamically adjusts red/green durations based on:
  - Vehicle count
  - AQI status (e.g., longer red if AQI is poor)
- If traffic density > threshold, triggers **rerouting**

### 🗺️ Rerouting Logic
- Sends reroute signal to dashboard/mobile app
- Can integrate with Google Maps API or display warning on dashboard

---

## 🛠️ Getting Started

### 1. Upload Code
- Flash `esp32cam_car_count.ino` to ESP32-CAM
- Flash `esp32_aqi.ino` to ESP32 with MQ135
- Flash `signal_controller.ino` to central ESP32

### 2. Wiring Overview
- ESP32-CAM → USB to TTL module
- MQ135 → A0 pin of ESP32
- Traffic lights → Controlled via digital pins or relay module

### 3. Access Dashboard
- Open `index.html` from `web_dashboard` in browser
- Use WebSockets or REST API to pull data from ESP32

---

## 🧪 Future Improvements

- Integrate with **cloud database** (Firebase/MongoDB)
- Use **TensorFlow Lite** for object detection on edge
- Add **voice alert system** for pedestrian crossings
- Support for **emergency vehicle detection**

---

## 🙌 Contributors

- SHASHVATH R
- Collaborators and Reviewers
- KUSHAL S

---

