"use client";
import axios from "axios";
import { useState } from "react";
import BasicDateTimePicker from "./components/DatePicker";

interface Event {
  id: string;
  name: string;
  dates: {
    start: {
      localDate: string;
      localTime: string;
    };
  };
  _embedded: {
    venues: [
      {
        name: string;
      }
    ];
  };
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFetchData = async () => {
    try {
      const response = await axios.get("./api/events", {
        params: {
          locale: "*",
          startDateTime: startDate,
          endDateTime: endDate,
          city: city,
        },
      });
      setEvents(response.data.events);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Event List</h1>
      <label>City</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <BasicDateTimePicker
        label="Start date"
        value={startDate}
        onChange={(newValue) =>
          setStartDate(newValue.toISOString().replace(/\.\d+Z$/, "Z"))
        }
      />
      <BasicDateTimePicker
        label="End date"
        value={endDate}
        onChange={(newValue) =>
          setEndDate(newValue.toISOString().replace(/\.\d+Z$/, "Z"))
        }
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10"
        onClick={handleFetchData}
      >
        Search events
      </button>
      <ul style={{ listStyle: "none", padding: 20 }}>
        {events.map((event) => (
          <li
            key={event.id}
            style={{
              border: "1px solid black",
              borderRadius: "8px",
              margin: "8px",
              padding: "16px",
            }}
          >
            <strong>{event.name}</strong>
            <p>Where: {event._embedded.venues[0].name}</p>
            <p>Date: {event.dates.start.localDate}</p>
            <p>Time: {event.dates.start.localTime}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
