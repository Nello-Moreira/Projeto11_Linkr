import styled from "styled-components";

export default function Cover() {
    return (
        <Container>
            <CoverTitle>linkr</CoverTitle>

            <CoverSubTitle>
                salve, compartilhe e descubra <br />
                os melhores links da web
            </CoverSubTitle>
        </Container>
    );
}

const Container = styled.div`
    box-sizing: border-box;
    color: rgba(255, 255, 255, 1);
    height: 100%;
    width: 100%;
    padding-left: 100px;
    background-color: rgba(21, 21, 21, 1);
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    @media (max-width: 700px) {
        height: 200px;
        padding-left: 0;
        align-items: center;
    }
`;

const CoverTitle = styled.h2`
    font-family: "Passion One", cursive;
    font-size: 70px;
    font-weight: 700;
`;

const CoverSubTitle = styled.h3`
    font-family: "Oswald", sans-serif;
    font-size: 23px;
    font-weight: 700;
`;
