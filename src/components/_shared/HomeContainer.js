import styled from "styled-components";

const HomeContainer = styled.div`
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: space-between;

    @media (max-width: 700px){
        flex-direction: column
    }
`;

export default HomeContainer;