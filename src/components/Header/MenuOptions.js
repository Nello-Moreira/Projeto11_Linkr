import styled from "styled-components";
import { useHistory } from "react-router-dom";
import routes from "../../routes/routes";
import PagePostsContext from "../../contexts/PagePostsContext";
import { useContext } from "react";

export default function MenuOptions({ menuOpened }) {
	const history = useHistory();

	function logout() {
		localStorage.removeItem("linkrUser");
		history.push(routes.login);
	}

	const { setPagePosts } = useContext(PagePostsContext);

	return (
		<Container menuOpened={menuOpened}>
			<span
				onClick={() => {
					setPagePosts([]);
					return history.push(routes.myPosts);
				}}
			>
				My Posts
			</span>
			<span
				onClick={() => {
					setPagePosts([]);
					return history.push(routes.likes);
				}}
			>
				My Likes
			</span>
			<span
				onClick={() => {
					setPagePosts([]);
					return logout();
				}}
			>
				Logout
			</span>
		</Container>
	);
}

const Container = styled.div`
	width: 175px;
	padding: 0 10px 10px;
	background-color: rgba(23, 23, 23, 1);
	border-bottom-left-radius: 10px;
	position: fixed;
	top: ${({ menuOpened }) => (menuOpened ? "70px" : "-30vh")};
	right: -1px;
	display: flex;
	flex-direction: column;
	align-items: center;
	transition: top 0.5s ease;

	span {
		font-family: "Lato", sans-serif;
		font-weight: 700;
		font-size: 20px;
		color: rgba(255, 255, 255, 1);
		margin-top: 10px;
	}
`;
