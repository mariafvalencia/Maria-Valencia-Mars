const GITHUB_USERNAME = "mariafvalencia";
const projectsList = document.querySelector("#projects-list");

fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    const repositories = data; // <-- required variable name
    console.log(repositories); // <-- required console.log

    // Clear anything inside the list (just in case)
    projectsList.innerHTML = "";

    // Sort repos by most recently updated (nice touch)
    repositories
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .forEach((repo) => {
        const li = document.createElement("li");

        const link = document.createElement("a");
        link.href = repo.html_url;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.textContent = repo.name;

        li.appendChild(link);
        projectsList.appendChild(li);
      });
  })
  .catch((error) => {
    console.error("Error fetching repositories:", error);

    projectsList.innerHTML = `<li>Sorry — I couldn't load projects right now.</li>`;
  });
