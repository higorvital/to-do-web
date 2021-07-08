import { useField } from '@unform/core';
import React, { TextareaHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    triggerOnBlur?(): void;
}

/* dfsdfsf */

const Textarea: React.FC<TextareaProps> = ({name,triggerOnBlur, ...rest}) => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isFocused, setFocused] = useState(false);
    const [isFilled, setFilled] = useState(false);

    const {fieldName, defaultValue, error, registerField} = useField(name);

    useEffect(()=>{
        registerField({
            name: fieldName,
            ref: textareaRef.current,
            path: 'value'
        })

    },[registerField, fieldName])

    const handleFocus = useCallback(()=>{

        setFocused(true);

    },[]);

    const handleBlur = useCallback(()=>{

        setFocused(false);

        setFilled(!! textareaRef.current?.value);

        triggerOnBlur && triggerOnBlur();

    },[triggerOnBlur]);

    return (
        <Container isFocused={isFocused} isFilled={isFilled} isErrored={!!error}>
            <textarea
                defaultValue={defaultValue}
                ref={textareaRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
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

export default Textarea;