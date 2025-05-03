import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { Radio, RadioGroup } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

function TipsModal() {
  const [copied, setCopied] = useState("");
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(""), 2000);
    });
  };

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const title = {
    fontWeight: "bold",
    fontSize: "1rem",
  };
  const list = {
    display: "flex",
    gap: "8px",
    marginLeft: "15px",
    flexDirection: "column",
  };
  const li = {
    display: "flex",
    gap: "3px",
    fontSize: "0.8rem",
    flexDirection: "column",
  };

  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [send, setSend] = useState(false);
  const [asistenciaCheck, setAsistenciaCheck] = useState("");
  const handleGuardarForm = handleSubmit(async (data) => {
    if (asistenciaCheck === "") {
      setError("Debes seleccionar una opción de asistencia");
      return;
    }
    const datos = {
      ...data,
      Flag_Asistencia: asistenciaCheck,
      T_Tipo_Sede: type,
    };

    const response = await fetch("http://127.0.0.1:8000/api/asistencia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 12|SjaqxYBCTstwlZndGdS7IKUjTW7nKnZRayAVsKzA4fcc3c0c",
      },
      body: JSON.stringify(datos),
    });
    const res = await response.json();
    if (res.status === 201) {
      reset();
      setSend(true);
      setError("");
    } else {
      setError(res.message);
    }
  });

  return (
    <>
      <button
        onClick={onOpen}
        className="bg-color01 min-w-52 max-w-52 text-color02 py-3 rounded-3xl">
        + Info
      </button>
      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        onOpenChange={onOpenChange}
        placement="center"
        size="xl"
        className="p-8 phone:max-h-[60vh] max-h-[60vh] desktop:max-h-[90vh] overflow-y-auto">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader
                className="flex 
                            font-parisienne
                            text-color01
                            font-light
                            text-5xl
                            phone:text-[34px]
                            p-0
                            desktop:text-5xl

                            text-center
                            my-4
                            flex-col gap-1">
                Tips y Notas
              </ModalHeader>
              <ModalBody className="font-rubik">
                <h3 style={title}>Actividades y Horarios</h3>
                <ul style={list}>
                  <li style={li}>
                    <span className="font-semibold">Ceremonia Civil:</span>
                    <span>
                      {" "}
                      Comienza a las 12:30 horas, así que por favor, llega
                      puntualmente.
                    </span>
                  </li>
                  <li style={li}>
                    <span className="font-semibold">Celebración:</span>

                    <span>La Celebración será a las 19:00 horas.</span>
                  </li>
                </ul>

                <h3 style={title}>peticiónes</h3>
                <ul style={list}>
                  <li style={li}>
                    <span className="font-semibold">Invitados:</span>
                    <span>
                      Por favor, te pedimos respetar la cantidad de invitados
                      asignados que figuran junto con el link de esta
                      invitación. Esto nos ayudará a tener una mejor
                      organización y asegurar que todos estén cómodos. ¡Gracias
                      por tu comprensión!
                    </span>
                  </li>
                  <li style={li}>
                    <span className="font-semibold">Fotografía:</span>

                    <span>
                      Te pedimos que evites tomar fotografías que puedan
                      interferir con el desarrollo de la ceremonia. Luego de
                      ello, siéntete libre de tomar las fotos que desees. No
                      olvides etiquetarnos en tus redes sociales con el hashtag{" "}
                      <strong>#AlvaroyJersy</strong>. Y no te olvides de subir
                      tus fotos y videos al <strong>drive</strong> para
                      compartir los recuerdos con todos 🤍
                    </span>
                  </li>
                </ul>
                <h3 className="font-bold text-base">Regalos</h3>
                <ul className="flex flex-col gap-2 ml-4">
                  <li className="text-sm flex flex-col gap-1">
                    Estamos muy emocionados de celebrar nuestro matrimonio con
                    ustedes y estamos profundamente agradecidos por su amor y
                    apoyo. Si desean honrarnos con un regalo, estas son algunas
                    opciones:
                  </li>

                  <li className="text-sm flex flex-col gap-1">
                    <span className="font-semibold">1. Lluvia de sobres:</span>
                    <span>
                      Puedes depositar tu sobre en nuestra caja de regalos y
                      deseos el día del evento.💌
                    </span>
                  </li>

                  <li className="text-sm flex flex-col gap-1">
                    <span className="font-semibold">2. CBU:</span>
                    <span className="flex items-center gap-2">
                      Alvaro Rojas
                    </span>
                    <div className="flex items-center gap-2">
                      <span>1430001713006928230013</span>
                      <button
                        onClick={() =>
                          handleCopy("1430001713006928230013", "CBU")
                        }
                        className="text-xs px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition">
                        {copied === "CBU" ? "Copiado ✅" : "Copiar"}
                      </button>
                    </div>
                  </li>

                  <li className="text-sm flex flex-col gap-1">
                    <span className="font-semibold">3. Nequi:</span>
                    <div className="flex items-center gap-2">
                      <span>3138802021</span>
                      <button
                        onClick={() => handleCopy("3138802021", "Nequi")}
                        className="text-xs px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition">
                        {copied === "Nequi" ? "Copiado ✅" : "Copiar"}
                      </button>
                    </div>
                  </li>
                </ul>
                <div className="flex flex-col gap-1 justify-end items-end ">
                  <span className="font-parisienne text-color01 text-lg font-bold">
                    Alvaro & Jersy
                  </span>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default TipsModal;
