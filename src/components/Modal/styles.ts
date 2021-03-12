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
    padding: 50px;
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