import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        accentColor: string;
        cardColor: string;
        boardColor: string;
        boxShadow: string;
    }
}
