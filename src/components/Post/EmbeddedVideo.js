import styled from "styled-components";

function EmbeddedVideo({ videoId }) {
    return (
        <Container>
            <StyledIFrame
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
            />
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    padding-bottom: 56.25% /* 16:9 */;
    padding-top: 25px;
    height: 0;
`;

const StyledIFrame = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const FormattedVideoURL = styled.p`
    font-size: 17px;
    color: #aaaaaa;
    margin: 10px 0;
    word-wrap: break-word;

    @media (max-width: 611px) {
        p {
            font-size: 15px;
        }
    }
`;

export { EmbeddedVideo, FormattedVideoURL };
