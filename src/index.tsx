import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/fonts/pretendard-subset.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const GlobalStyle = createGlobalStyle`
    ${reset}
    body {
        background-color: white;
        color: #444;
        font-family: "Pretendard",system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        box-sizing: border-box; 
        height: 100%;
        line-height: 1.6;
        overflow-x: hidden; 
        position:relative;
    }
    
    * {
        box-sizing: border-box;
    }
    `;

root.render(
    <React.StrictMode>
        <ChakraProvider>
            <GlobalStyle />
            <App />
        </ChakraProvider>
    </React.StrictMode>
);
