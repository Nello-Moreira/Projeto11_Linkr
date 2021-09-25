import styled from "styled-components";
import { repost } from "../../API/requests";
import { useState } from "react";
import ActionButton from "../_shared/buttons/ActionButton";
import { BiRepost } from "react-icons/bi";
import ConfirmModal from "../Modal/ConfirmModal";

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
                <ActionButton onClick={() => setOpenRepostModal(true)}>
                    <BiRepost title={"Repost this in your feed"} />
                </ActionButton>

                <p>
                    {repostTimes} re<span>&#8209;</span>posts
                </p>
            </Container>
            <ConfirmModal
                isOpen={openRepostModal}
                setIsOpen={setOpenRepostModal}
                loading={loading}
                onConfirm={submitRepost}
                title="Tem certeza quer repostar esse post em seu feed?"
                confirmText="Sim, repostar"
            />
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 10px 0;
    color: ${({ reposted }) => (reposted ? "#00e03f" : "inherit")};

    p {
        font-size: 10px;
        color: ${({ reposted }) => (reposted ? "#00e03f" : "inherit")};
    }

    @media (max-width: 611px) {
        p {
            font-size: 8px;
        }
    }
`;
