import apiClient from '../apiClient';

// Función que obtiene la lista de almacenes desde el servidor y actualiza el estado con los datos o un arreglo vacío en caso de error.
// http://localhost:3000/almacen_productos
export const getAlmacenes = async (setAlmacenes) => {
  try {
    const { data } = await apiClient.get('/almacen_productos');
    setAlmacenes(data);
  } catch (error) {
    console.error('Error al obtener los almacenes:', error);
    setAlmacenes([]);
  }
};
