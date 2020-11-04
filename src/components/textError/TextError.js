import React from 'react';
import style from './TextError.module.css';

export default function TextError(props) {
    return (
        <p className = { style.textError }>
            { props.children }
        </p>
    );
}