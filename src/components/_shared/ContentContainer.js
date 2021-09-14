import styled from "styled-components";

const ContentContainer = styled.div`
    box-sizing: border-box;
    height: 100%;
    width: 535px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 700px) {
        width: 100vw;
        padding: 40px 10px 0;
        justify-content: flex-start;
    }
`;

export default ContentContainer;
