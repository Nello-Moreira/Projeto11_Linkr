import styled from "styled-components";

const PageContainer = styled.div`
    min-height: 100vh;
    width: 98vw;
    padding-top: 70px;

    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

const ContentContainer = styled.div`
    font-family: "Lato", sans-serif;
    color: ${(props) => props.theme.mode.post.text};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 611px;

    @media (max-width: 611px) {
        max-width: 100%;
        width: 100%;
    }
`;

export { PageContainer, ContentContainer };
