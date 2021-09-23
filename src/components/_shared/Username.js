import { Link } from "react-router-dom";
import routes from "../../routes/routes";
import styled from "styled-components";

export default function Username({ user, fontSize, customStyle }) {
  //FontSize required
  //Margin and Color as CustomStyle
  return (
    <Container>
      <Link to={routes.user.replace(":id", user.id)}>
        <NameContainer fontSize={fontSize} customStyle={customStyle}>
          {user.username}
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
