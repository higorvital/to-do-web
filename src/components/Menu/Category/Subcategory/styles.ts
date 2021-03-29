import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.li`
    position: relative;

    a {
        border: 0;
        background: transparent;
        padding: 10px 30px;
        width: 100%;
        display: flex;
        align-items: center;
        transition: 0.3s;
        text-decoration: none;
        color: #000;

        &:hover {
            background: ${darken(0.1, '#fff')};
        }

        span {
            background: #4176f5;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 12px;
            margin-left: 10px;
        }
    }

    button {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        right: 30px;
        border: 0;
        background: transparent;
        border-radius: 50%;

        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            color: #9b9b9b;
        }

        &:hover {
            background: ${darken(0.1, '#fff')};
        }

    }
    
`