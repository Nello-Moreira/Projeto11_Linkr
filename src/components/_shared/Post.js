import styled from "styled-components";
import ButtonsContainer from "../_shared/buttons/ButtonsContainer";
import TrashButton from "../_shared/buttons/TrashButton";
import EditButton from "../_shared/buttons/EditButton";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import ReactHashtag from "react-hashtag";
import routes from "../../routes/routes";
import { useContext, useEffect, useState, useRef } from "react";
import UserContext from "../../contexts/UserContext";
import { likePost, dislikePost, edit } from "../../API/requests";
import ReactTooltip from "react-tooltip";
import autosize from "autosize";
import PagePostsContext from "../../contexts/PagePostsContext";

export default function Post({ postData }) {
	const { id, text, link, linkTitle, linkDescription, linkImage, user, likes } =
		postData;

	const { loggedUser } = useContext(UserContext);
	const { setDeletingPostId } = useContext(PagePostsContext);

	const [isLiked, setIsLiked] = useState(false);

	const [likesNumber, setLikesNumber] = useState(likes.length);

	const likesText =
		likesNumber > 0
			? likesNumber > 1
				? `${likesNumber} likes`
				: `${likesNumber} like`
			: "";

	const [tooltip, setTooltip] = useState("");

	function checkImgOnline(linkImage) {
		var img = new Image();
		img.src = linkImage;
		if (img.height > 0) {
			return true;
		} else {
			return false;
		}
	}

	useEffect(() => {
		constructTooltip();
	}, [tooltip, isLiked, likesNumber, likesText]);

	useEffect(() => {
		if (likes.find((like) => like.userId === loggedUser.user.id))
			setIsLiked(true);
	}, []);

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
			likePost({ likedPost: id, token: loggedUser.token });
			setLikesNumber(likesNumber + 1);
		} else {
			setIsLiked(false);
			setLikesNumber(likesNumber - 1);
			dislikePost({ likedPost: id, token: loggedUser.token });
		}
	}

	const [isEditing, setEdit] = useState(false);
	const inputRef = useRef();
	const [postText, setPostText] = useState(text);
	const [editText, setEditText] = useState(text);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (isEditing) {
			inputRef.current.focus();
			autosize(inputRef.current);
		}
	}, [isEditing]);

	function editPost() {
		if (!isEditing) {
			setEdit(true);
			return;
		}

		setEditText(postText);
		setEdit(false);
	}

	function submitEdit() {
		setLoading(true);
		edit({ text: editText, id, token: loggedUser.token })
			.then((response) => {
				setPostText(response.data.post.text);
				setEdit(false);
				setLoading(false);
			})
			.catch(() => {
				alert("Não foi possível salvar as alterações.");
				setLoading(false);
			});
	}

	function handleKeys(e) {
		if (e.key === "Enter" && !loading) {
			e.preventDefault();

			if (e.repeat) {
				return;
			}
			submitEdit();
		}

		if (e.key === "Escape") {
			setEditText(postText);
			editPost();
		}
	}

	return (
		<PostContainer>
			<LeftContainer>
				<Link to={routes.user.replace(":id", user.id)}>
					<ProfilePicture src={user.avatar} alt="profile" />
				</Link>
				<button onClick={clickHeart}>
					{isLiked ? <HeartFilled /> : <HeartOutline />}
				</button>
				<p data-tip={tooltip}>{likesText}</p>
				<ReactTooltip />
			</LeftContainer>

			<RightContainer>
				<UserContainer>
					<h2>{user.username}</h2>{" "}
					{loggedUser.user.id !== user.id ? null : (
						<ButtonsContainer customStyle={{ separationMargin: "0 0 0 5px" }}>
							<EditButton disabled={loading} onClick={() => editPost()} />
							<TrashButton onClick={() => setDeletingPostId(postData.id)} />
						</ButtonsContainer>
					)}
				</UserContainer>

				{isEditing ? (
					<InputText
						value={editText}
						ref={inputRef}
						onChange={(e) => setEditText(e.target.value)}
						onKeyPress={(e) => handleKeys(e, id)}
						loading={loading}
						disabled={loading}
					/>
				) : (
					<p>
						<ReactHashtag
							renderHashtag={(hashtagValue) => (
								<Link
									to={routes.trending.replace(
										":HASHTAG",
										hashtagValue.slice(1)
									)}
								>
									{hashtagValue}
								</Link>
							)}
						>
							{postText}
						</ReactHashtag>
					</p>
				)}

				<PreviewContainer href={link} target="_blank" rel="noreferrer">
					<DetailsContainer>
						<div>
							<h1>{linkTitle} </h1>
							<p>{linkDescription}</p>
						</div>
						<div className="link-container">{link}</div>
					</DetailsContainer>
					{linkImage && checkImgOnline(linkImage) ? (
						<PostImage src={linkImage} />
					) : (
						<LogoContainer>
							{" "}
							<Logo>linkr</Logo>
						</LogoContainer>
					)}
				</PreviewContainer>
			</RightContainer>
		</PostContainer>
	);
}

const PostContainer = styled.div`
	width: 100%;
	background-color: #171717;
	border-radius: 16px;
	padding: 20px 20px 20px 0;
	display: flex;
	margin-bottom: 15px;

	button {
		background: none;
		border: none;
	}

	@media (max-width: 611px) {
		border-radius: 0px;
	}
`;

const LeftContainer = styled.div`
	height: 100%;
	width: 15%;
	display: flex;
	flex-direction: column;
	align-items: center;

	p {
		font-size: 11px;
		color: #fff;
	}

	@media (max-width: 611px) {
		p {
			font-size: 9px;
		}
	}
`;

const ProfilePicture = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin-bottom: 15px;

	@media (max-width: 611px) {
		height: 40px;
		width: 40px;
	}
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

const UserContainer = styled.div`
	font-size: 19px;
	color: rgb(255, 255, 255);
	margin-bottom: 12px;
	display: flex;
	justify-content: space-between;
`;

const RightContainer = styled.div`
	height: 100%;
	width: 83%;

	a {
		color: rgb(234, 232, 232);
		text-decoration: none;
		margin-bottom: 10px;
		cursor: pointer;

		:hover {
			color: rgb(255, 255, 255);
		}
	}

	h2 {
		font-size: 19px;
		color: #fff;
	}

	> p {
		font-size: 17px;
		color: #aaaaaa;
		line-height: 18px;
		margin-bottom: 15px;
		word-wrap: break-word;
	}

	@media (max-width: 611px) {
		width: calc(100% - 30px);

		h2 {
			font-size: 17px;
			margin-left: 5px;
		}

		p {
			font-size: 15px;
			margin-left: 5px;
		}
	}
`;

const PreviewContainer = styled.a`
	max-width: 503px;
	display: flex;
	justify-content: space-between;
`;

const PostImage = styled.img`
	height: 155px;
	width: 153px;
	border-radius: 0 11px 11px 0;

	@media (max-width: 611px) {
		height: 115px;
		width: 95px;
	}
`;

const DetailsContainer = styled.div`
	height: 155px;
	width: calc(100% - 153px);
	border: 1px solid #c4c4c4;
	border-right: none;
	border-radius: 11px 0 0 11px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex: 1 1 auto;
	overflow-y: hidden;

	h1 {
		font-size: 16px;
		color: #cecece;
		margin-bottom: 8px;
	}

	p {
		font-size: 11px;
		color: #aaaaaa;
		margin: 10px 0;
	}

	.link-container {
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #cecece;
		font-size: 9px;
	}

	a {
		text-decoration: none;
		font-size: 11px;
		color: #cecece;
	}

	@media (max-width: 611px) {
		width: calc(100 % - 115px);
		height: 115px;
		padding: 10px;

		h1 {
			font-size: 11px;
		}

		p {
			font-size: 9px;
		}

		a {
			font-size: 9px;
		}
	}
`;

const LogoContainer = styled.div`
	height: 155px;
	width: 153px;
	border-radius: 0 11px 11px 0;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 611px) {
		height: 115px;
		width: 95px;
	}
`;

const Logo = styled.div`
	font-family: "Passion One", cursive;
	font-size: 35px;
	font-weight: 700;
	color: #000;
`;

const InputText = styled.textarea`
	width: 100%;
	font-size: 17px;
	font-family: "Lato", sans - serif;
	background-color: ${({ loading }) =>
		loading ? "rgb(242, 242, 242)" : "rgb(255,255,255)"};
	word-wrap: break-word;
	border-radius: 7px;
	margin-bottom: 5px;
	padding: 8px;
	resize: vertical;

	:focus {
		outline: none !important;
	}

	@media (max-width: 611px) {
		font-size: 15px;
	}
`;
