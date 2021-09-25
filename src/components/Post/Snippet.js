import { useState } from "react";
import styled from "styled-components";
import PreviewModal from "./PreviewModal";

export default function Snippet({
    link,
    linkTitle,
    linkDescription,
    linkImage,
}) {
    const [imgIsLoaded, setImgIsLoaded] = useState(true);

    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    return (
        <>
            <SnippetContainer onClick={() => setIsPreviewModalOpen(true)}>
                <DetailsContainer>
                    <div>
                        <h1>{linkTitle} </h1>
                        <p>{linkDescription}</p>
                    </div>
                    <div className="link-container">{link}</div>
                </DetailsContainer>
                {linkImage && imgIsLoaded ? (
                    <PostImage
                        src={linkImage}
                        onError={() => setImgIsLoaded(false)}
                    />
                ) : (
                    <LogoContainer>
                        {" "}
                        <Logo>linkr</Logo>
                    </LogoContainer>
                )}
            </SnippetContainer>
            <PreviewModal
                isOpen={isPreviewModalOpen}
                setIsOpen={setIsPreviewModalOpen}
                link={link}
                linkTitle={linkTitle}
            />
        </>
    );
}

const SnippetContainer = styled.a`
    max-width: 503px;
    display: flex;
    justify-content: space-between;
`;

const PostImage = styled.img`
    height: 155px;
    width: 153px;
    border-radius: 0 11px 11px 0;
    flex: 0 0 auto;

    @media (max-width: 611px) {
        height: 115px;
        width: 95px;
    }
`;

const DetailsContainer = styled.div`
    height: 155px;
    border: 1px solid #c4c4c4;
    border-right: none;
    border-radius: 11px 0 0 11px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 1 auto;
    overflow-y: hidden;

    h1 {
        font-size: 16px;
        color: #cecece;
        margin-bottom: 8px;
        word-wrap: break-word;
    }

    p {
        font-size: 11px;
        color: #aaaaaa;
        margin: 10px 0;
        word-wrap: break-word;
    }

    .link-container {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #cecece;
        font-size: 9px;
    }

    a {
        text-decoration: none;
        font-size: 11px;
        color: #cecece;
    }

    @media (max-width: 611px) {
        width: 100px;
        height: 115px;
        padding: 10px;

        h1 {
            font-size: 11px;
        }

        p {
            font-size: 9px;
        }

        a {
            font-size: 9px;
        }
    }
`;

const LogoContainer = styled.div`
    height: 155px;
    width: 153px;
    border-radius: 0 11px 11px 0;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 611px) {
        height: 115px;
        width: 95px;
    }
`;

const Logo = styled.div`
    font-family: "Passion One", cursive;
    font-size: 35px;
    font-weight: 700;
    color: #000;
`;
