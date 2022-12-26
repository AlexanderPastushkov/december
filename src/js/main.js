let requestPage =
  "https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json&page=1";
async function getData() {
  const response = await fetch(requestPage);
  const data = await response.json();
  return data.items;
}

async function main() {
  const postsData = await getData();
  console.log(postsData);
  let currentPage = 1;
  let rows = 25;

  function displayList(arrData, rowPerPage, page) {
    const postsEl = document.querySelector(".posts");
    postsEl.innerHTML = `<table class="arrItems"></table>`;
    page--;
    const start = rowPerPage * page;
    const end = start + rowPerPage;
    const paginatedData = arrData.slice(start, end);

    paginatedData.forEach(function (item) {
      console.log(item);
      for (key in item) {
        if (key == "city") {
          console.log(key);
          let row = document.createElement("tr");
          document.querySelector(".arrItems").appendChild(row);
          row.classList.add("post");
          row.innerHTML = `<td ><strong>${key}</strong></td>
          <td>${item[key]}</td>`;
        }
      }
    });
  }

  function displayPagination(arrData, rowPerPage) {
    const paginationEl = document.querySelector(".pagination");
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
      // const data = getData(page)
      //   .then(displayList(postsData, rows, page))
      //   .catch((err) => console.log(err));
      // console.log(data);
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
