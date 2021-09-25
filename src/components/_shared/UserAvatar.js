import { useState } from "react";
import styled from "styled-components";
import defaultUserImage from "../../assets/images/defaultUserImage.jpg";
import { Link } from "react-router-dom";
import routes from "../../routes/routes";

export default function UserAvatar({ user, noLink, customStyle }) {
    const [imgIsLoaded, setImgIsLoaded] = useState(true);

    if (noLink) {
        return (
            <Profile customStyle={customStyle}>
                <img
                    src={imgIsLoaded ? user.avatar : defaultUserImage}
                    onError={() => setImgIsLoaded(false)}
                    alt="userAvatar"
                />
            </Profile>
        );
    }

    return (
        <Profile customStyle={customStyle}>
            <Link to={routes.user.replace(":id", user.id)}>
                <img
                    src={imgIsLoaded ? user.avatar : defaultUserImage}
                    onError={() => setImgIsLoaded(false)}
                    alt="userAvatar"
                />
            </Link>
        </Profile>
    );
}

function customMobileResize(size) {
    if (!size) {
        return "40px";
    }

    const newSize = Number(size.substring(0, 2)) - 10;
    return `${newSize}px`;
}

const Profile = styled.div`
    padding: ${({ customStyle }) => customStyle.padding || "inherit"};
    margin: ${({ customStyle }) => customStyle.margin || 0};
    display: flex;
    align-items: center;

    @media (max-width: 611px) {
        display: ${({ customStyle }) => customStyle.mobileDisplay || "initial"};
    }

    img {
        object-fit: cover;
        width: ${({ customStyle }) =>
            customStyle.width ? customStyle.width : "50px"};
        height: ${({ customStyle }) =>
            customStyle.height ? customStyle.height : "50px"};
        border-radius: 50%;

        @media (max-width: 611px) {
            height: ${({ customStyle }) =>
                customStyle.resizeOnMobile === true
                    ? customMobileResize(customStyle.height)
                    : "50px"};
            width: ${({ customStyle }) =>
                customStyle.resizeOnMobile === true
                    ? customMobileResize(customStyle.width)
                    : "50px"};
        }
    }
`;
