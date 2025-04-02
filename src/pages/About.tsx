import React from "react";
import styled from "styled-components";

const ContentContainer = styled.div`
	max-width: ${({ theme }) => theme.maxWidth};
	margin: 0 auto;
	padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 10rem;
`;

const Title = styled.h1`
	font-size: 3.2rem;
	color: ${(props) => props.theme.colors.text};
`;

const ProfileSection = styled.div`
	max-width: 80rem;
	display: flex;
	align-items: center;
  justify-content: space-between;
	gap: 2rem;
`;

const ProfileImage = styled.div`
	width: 200px;
	height: 200px;
	overflow: hidden;
	
  border: 3px solid ${(props) => props.theme.colors.border};
	box-shadow: 0 0 15rem rgba(0, 0, 0, 0.5); // 흐려지는 효과 추가

	position: relative;
	border-radius: 50%;  // 원형으로 만들기
  flex-shrink: 0;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;  // contain 대신 cover 사용
	}
`;

const Section = styled.section`
`;

const SectionTitle = styled.h2`
	font-size: 2.4rem;
	color: ${(props) => props.theme.colors.text};
	margin-bottom: 1rem;
`;

const Paragraph = styled.p`
	font-size: 1.6rem;
	line-height: 1.6;
	color: ${(props) => props.theme.colors.textLight};
`;

const About: React.FC = () => {
	return (
		<ContentContainer>
			<Title>About Me</Title>

			<ProfileSection>
				<Section>
					<SectionTitle>Introduction</SectionTitle>
					<Paragraph>
						안녕하세요! 저는 기술과 개발에 대한 이야기를 공유하는 개발자입니다.
						이 블로그에서는 제가 배운 것들, 경험한 것들, 그리고 생각하는 것들을
						공유하고자 합니다.
					</Paragraph>
				</Section>
				<ProfileImage>
					<img src="/duke-cartoon.jpeg" alt="Duke's profile" />
				</ProfileImage>
			</ProfileSection>

			<Section>
				<SectionTitle>Skills</SectionTitle>
				<Paragraph>
					• Frontend: NEXT.JS, React, TypeScript, JavaScript, HTML, CSS
					<br />
					• Backend: Spring Framework(Java)
					<br />
					• Database: MySQL, PostgreSQL, Redis
					<br />
					• DevOps: Docker, AWS
					<br />• Other: Git, CI/CD
				</Paragraph>
			</Section>

			<Section>
				<SectionTitle>Contact</SectionTitle>
				<Paragraph>
					이메일: <a href="mailto:duke.dev.seo@gmail.com">duke.dev.seo@gmail.com</a>
					<br />
          GitHub: <a href="https://github.com/dev-duke-seo">github.com/dev-duke-seo</a>
					<br />
					{/* LinkedIn: linkedin.com/in/duke-dev-seo */}
				</Paragraph>
			</Section>
		</ContentContainer>
	);
};

export default About;
