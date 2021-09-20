import ReactTooltip from "react-tooltip";
import { likePost, dislikePost } from "../../API/requests";
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styled from "styled-components";

export default function Like({ likes, loggedUser, postId }) {
	const [isLiked, setIsLiked] = useState(false);

	const [likesNumber, setLikesNumber] = useState(likes.length);

	const likesText =
		likesNumber > 0
			? likesNumber > 1
				? `${likesNumber} likes`
				: `${likesNumber} like`
			: "";

	const [tooltip, setTooltip] = useState("");

	useEffect(() => {
		if (likes.find((like) => like.userId === loggedUser.user.id))
			setIsLiked(true);
	}, []);

	useEffect(() => {
		constructTooltip();
	}, [tooltip, isLiked, likesNumber, likesText]);

	function constructTooltip() {
		let tooltipNumber = likesNumber;
		let tmpTooltip = "";

		if (likesNumber > 0) {
			if (isLiked) {
				tmpTooltip = "Você ";
			} else {
				tmpTooltip = `${likes[0]["user.username"]} `;
			}
			tmpTooltip = moreUsersLiked(tmpTooltip, tooltipNumber);
		}
		setTooltip(tmpTooltip);
	}

	function moreUsersLiked(tmpTooltip, tooltipNumber) {
		let newTooltipNumber = tooltipNumber;

		if (tooltipNumber > 1) {
			if (tooltipNumber === 2) {
				if (isLiked) return `Você e ${likes[0]["user.username"]} curtiram`;
				tmpTooltip = tmpTooltip + `e ${likes[1]["user.username"]} curtiram`;
				return tmpTooltip;
			} else {
				newTooltipNumber = tooltipNumber - 2;
				tmpTooltip = `${tmpTooltip}, ${likes[1]["user.username"]} e mais ${newTooltipNumber} `;
				moreUsersLiked(tmpTooltip, tooltipNumber - 2);
			}
		} else {
			tmpTooltip = tmpTooltip + "curtiu";
			return tmpTooltip;
		}
		if (likes.length !== newTooltipNumber) {
			if (tooltipNumber > 1) tmpTooltip = tmpTooltip + "curtiram";
			return tmpTooltip;
		}
	}

	function clickHeart() {
		setTooltip("");
		constructTooltip();
		if (!isLiked) {
			setIsLiked(true);
			setLikesNumber(likesNumber + 1);
			likePost({ likedPost: postId, token: loggedUser.token })
				.then((resp) => console.log(resp.data))
				.catch((err) => console.log(err.response));
			setLikesNumber(likesNumber + 1);
		} else {
			setIsLiked(false);
			setLikesNumber(likesNumber - 1);
			dislikePost({ likedPost: postId, token: loggedUser.token })
				.then((resp) => console.log(resp.data))
				.catch((err) => console.log(err.response));
		}
	}

	return (
		<LikeContainer>
			<button onClick={clickHeart}>
				{isLiked ? <HeartFilled /> : <HeartOutline />}
			</button>
			<p data-tip={tooltip}>{likesText}</p>
			<ReactTooltip />
		</LikeContainer>
	);
}

const LikeContainer = styled.div`
	margin-top: 10px;
`;

const HeartOutline = styled(AiOutlineHeart)`
	width: 23px;
	height: 23px;
	color: #fff;
	margin-bottom: 3px;

	@media (max-width: 611px) {
		width: 17px;
		height: 17px;
	}
`;

const HeartFilled = styled(AiFillHeart)`
	width: 23px;
	height: 23px;
	color: #fff;
	margin-bottom: 3px;

	@media (max-width: 611px) {
		width: 17px;
		height: 17px;
	}
`;
