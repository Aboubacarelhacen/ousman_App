# Smart Heart Monitoring Bracelet App
**Product Requirements Document (PRD)**

## 1. Product Overview
The Smart Heart Monitoring Bracelet System is a wearable health solution designed to detect potential heart emergencies and automatically notify emergency contacts.

**Components:**
- Smart bracelet with sensors  
- Mobile app connected via Bluetooth Low Energy (BLE)

**Sensors monitored:**
- Heart rate  
- Skin temperature  
- Movement

The app analyzes the data in real-time and triggers alerts with the user’s GPS location when necessary.

---

## 2. Product Goals
**Primary goal:**  
Detect potential heart emergencies and notify family or emergency services as quickly as possible.

**Secondary goals:**  
- Continuous real-time health monitoring  
- Simple health visualization  
- Reduced response time in emergencies  
- User-friendly interface for elderly users

---

## 3. Target Users
**Primary:**  
Elderly individuals or heart patients (age 55+) who need continuous health monitoring.

**Secondary:**  
Family members receiving emergency alerts.

**Optional:**  
Doctors or caregivers reviewing health history.

---

## 4. Hardware System
**Bracelet:**  
- Microcontroller: ESP32  
- Sensors:  
  - MAX30102 → heart rate  
  - DS18B20 → skin temperature  
  - MPU6050 → movement  

**Communication:**  
- Bluetooth Low Energy (BLE) to mobile app

---

## 5. Data Flow

Sensors → ESP32 → BLE → Mobile App → Emergency Detection → Alerts

**Example data packet:**
```json
{
  "heartRate": 78,
  "temperature": 36.3,
  "movement": "active",
  "timestamp": 1710123200
}

6. Core Features

6.1 Bluetooth Bracelet Connection
	•	Scan nearby BLE devices
	•	Detect compatible bracelets
	•	Connect and auto-reconnect to selected bracelet

6.2 Real-Time Health Monitoring
	•	Heart rate (BPM)
	•	Skin temperature (°C)
	•	Movement status

Health status indicators:
	•	Green → normal
	•	Orange → warning
	•	Red → emergency

6.3 Emergency Detection Algorithm
	•	Emergency triggers when:
	•	Heart rate abnormal AND
	•	Low temperature AND
	•	Prolonged immobility
	•	Confirm conditions for 5 seconds before alert
	•	User can cancel alert: “I’m OK”

6.4 Emergency Alerts
	•	Send SMS to emergency contacts
	•	Include GPS location and last readings
	•	Optional: call first contact, send email

6.5 Emergency Contacts
	•	Add, edit, delete contacts
	•	Store: name, phone, relationship
	•	Define order of notification

6.6 User Profile
	•	Name, date of birth
	•	Blood type, allergies, medications (optional)
	•	Doctor contact
	•	Include info in alerts

6.7 Health History
	•	Store historical sensor data
	•	View daily, weekly, monthly charts

⸻

7. Navigation Structure

Persistent bottom navigation bar:
	•	Home
	•	Health Data
	•	Alerts
	•	History
	•	Profile

⸻

8. Accessibility
	•	Large typography
	•	Simple navigation
	•	High contrast colors
	•	Minimal UI complexity

⸻

9. MVP Scope
	•	Bluetooth connection
	•	Real-time health monitoring
	•	Emergency detection
	•	SMS alerts with GPS
	•	Emergency contacts
	•	Simple dashboard

⸻

10. Future Features
	•	Cloud backup
	•	Doctor dashboard
	•	AI prediction
	•	Family monitoring app
	•	ECG sensors
	•	Fall detection