import React from 'react';

import classes from './Input.module.css';

export default function Input(props) {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    } else if( props.touched){
        inputClasses.push(classes.Valid);
    }
    
    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
              className={ inputClasses.join( ' ' ) }
              { ...props.elementConfig }
              value={ props.value }
              onChange={ props.changed }
              onBlur={ props.blured } />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }
    
    let messages;
    if ( props.focus ) {
        messages = Object.values(props.messages)
  }
  
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            { inputElement }
            { props.focus ?
                <div className={ [ classes.Alert,classes.AlertDanger ].join( ' ' ) }>
                    { messages.map( (message, index) => {
                        return <span key={index}> {message}  </span>
                    })}
                </div>
                : <></> }
        </div>
    );

}
