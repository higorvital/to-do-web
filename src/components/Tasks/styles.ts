import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
    height: calc(100vh - 120px);
    display: flex;
    flex-direction: column;
    flex: 1;
    max-width: 50%;
`

export const Title = styled.div`
    background: #fff;
    border-radius: 20px;
    padding: 10px 15px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    align-self: baseline;

    &::first-letter {
        text-transform: uppercase;
    }

    h4 {
        color: #000;
        font-weight: 700;
    }
`

export const Box = styled.div`

    margin-top: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    /* max-width: 100%; */
    display: flex;
    flex: 1;
    flex-direction: column;
`

export const TaskList = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        border-radius: 20px;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #d8d8d8; 
        border-radius: 20px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: ${darken(0.1, "#d8d8d8")}; 
    }
`
export const TaskForm = styled.div`
    padding: 10px;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.2);
`