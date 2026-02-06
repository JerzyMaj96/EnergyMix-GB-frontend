# Energy Mix Dashboard 

An interactive frontend dashboard that visualizes the energy mix and helps determine optimal time windows for electricity consumption (e.g., for charging an electric vehicle).

The project is built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

## Key Features

* **3-Day Forecast:** Displays the predicted energy mix for the upcoming 3 days.
* **Data Visualization:** Clear Pie Charts showing the share of specific energy sources (wind, solar, coal, nuclear, etc.).
* **Optimal Charging Calculator:** An algorithm that identifies the best hours for energy usage (highest percentage of clean energy) based on the declared charging duration.
* **Responsive Design:** Aesthetic interface adapted for both mobile and desktop devices.

## Tech Stack

* **Core:** React 18, TypeScript, Vite
* **Styling:** Tailwind CSS
* **Charts:** Recharts
* **HTTP Client:** Fetch API

## Getting Started

### 1. Prerequisites
Make sure you have the following installed:
* Node.js (LTS version recommended, e.g., v18+)
* npm

### 2. Install Dependencies
```bash
   npm install
```
### 3. Environment Configuration (.env)

The application requires a connection to a backend. Create a .env file in the root directory and define the API address:

VITE_PUBLIC_API_URL=http://localhost:8080

Note: If you do not create this file, the application will default to trying to connect to http://localhost:8080.

### 4. Run Development Version

npm run dev

## Project Structure
```
src/
├── components/
│   ├── App.tsx                  # Main layout
│   ├── ForecastComponent.tsx    # 3-day forecast view
│   ├── OptimalCharging...tsx    # Logic for finding charging window
│   └── OptimalCharging...Table.tsx # Results table
├── utils/
│   ├── backend-data-types.ts    # Data types and API config
│   ├── forecast-helper.ts       # Chart data preparation
│   └── table-helper.ts          # Date formatting
└── main.tsx                     # Application entry point
```
## Photos

<img width="1717" height="987" alt="Zrzut ekranu 2026-02-4 o 22 14 39" src="https://github.com/user-attachments/assets/0e7a4cef-7493-420b-943d-13d56dfbc97f" />


<img width="1705" height="972" alt="Zrzut ekranu 2026-02-4 o 22 15 21" src="https://github.com/user-attachments/assets/ff9afb48-4dff-4cc4-a664-41a8a6aef269" />






