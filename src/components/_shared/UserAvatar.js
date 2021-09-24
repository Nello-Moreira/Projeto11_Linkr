import { useState } from "react";
import styled from "styled-components";
import defaultUserImage from "../../assets/images/defaultUserImage.jpg";

export default function UserAvatar({ customStyle = {}, src }) {
	const [imgIsLoaded, setImgIsLoaded] = useState(true);

	return (
		<Profile customStyle={customStyle}>
			<img
				src={imgIsLoaded ? src : defaultUserImage}
				onError={() => setImgIsLoaded(false)}
				onLoad={() => console.log("carregou")}
				alt="userAvatar"
			/>
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
		width: ${({ customStyle }) =>
			customStyle.width ? customStyle.width : "50px"};
		height: ${({ customStyle }) =>
			customStyle.height ? customStyle.height : "50px"};
		border-radius: 50%;

		@media (max-width: 611px) {
			height: ${({ customStyle }) =>
				customStyle.resizeOnMobile === true ? "40px" : "50px"};
			width: ${({ customStyle }) =>
				customStyle.resizeOnMobile === true ? "40px" : "50px"};
		}
	}
`;
