import { useEffect, useState } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from "reactstrap"

const modeloContacto = { //instacia de contacto
    idContacto: 0,
    nombre: "",
    correo: "",
    telefono: ""
}

const ModalContacto = ({ mostrarModal, setMostrarModal, guardarContacto, editar, setEditar, editarContacto }) => {

    const [contacto, setContacto] = useState(modeloContacto); //manupular el estado del contacto

    const actualizarDato = (e) => {

        /* console.log(e.target.name + " : " + e.target.value)*/

        setContacto({ //Actualiza instacia
            ...contacto, // rescata lo que ya tiene
            [e.target.name]: e.target.value // agrega lo nuevo
        })
    }

    const enviarDatos = () => {

        if (contacto.idContacto == 0) {// validacion para Agregar contacto
            guardarContacto(contacto)
        } else {
            editarContacto(contacto)    
        }

        setContacto(modeloContacto) // un vez guardado o editado limpia los campos
    }

    useEffect(() => {

        if (editar != null) { //si tiene un contacto lo monta
            setContacto(editar)
        } else { // vacia los campos
            setContacto(modeloContacto)
        }


    }, [editar]) // se ejecuta cuando editar cambie de su posicion

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }


    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {contacto.idContacto == 0 ? "Nuevo Contacto" : "Editar Contacto"} 
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizarDato(e)} value={contacto.nombre} /> {/*Obtiene el valor cuando el valor cambie*/}
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo</Label>
                        <Input name="correo" onChange={(e) => actualizarDato(e)} value={contacto.correo} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Teléfono</Label>
                        <Input name="telefono" onChange={(e) => actualizarDato(e)} value={contacto.telefono} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button size="sm" color="success" onClick={enviarDatos}>Guardar</Button>
                <Button size="sm" color="secondary" onClick={cerrarModal}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )

}
export default ModalContacto;