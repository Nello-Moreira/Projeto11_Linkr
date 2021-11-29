import styled from "styled-components";

const PageTitleContainer = styled.div`
    font-family: "Oswald", sans-serif;
    font-weight: bold;
    font-size: 43px;
    color: ${(props) => props.theme.mode.font};
    width: 100%;
    margin: 50px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 611px) {
        font-size: 29px;
        margin: 19px 0px;
        padding: 0 15px;
    }
`;
export { PageTitleContainer };
