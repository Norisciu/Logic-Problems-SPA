import React, { createContext, useEffect, useState } from "react";
import ButtonCustom from "../Controls/ButtonCustom";
import { checkData } from "./checkData";

const initFormCheckerData = {
  errors: [],
  dirty: {},
  formIsSubmit: false,
  callSubmit: false,
};

export const FormContext = createContext();

export function FormChecker({ formData, formRules, submitCallback, children }) {
  const [formCheckerState, setFormCheckerState] = useState(initFormCheckerData);
  const { errors, dirty } = formCheckerState;

  useEffect(() => {
    if (Object.keys(dirty).length === 0) {
      return;
    }

    let errors = checkData(formData, formRules);
    setFormCheckerState({ ...formCheckerState, errors: errors });
  }, [formData]);

  useEffect(() => console.log(formCheckerState));

  const getFieldErrors = (field) => {
    const shouldShowError =
      formCheckerState.formIsSubmit || !!formCheckerState.dirty[field];

    return shouldShowError ? errors[field] || [] : [];
  };

  const handleChange = (event) => {
    event.preventDefault();
    let name = event.target.name;
    let changes = {
      dirty: {
        ...formCheckerState.dirty,
        [name]: true,
      },
    };

    setFormCheckerState({ ...formCheckerState, ...changes });
  };

  const handleOnRemoveButtonClick = (event) => {
    event.preventDefault();
    if (event.target.name != "remove-button") {
      return;
    }
    let name = event.target.name;
    let changes = {
      dirty: {
        ...formCheckerState.dirty,
        [name]: true,
      },
    };

    setFormCheckerState({ ...formCheckerState, ...changes });
  };

  const isFormVald = () => Object.keys(formCheckerState.errors).length === 0;

  const handleClick = (event) => {
    event.preventDefault();
    setFormCheckerState({
      ...formCheckerState,
      formIsSubmit: true,
      callSubmit: true,
    });
  };

  useEffect(() => {
    if (isFormVald() && formCheckerState.callSubmit) {
      submitCallback();
    }

    setFormCheckerState({
      ...formCheckerState,
      callSubmit: false,
    });
  }, [formCheckerState.callSubmit]);

  return (
    <>
      <FormContext.Provider value={{ getFieldErrors }}>
        <div
          style={{ width: "100%" }}
          className=""
          onChange={handleChange}
          onClick={handleOnRemoveButtonClick}
        >
          {children}
        </div>
      </FormContext.Provider>
      <ButtonCustom onClick={handleClick}>Submit</ButtonCustom>
    </>
  );
}
