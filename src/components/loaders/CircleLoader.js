import styled from "styled-components";
import Loader from "react-loader-spinner";

export default function CircleLoader({ customStyle = {} }) {
    return (
        <Container customStyle={customStyle}>
            <Loader type="Oval" color="rgb(18, 107, 165)" height={80} width={80} />
        </Container>
    )
};

const Container = styled.div`
    height: ${({ customStyle }) => customStyle.height ? customStyle.height : 'auto'};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;