import { useField } from '@unform/core';
import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import {IconBaseProps} from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({name,type, icon: Icon, ...rest}) => {

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

    return (
        <Container isFocused={isFocused} isFilled={isFilled} isErrored={!!error} hidden={type === "hidden" ? true : false} >
            {Icon && <Icon size={20} />}
            <input 
                defaultValue={defaultValue}
                ref={inputRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
                type={type}
                {...rest} 
            />
            {error && 
                <Error title={error}>
                  <FiAlertCircle size={20} color='#c53030'/>
                </Error>
            }
        </Container>
    );
}

export default Input;