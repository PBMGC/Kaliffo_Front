export const getHorarioById = async (id, setHorario) => {
    const response = await fetch(`http://localhost:3000/asistencia/horasTrabajadas/${id}`)
    const productoData= await response.json()
    setHorario(productoData)
    console.log(productoData)
}

export const updateHorarioById = async (id, reload, setReload) => {
    const response = await fetch(`http://localhost:3000/asistencia/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    })
    setReload(reload == true ? false : true)
    console.log(response)
}

export const deleteHorarioById = async (id, reload, setReload, api) => {
    const response = await fetch(`http://localhost:3000/asistencia/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    })
    setReload(reload == true ? false : true)
    api.open(showNotificationDelete("Horario Eliminado"))
    console.log(response)
}