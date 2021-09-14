import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPosts, post } from "../../API/requests";

import ProfileImage from "../_shared/ProfileImage";

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
            .then((resp) => console.log(resp.data));
    }

    useEffect(() => {
        updateTimeline();
    }, []);

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
            <ProfileImage padding={18}/>
            <PostForm onSubmit={publishPost}>
                <Label>O que você tem pra favoritar hoje?</Label>
                
                <input type="url" name="link"
                    placeholder="http://..." required disabled={loading} value={newPost.link}
                    onChange={(e) => setNewPost({ ...newPost, link: `${e.target.value}` })} />

                <textarea type="text" name="linkComment" disabled={loading} value={newPost.text}
                    placeholder="O que você achou desse link?"
                    onChange={(e) => {
                        e.preventDefault();
                        setNewPost({ ...newPost, text: `${e.target.value}` })}} />

                <button type="submit" name="publish" disabled={loading} >Publicar </button>

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
    }
`
const Label = styled.label`
    color: #707070;
    font-size: 20px;
    padding: 20px 0;
`
