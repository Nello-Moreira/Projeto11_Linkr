import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function UserAvatar({ customStyle = {} }) {
	const { loggedUser } = useContext(UserContext);

	return (
		<Profile customStyle={customStyle}>
			<img src={loggedUser.user.avatar} alt="userAvatar" />
		</Profile>
	);
}

const Profile = styled.div`
	padding: ${({ customStyle }) => customStyle.padding ? customStyle.padding : "inherit"};
	display: flex;
	align-items: center;

	@media (max-width: 611px){
		display: ${({ customStyle }) => customStyle.mobileDisplay ? customStyle.mobileDisplay : "initial"};
	}

	img {
		object-fit: cover;
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
`