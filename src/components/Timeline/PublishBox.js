import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { getPosts, post } from "../../API/requests";

import UserAvatar from "../_shared/UserAvatar";
import BlueButton from "../_shared/buttons/BlueButton";
import UserContext from "../../contexts/UserContext";

export default function PublishteBox() {

	const { user } = useContext(UserContext);

	function updateTimeline() {
		getPosts(user)
			.then((resp) => console.log(resp.data)) //Simulando preenchimento da array de posts da timeline
			.catch(() => updateTimeline());
	}

	useEffect(() => updateTimeline(), []);

	const [newPost, setNewPost] = useState(clearedForm());

	const [loading, setLoading] = useState(false);

	function clearedForm() {
		return {
			link: "",
			text: ""
		};
	}

	function publishPost(event) {
		event.preventDefault();
		setLoading(true);
		post(user, newPost)
			.then(() => {
				setNewPost(clearedForm);
				setLoading(false);
				updateTimeline();
			})
			.catch(() => {
				alert("Houve um erro ao publicar seu link");
				setLoading(false);
			})
	}

	return (
		<BoxContainer>
			<UserAvatar customStyle={{ padding: "18px", mobileDisplay: "none" }} />
			<PostForm onSubmit={publishPost}>
				<Label>O que você tem pra favoritar hoje?</Label>

				<input type="url" name="link" value={newPost.link}
					placeholder="http://..."
					required
					disabled={loading}
					onChange={(e) => setNewPost({ ...newPost, link: `${e.target.value}` })} />

				<textarea type="text" name="linkComment" value={newPost.text}
					placeholder="O que você achou desse link?"
					disabled={loading}
					onChange={(e) => {
						e.preventDefault();
						setNewPost({ ...newPost, text: `${e.target.value}` })
					}} />

				<BlueButton customStyle={{
					fontFamily: "'Lato', sans-serif",
					width: "112px", height: "31px", fontSize: "14px", position: "absolute",
					bottom: "0", margin: "10px 20px", right: "0"
				}}
					type="submit" name="publish" disabled={loading} >Publicar </BlueButton>

			</PostForm>
		</BoxContainer>
	);
}

const BoxContainer = styled.div`
	display: flex;
	background-color: #FFFFFF;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 16px;
	width: 611px;
	height: 209px;
	position: relative;

	@media (max-width: 700px){
		width: 100%;
		border-radius: 0;
		padding: 0 15px;
	}
`

const PostForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	font-family: 'Lato', sans-serif;
	font-weight: 300;

	input, textarea {
		width: 503px;
		background: #EFEFEF;
		border-radius: 5px;
		border: none;
		margin: 2px 0;
		padding: 5px 13px;
		font-family: inherit;

		&::placeholder {
			color: #949494;
			font-size: 15px;
		}

		&[type=url] {
		height: 30px;
		}

		&[type=text]{
			height: 66px;
		}

		@media (max-width: 700px){
			width: 100%;
		}
	}

	@media (max-width: 700px){
		input, textarea {
			width: 100%;
		}
	}
`
const Label = styled.label`
	color: #707070;
	font-size: 20px;
	padding: 20px 0;

	@media (max-width: 700px){
		text-align: center;
	}
`
