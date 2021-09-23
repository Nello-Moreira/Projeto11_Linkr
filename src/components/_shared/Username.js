import { Link } from "react-router-dom";
import routes from "../../routes/routes";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";

export default function Username({ user, fontSize, customStyle, canBeYou }) {
    //FontSize required
    //Margin and Color as CustomStyle
    const { loggedUser } = useContext(UserContext);
    const username = canBeYou
        ? user.id === loggedUser.user.id
            ? "you"
            : user.username
        : user.username;

    return (
        <Container>
            <Link to={routes.user.replace(":id", user.id)}>
                <NameContainer fontSize={fontSize} customStyle={customStyle}>
                    {username}
                </NameContainer>
            </Link>
        </Container>
    );
}

const Container = styled.div`
    display: inline-block;
    vertical-align: bottom;
`;

const NameContainer = styled.h2`
    font-size: ${({ fontSize }) => fontSize};
    color: ${({ customStyle }) =>
        customStyle && customStyle.color ? customStyle.color : "#fff"};
    margin: ${({ customStyle }) =>
        customStyle && customStyle.margin ? customStyle.margin : "0"};
    font-weight: 700;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
