import { useEffect, useState } from "react"
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap" //importa ReactStrap
import ModalContacto from "./components/ModalContacto"
import TablaContacto from "./components/TablaContacto"


const App = () => {
    const [contactos, setContactos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);//Manipular el estado del modal, por defecto false
    const [editar, setEditar] = useState(null);//variable que contiene el contacto a ser editado

    //Listar Contactos
    const mostrarContactos = async () => { //funcion mostrar

        //consume el controlador
        const response = await fetch("api/contacto/Lista");

        if (response.ok) {

            const data = await response.json();//obtiene datos
            /* console.log(data)*/
            setContactos(data)// asigna a funcion 

        } else {
            console.log("Error al cargar la lista")
        }
    }

    //Cargar Datos
    useEffect(() => {//evento para cuando algo sucede
        mostrarContactos();
    }, []); //[] se ejecuta al iniciar la applicacion

    //Guardar Contacto
    const guardarContacto = async (contacto) => {

        //consume el controlador
        const response = await fetch("api/contacto/Guardar", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset= utf-8' },
            body: JSON.stringify(contacto)
        });

        if (response.ok) {

            setMostrarModal(!mostrarModal)// Activa el modal al negar mostrarModal
            mostrarContactos();

        } else {
            console.log("Error al cargar la lista")
        }

    }

    //Editar Contacto
    const editarContacto = async (contacto) => {

        //consume el controlador
        const response = await fetch("api/contacto/Editar", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json; charset= utf-8' },
            body: JSON.stringify(contacto)
        });

        if (response.ok) {

            setMostrarModal(!mostrarModal)// Activa el modal al negar mostrarModal
            mostrarContactos();

        } else {
            console.log("Error al cargar la lista")
        }

    }


    //Eliminar Contacto
    const eliminarContacto = async (id) => {
        //mensaje confimacion del eliminar
        var result = window.confirm("Desea eliminar el contacto?")

        if (!result) {
            return;
        }

        //consume el controlador
        const response = await fetch("api/contacto/Eliminar/" + id, {
            method: 'DELETE'
        });

        if (response.ok) {

            mostrarContactos();

        } else {
            console.log("Error al elimnar contacto")
        }

    }


    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de contactos</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>Nuevo Contacto</Button>
                            <hr></hr>
                            {/*Llama al componenete para incrustarlo en la vista*/}
                            {/*Envia la lista de contactos al componente con el data al componente*/}
                            <TablaContacto data={contactos}

                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}

                                eliminarContacto={eliminarContacto}
                            />
                       </CardBody>
                    </Card>
                </Col>
            </Row>
            {/*Props del componente*/}
            <ModalContacto mostrarModal={mostrarModal}

                setMostrarModal={setMostrarModal}
                guardarContacto={guardarContacto}

                editar={editar}
                setEditar={setEditar}
                editarContacto={editarContacto}
            />
        </Container>
    )
}
export default App;
