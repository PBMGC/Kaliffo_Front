import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import ProductoDetalleModal from "@CA/productos/ProductoDetalleModal"
// import AddProductosModal from "@CA/productos/AddProductosModal";
import { getProductosByTienda, deleteProductoByTienda } from "@AA/Producto";
import { Button, Row, Col, Popconfirm, Table, FloatButton } from "antd";


const ProductosTable = () => {

  const { id } = useParams();

  const[productostienda,setproductostienda] = useState([])
  const[reload,setReload] = useState(false)
  const[OpenAddProductoModal,setOpenAddProductoModal] = useState(false)
  const[OpenTiendaDetalleProducto,setOpenTiendaDetalleProducto] = useState(false)
  const[idp,setIdP] = useState(0)
  const[nombreProducto,setNombreProducto] = useState(0)

  useEffect(() => {
    getProductosByTienda(id,setproductostienda)
  }, [id, reload]);

  const columns = [
    {
      title: "Productosa",
      key: "nombre",
      dataIndex:"nombre",
      align: "center",
    },
    {
      title: "Stock",
      key: "stock",
      align: "center",
      dataIndex:"stock",
      defaultSortOrder: "ascend",
      onCell: (record) => ({
          style: {
            background: record.stock >= 50 
              ? 'green' 
              : record.stock <= 20
              ? '#f54242' 
              : '#FCFB77',  
            color: record.stock <= 20 || record.stock >= 50 ? "white" : "black",
            padding: "10px"
          }
        })
    },
    {
      title: "Precio",
      key:"precioBase",
      dataIndex:"precioBase",
      align:"center",
      render: (text) =>
        `S/ ${text}`,
    },
    {
      title: "Descuento",
      dataIndex:"descuento",
      key:"descuento",
      align:"center",
      onCell: (record) => ({
        style: {
          background: record.descuento <= 10 
            ? 'green' 
            : record.descuento >= 20
            ? '#f54242' 
            : '#FCFB77',  
          color: record.descuento <= 10 || record.descuento >= 20 ? "white" : "black",
          padding: "10px"
        }
      }),
      render: (text) =>
        `${text}%`,
    },
    {
      title:"Ver mas",
      dataIndex:"producto_id",
      key:"vermas",
      align:"center",
      render:(text, record) =>{
        return(
          <Button type="primary" block
          onClick= {() => {
            setIdP(text)
            setNombreProducto(record.nombre)
            setOpenTiendaDetalleProducto(true)
          }}
          >+</Button>
        )
      }
    },
  ];

  return (
    <> 
      <Table columns={columns}
      pagination={{ pageSize: 5 }}
      bordered
      dataSource={productostienda.map((item, index) => ({ ...item, key: index }))}
      rowKey={(record) => record.producto_id}
      />
{/* 
      <AddProductosModal
      openModal = {OpenAddProductoModal}
      closeModal={() => setOpenAddProductoModal(false)}
      id={id}
      reload={()=>setReload(!reload)}
      /> 
*/}

      <ProductoDetalleModal
      openModal = {OpenTiendaDetalleProducto}
      closeModal={setOpenTiendaDetalleProducto}
      id={id}
      idp={idp}
      nombreProducto={nombreProducto}
      />
    </>
  );
};

export default ProductosTable;
