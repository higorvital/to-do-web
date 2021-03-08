import styled,{css} from 'styled-components';

interface ContainerProps{
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`

    padding: 16px;
    background: #f7f7f7;
    border-radius: 8px;
    color: #929594;
    display: flex;
    align-items: center;
    border: 2px solid transparent;

    ${props => props.isFocused && css`
        border: 2px solid #000;
    `}

    ${props => props.isErrored && css`
        border: 2px solid #c53030;
    `}

    & + div{
        margin-top: 10px;
    }

    input {
        background: transparent;
        border: 0;
        height: 24px;
        width: 100%;
    }

    svg {
        margin-right: 8px;

        ${props => (props.isFocused || props.isFilled) && css`
            color: #000;
        `}

        ${props => props.isErrored && css`
            color: #c53030;
        `}

    }
    
`