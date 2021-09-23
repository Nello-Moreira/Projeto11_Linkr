import RepostButton from "../_shared/buttons/RepostButton";
import styled from "styled-components";

export default function Repost({ repostCount, repostedBy }) {
    return (
        <Container>
            <RepostButton customStyle={{ fontSize: "28px" }} />
            <p>{repostCount} re-posts</p>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 10px 0;

    p {
        font-size: 10px;
    }
`;
