import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function UserAvatar({ customStyle = {}, src }) {
	const { loggedUser } = useContext(UserContext);

	return (
		<Profile customStyle={customStyle}>
			<img src={src ? src : loggedUser.user.avatar} alt="userAvatar" />
		</Profile>
	);
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
		width: 50px;
		height: 50px;
		border-radius: 50%;

		@media (max-width: 611px) {
			height: ${({ customStyle }) =>
		customStyle.resizeOnMobile === true ? "40px" : "50px"};
			width: ${({ customStyle }) =>
		customStyle.resizeOnMobile === true ? "40px" : "50px"};
		}
	}
`;
