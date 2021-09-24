import Modal from "../Modal/Modal";
import ModalTitle from "../Modal/ModalTitle";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";

let DefaultIcon = Leaflet.icon({
	...Leaflet.Icon.Default.prototype.options,
	iconUrl: icon,
	iconRetinaUrl: iconRetina,
	shadowUrl: iconShadow,
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;

export default function MapModal({ isOpen, username, setIsOpen, geolocation }) {
	const position = [geolocation.latitude, geolocation.longitude];
	return (
		<Modal isOpen={isOpen}>
			<ModalHeader>
				{username}'s Location{" "}
				<AiOutlineClose onClick={() => setIsOpen(false)} />
			</ModalHeader>
			<Map center={position} zoom={10} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={position}></Marker>
			</Map>
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
	margin-bottom: 15px;
`;

const Map = styled(MapContainer)`
	width: 100%;
	height: 300px;
`;
