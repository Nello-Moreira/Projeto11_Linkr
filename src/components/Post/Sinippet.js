import styled from "styled-components";

export default function Snippet({
	link,
	linkTitle,
	linkDescription,
	linkImage,
}) {
	function checkImgOnline(linkImage) {
		var img = new Image();
		img.src = linkImage;
		if (img.height > 0) {
			return true;
		} else {
			return false;
		}
	}
	return (
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
	);
}

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
