import { useEffect, useState } from "react";

function TimezoneComponentSimple({ time }) {
  const [userTime, setUserTime] = useState("");

  useEffect(() => {
    // Fecha base en Argentina (UTC-3)
    const baseDate = new Date("2025-06-06T00:00:00-03:00");
    
    // Añadir las horas especificadas
    const eventDate = new Date(baseDate);
    const [hours, minutes] = time.split(':');
    eventDate.setHours(parseInt(hours));
    eventDate.setMinutes(parseInt(minutes));

    // Obtener la zona horaria del usuario
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Convertir la fecha a la zona horaria del usuario
    const userTime = eventDate.toLocaleTimeString("es-ES", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
    });

    setUserTime(userTime);
  }, [time]);

  return (
    <span className="text-[#C6C6C5]">{userTime}hs</span>
  );
}

export default TimezoneComponentSimple;
