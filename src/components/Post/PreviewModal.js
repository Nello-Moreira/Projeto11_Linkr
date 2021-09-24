import styled from "styled-components";
import Modal from "../Modal/Modal";
import { AiOutlineClose } from "react-icons/ai";
import CustomButton from "../_shared/buttons/CustomButton";

export default function PreviewModal({ link, linkTitle, isOpen, setIsOpen }) {
	return (
		<Modal isOpen={isOpen}>
			<ModalHeader>
				<a href={link} target="_blank" rel="noreferrer">
					<NewTabButton> Open in a new tab</NewTabButton>
				</a>
				<AiOutlineClose onClick={() => setIsOpen(false)} />
			</ModalHeader>
			<Preview src={link} title={linkTitle}></Preview>
		</Modal>
	);
}

const ModalHeader = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	margin-bottom: 15px;

	a {
		text-decoration: none;
	}
`;

const NewTabButton = styled(CustomButton)`
	font-family: Lato;
	font-style: normal;
	font-weight: bold;
	font-size: 14px;

	width: 138px;
	height: 31px;
`;

const Preview = styled.iframe`
	width: 100%;
	height: 500px;
`;
