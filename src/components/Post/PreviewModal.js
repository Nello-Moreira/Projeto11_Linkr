import styled from "styled-components";
import Modal from "../Modal/Modal";
import CustomButton from "../_shared/buttons/CustomButton";
import CloseButton from "../_shared/buttons/CloseButton";

export default function PreviewModal({ link, linkTitle, isOpen, setIsOpen }) {
	return (
		<Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
			<ModalHeader>
				<a href={link} target="_blank" rel="noreferrer">
					<NewTabButton> Open in a new tab</NewTabButton>
				</a>
				<CloseButton onClick={() => setIsOpen(false)} />
			</ModalHeader>
			<Preview src={link} title={linkTitle}></Preview>
		</Modal>
	);
}

const ModalHeader = styled.div`
	width: 100%;
	margin-bottom: 15px;
	display: flex;
	align-items: center;
	justify-content: space-between;

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
