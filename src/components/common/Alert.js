import React from "react";
import {Alert, Button, Modal, ModalBody, ModalFooter} from 'react-bootstrap';
import {compose} from "redux";
import {connect} from "react-redux";
import {getError} from "../../redux/select/chat-selector";
import {setErrorCreate} from "../../redux/chat-reducer";

const ErrorModal = (props) => {
    return <>
        <Modal
            show={props.catch_error !== null}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Alert variant="danger"
                   style={{marginBottom: 0}}
                   onClose={() => {
                       props.setError(null)
                   }} dismissible
            >
                <Alert.Heading>ОШИБКА</Alert.Heading>
                <p>
                    {props.catch_error}
                </p>
            </Alert>
        </Modal>
    </>
}

const mapStateToProps = (state) => {
    return {
        catch_error: getError(state),
    }
}

export const ErrorModalContainer = compose(
    connect(mapStateToProps, {setError: setErrorCreate}),
)(ErrorModal);
