//div where profile info will appear
const profileInfo = document.querySelector(".overview");
//ul where repo list appears
const displayRepos = document.querySelector(".repo-list");
const username = "kiersten-c"

const gitHubUser = async function(){
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    // console.log(data);
    displayUserInfo(data);
};

gitHubUser();

const displayUserInfo = function(data){
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
        </div>`
    profileInfo.append(userInfo);
    getRepoData();
};

const getRepoData = async function(){
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=100`);
    const data = await response.json();
    // console.log(data);
    displayRepoInfo(data);
};

const displayRepoInfo = function(repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML=`<h3>${repo.name}</h3>`
        displayRepos.append(repoItem);
    }
};