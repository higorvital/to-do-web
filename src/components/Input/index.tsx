import { useField } from '@unform/core';
import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import {IconBaseProps} from 'react-icons';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({name,icon: Icon,...rest}) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setFocused] = useState(false);
    const [isFilled, setFilled] = useState(false);

    const {fieldName, defaultValue, error, registerField} = useField(name);

    useEffect(()=>{
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })

    },[registerField, fieldName])

    const handleFocus = useCallback(()=>{

        setFocused(true);

    },[]);

    const handleBlur = useCallback(()=>{

        setFocused(false);

        setFilled(!! inputRef.current?.value);

    },[]);

    useEffect(()=>{
        console.log("error: "+error);
    },[error]);

    return (
        <Container isFocused={isFocused} isFilled={isFilled} isErrored={!!error} >
            {Icon && <Icon size={20} />}
            <input 
                defaultValue={defaultValue}
                ref={inputRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...rest} 
            />
            {error}
        </Container>
    );
}

export default Input;