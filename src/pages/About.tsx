import React from "react";
import * as S from "./AboutPageStyles";

export default function About() {
	return (
		<S.ContentContainer>
			<S.SectionContainer>
				<S.Title style={{ textAlign: "end" }}>About Me</S.Title>
			</S.SectionContainer>

			<S.SectionContainer>
				<S.SectionContent
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
					}}
				>
					<S.ProfileImage>
						<img src="/duke-cartoon.jpeg" alt="Duke's profile" />
					</S.ProfileImage>
				</S.SectionContent>
				<S.SectionContent>
					<S.SectionTitle style={{ textAlign: "start" }}>Duke</S.SectionTitle>
					<S.SkillList>
						<li>
							<strong>이메일</strong>
							<S.ContactLink href="mailto:duke.dev.seo@gmail.com">
								duke.dev.seo@gmail.com
							</S.ContactLink>
						</li>
						<li>
							<strong>GitHub</strong>
							<S.ContactLink href="https://github.com/dev-duke-seo">
								github.com/dev-duke-seo
							</S.ContactLink>
						</li>
					</S.SkillList>
				</S.SectionContent>
			</S.SectionContainer>
			<S.SectionContainer>
				<S.SectionTitle>Introduction</S.SectionTitle>
				<S.SectionContent>
					안녕하세요! 저는 기술과 개발에 대한 이야기를 공유하는 개발자입니다. 이
					블로그에서는 제가 배운 것들, 경험한 것들, 그리고 생각하는 것들을
					공유하고자 합니다.
				</S.SectionContent>
			</S.SectionContainer>

			<S.SectionContainer>
				<S.SectionTitle>Skills</S.SectionTitle>
				<S.SectionContent>
					<S.SkillList>
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
					</S.SkillList>
				</S.SectionContent>
			</S.SectionContainer>

			<S.SectionContainer>
				<S.SectionTitle>Contact</S.SectionTitle>
				<S.SectionContent>
					<S.SkillList>
						<li>
							<strong>이메일</strong>
							<S.ContactLink href="mailto:duke.dev.seo@gmail.com">
								duke.dev.seo@gmail.com
							</S.ContactLink>
						</li>
						<li>
							<strong>GitHub</strong>
							<S.ContactLink href="https://github.com/dev-duke-seo">
								github.com/dev-duke-seo
							</S.ContactLink>
						</li>
					</S.SkillList>
				</S.SectionContent>
			</S.SectionContainer>
		</S.ContentContainer>
	);
}
