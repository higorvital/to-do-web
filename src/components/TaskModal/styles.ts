import styled, {css, keyframes} from 'styled-components';

interface ContainerProps{
    isOpen: boolean;
}

export const Container = styled.div<ContainerProps>`


    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    ${props => !props.isOpen && css`
        display: none;
    `}
    align-items: center;
    justify-content: center;

    background: #00000069;
    z-index: 999;

`


const apparteFromLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0px);
    }

`

export const AnimatedContent = styled.div`
    animation: ${apparteFromLeft} 1s;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

`

export const Content = styled.div`

    background: #fff;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
    box-shadow: 0px 0px 8px #00000014;
    border-radius: 8px;

    h1 {
        margin-bottom: 20px;
    }

    form {
        width: 100%;
        max-width: 300px;
        display: flex;
        flex-direction: column;
    }

`

interface InputTimePickerProps{
    isActive: boolean | true;
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

    & + div {
        margin-top: 10px;
    }

    > input {
        border: 0;
        height: 24px;
        background: transparent;
        width: 104%;
    }

    .react-time-picker__wrapper {
        background: transparent;
        border: 0;
        padding: 0;
        height: 24px;
    }

    .btnUseClock {
        border: 0;
        background: transparent;
        position: absolute;
        right: 10px;


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