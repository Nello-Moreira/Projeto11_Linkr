import { MdEdit } from "react-icons/md";

import styled from "styled-components";

export default function EditButton({ customStyle, ...otherprops }) {
	return (
		<Button {...otherprops}>
			<MdEdit
				color={"inherit"}
				title={"Edit this post"}
				height="100%"
				width="100%"
				cursor={"pointer"}
			/>
		</Button>
	);
}

const Button = styled.button`
	font-size: ${({ customStyle }) =>
		customStyle && customStyle.fontSize ? customStyle.fontSize : "inherit"};
	color: ${({ customStyle }) =>
		customStyle && customStyle.color ? customStyle.color : "inherit"};
	padding: 0;
	background-color: transparent;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	border: none;
	cursor: pointer;
`;
