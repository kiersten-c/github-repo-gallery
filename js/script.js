//div where profile info will appear
const profileInfo = document.querySelector(".overview");
//ul where repo list appears
const displayRepos = document.querySelector(".repo-list");
//section where all repos are displayed
const displayReposSection = document.querySelector(".repos");
//section where repo data appears
const displayRepoDataSection = document.querySelector(".repo-data");
//button
const backToGallery = document.querySelector(".view-repos");
//input section for search
const filterInput = document.querySelector(".filter-repos");

const username = "kiersten-c";

const gitHubUser = async function () {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  // console.log(data);
  displayUserInfo(data);
};

gitHubUser();

const displayUserInfo = function (data) {
  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");
  userInfo.innerHTML = `
        <figure>
          <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Bio:</strong> ${data.bio}</p>
          <p><strong>Location:</strong> ${data.location}</p>
          <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>`;
  profileInfo.append(userInfo);
  getRepoData(username);
};

const getRepoData = async function (username) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const data = await response.json();
  // console.log(data);
  displayRepoData(data);
};

const displayRepoData = function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    displayRepos.append(repoItem);
  }
};

displayRepos.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    // console.log(repoName);
    getRepoInfo(repoName);
  }
});

const getRepoInfo = async function (repoName) {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await response.json();
  //   console.log(repoInfo);

  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

  const languages = [];
  for (const lang in languageData) {
    languages.push(lang);
  }
  displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
  displayRepoDataSection.classList.remove("hide");
  backToGallery.classList.remove("hide");
  displayReposSection.classList.add("hide");
  displayRepoDataSection.innerHTML = "";
  const displaySpecificInfo = document.createElement("div");
  displaySpecificInfo.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${
      repoInfo.html_url
    }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  displayRepoDataSection.append(displaySpecificInfo);
};

backToGallery.addEventListener("click", function () {
  displayReposSection.classList.remove("hide");
  displayRepoDataSection.classList.add("hide");
  backToGallery.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
  const userInput = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const lowerUserInput = userInput.toLowerCase();

  for (const repo of repos) {
    const lowerRepoName = repo.innerText.toLowerCase();
    if (lowerRepoName.includes(lowerUserInput)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
