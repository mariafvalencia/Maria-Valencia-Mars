const GITHUB_USERNAME = "mariafvalencia";

// Projects from GitHub
const projectList = document.querySelector("#projects-list");

if (projectList) {
  fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("GitHub API error");
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
    .catch(() => {
      projectList.innerHTML = "<li>Projects could not load.</li>";
    });
}

// Footer year
const footer = document.querySelector("footer");
if (footer) {
  const p = document.createElement("p");
  p.innerHTML = `&copy; Maria Valencia ${new Date().getFullYear()}`;
  footer.appendChild(p);
}

// Skills list
const skills = ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Responsive Design"];
const skillsList = document.querySelector("#skills ul");

if (skillsList) {
  skillsList.innerHTML = "";
  skills.forEach((skill) => {
    const li = document.createElement("li");
    li.innerText = skill;
    skillsList.appendChild(li);
  });
}

// Message form
const messageForm = document.forms["leave_message"];

if (messageForm) {
  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    console.log(usersName, usersEmail, usersMessage);

    const messageSection = document.querySelector("#messages");
    const messageList = messageSection.querySelector("ul");

    const newMessage = document.createElement("li");
    newMessage.innerHTML = `
      <a href="mailto:${usersEmail}">${usersName}</a>
      <span>: ${usersMessage}</span>
    `;

    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.type = "button";

    removeButton.addEventListener("click", (e) => {
      const entry = e.target.parentNode;
      entry.remove();
    });

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    event.target.reset();
  });
}
