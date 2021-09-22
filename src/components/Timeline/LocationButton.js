import styled from "styled-components";
import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

export default function LocationButton() {
	const [isLocationActive, setIsLocationActive] = useState(false);
	const [location, setLocation] = useState("");

	function activeLocation() {
		setIsLocationActive(true);
		navigator.geolocation.getCurrentPosition(function (position) {
			setLocation(position.coords.latitude, position.coords.longitude);
		});
	}

	return (
		<LocationButtonContainer
			type="input"
			isLocationActive={isLocationActive}
			onClick={() => {
				isLocationActive ? setIsLocationActive(false) : activeLocation();
			}}
		>
			<IoLocationOutline />
			Localização{isLocationActive ? "ativada" : " desativada"}
		</LocationButtonContainer>
	);
}

const LocationButtonContainer = styled.div`
	border: none;
	background-color: inherit;
	display: flex;
	align-items: center;
	font-size: 13px;
	font-family: "Lato", sans-serif;
	font-weight: 300;
	color: ${(props) => (props.isLocationActive ? "#238700" : "#949494}")};

	svg {
		font-size: 15px;
	}
`;
