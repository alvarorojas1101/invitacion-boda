import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { Radio, RadioGroup } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../firebase"; // Asegúrate de que la ruta sea correcta
import { addDoc, collection } from "firebase/firestore";

export default function AsistenciaModal({ type }) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
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
    try {
      if (asistenciaCheck === "") {
        setError("Debes seleccionar una opción de asistencia");
        return;
      }

      const datos = {
        ...data,
        Flag_Asistencia: asistenciaCheck,
        T_Tipo_Sede: type,
        fecha: new Date(), // Campo adicional para timestamp
      };

      // Firebase Firestore
      const docRef = await addDoc(collection(db, "asistencias"), datos);

      if (docRef.id) {
        reset();
        setSend(true);
        setError("");
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      setError("Ocurrió un error al enviar tu confirmación");
    }
  });

  return (
    <>
      <button
        onClick={onOpen}
        className="w-[280px] desktop:w-[200px] mx-auto  bg-color01 text-color02 py-3 rounded-3xl">
        Confirmar Asistencia
      </button>
      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="xl"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        className="p-8">
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
                ¿Asistes a la {type} ?
              </ModalHeader>
              <ModalBody>
                {!send ? (
                  <form onSubmit={handleGuardarForm}>
                    {error && (
                      <div className="text-center">
                        <span className="text-red-500 text-center text-xs">
                          {error}
                        </span>
                      </div>
                    )}

                    <div className="text-center mt-4 mb-8">
                      <div className="flex items-center justify-center ">
                        <RadioGroup
                          {...register("Flag_Asistencia", {})}
                          color="warning"
                          size="lg"
                          orientation="horizontal"
                          label=""
                          value={asistenciaCheck}
                          onValueChange={setAsistenciaCheck}>
                          <Radio value="SI">¡Sí, confirmo!</Radio>
                          <Radio value="NO">{`No puedo :(`} </Radio>
                        </RadioGroup>
                      </div>
                      {errors.Flag_Asistencia && (
                        <span className="text-red-500 text-xs">
                          {errors.Flag_Asistencia.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <Input
                          {...register("T_Apellido", {
                            required: {
                              value: true,
                              message: "Campo es requerido",
                            },
                          })}
                          label="Apellido"
                          placeholder="Ingresa tu apellido"
                          variant="bordered"
                        />
                        {errors.T_Apellido && (
                          <span className="text-red-500 text-xs">
                            {errors.T_Apellido.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <Input
                          {...register("T_Nombres", {
                            required: {
                              value: true,
                              message: "Campo es requerido",
                            },
                          })}
                          label="Nombres"
                          placeholder="Ingresa tus nombres"
                          variant="bordered"
                        />
                        {errors.T_Nombres && (
                          <span className="text-red-500 text-xs">
                            {errors.T_Nombres.message}
                          </span>
                        )}
                      </div>
                      {}

                      {isSubmitting ? (
                        <button
                          disabled
                          className="bg-color01 disabled:bg-color03 text-color02 py-3  w-[280px] mx-auto desktop:w-[200px] rounded-3xl">
                          Enviando ..
                        </button>
                      ) : (
                        <button className="bg-color01 text-color02 py-3  w-[280px] mx-auto desktop:w-[200px] rounded-3xl">
                          Enviar
                        </button>
                      )}
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="w-full flex flex-col gap-5 items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-28 text-color01 ">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                        />
                      </svg>
                      <p className="  font-rubik text-center  text-xl ">
                        ¡Se envió tu respuesta, Gracias!
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        reset();
                        onClose();
                        setSend(false);
                      }}
                      className="bg-color01 mt-5 text-color02 py-3  w-[280px] mx-auto desktop:w-[200px] rounded-3xl">
                      Salir
                    </button>
                  </>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
