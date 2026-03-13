---

## **PROJECT_CONTEXT.md**

```markdown
# Project Context
**Smart Heart Monitoring Bracelet System**

This document provides full context for AI-assisted design and development.

---

## Product Vision
A wearable system that detects heart emergencies and notifies family members.  
The app is the central interface connecting the bracelet to the user.

---

## Core Concept
- Bracelet continuously measures: heart rate, temperature, movement  
- Data sent via BLE to app  
- Emergency detection algorithm triggers alerts when needed  

---

## Design Philosophy
The mobile app must feel:  
- Trustworthy  
- Calm and medical  
- Minimal but elegant  
- Accessible for elderly users  

**Design principles:**  
- Large readable numbers  
- Clear color signals  
- Minimal interaction steps  
- Strong visual hierarchy  

---

## Brand Direction
- Premium health-tech aesthetic  
- Inspired by Apple Health, Oura, Whoop  
- Polished, professional, and modern UI  

---

## Key Screens
1. Onboarding  
2. Bracelet Connection  
3. Home Dashboard  
4. Live Monitoring  
5. Emergency Alert  
6. Health History  
7. Emergency Contacts  
8. User Profile  
9. Settings  

---

## Dashboard Philosophy
- Heart rate must be most visually prominent  
- Temperature and movement secondary  
- Color-coded health states (Green, Orange, Red)  
- Micro-interactions and animations encouraged  

---

## Emergency Experience
- Urgent but readable  
- Countdown with cancel button  
- Clear alert for contacts  

---

## User Flow

Install app → Create profile → Add emergency contacts → Connect bracelet → Monitor health → Emergency detection → Alerts

---

## Technical Context
- Microcontroller: ESP32  
- Sensors: MAX30102, DS18B20, MPU6050  
- Communication: Bluetooth Low Energy (BLE)  
- Data frequency: ~1 reading/sec

**Example data:**
```json
{
  "heartRate": 80,
  "temperature": 36.4,
  "movement": "active"
}

Safety Principle
	•	Minimize false positives
	•	Emergency confirmed only after persistent abnormal readings
	•	User can always cancel

⸻

Future Vision
	•	AI health predictions
	•	Doctor dashboards
	•	Remote patient monitoring
	•	Cloud analytics

⸻

Summary

This app is the control center for a wearable emergency health monitoring system.
The design should emphasize clarity, safety, and reliability while maintaining a premium, modern health-tech aesthetic.