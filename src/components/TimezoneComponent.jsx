import { useEffect, useState } from "react";

function TimezoneComponent() {
  const [userTimezone, setUserTimezone] = useState("");
  const [userTime, setUserTime] = useState("");

  useEffect(() => {
    // Fecha de la ceremonia en Argentina (UTC-3)
    const ceremonyDate = new Date("2025-06-06T12:30:00-03:00");

    // Obtener la zona horaria del usuario
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(timezone);

    // Convertir la fecha a la zona horaria del usuario
    const userTime = ceremonyDate.toLocaleTimeString("es-ES", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
    });

    setUserTime(userTime);
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
