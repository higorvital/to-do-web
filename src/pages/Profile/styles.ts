import styled, { keyframes } from 'styled-components';
import bgSignIn from '../../assets/bg-to-do-2.jpeg';

export const Container = styled.div`

    display: flex;
    height: 100vh;
    align-items: stretch;

`

export const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const ContentBox = styled.div`

    background: #fff;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
    box-shadow: 0px 0px 8px #0000001a;
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
    a {
        font-weight: 500;
        color: #04091f;
        margin-top: 50px;
    }
`

export const Background = styled.div`
    background: url(${bgSignIn}) no-repeat center;
    background-size: cover;
    flex: 1;

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