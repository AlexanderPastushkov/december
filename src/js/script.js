// let requestUrl = "https://jsonplaceholder.typicode.com/posts";
let requestUrl =
  "https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json";

async function getData() {
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data.items;
}
getData();
async function main() {
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
      for (key in paginatedData[i]) {
        console.log(key);
        const postEl = document.createElement("tr");

        postEl.classList.add("post");
        postEl.innerHTML = `<td><strong>${key}</strong>:${paginatedData[i][key]}</td>`;
        document.querySelector(".arrItems").appendChild(postEl);
      }
    }
  }

  //   function displayList(arrData, rowPerPage, page) {
  //     const postsEl = document.querySelector(".posts");
  //     postsEl.innerHTML = `<table class="arrItems"></table>`;
  //     page--;
  //     const start = rowPerPage * page;
  //     const end = start + rowPerPage;

  //     const paginatedData = arrData.slice(start, end);
  //     paginatedData.forEach((item) => {
  //       const postEl = document.createElement("tr");

  //       postEl.classList.add("post");
  //       postEl.innerHTML = `<td>${item}</td>`;
  //       document.querySelector(".arrItems").appendChild(postEl);

  //     });
  //   }
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
// const phoneNumber = {
//   firedept: [
//     ["number 1", "101"],
//     ["number 2", "112"],
//     ["number 3", "01"],
//   ],
//   police: [
//     ["number 1", "102"],
//     ["number 2", "02"],
//   ],
//   ambulance: [["number 1", "03"]],
// };
// document.querySelector(".content").innerHTML = `<table class="phone"></table>`;
// for (key in phoneNumber) {
//   let row = document.createElement("tr");
//   row.innerHTML = `<td colspan="2">${key}</td>`;
//   document.querySelector(".phone").appendChild(row);
//   for (let i = 0; i < phoneNumber[key].length; i++) {
//     let row = document.createElement("tr");
//     row.innerHTML = `
//     <td>${phoneNumber[key][i][0]}</td>
//     <td>${phoneNumber[key][i][1]}</td>`;
//     document.querySelector(".phone").appendChild(row);
//   }
// }
