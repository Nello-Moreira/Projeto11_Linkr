import Modal from "../Modal/Modal";
import ModalTitle from "../Modal/ModalTitle";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function MapModal({ isOpen, username, setIsOpen, geolocation }) {
	const handleApiLoaded = (map, maps) => {
		// use map and maps objects
	};
	return (
		<Modal isOpen={isOpen}>
			<ModalHeader>
				{username}'s Location{" "}
				<AiOutlineClose onClick={() => setIsOpen(false)} />
			</ModalHeader>
			{geolocation.latitude}
			{geolocation.longitude}
			<GoogleMapReact>
				<AnyReactComponent
					lat={geolocation.latitude}
					lng={geolocation.longitude}
					text="My Marker"
				/>
			</GoogleMapReact>
		</Modal>
	);
}

const ModalHeader = styled(ModalTitle)`
	display: flex;
	justify-content: space-between;
	width: 100%;
	font-family: Oswald;
	font-weight: 700;
	font-size: 38px;
`;
