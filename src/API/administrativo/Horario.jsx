import { showNotification } from "../../Shared/Notifications"

export const getHorarioById = async (id, setHorario) => {
    try {
        const response = await fetch(`http://localhost:3000/asistencia?usuario_id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
    
        const data = await response.json();
        const asistenciasNormalizadas = data.map(asistencia => {
            const date = new Date(asistencia.fecha);
            const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
            var fecha = date.toLocaleDateString('es-PE', opciones);
            return {
              ...asistencia,
              fecha: fecha
            };
          });
    
        setHorario(asistenciasNormalizadas);
      } catch (error) {
        console.error("Error al obtener asistencias:", error);
      }
}

export const updateHorarioById = async (id, reload, setReload) => {
    const response = await fetch(`http://localhost:3000/asistencia/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    })
    setReload(!reload)
}

export const deleteHorarioById = async (id, reload, setReload) => {
    const response = await fetch(`http://localhost:3000/asistencia/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    })
    setReload(!reload)
    showNotification("delete","Horario Eliminado")
}
