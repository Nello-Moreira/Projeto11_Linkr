import RepostButton from "../_shared/buttons/RepostButton";
import styled from "styled-components";
import { repost } from "../../API/requests";
import { useState } from "react";

export default function Repost({
    repostCount,
    repostedBy,
    postId,
    loggedUser,
}) {
    const [repostTimes, setRepostTimes] = useState(repostCount);
    const [reposted, setReposted] = useState(false);

    function submitRepost() {
        setReposted(true);
        repost({ token: loggedUser.token, postId })
            .then(() => setRepostTimes(() => repostTimes + 1))
            .catch((error) => {
                alert("Desculpe, houve um erro. Atualize a pagina.");
                setReposted(false);
            });
    }
    return (
        <Container reposted={reposted}>
            <RepostButton
                customStyle={{ fontSize: "28px" }}
                onClick={submitRepost}
            />
            <p>{repostTimes} re-posts</p>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 10px 0;
    color: ${({ reposted }) => (reposted ? "#00e03f" : "inherit")};

    p {
        font-size: 10px;
        color: inherit;
    }

    @media (max-width: 600px) {
        p {
            font-size: 8px;
        }

        button {
            font-size: 20px;
        }
    }
`;
