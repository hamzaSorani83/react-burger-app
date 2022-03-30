import React from 'react';
import classes from './Auth.module.css';
import { useState } from 'react';
import Input from '../../components/OrderList/Input/Input';
import { authStart } from '../../store/auth';
import { useDispatch } from 'react-redux';

export default function Auth() {
  const initialControls = {
    email: {
        elementType: "input",
        elementConfig: {
          name: "email",
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        messages: {
          required: null,
          isEmail: null,
        },
        valid: false,
        focus: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          name: "password",
          type: "password",
          placeholder: "Your Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        messages: {
          required: null,
          minLength: null,
        },
        valid: false,
        focus: false,
        touched: false,
      },
  }
  const [ controls,setControls ] = useState( initialControls );
  const dispatch = useDispatch();
  
  const inputChangedHandler = (event, inputName) => {
    const updatedControls = {
      ...controls,
      [inputName]: {
        ...controls[inputName],
        value: event.target.value,
      },
    };
    setControls(updatedControls );
  }
  
  const inputBluredHandler = (inputName) => {
    const isValid = checkValidity(
      controls[inputName],
      controls[inputName].validation
    );
    if (!isValid) {
      setControls(
        {
            ...controls,
            [inputName]: { ...controls[inputName], focus: true },
        }
      );
    }
  };
  
  const checkValidity = (formElement, rules) => {
    let isValid = true;
    let value = formElement.value;
    
    if (!rules) {
      return true;
    }
    
    if (rules.required) {
      if (value.trim() === "") {
        isValid = false;
        formElement.messages.required = "This Field is required";
      } else {
        isValid = isValid && true;
        formElement.messages.required = null;
      }
    }
    
    if (rules.minLength) {
      if (value.length < rules.minLength) {
        isValid = false;
        formElement.messages.minLength = `Length must be greater than  ${
          rules.minLength - 1
        }`;
      } else {
        isValid = isValid && true;
        formElement.messages.minLength = null;
      }
    }
    
    if (rules.maxLength) {
      if (value.length > rules.maxLength) {
        isValid = false;
        formElement.messages.maxLength = `Length must be less than  ${
          rules.maxLength + 1
        }`;
      } else {
        isValid = isValid && true;
        formElement.messages.maxLength = null;
      }
    }
    
    if (rules.isEmail) {
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      if (!pattern.test(value)) {
        isValid = false;
        formElement.messages.isEmail =
          "The email address must contain a single @";
      } else {
        isValid = isValid && true;
        formElement.messages.isEmail = null;
      }
    }
    
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      if (!pattern.test(value)) {
        isValid = false;
        formElement.messages.isNumeric =
          "This field must not contain any character";
      } else {
        isValid = isValid && true;
        formElement.messages.isNumeric = null;
      }
    }
    
    return isValid;
  }
  
  const submitHandler = ( e ) => {
    e.preventDefault();
    dispatch( authStart({email: controls.email.value, password: controls.password.value}) );
  }
  
  let formElementsArray = [];
  for (const key in controls) {
    formElementsArray.push(controls[key]);
  }
  return (
    <div className={classes.Auth}>
      <form>
        {formElementsArray.map((formElement, index) => {
          return (
            <Input
              key={index}
              elementType={formElement.elementType}
              elementConfig={formElement.elementConfig}
              value={formElement.value}
              label={formElement.elementConfig.placeholder}
              invalid={!formElement.valid}
              shouldValidate={formElement.validation}
              touched={formElement.touched}
              messages={formElement.messages}
              focus={formElement.focus}
              changed={(event) =>
                inputChangedHandler(event, formElement.elementConfig.name)
              }
              blured={(event) =>
                inputBluredHandler(formElement.elementConfig.name)
              }
            />
          );
        })}
        <button
          className={`${classes.Button} ${classes.Success}`}
          onClick={submitHandler}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}