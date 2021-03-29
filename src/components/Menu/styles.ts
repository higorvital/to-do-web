import styled, { css } from 'styled-components';
import {darken} from 'polished';


export const Container = styled.div`
    height: 100vh;
    background: #fff;
    width: 20%;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
`

export const SideBarTop = styled.div`
    padding: 30px; 
`

export const ProfileContainer = styled.div`
    position: relative;
`

export const Profile = styled.button`
    display: flex;
    align-items: center;
    text-decoration: none;
    border: 0;
    background: transparent;

    span {
        color: #000;
        margin-left: 10px;
        font-weight: 700;
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

interface ProfileDropdownProps{
    isActive: boolean;
}

export const ProfileDropdown = styled.div<ProfileDropdownProps>`

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

export const CreateTaskButton = styled.div`
    margin-top: 20px;
`

export const SideBarItems = styled.div`
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    margin-right: 2px;

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

export const CalendarButton = styled.a`
    padding: 10px 30px;
    font-size: 20px;
    font-weight: 700;
    transition: 0.3s;
    border: 0;
    background: transparent;
    width: 100%;
    text-align: left;
    font-weight: 600;
    display: block;
    color: #000;
    text-decoration: none;

    &:hover{
        background: ${darken(0.1, "#fff")};
    }
`

export const CategoryList = styled.div`
    
`

export const ButtonAddCategory = styled.button`
    border: 0;
    background: transparent;
    color: #4176f5;
    border: 2px solid #4176f5;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
    transition: 0.3s;

    &:hover{
        background: #4176f5;;
        color: #fff;
    }
`