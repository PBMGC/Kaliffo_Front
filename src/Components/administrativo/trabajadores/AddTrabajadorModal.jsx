import React, { useEffect, useState } from "react";
import { Col, DatePicker, Form, Input, Modal, Row, Select, InputNumber } from "antd";
import { onlyDecimalKey , onlyNumberKey , onlyLettersKey, onlyDecimalInput, onlyNumberInput, onlyLettersInput, preventPaste } from "../../../Shared/Tools";
import { addTrabajador } from "@AA/Usuario";
import { getTiendas } from "@AA/Tienda";

const AddTrabajadorModal = ({
  openModal,
  closeModal,
  tipoTrabajador,
  reload,
  setReload,
}) => {

  const [form] = Form.useForm()
  const [tiendas, setTiendas] = useState([])

  useEffect(() => {
    if (tipoTrabajador === "ventas") {
      getTiendas(setTiendas)
    }
  }, [tipoTrabajador, form])


  return (
    <Modal
      forceRender
      getContainer={false}
      styles={{header:{textTransform:"uppercase",textAlign:"center"},body:{height:"430px"}}}
      title={`Añadir Nuevo Trabajador a ${tipoTrabajador}`}
      open={openModal}
      onCancel={closeModal}
      okText="Añadir"
      onOk={form.submit}
      centered={true}
    >
      <Form
      autoComplete={"false"}
        style={{ maxWidth: 500, margin: "0 auto" }}
        size="large"
        form={form}
        layout="vertical"
        labelAlign="center"
        id="formulariocrear"
        onFinish={async (values) => {
          await addTrabajador(tipoTrabajador, values)
          setReload(!reload)
          closeModal(false)
          form.resetFields()
        }}>
        <Form.Item
          style={{ marginTop: 20 }}
          name="nombre"
          label="Nombres"
          rules={[
            {
              required: true,
              message: "Nombres requeridos"
            },
          ]}
        >
          <Input
          onPaste={preventPaste}
          onKeyDown={onlyLettersKey}
          onInput={onlyLettersInput}
          />
        </Form.Item>
        <Row
          justify="space-around"
          align="middle"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="ap_paterno"
              label="Apellido Paterno"
              rules={[
                {
                  required: true,
                  message: "Apellido Paterno Requerido"
                },
              ]}
            >
              <Input
              onPaste={preventPaste}
              onKeyDown={onlyLettersKey}
              onInput={onlyLettersInput}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row" >
            <Form.Item
              name="ap_materno"
              label="Apellido Materno"
              rules={[
                {
                  required: true,
                  message: "Apellido Materno Requerido"
                },
              ]}
            >
              <Input
              onPaste={preventPaste}
              onKeyDown={onlyLettersKey}
              onInput={onlyLettersInput}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row
          justify="space-around"
          align="middle"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}>
          <Col span={12} className="gutter-row">
            <Form.Item
              label="Fecha Nacimiento"
              name="fecha_nacimiento"
              rules={[
                {
                  required: true,
                  message: "Fecha Nacimiento requerido"
                }
              ]}>
              <DatePicker
                placement="bottomRight"
                popupStyle={{ height: '257px' }}
                placeholder="DD-MM-YYYY"
                format={"DD-MM-YYYY"}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="telefono"
              label="Telefono"
              rules={[
                {
                  required: true,
                  message: "Telefono Requerido"
                },
              ]}
            >
              <Input
              showCount
              maxLength={9}
              onPaste={preventPaste}
              onKeyDown={onlyNumberKey}
              onInput={onlyNumberInput}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row
          justify="space-around"
          align="middle"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="dni"
              label="DNI"
              rules={[
                {
                  required: true,
                  message: "DNI requerido"
                },
              ]}
            >
              <Input
              showCount
              maxLength={8}
              onPaste={preventPaste}
              onKeyDown={onlyNumberKey}
              onInput={onlyNumberInput}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
          <Form.Item
              name="sueldo"
              label="Sueldo"
              rules={[
                {
                  required: true,
                  message: "Sueldo requerido"
                },
              ]}
            >
              <Input
              prefix="S/."
              onPaste={preventPaste}
              onKeyDown={onlyDecimalKey}
              onInput={onlyDecimalInput}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
          {tipoTrabajador === "ventas" ?
              (
                <Form.Item
                  name="tienda_id"
                  label="Tienda Asignada"
                  rules={[
                    {
                      required: true,
                      message: "Tienda Asignada"
                    },
                  ]}
                >
                  <Select options={tiendas.map(tienda => ({
                    value: tienda.tienda_id,
                    label: tienda.tienda,
                    key: tienda.tienda_id,
                  }))} />
                </Form.Item>
              ) : null}
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddTrabajadorModal;
