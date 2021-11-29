import styled from "styled-components";
import UserAvatar from "../_shared/UserAvatar";
import MenuOptions from "./MenuOptions";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import onClickOutside from "react-onclickoutside";
import routes from "../../routes/routes";
import Search from "./Search";
import UserContext from "../../contexts/UserContext";
function Header() {
    const { loggedUser } = useContext(UserContext);
    const [menuOpened, setMenuOpened] = useState(false);
    Header.handleClickOutside = () => setMenuOpened(false);
    const history = useHistory();
    return (
        <HeaderContainer
            onClick={() => {
                if (menuOpened) setMenuOpened(false);
            }}
        >
            <ContentContainer>
                <Logo
                    onClick={() => {
                        if (history.location.pathname !== routes.timeline)
                            history.push(routes.timeline);
                        window.scroll(0, 0);
                    }}
                >
                    linkr
                </Logo>

                <Search className="header" />

                <InteractiveContainer
                    onClick={() => setMenuOpened(!menuOpened)}
                >
                    <ArrowContainer menuOpened={menuOpened}>
                        <ArrowDown />
                    </ArrowContainer>

                    <UserAvatar user={loggedUser.user} noLink={true} />
                </InteractiveContainer>
            </ContentContainer>

            <MenuOptions menuOpened={menuOpened} />
        </HeaderContainer>
    );
}

const clickOutsideConfig = {
    handleClickOutside: () => Header.handleClickOutside,
};

const HeaderContainer = styled.div`
    box-sizing: border-box;
    height: 70px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;

    a {
        text-decoration: none;
    }
`;

export default onClickOutside(Header, clickOutsideConfig);

const ContentContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: 0 20px;
    background-color: ${(props) => props.theme.mode.header.background};
    position: relative;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled.div`
    font-family: "Passion One", cursive;
    font-size: 49px;
    font-weight: 700;
    color: ${(props) => props.theme.mode.header.logo};
    cursor: pointer;
`;

const InteractiveContainer = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
`;

const ArrowContainer = styled.div`
    transform: ${({ menuOpened }) =>
        menuOpened ? "rotate(180deg)" : "rotate(0deg)"};
    transition: transform 0.5s ease;
`;

const ArrowDown = styled(MdKeyboardArrowDown)`
    color: ${(props) => props.theme.mode.font};
    font-size: 50px;

    @media (max-width: 611px) {
        font-size: 40px;
    }
`;
