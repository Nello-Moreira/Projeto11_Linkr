import styled from "styled-components";
import UserAvatar from "../_shared/UserAvatar";
import UserContext from "../../contexts/UserContext";
import { useContext, useEffect, useRef, useState } from "react";
import autosize from "autosize";
import SendButton from "../_shared/buttons/SendButton";
import { getPostComments } from "../../API/requests";
import ThreeDotsLoader from "../loaders/ThreeDotsLoader";
import Username from "../_shared/Username";
import { comment } from "../../API/requests";
import { getFollows } from "../../API/requests";

function Comment({ commentData, postOwner, followsList }) {
    const { text, user } = commentData;
    let userDetails = "";

    if (postOwner.id === user.id) {
        userDetails = "• post's author";
    }

    if (followsList.some((followingUser) => followingUser.id === user.id)) {
        userDetails += " • following";
    }

    return (
        <CommentContainer>
            <UserAvatar
                src={user.avatar}
                alt="profile"
                customStyle={{
                    height: "40px",
                    width: "40px",
                    margin: "0 15px 0 0",
                    resizeOnMobile: true,
                }}
            />

            <ContentContainer>
                <UserContainer>
                    <Username
                        user={user}
                        fontSize="14px"
                        customStyle={{ margin: "0 0 5px 0 " }}
                    />
                    <UserDetails>{userDetails}</UserDetails>
                </UserContainer>
                <p>{text}</p>
            </ContentContainer>
        </CommentContainer>
    );
}

function MakeAComment({
    loggedUser,
    commentValue,
    submitComment,
    setCommentValue,
    loading,
}) {
    const inputRef = useRef();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    function handleEnter(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            submitComment();
            return;
        }
    }

    autosize(inputRef.current);
    return (
        <MakeACommentContainer>
            <UserAvatar
                src={loggedUser.user.avatar}
                alt="profile"
                customStyle={{
                    height: "40px",
                    width: "40px",
                    margin: "0 15px 0 0",
                    resizeOnMobile: true,
                }}
            />
            <InputContainer>
                <CommentInput
                    ref={inputRef}
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                    onKeyDown={(e) => handleEnter(e)}
                    disabled={loading}
                />
                <SendButton
                    customStyle={{ fontSize: "14px" }}
                    onClick={() => submitComment({ text: commentValue })}
                />
            </InputContainer>
        </MakeACommentContainer>
    );
}

export default function CommentSession({
    postId,
    commentValue,
    setCommentValue,
    postOwner,
}) {
    const { loggedUser } = useContext(UserContext);
    const [commentList, setCommentList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [followsList, setFollowsList] = useState([]);

    useEffect(() => {
        getPostComments({ token: loggedUser.token, postId })
            .then((response) => setCommentList(response.data.comments))
            .catch((error) => {
                alert("Ops, ocorreu um erro. Atualize a pagina");
                setLoading(false);
            });

        getFollows({ token: loggedUser.token }).then((response) =>
            setFollowsList(response.data.users)
        );
    }, [loading]);

    function submitComment() {
        setLoading(true);
        comment({ token: loggedUser.token, text: commentValue, postId })
            .then((response) => {
                setCommentList([
                    ...commentList,
                    { ...response.data.comment, user: loggedUser.user },
                ]);
                setLoading(false);
                setCommentValue("");
            })
            .catch((error) => console.log(error));
    }

    return (
        <CommentsContainer>
            {commentList ? (
                commentList.map((comment, index) => (
                    <Comment
                        commentData={comment}
                        key={index}
                        postOwner={postOwner}
                        followsList={followsList}
                    />
                ))
            ) : (
                <LoaderContainer>
                    <ThreeDotsLoader />
                </LoaderContainer>
            )}

            <MakeAComment
                loggedUser={loggedUser}
                commentValue={commentValue}
                setCommentValue={setCommentValue}
                submitComment={submitComment}
                loading={loading}
            />
        </CommentsContainer>
    );
}

const CommentsContainer = styled.div`
    width: 100%;
    padding: 0 22px 22px 22px;

    @media (max-width: 600px) {
        padding: 0 11px 11px 11px;
    }

    .loader {
        margin: 0 auto;
    }
`;

const LoaderContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px;
`;

const MakeACommentContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: 20px;
    align-items: center;
`;

const CommentInput = styled.textarea`
    height: 25px;
    font-family: Lato, sans-serif;
    width: calc(100% - 30px);
    font-size: 14px;
    border-radius: 5px;
    color: #fff;
    background-color: transparent;
    outline: none;
    border: none;

    :focus {
        outline: none;
    }

    ::placeholder {
        font-style: italic;
    }
`;

const InputContainer = styled.div`
    width: calc(100% - 50px);
    background-color: #252525;
    border-radius: 5px;
    color: #fff;
    padding: 3px 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CommentContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 7px 0;
    border-bottom: 1px solid #353535;

    @media (max-width: 600px) {
        padding: 5px 0;
    }
`;

const ContentContainer = styled.div`
    width: calc(100% - 50px);
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
        color: #acacac;
        margin-bottom: 5px;
        line-height: 15px;
    }
`;

const UserContainer = styled.div`
    display: flex;
`;

const UserDetails = styled.span`
    color: #565656;
    font-size: 14px;
    margin-left: 5px;
`;
