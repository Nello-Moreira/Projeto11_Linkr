import styled from "styled-components";
import ActionButton from "../_shared/buttons/ActionButton";
import { AiOutlineComment } from "react-icons/ai";
export default function Comments({
    setOpenCommentSession,
    openCommentSession,
    commentCount,
}) {
    return (
        <Container>
            <ActionButton
                onClick={() => setOpenCommentSession(!openCommentSession)}
            >
                <CommentButton title={"Ver comentários"} />
            </ActionButton>

            <p>
                {commentCount}{" "}
                {commentCount === 1 ? "comentário" : "comentários"}
            </p>
        </Container>
    );
}

const Container = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    text-align: center;
    p {
        font-size: 10px;
        margin-top: 2px;
    }

    @media (max-width: 611px) {
        p {
            font-size: 8px;
        }
    }
`;

const CommentButton = styled(AiOutlineComment)`
    border-radius: 50%;

    &:hover {
        background-color: none;
        color: #1a8cd8;
        box-shadow: 0px 0px 30px rgba(26, 140, 216, 0.35);
    }

    @media (max-width: 611px) {
        &:hover {
            color: inherit;
            box-shadow: none;
    }
`;
