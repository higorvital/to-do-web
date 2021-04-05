import styled,{css} from 'styled-components';
import Tooltip from '../Tooltip';

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

    textarea {
        background: transparent;
        border: 0;
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

export const Error = styled(Tooltip)`
    margin-left: 16px;

    span{
        background: #c53030;

        &::before{
            content: '';
            border-style: solid;
            border-color: #c53030 transparent;

        }
    }

    svg {
        margin-right: 0;
        height: 20px;
    }
`