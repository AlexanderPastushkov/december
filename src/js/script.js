let requestPage =
  "https://chroniclingamerica.loc.gov/search/titles/results/?terms=michigan&format=json";
async function getData(page) {
  const response = await fetch(`${requestPage}&page=${page}`);
  const data = await response.json();
  return data.items;
}
async function main() {
  let currentPage = 1;
  const postsData = await getData(currentPage);
  console.log(postsData);
  let rows = 10;
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
      const data = getData(page)
        .then(displayList(postsData, rows, page))
        .catch((err) => console.log(err));
      console.log(data);
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
// function howMuchILoveYou(nbPetals) {
//   let arr = [
//     "I love you",
//     "a little",
//     "a lot",
//     "passionately",
//     "madly",
//     "not at all",
//   ];
//   for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i].indexOf());
//   }
// }
// howMuchILoveYou();
//========================================================================================================================================================
// async function getData() {
//   const response = await fetch(requestPage);
//   const data = await response.json();
//   return data.items;
// }
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
//   console.log(key);
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
//========================================================================================================================================================

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
//========================================================================================================================================================

// function hasSurvived(attackers, defenders) {
//   let att = 0;
//   let def = 0;
//   for (let i = 0; i < attackers.length || i < defenders.length; i++)
//     if (attackers[i] > defenders[i] || defenders[i] == undefined) {
//       att++;
//     } else if (attackers[i] < defenders[i] || attackers[i] == undefined) {
//       def++;
//     }

//   console.log(att);
//   console.log(def);
//   if (att > def) {
//     return false;
//   }
//   if (att == def) {
//     let sumAtt = attackers.reduce((a, c) => a + c, 0);
//     let sumDef = defenders.reduce((a, c) => a + c, 0);
//     console.log(sumAtt);
//     console.log(sumDef);
//     if (sumDef < sumAtt) {
//       return false;
//     } else if (sumAtt <= sumDef) {
//       return true;
//     }
//   } else {
//     return att < def;
//   }
// }
// console.log(
//   hasSurvived(
//     [25, 20, 32, 41, 25, 94, 24, 14, 48, 57],
//     [65, 30, 34, 74, 2, 4, 90, 5, 4, 6]
//   )
// );
//========================================================================================================================================================

// async function sendRequest() {
//   return fetch(requestPage)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     });
// }
// let requestUrl = "https://jsonplaceholder.typicode.com/posts";
//========================================================================================================================================================
// function sumTwoSmallestNumbers(numbers) {
//   let arr = numbers.sort((a, b) => a - b);
//   console.log(arr);
//   return arr[0] + arr[1];
// }
// sumTwoSmallestNumbers([10, 12, 3, 5, 10, 2, 45]);
