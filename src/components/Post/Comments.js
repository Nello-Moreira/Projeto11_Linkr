import styled from "styled-components";
import ActionButton from "../_shared/buttons/ActionButton";
import { AiOutlineComment } from "react-icons/ai";
export default function Comments({
	setOpenCommentSession,
	openCommentSession,
	commentCount,
}) {
	return (
		<Container>
			<ActionButton onClick={() => setOpenCommentSession(!openCommentSession)}>
				<AiOutlineComment title={"See post's comments"} />
			</ActionButton>

			<p>
				{commentCount} {commentCount === 1 ? "comment" : "comments"}
			</p>
		</Container>
	);
}

const Container = styled.div`
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	text-align: center;
	p {
		font-size: 10px;
		margin-top: 2px;
	}

	@media (max-width: 611px) {
		p {
			font-size: 8px;
		}
	}
`;
