import styled from "styled-components";

export default function ActionButton({ customStyle, children, ...otherprops }) {
	return (
		<Button customStyle={customStyle} {...otherprops}>
			{children}
		</Button>
	);
}

const Button = styled.button`
	font-size: ${({ customStyle }) =>
		customStyle && customStyle.fontSize ? customStyle.fontSize : "28px"};
	color: ${({ customStyle }) =>
		customStyle && customStyle.color ? customStyle.color : "inherit"};
	margin: ${({ customStyle }) =>
		customStyle && customStyle.margin ? customStyle.margin : "0"};
	padding: 0;
	background-color: transparent;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	border: none;
	cursor: pointer;

	@media (max-width: 611px) {
		font-size: 20px;
	}
`;
