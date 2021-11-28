import styled from "styled-components";

const Container = styled.div`
    width: calc(100%);
    background-color: ${(props) => props.theme.mode.post.secondary};
    margin-bottom: 15px;
    border-radius: 16px;
`;

const RepostContainer = styled.div`
    width: 100%;
    height: 33px;
    display: flex;
    align-items: center;

    .repost {
        font-size: 20px;
        margin: 0 3px 0 10px;
    }

    p {
        font-size: 11px;
    }
`;

const PostContainer = styled.div`
    width: 100%;
    background-color: ${(props) => props.theme.mode.post.primary};
    border-radius: 16px;
    padding: 20px 20px 20px 0;
    display: flex;
    min-width: 0;

    @media (max-width: 611px) {
        border-radius: 0px;
    }
`;

const LeftContainer = styled.div`
    height: 100%;
    width: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        font-size: 11px;
        color: ${(props) => props.theme.mode.post.text};
    }

    @media (max-width: 611px) {
        padding: 3px;
        p {
            font-size: 9px;
        }
    }
`;

const UserContainer = styled.div`
    font-size: 19px;
    color: ${(props) => props.theme.mode.font};
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
`;

const RightContainer = styled.div`
    height: 100%;
    width: 83%;

    a {
        color: ${(props) => props.theme.mode.hashtag.primary};
        text-decoration: none;
        margin-bottom: 10px;
        cursor: pointer;
        font-weight: 600;

        :hover {
            color: ${(props) => props.theme.mode.hashtag.onHover};
        }
    }

    @media (max-width: 611px) {
        h2 {
            font-size: 17px;
            margin-left: 5px;
        }
    }
`;

const InputEditText = styled.textarea`
    width: 100%;
    font-size: 17px;
    font-family: "Lato", sans-serif;
    background-color: ${({ loading }) =>
        loading ? "rgb(242, 242, 242)" : "rgb(255,255,255)"};
    word-wrap: break-word;
    border-radius: 7px;
    margin-bottom: 5px;
    padding: 8px;
    resize: vertical;

    :focus {
        outline: none !important;
    }

    @media (max-width: 611px) {
        font-size: 15px;
    }
`;

const UserNameContainer = styled.div`
    display: flex;

    svg {
        cursor: pointer;
    }
`;

export {
    Container,
    RepostContainer,
    PostContainer,
    LeftContainer,
    UserContainer,
    RightContainer,
    InputEditText,
    UserNameContainer,
};
