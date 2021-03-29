import { darken } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`

`


export const Title = styled.div`
    padding: 10px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

`

interface TitleNameProps {
    isOpen: boolean;
}

export const TitleName = styled.div<TitleNameProps>`

    display: flex;
    align-items: center;

    h4 {
        font-size: 18px;
        font-weight: 600;
        color: #000;
    }

    > button {
        border: 0;
        background: transparent;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;

        svg {
            color: #9b9b9b;
            transition: 0.5s;
            
            ${props => props.isOpen && css`
                transform: rotate(180deg);
            `}
        }

        &:hover {
            background: ${darken(0.1, '#fff')};
        }
    }

`

interface TitleActionsProps {
    isOpen: boolean;
}

export const TitleActions = styled.div<TitleActionsProps>`
    display: flex;
    align-items: center;
    opacity: 1;
    transition: 0.5s;
    z-index: 0;

    ${props => !props.isOpen && css`
        z-index: -1;
        opacity: 0;
    `}

    button {
        border: 0;
        background: transparent;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;

        svg {
            color: #9b9b9b;
        }

        &:hover {
            background: ${darken(0.1, '#fff')};
        }
    }

    button + button {
        margin-left: 5px;
    }
`

interface SubCategoryListProps {
    isOpen: boolean;
    listSize: number;
}
export const SubCategoryList = styled.ul<SubCategoryListProps>`
    overflow: hidden;
    list-style: none;

    ${props => css`
        max-height: ${props.listSize * 50}px;
    `}
    transition: 0.5s;

    ${props => !props.isOpen && css`
        max-height: 0; 
    `}

    li {
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
    }

    
`