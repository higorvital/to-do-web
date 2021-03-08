import styled, { css } from 'styled-components';
import {darken} from 'polished';

export const Container = styled.header`

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    box-shadow: 0px 0px 8px #00000014;

    padding: 20px;

`

export const Content = styled.div`

    max-width: 1140px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
        position: relative;
    }

`

export const Logo = styled.a`

    text-decoration: none;
    color: #04091f;

    div {

        display: flex;
        align-items: center;

        span {
            height: 50px;
            width: 50px;
            background: #4176f5;
            color: #fff;
            font-weight: bold;
            font-size: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        h1 {
            margin-left: 10px;
        }
    }

`

export const Profile = styled.button`

    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #04091f;
    background: transparent;
    border: 0;

    span {
        margin-right: 10px;
    }

    &:hover{
        > div {
            background: ${darken(0.1, '#ccd6dd')} ;
        }
    }

`

export const ProfileIcon = styled.div`

    background: #ccd6dd;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    width: 45px;
    height: 45px;
    transition: 0.3s;

    svg {
        color: #657786;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
    }

`

interface ProfileToggleProps{
    isActive: boolean;
}

export const ProfileToggle = styled.div<ProfileToggleProps>`

    display: flex;
    flex-direction: column;
    align-items: end;
    border-radius: 8px;
    position: absolute;
    background: #fff;
    box-shadow: 0px 0px 8px #00000014;
    padding: 10px 0;
    top: 120%;
    right: 0;
    z-index: -1;
    opacity: 0;
    transition: 0.3s;
    min-width: 100px;

    svg {
        margin-right: 5px;
    }

    ${props => props.isActive && css`
        opacity: 1;
        z-index: 99;
    `}

    button {
        padding: 5px 10px;
        border: 0;
        background: transparent;
        font-size: 14px;
        display: flex;
        align-items: center;
        width: 100%;
        
        &:hover {
            background: ${darken(0.05, '#fff')};
        }


    }

`