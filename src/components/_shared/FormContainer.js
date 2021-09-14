import styled from "styled-components";

const FormContainer = styled.div`
    height: 100%;
    width: 535px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 700px) {
        width: 100vw;
        padding: 40px;
        justify-content: flex-start;
    }
`;

export default FormContainer;
