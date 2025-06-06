import { useEffect, useState } from "react";

function TimezoneComponent() {
  const [userTimezone, setUserTimezone] = useState("");
  const [userTime, setUserTime] = useState("Loading..."); // Changed initial state

  useEffect(() => {
    console.log("TimezoneComponent: useEffect triggered");
    // Fecha de la ceremonia en Argentina (UTC-3)
    const ceremonyDateString = "2025-06-06T12:30:00-03:00";
    const ceremonyDate = new Date(ceremonyDateString);
    console.log("TimezoneComponent: ceremonyDateString", ceremonyDateString);
    console.log("TimezoneComponent: ceremonyDate object", ceremonyDate);

    if (isNaN(ceremonyDate.getTime())) {
      console.error("TimezoneComponent: Invalid ceremonyDate");
      setUserTime("Error: Invalid date");
      return;
    }

    // Obtener la zona horaria del usuario
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(timezone);
    console.log("TimezoneComponent: user timezone", timezone);

    // Convertir la fecha a la zona horaria del usuario
    try {
      const userTimeFormatted = ceremonyDate.toLocaleTimeString("es-ES", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Added for consistency and 24-hour format
      });
      console.log("TimezoneComponent: formatted userTime", userTimeFormatted);
      setUserTime(userTimeFormatted);
    } catch (error) {
      console.error("TimezoneComponent: Error formatting time", error);
      setUserTime("Error: Formatting failed");
    }
  }, []);

  return (
    <div className="text-gray-400 text-sm mt-4 mb-4">
      <p>Horario de la ceremonia:</p>
      <p className="font-medium">
        • Tu zona horaria ({userTimezone}): {userTime} horas
      </p>
    </div>
  );
}

export default TimezoneComponent;
