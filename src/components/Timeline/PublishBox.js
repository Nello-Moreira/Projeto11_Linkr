import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPosts, post } from "../../API/requests";

export default function PublishteBox() {

    const userTest = {
        "token": "c46343f8-2aa6-4577-a6bd-838680604ed0",
        "user": {
            "id": 430,
            "email": "yasmim@yasmim.com",
            "username": "yas",
            "avatar": "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/430/avatar"
        }
    };

    function updateTimeline() {
        getPosts(userTest)
        .then((resp)=> console.log(resp.data));
    }

    useEffect(()=>{
        updateTimeline();
    }, []);

    const [newPost, setNewPost] = useState(clearedForm());

    const [loading, setLoading] = useState(false);

    function clearedForm(){
        return {
            link: "",
            text: ""
        };
    }

    function publishPost(event) {
        event.preventDefault();
        setLoading(true);
        post(userTest, newPost)
            .then((resp) => {
                setNewPost(clearedForm);
                setLoading(false);
                updateTimeline();
            })
            .catch((err) => {
                alert("Houve um erro ao publicar seu link");
                setLoading(false);
            })
    }

    return (
        <BoxContainer>
            <Profile>
                Profile
            </Profile>
            <PostForm onSubmit={publishPost}>
                <Input type="text" name="link"
                    placeholder="http://..." required disabled={loading} value={newPost.link}
                    onChange={(e) => setNewPost({ ...newPost, link: `${e.target.value}` })} />

                <Input type="text" name="linkComment" disabled={loading} value={newPost.text}
                    placeholder="O que você achou desse link?"
                    onChange={(e) => setNewPost({ ...newPost, text: `${e.target.value}` })} />

                <Input type="submit" name="publish" value="Publicar" disabled={loading} />
            </PostForm>
        </BoxContainer>
    );
}

const BoxContainer = styled.div`
    display: flex;
    background-color: white;
    width: 611px;
`
const Profile = styled.div`
    width: 86px;
`

const PostForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const Input = styled.input`
`