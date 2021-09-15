import styled from "styled-components";
import Loader from "react-loader-spinner";

export default function CircleLoader({ customStyle = {} }) {
    return (
        <Container customStyle={customStyle}>
            <Loader
                type="Oval"
                color={customStyle.color ? customStyle.color : "rgb(18, 107, 165)"}
                height={80}
                width={80}
            />
        </Container>
    )
};

const Container = styled.div`
    height: ${({ customStyle }) => customStyle.height ? customStyle.height : 'auto'};
    width: ${({ customStyle }) => customStyle.width ? customStyle.width : '100%'};
    margin: ${({ customStyle }) => customStyle.margin ? customStyle.margin : '0'};
    display: flex;
    justify-content: center;
    align-items: center;
`;