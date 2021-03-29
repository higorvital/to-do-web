import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`

  background: #fff;
  border-radius: 8px;
  min-width: 400px;

`

export const ModalHeader = styled.div`

  box-shadow: 0px 0px 10px rgba(0,0,0,0.2);

  padding: 20px 15px;

`

export const ModalContent = styled.div`

  padding: 10px 0 5px;
  display: flex;
  flex-direction: column;

  button {
    border: 0;
    background: transparent;
    transition: 0.3s;
    padding: 15px;
    width: 100%;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      color: #55cf88;
    }

    & + button {
      &::after{
        content: '';
        position: absolute;
        width: calc(100% - 30px);
        margin: 0 auto;
        top: 0;
        background: #d8d8d8;
        height: 1px;
      }
    }

    &:hover {
      background: ${darken(0.1, "#fff")};
    }
  }

`