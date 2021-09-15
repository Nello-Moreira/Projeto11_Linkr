import styled from "styled-components";

const PageContainer = styled.div`
    padding-top: 72px;
    width: 1000px;
    min-height: 100vh;
    color: white;
    font-family: 'Lato', sans-serif;

    @media (max-width : 1000px){
        width: 100%;
    }

    @media (max-width: 700px){
        display: flex;
        flex-direction: column;
        width: 100vw;
    }
`
export { PageContainer };