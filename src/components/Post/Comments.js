import styled from "styled-components";
import CommentButton from "../_shared/buttons/CommentButton";

export default function Comments({
    setOpenCommentSession,
    openCommentSession,
    commentCount,
}) {
    return (
        <Container>
            <CommentButton
                customStyle={{ fontSize: "28px" }}
                onClick={() => setOpenCommentSession(!openCommentSession)}
            />
            <p>{commentCount} comments</p>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 10px;
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
