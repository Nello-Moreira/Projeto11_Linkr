import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import autosize from "autosize";

import {
	PostContainer,
	LeftContainer,
	UserContainer,
	RightContainer,
	InputEditText,
} from "../Post/PostStyles";
import ButtonsContainer from "../_shared/buttons/ButtonsContainer";
import UserAvatar from "../_shared/UserAvatar";
import TrashButton from "../_shared/buttons/TrashButton";
import EditButton from "../_shared/buttons/EditButton";

import Snippet from "./Sinippet";
import Like from "./Like";
import PostText from "./PostText";

import routes from "../../routes/routes";
import { edit } from "../../API/requests";
import UserContext from "../../contexts/UserContext";
import PagePostsContext from "../../contexts/PagePostsContext";

export default function Post({ postData }) {
	const { id, text, link, linkTitle, linkDescription, linkImage, user, likes } =
		postData;

	const { loggedUser } = useContext(UserContext);
	const { setDeletingPostId } = useContext(PagePostsContext);

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
		if (e.key === "Enter") {
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
					<UserAvatar
						src={user.avatar}
						alt="profile"
						customStyle={{ resizeOnMobile: true }}
					/>
				</Link>
				<Like likes={likes} postId={id} loggedUser={loggedUser} />
			</LeftContainer>

			<RightContainer>
				<UserContainer>
					<h2>{user.username}</h2>
					{loggedUser.user.id !== user.id ? null : (
						<ButtonsContainer customStyle={{ separationMargin: "0 0 0 5px" }}>
							<EditButton disabled={loading} onClick={() => editPost()} />
							<TrashButton onClick={() => setDeletingPostId(postData.id)} />
						</ButtonsContainer>
					)}
				</UserContainer>

				{isEditing ? (
					<InputEditText
						value={editText}
						ref={inputRef}
						onChange={(e) => setEditText(e.target.value)}
						onKeyPress={(e) => handleKeys(e, id)}
						loading={loading}
						disabled={loading}
					/>
				) : (
					<PostText postText={postText} />
				)}

				<Snippet
					link={link}
					linkTitle={linkTitle}
					linkDescription={linkDescription}
					linkImage={linkImage}
				/>
			</RightContainer>
		</PostContainer>
	);
}
