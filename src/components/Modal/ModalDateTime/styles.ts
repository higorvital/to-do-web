import { darken } from 'polished';
import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`

  background: #fff;
  border-radius: 8px;
  min-width: 400px;
  overflow: hidden;

`

export const ModalHeader = styled.div`

  box-shadow: 0px 0px 10px rgba(0,0,0,0.2);

  padding: 20px 15px;

`

export const ModalContent = styled.div`

  display: flex;
  flex-direction: column;



`

export const FormContent = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;

  > div {
    flex: 1;
  }

  justify-content: space-between;
`

export const Actions = styled.div`
  display: flex;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
`

export const CancelButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  border: 0;
  background: transparent;

  &:hover {
    background: ${darken(0.1, '#FFF')};
  }

`

export const CreateButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  border: 0;
  background: transparent;

  position: relative;

  &::after{
    content: '';
    position: absolute;
    left: 0;
    width: 1px;
    height: 50%;
    color: #d8d8d8;
    margin: auto 0;
  }

  &:hover {
    background: ${darken(0.1, '#FFF')};
  }
`

interface InputTimePickerProps{
  isActive?: boolean | true;
}

const pulse = keyframes`
  0% {
      box-shadow: 0px 0px 0px 0px rgba(0,0,0, 0.5);
  }
  70% {
      box-shadow: 0px 0px 0px 8px rgba(0,0,0, 0);
  }
  100% {
      box-shadow: 0px 0px 0px 0px rgba(0,0,0, 0);
  }
`

export const InputTimePicker = styled.div<InputTimePickerProps>`

    border-radius: 8px;
    background: #f7f7f7;
    border: 2px solid #f7f7f7;
    padding: 16px;
    position: relative;
    margin-top: 0 !important;
    margin-left: 10px;
    flex: auto !important;

    > input {
        border: 0;
        height: 24px;
        background: transparent;
        width: 104%;
    }

    select {
        width: 100%;
        background: transparent;
        border: 0;
        font-size: 16px;
    }

    .react-time-picker__wrapper {
        background: transparent;
        border: 0;
        padding: 0;
        height: 24px;
    }

    ${props => !props.isActive && css`    
        .react-time-picker__inputGroup__input, 
        .react-time-picker__inputGroup__divider, 
        .react-time-picker__inputGroup__input, 
        .react-time-picker__inputGroup__leadingZero{
            color: #d8d8d8;
        }
    `}

    .btnUseClock {
        border: 0;
        background: transparent;
        position: absolute;
        right: 20px;
        top: 20px;

        svg {
            border-radius: 50%;
            color: #ccc;

            ${props=> props.isActive && css`
                animation: ${pulse} 2s infinite;
                color: #000;        
            `}
        }
    }

`