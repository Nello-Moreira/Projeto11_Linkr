import styled from "styled-components";
import UserAvatar from "../_shared/UserAvatar";
import MenuOptions from "./MenuOptions";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
	const [menuOpened, setMenuOpened] = useState(false);

	return (
		<MenuContainer>
			<ContentContainer>
				<Link to="/">
					<Logo>linkr</Logo>
				</Link>

				<InteractiveContainer>
					<MdKeyboardArrowDown
						color="white"
						fontSize="60px"
						onClick={() => setMenuOpened(!menuOpened)}
					/>
					<UserAvatar />
				</InteractiveContainer>
			</ContentContainer>

			<MenuOptions menuOpened={menuOpened} />
		</MenuContainer>
	);
}

const MenuContainer = styled.div`
	box-sizing: border-box;
	height: 70px;
	width: 100vw;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;
	width: 100vw;

	a {
		text-decoration: none;
	}
`;

const ContentContainer = styled.div`
	height: 100%;
	width: 100%;
	padding: 0 20px 0 10px;
	background-color: rgba(21, 21, 21, 1);
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
	color: white;
`;

const InteractiveContainer = styled.div`
	display: flex;
`;
