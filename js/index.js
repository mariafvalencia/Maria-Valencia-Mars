const GITHUB_USERNAME = "mariafvalencia";

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

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "Git",
  "GitHub",
  "Responsive Design"
];

const skillsList = document.querySelector("#skills ul");

if (skillsList) {
  skills.forEach((skill) => {
    const li = document.createElement("li");
    li.textContent = skill;
    skillsList.appendChild(li);
  });
}


/* ========= Footer with Current Year ========= */

const footer = document.createElement("footer");
const year = new Date().getFullYear();
footer.textContent = `© Maria Valencia ${year}`;

document.body.appendChild(footer);

