import React from "react";
import styled from "styled-components";

const ContentContainer = styled.div`
	max-width: ${({ theme }) => theme.maxWidth};
	margin: 0 auto;
	padding: 4rem 2rem;
`;

const Title = styled.h1`
	font-size: 3.2rem;
	color: ${(props) => props.theme.colors.text};
	margin-bottom: 4rem;
`;

const SectionContainer = styled.div`
	display: grid;
	grid-template-columns: 300px 1fr;
	gap: 4rem;
	margin-bottom: 4rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		gap: 2rem;
	}
`;

const SectionTitle = styled.h2`
	font-size: 2.4rem;
	color: ${(props) => props.theme.colors.text};
	position: relative;
	padding-bottom: 1rem;
	text-align: end;

	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 40px;
		height: 3px;
		/* background: ${(props) => props.theme.colors.primary}; */
		border-radius: 2px;
	}
`;

const SectionContent = styled.div`
	color: ${(props) => props.theme.colors.textLight};
	font-size: 1.6rem;
	line-height: 1.8;
`;

const ProfileImage = styled.div`
	width: 200px;
	height: 200px;
	overflow: hidden;
	border: 3px solid ${(props) => props.theme.colors.border};
	box-shadow: 0 0 15rem rgba(0, 0, 0, 0.5);
	position: relative;
	border-radius: 50%;
	margin-bottom: 2rem;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const SkillList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;

	li {
		margin-bottom: 1.5rem;
		display: flex;
		align-items: center;

		&::before {
			content: "•";
			margin-right: 1rem;
			color: ${(props) => props.theme.colors.primary};
			font-size: 1.8rem;
		}

		strong {
			color: ${(props) => props.theme.colors.textLight};
			font-weight: 600;
			margin-right: 0.5rem;
			min-width: 100px;
			position: relative;

			&::after {
				content: ":";
				position: absolute;
				right: 0;
				color: ${(props) => props.theme.colors.textLight};
			}
		}
	}
`;

const ContactLink = styled.a`
	color: ${(props) => props.theme.colors.primary};
	text-decoration: none;
	transition: color 0.2s ease;

	&:hover {
		color: ${(props) => props.theme.colors.textLight};
	}
`;

const About: React.FC = () => {
	return (
		<ContentContainer>
			<Title>About Me</Title>

			<SectionContainer>
				<SectionContent style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
					<ProfileImage >
						<img src="/duke-cartoon.jpeg" alt="Duke's profile" />
					</ProfileImage>					
				</SectionContent>
				<SectionContent>
					<SectionTitle style={{ textAlign: "start" }}>Duke</SectionTitle>
					<SkillList>
						<li>
							<strong>이메일</strong>
							<ContactLink href="mailto:duke.dev.seo@gmail.com">
								duke.dev.seo@gmail.com
							</ContactLink>
						</li>
						<li>
							<strong>GitHub</strong>
							<ContactLink href="https://github.com/dev-duke-seo">
								github.com/dev-duke-seo
							</ContactLink>
						</li>
					</SkillList>
				</SectionContent>

				
			</SectionContainer>
			<SectionContainer>
				<SectionTitle>Introduction</SectionTitle>
				<SectionContent>
					안녕하세요! 저는 기술과 개발에 대한 이야기를 공유하는 개발자입니다. 이
					블로그에서는 제가 배운 것들, 경험한 것들, 그리고 생각하는 것들을
					공유하고자 합니다.
				</SectionContent>
			</SectionContainer>

			<SectionContainer>
				<SectionTitle>Skills</SectionTitle>
				<SectionContent>
					<SkillList>
						<li>
							<strong>Frontend</strong> NEXT.JS, React, TypeScript, JavaScript,
							HTML, CSS
						</li>
						<li>
							<strong>Backend</strong> Spring Framework(Java)
						</li>
						<li>
							<strong>Database</strong> MySQL, PostgreSQL, Redis
						</li>
						<li>
							<strong>DevOps</strong> Docker, AWS
						</li>
						<li>
							<strong>Other</strong> Git, CI/CD
						</li>
					</SkillList>
				</SectionContent>
			</SectionContainer>

			<SectionContainer>
				<SectionTitle>Contact</SectionTitle>
				<SectionContent>
					<SkillList>
						<li>
							<strong>이메일</strong>
							<ContactLink href="mailto:duke.dev.seo@gmail.com">
								duke.dev.seo@gmail.com
							</ContactLink>
						</li>
						<li>
							<strong>GitHub</strong>
							<ContactLink href="https://github.com/dev-duke-seo">
								github.com/dev-duke-seo
							</ContactLink>
						</li>
					</SkillList>
				</SectionContent>
			</SectionContainer>
		</ContentContainer>
	);
};

export default About;
