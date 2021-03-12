import React, { useCallback, useRef } from 'react';


import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

import { Container, AnimatedContent, Content} from './styles';


interface ModalProps{
  isOpen: boolean;
  toggleModal(open: boolean): void;
}

const Modal: React.FC<ModalProps> = ({children, isOpen, toggleModal}) => {

    const containerRef = useRef<HTMLDivElement>(null); 
    const animatedRef = useRef<HTMLDivElement>(null); 

    const handleModalDialog = useCallback((event)=>{

      if(event.target === animatedRef.current || event.target === containerRef.current){
        toggleModal(false);
      }

    },[toggleModal]);

    return (
        <Container ref={containerRef} isOpen={isOpen} onClick={handleModalDialog}>
            <AnimatedContent ref={animatedRef}>
              <Content>
                {children}
              </Content>
            </AnimatedContent>
        </Container>
    );
}

export default Modal;