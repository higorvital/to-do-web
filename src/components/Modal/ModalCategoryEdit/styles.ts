import { darken } from 'polished';
import styled from 'styled-components';

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

`

export const Actions = styled.div`
  display: flex;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
`

export const DeleteButton = styled.button`
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

export const SaveButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  border: 0;
  background: transparent;

  position: relative;
  color: #0080ff;

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
