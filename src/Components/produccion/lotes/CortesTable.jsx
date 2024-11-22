import React, { useEffect, useState } from "react";
import { Table, FloatButton, Row, Col, Popconfirm, Button } from "antd";
import { useParams } from "react-router-dom";
import { getCorte, deleteCorte } from "@AP/Corte";
import AddCorteModal from "@CP/lotes/AddCorteModal";

const CortesTable = ({ status, reload, setReload }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    getCorte(id, setData);
  }, [id, reload]);

  // Verificar si algún registro tiene estado === 1
  const hasOptions = data.some(record => record.estado === 1);

  // Definir columnas dinámicamente
  const columns = [
    { key: 'taller', dataIndex: 'taller', title: 'Taller' },
    { key: 'producto', dataIndex: 'producto', title: 'Producto' },
    { key: 'cantidad', dataIndex: 'cantidad_enviada', title: 'Cantidad' },
    { key: 'talla', dataIndex: 'talla', title: 'Talla' },
    ...(hasOptions
      ? [
          {
            title: "Opciones",
            key: "opciones",
            align: "center",
            render: (text, record) => {
              if (record.estado === 1) {
                return (
                  <Popconfirm
                    title="ELIMINAR"
                    description="DESEA ELIMINAR ESTE CORTE"
                    okText="Confirmar"
                    cancelText="NO"
                    onConfirm={() => {
                      deleteCorte(record.corte_id, record.estado);
                      setReload(!reload);
                    }}
                  >
                    <Button block style={{ background: "#f54242", color: "white" }} danger>
                      Eliminar
                    </Button>
                  </Popconfirm>
                );
              }
              return null;
            },
          },
        ]
      : []),
  ];

  return (
    <>
      <FloatButton
        style={{ insetInlineStart: 270 }}
        onClick={() => setOpenAddModal(true)}
        tooltip="Añadir Corte"
      />

      <Table dataSource={data} columns={columns} rowKey="corte_id" />

      <AddCorteModal
        openModal={openAddModal}
        closeModal={() => setOpenAddModal(false)}
        reload={() => setReload(!reload)}
      />
    </>
  );
};

export default CortesTable;
