import React, {useState} from "react";
import {Button, Col, Container, Form, FormControl, InputGroup, Modal, Row} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import {FieldWithError} from "../../common/FormsControl/FormsControl";
import {required} from "../../../utils/utils";

const ModalForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Modal.Body>
            <Col style={{paddingBottom: 10}}>
                {props.message}
            </Col>
            <InputGroup className="mb-3">
                <Col sm="12">
                <Field name={"value"} component={FieldWithError} placeholder={props.placeholder} validate={[required]}/>
                </Col>
            </InputGroup>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" type="submit" onClick={props.deactivateModal}>
                Сохранить
            </Button>
            <Button variant="secondary" onClick={props.deactivateModal}>
                Отменить
            </Button>
        </Modal.Footer>
    </form>
}

const ModalReduxForm = reduxForm({form: 'modalPrompt'})(ModalForm);

// <ModalPrompt onSubmit={text => {...}}/>
const ModalPrompt = (props) => {
    const [show, setShow] = useState(false);

    const deactivateModal = () => {
        setShow(false)
    };

    const activateModal = () => {
        setShow(true)
    };


    const onSubmit = (formData) => {
        props.onSubmit(formData.value);
    }

    return (<>
            <Button variant="outline-light" onClick={activateModal}>{props.title}</Button>

            <Modal
                show={show}
                onHide={deactivateModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>

                <ModalReduxForm
                    onSubmit={onSubmit}
                    placeholder={props.placeholder}
                    deactivateModal={deactivateModal}
                    message={props.message}
                />
            </Modal>
        </>
    )
}

export default ModalPrompt;