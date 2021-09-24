import Modal from "../Modal/Modal";
import ModalTitle from "../Modal/ModalTitle";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapModal({ isOpen, username, setIsOpen, geolocation }) {
	const position = [geolocation.latitude, geolocation.longitude];
	return (
		<Modal isOpen={isOpen}>
			<ModalHeader>
				{username}'s Location{" "}
				<AiOutlineClose onClick={() => setIsOpen(false)} />
			</ModalHeader>
			<MapContainer center={position} zoom={13} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={position}></Marker>
			</MapContainer>
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
