import { render } from "react-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./theme";

const rootElement = document.getElementById("root");

render(
    <RecoilRoot>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </RecoilRoot>,
    rootElement
);
