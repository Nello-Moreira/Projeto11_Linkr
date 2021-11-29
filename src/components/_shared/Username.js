import { Link } from "react-router-dom";
import routes from "../../routes/routes";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";

export default function Username({ user, fontSize, customStyle, canBeYou }) {
    //FontSize and User required
    //Margin and Color as CustomStyle
    const { loggedUser } = useContext(UserContext);
    const username = canBeYou
        ? user.id === loggedUser.user.id
            ? "você"
            : user.username
        : user.username;

    return (
        <Container>
            <Link to={routes.user.replace(":id", user.id)}>
                <NameContainer
                    fontSize={fontSize}
                    customStyle={customStyle}
                    title={username.length > 30 ? username : null}
                >
                    {username}
                </NameContainer>
            </Link>
        </Container>
    );
}

const Container = styled.div`
    display: inline-block;
    vertical-align: bottom;
    max-width: 350px;

    @media (max-width: 600px) {
        max-width: 150px;
    }
`;

const NameContainer = styled.h2`
    font-size: ${({ fontSize }) => fontSize};
    color: ${(props) => props.theme.mode.font};
    margin: ${({ customStyle }) =>
        customStyle && customStyle.margin ? customStyle.margin : "0"};
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
