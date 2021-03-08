import styled, { css } from 'styled-components';
import Ripple from 'react-ripples';
import { shade } from 'polished';

export const Container = styled.div`

    padding: 50px 0px;

    max-width: 1140px;
    margin: 0 auto;

    display: flex;

`

export const SideBar = styled.div`

    display: flex;
    flex-direction: column;
    width: 20%;
    padding: 0 15px;

`

export const Menu = styled.ul`

    padding: 20px 0;
    border-bottom: 1px solid #e7e9f5;

`

interface MenuItemProps {
    isActive: boolean;
}


export const MenuItem = styled.li<MenuItemProps>`

    color: #848484;
    display: flex;
    align-items: center;
    cursor: pointer;

    ${props => props.isActive && css`
        color: #04091f;
        font-weight: bold;
    `}
    
    & + li {
        margin-top: 20px;
    }

    svg {
        margin-right: 10px;
        color: #848484;
    }

`

interface CategoryProps {
    isActive: boolean;
}

export const Category = styled.div<CategoryProps>`

    border-bottom: 1px solid #e7e9f5;
    color: #848484;
    cursor: pointer;
    /* padding-bottom: 20px; */

    h4 {
        text-transform: uppercase;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0;

        svg {
            transition: 0.5s;
            transform: rotate(0deg);

            ${props => props.isActive && css`
                transform: rotate(180deg);
            `}
        }
    }

    ul {
        overflow: hidden;
        list-style: none;

        max-height: 0;
        transition: 0.5s;

        ${props => props.isActive && css`
            max-height: 1000px;
        `}

        li {

            > div{
                width: 12px;
                height: 12px;
                border: 2px solid #000;
                border-radius: 50%;
                margin-right: 10px;

            }

            display: flex;
            align-items: center;
            padding: 10px 0;
            
            & + li {
                /* margin-top: 20px; */
            }

            /* svg {
                margin-right: 10px;
            } */
            
        }
    }
`


export const Center = styled.div`
    width: 50%;
    padding: 0 15px;
    position: relative;

`

export const Tasks = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 20px;
    width: 100%;

`

export const Title = styled.h1`

    display: flex;
    align-items: center;
    font-size: 24px;

    span {
        font-size: 12px;
        color: #bfc4d8;
        margin-left: 10px;
    }

`

interface TaskProps{
    isLate: boolean;
    isCompleted: boolean;
}

export const Task = styled.div<TaskProps>`
    padding: 20px;
    /* height: 250px; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    box-shadow: 0px 0px 8px #00000014;
    border: 2px solid transparent;
    border-radius: 8px;
    position: relative;

    ${props => props.isLate && css`
        box-shadow: 0px 0px 8px #ff000045;
    `}

    ${props => props.isCompleted && css`
        border-color: green;
    `}

    > div{
        display: flex;
        position: relative;
    }

    button {
        margin-left: auto;
        background: transparent;
        color: #bfc4d8;
        border: 0;
        overflow: hidden;
        border-radius: 50%;
        width: 24px;
        height: 24px;

        > div{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

    }
`


export const TaskTop = styled.div`

    display: flex;
    align-items: end;

`

export const TaskSubcategory = styled.div`
    height: 40px;
    width: 40px;
    border: 2px solid #4176f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #fff;
    background: #4176f5;
`

export const TaskTitle = styled.div`

    margin-left: 10px;
    
    span {
        font-size: 12px;
        color: #bfc4d8;
        font-weight: 500;
        display: flex;
        align-items: center;

        svg {
            color: #4176f5;
            margin-right: 5px;
        }
    }

`

export const RightBar = styled.div`
    /* width: 30%; */
    padding: 0 15px;
`

export const Hours = styled.ul`

    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    background: #fff;
    box-shadow: 0px 0px 8px #00000014;
    border-radius: 8px;
    margin: 20px 0 30px;

    li {

        padding: 5px 0;
        list-style: none;
        font-size: 14px;
        display: flex;
        align-items: center;

        > div{
            width: 10px;
            height: 10px;
            border: 2px solid #000;
            border-radius: 50%;
            margin-right: 10px;
        }

         & + li {
            border-top: 1px solid #e7e9f5;
         }

        svg {
            margin-right: 10px;
            font-weight: 500;
        }

        span {
            font-size: 12px;
            color: #bfc4d8;
            font-weight: 500;
            margin-right: 10px;
        }
    }

`

export const ButtonPlusTask = styled.button`
    overflow: hidden;
    color: #fff;
    position: absolute;
    border: 0;
    top: 0;
    right: 15px;
    border-radius: 50%;

    svg {
        background: #4176f5;
        border: 2px solid #4176f5;
        border-radius: 50%;
        padding: 5px;
        height: 30px;
        width: 30px;
    }

    > div {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
`

export const RippleEffect = styled(Ripple)`
    border-radius: 50%;
    width: 100%;

`

interface ToggleTaskProps{
    isActive: boolean;
}

export const ToggleTask = styled.div<ToggleTaskProps>`
    display: flex;
    flex-direction: column;
    align-items: end;
    border-radius: 8px;
    position: absolute;
    background: #fff;
    box-shadow: 0px 0px 8px #00000014;
    padding: 10px 0;
    top: 110%;
    left: 50%;
    z-index: -1;
    opacity: 0;
    transition: 0.3s;

    ${props => props.isActive && css`
        opacity: 1;
        z-index: 99;
    `}

    button {
        width: 100%;
        height: auto;
        margin-left: 0;
        border-radius: 0;
        font-size: 14px;

        div {
            text-align: right;
            justify-content: end;
            width: 100%;
            padding: 2px 10px;
        }
    }

`


export const Calendar = styled.aside`

    width: 100%;

    .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 8px #00000014;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #fff;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #000;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #fff;
    border-radius: 10px;
    color: #000;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#4176f5')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #4176f5 !important;
    border-radius: 10px;
    color: #fff !important;
  }

`

interface TaskCompletedMessageProps {
    isCompleted: boolean;
}

export const TaskCompletedMessage = styled.div<TaskCompletedMessageProps>`
    position: absolute !important;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    ${props => !props.isCompleted && css`
        display: none !important;
    `}

    font-size: 24px;
    color: green;
    width: 200px;
    margin: 0 auto;
    
    svg {
        margin-right: 10px;
    }


`