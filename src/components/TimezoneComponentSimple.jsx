import { useEffect, useState } from "react";

function TimezoneComponentSimple({ time }) {
  const [userTime, setUserTime] = useState("");

  useEffect(() => {
    // Fecha de la ceremonia en Argentina (UTC-3)
    const eventDate = new Date(`2025-06-06T${time}-03:00`);

    // Obtener la zona horaria del usuario
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Convertir la fecha a la zona horaria del usuario
    const userTime = eventDate.toLocaleTimeString("es-ES", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Usar formato 24 horas
    });

    setUserTime(userTime);
  }, [time]);

  return <span className="text-[#C6C6C5]">{userTime}hs</span>;
}

export default TimezoneComponentSimple;
