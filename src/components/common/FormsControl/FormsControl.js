import React from "react";
import s from "./FormsControl.module.css"

export const Textarea = ({input, meta, ...props}) => { //рест оператор
    return (
        <div>
            <textarea {...input} {...props}/>
        </div>
    )
}

export const FieldWithError = (Element) => {
    return ({input, meta, ...props}) => {
        const hasError = meta.touched && meta.error;
        return (
            <div>
                <div className={s.formControl + " " + (hasError ? s.error : " ")}>
                    <Element {...input} {...props}/>
                    <div>
                        {hasError && <span>{meta.error} </span>}
                    </div>
                </div>
            </div>
        )
    }
}

