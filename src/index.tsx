import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/fonts/pretendard-subset.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { createGlobalStyle } from "styled-components";
import theme from "./global/theme";
import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const GlobalStyle = createGlobalStyle`
    
    body { 
        font-family: "Pretendard",system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size : 16px; 
        height: 100%;
        line-height: 1.6; 
        position:relative;
    }
    
    * {
        box-sizing: border-box;
    }
    `;
const client = new QueryClient();

root.render(
    <QueryClientProvider client={client}>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <GlobalStyle />
            <App />
        </ChakraProvider>
    </QueryClientProvider>
);
