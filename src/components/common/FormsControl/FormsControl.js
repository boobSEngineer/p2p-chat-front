import React from "react";
import s from "./FormsControl.module.css"
import {Form} from "react-bootstrap";

export const Textarea = ({input, meta, ...props}) => { //рест оператор
    return (
        <div>
            <textarea {...input} {...props}/>
        </div>
    )
}

export const FieldWithError = ({input, meta, ...props}) => {
        const hasError = meta.touched && meta.error;
        return (
            <>
                <div className={s.formControl + " " + (hasError ? s.error : " ")}>
                    <Form.Control {...input} {...props}/>
                    <div>
                        {hasError && <span>{meta.error} </span>}
                    </div>
                </div>
            </>
        )
    }

export const FormControlField = ({input, meta, ...props}) => {
    return <>
        <Form.Control {...input} {...props}>
        </Form.Control>
    </>
}
