import styled from "styled-components";
import ProfileImage from "../_shared/ProfileImage";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Header() {
    return (
        <FixedContainer>
            <Logo>Linkr</Logo>
            <MenuContainer>
                <MdKeyboardArrowDown color="white" font-size="60px"/>
                <ProfileImage />
            </MenuContainer>
        </FixedContainer>
    );
}

const FixedContainer = styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 72px;
    background-color: black;
    padding: 10px 28px;
    display: flex;
    justify-content: space-between;
`
const Logo = styled.div`
    font-family: 'Passion One', cursive;
    font-size: 49px;
    font-weight: 700;
    color: white;
`
const MenuContainer = styled.div`
    display: flex;
`