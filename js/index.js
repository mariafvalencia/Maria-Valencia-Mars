const GITHUB_USERNAME = "mariafvalencia";

/* ===== Projects (extra feature you already had) ===== */
const projectSection = document.querySelector("#projects");
const projectList = document.querySelector("#projects-list");

if (projectSection && projectList) {
  fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `GitHub API error: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((repositories) => {
      projectList.innerHTML = "";

      repositories.forEach((repo) => {
        const li = document.createElement("li");
        const link = document.createElement("a");

        link.href = repo.html_url;
        link.textContent = repo.name;
        link.target = "_blank";
        link.rel = "noreferrer";

        li.appendChild(link);
        projectList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error fetching repositories:", error);
      projectList.innerHTML =
        "<li>Sorry — projects could not load right now.</li>";
    });
}
const footerTag = document.createElement("footer");
document.body.appendChild(footerTag);

const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `&copy; Maria Valencia ${thisYear}`;
footer.appendChild(copyright);
const skills = ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Responsive Design"];

const skillsSection = document.querySelector("#skills");
const skillsList = skillsSection ? skillsSection.querySelector("ul") : null;

if (skillsList) {
  for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
  }
}
