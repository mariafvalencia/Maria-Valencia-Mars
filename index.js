const GITHUB_USERNAME = "mariafvalencia";

const projectSection = document.querySelector("#projects");
const projectList = projectSection.querySelector("#projects-list");

fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    const repositories = data; 
    console.log(repositories); 

    projectList.innerHTML = "";

    for (let i = 0; i < repositories.length; i++) {
      const repo = repositories[i];

      const li = document.createElement("li");
      li.textContent = repo.name;

      projectList.appendChild(li);
    }
  })
  .catch((error) => {
    console.error("Error fetching repositories:", error);
    projectList.innerHTML = "<li>Sorry — projects could not load right now.</li>";
  });

