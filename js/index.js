const GITHUB_USERNAME = "mariafvalencia";

// Projects from GitHub
const projectList = document.querySelector("#projects-list");

if (projectList) {
  fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
    .then(res => res.json())
    .then(repos => {
      projectList.innerHTML = "";

      repos.forEach(repo => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = repo.html_url;
        a.textContent = repo.name;
        a.target = "_blank";

        li.appendChild(a);
        projectList.appendChild(li);
      });
    })
    .catch(() => {
      projectList.innerHTML = "<li>Projects could not load.</li>";
    });
}

// Footer year
const footer = document.querySelector("footer");
if (footer) {
  const p = document.createElement("p");
  p.textContent = `© Maria Valencia ${new Date().getFullYear()}`;
  footer.appendChild(p);
}

// Skills list
const skills = ["HTML", "CSS", "JavaScript", "Git", "GitHub"];

const skillsList = document.querySelector("#skills ul");

if (skillsList) {
  skills.forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill;
    skillsList.appendChild(li);
  });
}

// Message form
const messageForm = document.forms["leave_message"];

if (messageForm) {
  messageForm
