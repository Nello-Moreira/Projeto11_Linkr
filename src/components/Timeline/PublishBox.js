import { useContext, useState, useRef } from "react";
import styled from "styled-components";
import { post } from "../../API/requests";

import UserAvatar from "../_shared/UserAvatar";
import CustomButton from "../_shared/buttons/CustomButton";
import LocationButton from "./LocationButton";
import UserContext from "../../contexts/UserContext";
import CancelPostModal from "./CancelPostModal";

import autosize from "autosize";

export default function PublishBox({ updateTimeline }) {
	const { loggedUser } = useContext(UserContext);

	const [newPost, setNewPost] = useState(clearedForm());

	const [loading, setLoading] = useState(false);

	const [cancelPost, setCancelPost] = useState(false);

	const inputRef = useRef();
	autosize(inputRef.current);

	function clearedForm() {
		return {
			...newPost,
			link: "",
			text: "",
		};
	}

	function publishPost() {
		setLoading(true);
		post(loggedUser, newPost)
			.then(() => {
				setNewPost(clearedForm);
				setLoading(false);
				updateTimeline();
			})
			.catch(() => {
				alert("Houve um erro ao publicar seu link");
				setLoading(false);
			});
	}

	function handleKeys(event) {
		if (event.key === "Enter" && !loading) {
			event.preventDefault();

			if (event.repeat) {
				return;
			}
			publishPost();
			setLoading(false);
		}

		if (event.key === "Escape") {
			setCancelPost(true);
			setLoading(false);
		}
	}

	return (
		<BoxContainer>
			<UserAvatar
				user={loggedUser.user}
				customStyle={{ padding: "18px", mobileDisplay: "none" }}
			/>
			<PostForm onSubmit={publishPost} onKeyDown={(e) => handleKeys(e)}>
				<Label>O que você tem pra favoritar hoje?</Label>

				<input
					type="url"
					name="link"
					value={newPost.link}
					placeholder="http://..."
					required
					disabled={loading}
					onChange={(e) =>
						setNewPost({ ...newPost, link: `${e.target.value}` })
					}
				/>

				<textarea
					ref={inputRef}
					type="text"
					name="linkComment"
					value={newPost.text}
					placeholder="O que você achou desse link?"
					disabled={loading}
					onChange={(e) => {
						e.preventDefault();
						setNewPost({ ...newPost, text: `${e.target.value}` });
					}}
				/>

				<ButtonContainer>
					<LocationButton newPost={newPost} setNewPost={setNewPost} />
					<CustomButton
						customStyle={{
							fontFamily: "'Lato', sans-serif",
							width: "112px",
							height: "31px",
							fontSize: "14px",
						}}
						type="submit"
						name="publish"
						disabled={loading}
					>
						{loading ? "Publicando..." : "Publicar"}
					</CustomButton>
				</ButtonContainer>
			</PostForm>
			<CancelPostModal
				isOpen={cancelPost}
				setIsOpen={setCancelPost}
				clearForm={() => setNewPost(clearedForm)}
			/>
		</BoxContainer>
	);
}

const BoxContainer = styled.div`
	display: flex;
	background-color: #ffffff;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 16px;
	width: 100%;
	margin-bottom: 30px;
	align-items: flex-start;

	@media (max-width: 611px) {
		width: 100%;
		border-radius: 0;
		padding: 0 15px;
	}
`;

const PostForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 82%;
	font-family: "Lato", sans-serif;
	font-weight: 300;

	input,
	textarea {
		width: 100%;
		background: #efefef;
		border-radius: 5px;
		border: none;
		margin: 2px 0;
		padding: 5px 13px;
		font-family: inherit;
		resize: vertical;

		&::placeholder {
			color: #949494;
			font-size: 15px;
		}

		&[type="url"] {
			height: 30px;
		}

		&[type="text"] {
			height: 66px;
		}
	}

	@media (max-width: 611px) {
		width: 100%;
	}
`;
const Label = styled.label`
	color: #707070;
	font-size: 20px;
	padding: 20px 0;

	@media (max-width: 611px) {
		text-align: center;
	}
`;

const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 5px 0 10px;
`;
