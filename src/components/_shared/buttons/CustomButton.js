import styled from "styled-components";
import ThreeDotsLoader from "../../loaders/ThreeDotsLoader";

export default function CustomButton({ loading, children, ...otherProps }) {
	return (
		<Button {...otherProps}>{loading ? <ThreeDotsLoader /> : children}</Button>
	);
}

const Button = styled.button`
	font-family: Oswald, sans-serif;
	font-size: 100%;
	color: rgb(255, 255, 255);
	width: 100%;
	height: 40px;
	background-color: rgba(24, 119, 242, 1);
	border: none;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;

	cursor: pointer;

	:hover {
		filter: ${({ loading }) => (loading ? "brightness(1)" : "brightness(1.3)")};
	}

	> div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;
