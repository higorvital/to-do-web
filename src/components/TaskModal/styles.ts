import styled, {css, keyframes} from 'styled-components';


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

    & + div {
        margin-top: 10px;
    }

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