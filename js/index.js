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

// ✅ Footer (use the one already in index.html)
const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector("footer");
if (footer) {
  const copyright = document.createElement("p");
  copyright.innerHTML = `&copy; Maria Valencia ${thisYear}`;
  footer.appendChild(copyright);
}

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

const messageForm = document.forms["leave_message"];
const messagesSection = document.querySelector("#messages");
const messagesList = messagesSection ? messagesSection.querySelector("ul") : null;

if (messageForm && messagesList) {
  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    console.log(usersName, usersEmail, usersMessage);

    const newMessage = document.createElement("li");

    const nameLink = document.createElement("a");
    nameLink.href = `mailto:${usersEmail}`;
    nameLink.textContent = usersName;

    const messageText = document.createElement("span");
    messageText.textContent = `: ${usersMessage} `;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "remove";
    removeButton.addEventListener("click", () => {
      newMessage.remove();
    });

    newMessage.appendChild(nameLink);
    newMessage.appendChild(messageText);
    newMessage.appendChild(removeButton);

    messagesList.appendChild(newMessage);

    messageForm.reset();
  });
} else {
  if (!messageForm) console.warn("Form with name='leave_message' not found.");
  if (!messagesList) console.warn("Messages list (#messages ul) not found.");
}
