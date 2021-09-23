import RepostButton from "../_shared/buttons/RepostButton";
import styled from "styled-components";

export default function Repost() {
    return (
        <Container>
            <RepostButton customStyle={{ fontSize: "28px" }} />
            <p>0 re-posts</p>
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
