import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        display: flex;
        justify-content: center;
        background-color: ${(props) => props.theme.mode.background};
        overflow-x: hidden;
    }

    * {
        box-sizing: border-box;
    }

    ::-webkit-scrollbar {
        width: 20px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.mode.scrollbar};
    }
`;
export const darkTheme = {
    background: "#333333",
    header: {
        background: "rgba(21, 21, 21, 1)",
        logo: "white",
    },
    font: (props) => (props.theme.color ? props.theme.color : "white"),
    scrollbar: "black",
    publishBox: {
        background: "#ffffff",
        input: "#efefef",
    },
    post: {
        primary: "#171717",
        secondary: "#1e1e1e",
        text: "#aaaaaa",
    },
    hashtag: {
        primary: "rgba(200, 200, 200, 1)",
        onHover: (props) =>
            props.theme.color ? props.theme.color : "rgb(255, 255, 255)",
        input: "#252525",
    },
    trending: {
        primary: "rgba(23, 23, 23, 1)",
    },
    button: (props) => (props.theme.color ? props.theme.color : "#1f9bff"),
    commentSession: {
        input: "#252525",
    },
    modal: {
        primary: "rgba(51, 51, 51, 1)",
        secondary: "#1e1e1e",
    },
};

export const lightTheme = {
    background: "#F2F2F2",
    header: {
        background: "lightgray",
        logo: "#191919",
    },
    font: (props) => (props.theme.color ? props.theme.color : "#3d3d3d"),
    scrollbar: "gray",
    publishBox: {
        background: "#e2e2e2",
        input: "#FAFAFA",
    },
    post: {
        primary: "#fafafa",
        secondary: "#e5e5e5",
        text: "#3d3d3d",
    },
    hashtag: {
        primary: "#3d3d3d",
        onHover: (props) => (props.theme.color ? props.theme.color : "#1f9bff"),
        input: "#FAFAFA",
    },
    trending: {
        primary: "#FFFFFF",
    },
    button: (props) => (props.theme.color ? props.theme.color : "#1f9bff"),
    commentSession: {
        input: "#F2F2F2",
    },
    modal: {
        primary: "gray",
        secondary: "lightgray",
    },
};

export { GlobalStyle };
