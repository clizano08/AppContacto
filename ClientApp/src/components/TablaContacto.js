import { Table, Button } from "reactstrap"

const TablaContacto = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarContacto }) => { //con data se recibe la lista de contactos

    const enviarDatos = (contacto) => {
        setEditar(contacto)
        setMostrarModal(!mostrarModal)
      
    }

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    /*Valida que hallan elementos en la lista*/
                    /*En caso que no hallan muestra mensaje Sin Registros*/
                    /*colSpan="4" para unir las 4 columnas*/
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="4">Sin Registros</td>
                        </tr>
                    ) : (
                        data.map(
                            (contacto) => (

                                <tr key={contacto.idContacto}>{/*Se debe asignar un key ya que react lo pide*/}

                                    <td>{contacto.nombre}</td>
                                    <td>{contacto.correo}</td>
                                    <td>{contacto.telefono}</td>

                                    <td>
                                        {/*Botones de Editar y Eliminar*/}
                                        <Button size="sm" color="primary" className="me-2" onClick={() => enviarDatos(contacto)}>Editar</Button>
                                        <Button size="sm" color="danger" onClick={() => eliminarContacto(contacto.idContacto)}>Eliminar</Button>
                                    </td>

                                </tr>
                            ))
                    )
                }
            </tbody>
        </Table >
    )
}
export default TablaContacto;