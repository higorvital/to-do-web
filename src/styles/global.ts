import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body{
        background: #f4f7fe;
        /* background: #fff; */
        color: #04091f;
        -webkit-font-smoothing: antialiased;
    }


    body, input, button, textarea {
        font-family: 'Roboto Slab', serif;
        font-size: 16px;
    }

    button {
        cursor: pointer;
    }

    h1, h2, h3, h4, h5, h6, b, strong{
        font-weight: 500;
    }

`