import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function UserAvatar({ customStyle = {} }) {
	const { user } = useContext(UserContext);

	return (
		<Profile customStyle={customStyle}>
			<img src={user.user.avatar} alt="userAvatar" />
		</Profile>
	);
}

const Profile = styled.div`
	padding: ${({ customStyle }) => customStyle.padding ? customStyle.padding : "inherit"};

	@media (max-width: 700px){
		display: ${({ customStyle }) => customStyle.mobileDisplay ? customStyle.mobileDisplay : "initial"};
	}

	img {
		object-fit: cover;
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
`