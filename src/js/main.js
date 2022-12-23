let requestUrl = "https://jsonplaceholder.typicode.com/posts";
let requestPage =
  "https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json";

async function main() {
  async function getData() {
    const response = await fetch(`${requestPage}&page=${page}`);
    const data = await response.json();
    return data.items;
  }
  const postsData = await getData();
  console.log(postsData);
  let currentPage = 1;
  let rows = 10;

  function displayList(arrData, rowPerPage, page) {
    const postsEl = document.querySelector(".posts");
    postsEl.innerHTML = `<table class="arrItems"></table>`;
    page--;
    const start = rowPerPage * page;
    const end = start + rowPerPage;

    const paginatedData = arrData.slice(start, end);
    for (var i = 0; i < paginatedData.length; i++) {
      console.log(paginatedData[i]);
      for (key in paginatedData[i]) {
        console.log(key);

        const postEl = document.createElement("tr");

        postEl.classList.add("post");
        postEl.innerHTML = `<td><strong>${key}</strong>:${paginatedData[i][key]}</td> `;
        document.querySelector(".arrItems").appendChild(postEl);
      }
    }
  }

  function displayPagination(arrData, rowPerPage) {
    const paginationEl = document.querySelector(".pagination");
    // считаем старницы делим длину массива на коль-во строк на странице
    const pagesCount = Math.ceil(arrData.length / rowPerPage);
    const ulEl = document.createElement("ul");
    ulEl.classList.add("pagination__list");
    for (let i = 0; i < pagesCount; i++) {
      const liEl = displayPaginationBtn(i + 1);
      ulEl.appendChild(liEl);
    }
    paginationEl.appendChild(ulEl);
  }
  function displayPaginationBtn(page) {
    const liEl = document.createElement("li");
    liEl.classList.add("pagination__item");
    liEl.innerText = page;
    if (currentPage == page) {
      liEl.classList.add("pagination__item-active");
    }
    liEl.addEventListener("click", () => {
      currentPage = page;
      getData(page);

      displayList(postsData, rows, currentPage);
      let currentItemLi = document.querySelector("li.pagination__item-active");
      currentItemLi.classList.remove("pagination__item-active");
      liEl.classList.add("pagination__item-active");
    });
    return liEl;
  }
  displayList(postsData, rows, currentPage);
  displayPagination(postsData, rows);
}
main();
//========================================================================================================================================================
