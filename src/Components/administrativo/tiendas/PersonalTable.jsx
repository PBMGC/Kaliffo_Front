import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import UpdateTrabajadorModal from "@CA/trabajadores/UpdateTrabajadorModal";
import AddPersonalModal from "@CA/tiendas/AddPersonalModal";
import { getTrabajadoresTienda, deleteTrabajadorById } from '@AA/Usuario';
import { Table, Button, Row, Col, Popconfirm, FloatButton } from "antd";
import { FileAddOutlined } from "@ant-design/icons";

const PersonalTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuariostienda, setUsuariostienda] = useState([]);
  const [idPersonal, setIdPersonal] = useState(null);
  const [reload, setReload] = useState(false);

  const [OpenModalUpdate, setOpenModalUpdate] = useState(false);
  const [OpenaddTrabajadorModal,setOpenaddTrabajadorModal] = useState(false)

  useEffect(() => {
    getTrabajadoresTienda(id, setUsuariostienda);
  }, [id, reload]);

  const columns = [
    {
      title: "Nombre",
      key: "nombre",
      render: (record) =>
        `${record.nombre} ${record.ap_paterno} ${record.ap_materno}`,
      align: "center",
    },
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
      align: "center",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
      align: "center",
    },
    {
      title:"Ver mas",
      dataIndex: "usuario_id",
      key:"verMas",
      align:"center",
      render:(text) =>{
        return(
          <Button type="primary" block
          onClick={() => {
            navigate(`/admin/trabajadores/${text}`)
          }}
          >+</Button>
        )
      }
    },
    {
      title: "Opciones",
      dataIndex: "usuario_id",
      key: "opciones",
      align: "center",
      render: (text) => {
        return (
          <Row gutter={[8, 8]} justify="center" align="middle">
            <Col>
                <Button type="primary" block onClick={() => {
                  setIdPersonal(text)
                  setOpenModalUpdate(true)
                  }}>Editar</Button>
            </Col>
            <Col>
              <Popconfirm
                title="ELIMINAR"
                description="DESEA ELIMINAR A"
                okText="Confirmar"
                cancelText="NO"
                onConfirm={() => {
                  deleteTrabajadorById(text)
                  setReload(!reload)
                }}
              >
              <Button block style={{ background: "#f54242", color: "white" }} danger>Eliminar</Button>
              </Popconfirm>
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <>
      <FloatButton tooltip="Añadir Nuevo Personal" onClick={() => setOpenaddTrabajadorModal(true)} type="primary" icon={<FileAddOutlined />}/>

      <Table
        columns={columns}
        pagination={{ pageSize: 5 }}
        bordered
        dataSource={usuariostienda.map((item, index) => ({ ...item, key: index }))}
        rowKey={(record) => record.usuario_id}
      />

      <UpdateTrabajadorModal
        openModal={OpenModalUpdate}
        closeModal={()=>setOpenModalUpdate(false)}
        id={idPersonal}
        reload={() => setReload(!reload)}
      />

      <AddPersonalModal
        openModal={OpenaddTrabajadorModal}
        closeModal={() => setOpenaddTrabajadorModal(false)}
        id={id}
        reload={() => setReload(!reload)}
      />
    </>
  );
};

export default PersonalTable;