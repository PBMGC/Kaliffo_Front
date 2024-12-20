import React,{useState,useEffect}from "react";
import { useParams } from "react-router-dom";
import { getTiendaById } from "@AA/Tienda";
import { Card, List,Button } from "antd";

import { getReporteTienda } from "@AA/Reporte";


const TiendaCard = () =>{

  const { id } = useParams();
  const [tienda, setTienda] = useState([]);

  useEffect(() => {
    getTiendaById(id, setTienda);
  }, [id]);

    return(
        <Card styles={{header:{textAlign:"center",fontWeight:"bold",fontSize:"23px"}}} title={tienda.tienda}
        actions={[
          <Button onClick={()=>getReporteTienda(id)} type="primary" block style={{fontWeight:"bold"}}>
          OBTENER REPORTE
        </Button>
        ]}>
        <List
          itemLayout="horizontal"
          dataSource={[
            { title: "DIRECCIÓN", value: tienda.direccion == null ? '0' : `${tienda.direccion}` },
            { title: "TELÉFONO", value: tienda.telefono == null ? '0' : `${tienda.telefono}` },
            { title: "STOCK TOTAL", value: tienda.total_stock == null ? '0' : `${tienda.total_stock}` },
            { title: "VENTAS TOTALES", value: tienda.ventas == null ? '0' : `${tienda.ventas}`  },
            { title: "PERSONAL ASIGNADO", value: `${tienda.total_usuarios}` },
          ]}
          renderItem={(item) => (
            <List.Item>
              <b style={{ textAlign: 'left', marginRight: "40px" }}>{item.title}</b>
              <a style={{ float: "right" }}>{item.value}</a>
            </List.Item>
          )}
        />
      </Card>
    )
}

export default TiendaCard