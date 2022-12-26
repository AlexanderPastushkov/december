let requestPage =
  "https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json";
async function getData(page) {
  const response = await fetch(`${requestPage}&page=${page}`);
  const data = await response.json();
  return data.items;
}
function showConsole(event) {
  console.log(event.target);
}
async function main() {
  let currentPage = 1;
  const postsData = await getData(currentPage);
  console.log(postsData);
  //   let rows = 10;
  function displayList(arrData, rowPerPage, page) {
    const postsEl = document.querySelector(".posts");
    postsEl.innerHTML = `<table class="arrItems"></table>`;

    for (var i = 0; i < postsData.length; i++) {
      // console.log(postsData[i]);
      for (key in postsData[i]) {
        if (key == "city") {
          // console.log(key);
          let row = document.createElement("tr");
          document.querySelector(".arrItems").appendChild(row);
          row.classList.add("post");
          row.innerHTML = `<td ><strong>${key}</strong></td>
          <td>${postsData[i][key]}</td>`;
        }
      }
    }
  }
  let liEl = document.querySelectorAll("li");
  console.log(liEl);
  for (let item of liEl) {
    console.log(item);
    let page = item.innerHTML;
    console.log(page);
    item.addEventListener("click", getData(page));
  }

  displayList(postsData, currentPage);
}
main();
