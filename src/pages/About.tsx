import React from "react";
import * as S from "./AboutPageStyles";

export default function About() {
	return (
		<S.ContentContainer>
			<S.SectionContainer>
				<S.Title>About Me</S.Title>
			</S.SectionContainer>

			<S.SectionContainer>
				<S.SectionContent alignReverse={true}>
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
					<S.Quote >
						&quot;Business First&quot;
					</S.Quote>
					실제 비즈니스 문제의 해결을 최우선으로 삼습니다. 깊이 있는 고민을
					바탕으로, 쉽고 명확한 소통을 지향합니다.
				</S.SectionContent>
			</S.SectionContainer>

			<S.SectionContainer>
				<S.SectionTitle>Skills</S.SectionTitle>
				<S.SectionContent>
					<S.TechStackContainer>
						{/* Frontend */}
						<S.MainCategory>Frontend</S.MainCategory>

						<S.SubCategory>Languages</S.SubCategory>
						<S.BadgeGroup>
							<img
								src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white"
								alt="TypeScript"
							/>
							<img
								src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"
								alt="JavaScript"
							/>
							<img
								src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"
								alt="HTML5"
							/>
						</S.BadgeGroup>

						<S.SubCategory>Frameworks & Libraries</S.SubCategory>
						<S.BadgeGroup>
							<img
								src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"
								alt="Next.js"
							/>
							<img
								src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB"
								alt="React"
							/>
							<img
								src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white"
								alt="Axios"
							/>
							<img
								src="https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=react-query&logoColor=white"
								alt="React Query"
							/>
							<img
								src="https://img.shields.io/badge/Zustand-000000?style=flat-square&logo=zustand&logoColor=white"
								alt="Zustand"
							/>
						</S.BadgeGroup>

						<S.SubCategory>Styling</S.SubCategory>
						<S.BadgeGroup>
							<img
								src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"
								alt="CSS3"
							/>
							<img
								src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=sass&logoColor=white"
								alt="Sass"
							/>
							<img
								src="https://img.shields.io/badge/Styled_Components-DB7093?style=flat-square&logo=styled-components&logoColor=white"
								alt="Styled Components"
							/>
						</S.BadgeGroup>

						<S.SubCategory>Testing</S.SubCategory>
						<S.BadgeGroup>
							<img
								src="https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white"
								alt="Jest"
							/>
							<img
								src="https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=storybook&logoColor=white"
								alt="Storybook"
							/>
						</S.BadgeGroup>

						{/* Backend */}
						<S.MainCategory>Backend</S.MainCategory>

						<S.SubCategory>Languages</S.SubCategory>
						<S.BadgeGroup>
							<img
								src="https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=java&logoColor=white"
								alt="Java"
							/>
						</S.BadgeGroup>

						<S.SubCategory>Frameworks & Libraries</S.SubCategory>
						<S.BadgeGroup>
							<img
								src="https://img.shields.io/badge/Spring-6DB33F?style=flat-square&logo=spring&logoColor=white"
								alt="Spring"
							/>
							<img
								src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=spring-boot&logoColor=white"
								alt="Spring Boot"
							/>
							<img
								src="https://img.shields.io/badge/Spring_Data_JPA-6DB33F?style=flat-square&logo=spring&logoColor=white"
								alt="Spring Data JPA"
							/>
							<img
								src="https://img.shields.io/badge/Spring_Security-6DB33F?style=flat-square&logo=spring-security&logoColor=white"
								alt="Spring Security"
							/>
						</S.BadgeGroup>

						<S.SubCategory>Database</S.SubCategory>
						<S.BadgeGroup>
							<img
								src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white"
								alt="MySQL"
							/>
							<img
								src="https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white"
								alt="PostgreSQL"
							/>
							<img
								src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white"
								alt="Redis"
							/>
						</S.BadgeGroup>

						<S.SubCategory>DevOps</S.SubCategory>
						<S.BadgeGroup>
							<img
								src="https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black"
								alt="Linux"
							/>
							<img
								src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"
								alt="Docker"
							/>
							<img
								src="https://img.shields.io/badge/Docker_Compose-2496ED?style=flat-square&logo=docker&logoColor=white"
								alt="Docker Compose"
							/>
							<img
								src="https://img.shields.io/badge/AWS_EC2-232F3E?style=flat-square&logo=amazon-aws&logoColor=white"
								alt="AWS EC2"
							/>
							<img
								src="https://img.shields.io/badge/AWS_RDS-232F3E?style=flat-square&logo=amazon-aws&logoColor=white"
								alt="AWS RDS"
							/>
						</S.BadgeGroup>

						<S.SubCategory>Testing</S.SubCategory>
						<S.BadgeGroup>
							<img
								src="https://img.shields.io/badge/JUnit5-25A162?style=flat-square&logo=junit5&logoColor=white"
								alt="JUnit5"
							/>
							<img
								src="https://img.shields.io/badge/Mockito-78A641?style=flat-square&logo=mockito&logoColor=white"
								alt="Mockito"
							/>
						</S.BadgeGroup>

						{/* Tools & Others */}
						<S.MainCategory>Tools & Others</S.MainCategory>
						<S.BadgeGroup>
							<img
								src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"
								alt="Git"
							/>
							<img
								src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white"
								alt="GitHub Actions"
							/>
							<img
								src="https://img.shields.io/badge/Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=white"
								alt="Swagger"
							/>
							<img
								src="https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white"
								alt="Postman"
							/>
							<img
								src="https://img.shields.io/badge/IntelliJ_IDEA-000000?style=flat-square&logo=intellij-idea&logoColor=white"
								alt="IntelliJ IDEA"
							/>
							<img
								src="https://img.shields.io/badge/VS_Code-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white"
								alt="VS Code"
							/>
							<img
								src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white"
								alt="Notion"
							/>
							<img
								src="https://img.shields.io/badge/Slack-4A154B?style=flat-square&logo=slack&logoColor=white"
								alt="Slack"
							/>
						</S.BadgeGroup>
					</S.TechStackContainer>
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
