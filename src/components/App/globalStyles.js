import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        display: flex;
        justify-content: center;
        background-color: ${(props) => props.theme.background};
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
        background: ${(props) => props.theme.scrollbar};
    }
`;

export const darkTheme = {
    background: "#333333",
    header: {
        background: "rgba(21, 21, 21, 1)",
        logo: "white",
    },
    font: "white",
    scrollbar: "black",
    post: {
        primary: "#171717",
        secondary: "#1e1e1e",
        text: "#aaaaaa",
    },
    hashtag: {
        primary: "rgba(200, 200, 200, 1)",
        onHover: "rgb(255, 255, 255)",
        input: "#252525",
    },
    trending: {
        primary: "rgba(23, 23, 23, 1)",
    },
    button: "#1f9bff",
    commentSession: {
        input: "#252525",
    },
};

export const lighTheme = {
    background: "#F2F2F2",
    header: {
        background: "lightgray",
        logo: "#191919",
    },
    font: "#3d3d3d",
    scrollbar: "gray",
    post: {
        primary: "#fafafa",
        secondary: "#e5e5e5",
        text: "#3d3d3d",
    },
    hashtag: {
        primary: "#3d3d3d",
        onHover: "#1f9bff",
        input: "#FAFAFA",
    },
    trending: {
        primary: "#FFFFFF",
    },
    button: "#1f9bff",
    commentSession: {
        input: "#F2F2F2",
    },
};

export { GlobalStyle };