import RepostButton from "../_shared/buttons/RepostButton";
import styled from "styled-components";
import { repost } from "../../API/requests";
import { useState } from "react";
import RepostModal from "./RepostModal";
export default function Repost({
    repostCount,
    repostedBy,
    postId,
    loggedUser,
}) {
    const [repostTimes, setRepostTimes] = useState(repostCount);
    const [openRepostModal, setOpenRepostModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const isLoggedUserRepost = repostedBy
        ? repostedBy.id === loggedUser.user.id
        : false;
    const [reposted, setReposted] = useState(isLoggedUserRepost);

    function submitRepost() {
        setLoading(true);
        repost({ token: loggedUser.token, postId })
            .then(() => {
                setRepostTimes(() => repostTimes + 1);
                setReposted(true);
                setOpenRepostModal(false);
            })
            .catch((error) => {
                alert("Desculpe, houve um erro. Atualize a pagina.");
                setLoading(false);
            });
    }
    return (
        <>
            <Container reposted={reposted}>
                <RepostButton
                    customStyle={{ fontSize: "28px" }}
                    onClick={() => setOpenRepostModal(true)}
                />
                <p>{repostTimes} re-posts</p>
            </Container>
            <RepostModal
                openRepostModal={openRepostModal}
                setOpenRepostModal={setOpenRepostModal}
                loading={loading}
                submitRepost={submitRepost}
            />
        </>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 10px 0;
    color: ${({ reposted }) => (reposted ? "#00e03f" : "inherit")};

    p {
        font-size: 10px;
        color: ${({ reposted }) => (reposted ? "#00e03f" : "inherit")};
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
