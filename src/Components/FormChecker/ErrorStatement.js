import React, { useContext } from "react";
import { FormContext } from "./FormChecker";
import "./ErrorStatement.css";

export function ErrorStatement({field}){
    const { getFieldErrors } = useContext(FormContext);
    const displayErrors = getFieldErrors(field).map(error => {
        return (
            <div  className="error-box">
                {error}
            </div>
        )
    });

    return  displayErrors ;
}