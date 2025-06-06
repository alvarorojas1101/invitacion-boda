import { useEffect, useState } from "react";

function TimezoneComponentSimple({ time }) {
  const [userTime, setUserTime] = useState("Loading..."); // Changed initial state

  useEffect(() => {
    console.log(`TimezoneComponentSimple (${time}): useEffect triggered`);
    // Fecha de la ceremonia en Argentina (UTC-3)
    const eventDateString = `2025-06-06T${time}-03:00`;
    const eventDate = new Date(eventDateString);
    console.log(`TimezoneComponentSimple (${time}): eventDateString`, eventDateString);
    console.log(`TimezoneComponentSimple (${time}): eventDate object`, eventDate);

    if (isNaN(eventDate.getTime())) {
      console.error(`TimezoneComponentSimple (${time}): Invalid eventDate`);
      setUserTime("Error"); // Simplified error message for the span
      return;
    }

    // Obtener la zona horaria del usuario
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(`TimezoneComponentSimple (${time}): user timezone`, timezone);

    // Convertir la fecha a la zona horaria del usuario
    try {
      const userTimeFormatted = eventDate.toLocaleTimeString("es-ES", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Usar formato 24 horas
      });
      console.log(`TimezoneComponentSimple (${time}): formatted userTime`, userTimeFormatted);
      setUserTime(userTimeFormatted);
    } catch (error) {
      console.error(`TimezoneComponentSimple (${time}): Error formatting time`, error);
      setUserTime("Error"); // Simplified error message for the span
    }
  }, [time]);

  return <span className="text-[#C6C6C5]">{userTime}hs</span>;
}

export default TimezoneComponentSimple;
