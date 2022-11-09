function handleClick(e) {
  const ul = e.parentNode.children[2];
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  const loading = document.createElement("div");
  loading.innerHTML = "Loading...";
  ul.appendChild(loading);
  fetch(e.dataset.url)
    .then((res) => res.json())
    .then((json) => {
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
      console.log(json.data.children);
      const postTitles = json.data.children.map((post) => ({
        title: post.data.title,
        url: post.data.url,
      }));
      postTitles.forEach((post) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = post.url;
        a.target = "_blank";
        a.innerHTML = post.title;
        li.appendChild(a);
        ul.appendChild(li);
      });
    });
}

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", (e) => handleClick(e.target));
});
