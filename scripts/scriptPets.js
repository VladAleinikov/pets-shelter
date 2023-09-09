const burger = document.getElementById("burger");
const header = document.getElementsByTagName("header")[0];
const nav = document.getElementsByClassName("navMenu")[0];
const modalBg = document.getElementById("modalBg");
const modalNavBg = document.getElementById("modalNavBg");
const body = document.querySelector("body");
const navLinks = [...document.querySelectorAll(".nav")];
const popup = document.getElementById("popup");
const cards = [...document.querySelectorAll(".card")];
const leftArrow = document.getElementById("left");
const rightArrow = document.getElementById("right");
const slider = document.getElementById("slider");
const left = document.getElementById("left");
const right = document.getElementById("right");
const toLeft = document.getElementById("toLeft");
const toRight = document.getElementById("toRight");
const numPage = document.getElementById("numPage");



let appendCard = (pet, slider) => {

      let div = document.createElement("div")
      div.className = "card";
      div.setAttribute("name", pet.name);

      div.innerHTML = `
                                    <img src="${pet.img}" alt="${pet.name}">
                                    <div class="name">${pet.name}</div>
                                    <div class="borderButton">Learn more</div>
                  `;
      slider.append(div);

      cards.push(div);

      cards[cards.length - 1].addEventListener("click", () => {
            createModal(pets[pets.findIndex(el => el.name === div.getAttribute("name"))]);
      })

}
if (window.matchMedia("(min-width: 1280px)").matches) {
      for (let i = 0; i < 12; i++) {
            k = i;
            if (i >= 6)
                  k = i - 6;
            for (let j = 0; j < pets.length; j++, k++) {
                  if (k == pets.length)
                        k = 0;

                  if ((j < pets.length / 2 && i < 6) || (j >= pets.length / 2 && i >= 6))
                        appendCard(pets[k], slider);
            }

      }
}
else {
      for (let i = 0; i < 6; i++) {
            k = i;

            for (let j = 0; j < pets.length; j++, k++) {
                  if (k == pets.length)
                        k = 0;
                  
                  appendCard(pets[k], slider);
            }

      }
}

let currentPage = 1;
let maxPage;
let width;
if (window.matchMedia("(max-width: 767px)").matches) {
      maxPage = 16;
      width = 310;
}
else if (window.matchMedia("(min-width: 768px) and (max-width: 1279px)").matches) {
      maxPage = 8;
      width = 620;
}
else if (window.matchMedia("(min-width: 1280px)").matches) {
      maxPage = 6;
      width = 1240;
}

let setPage = (page, width) => {
      cards.forEach(e => {

            e.style.left = (-1 * width * (page - 1)) + "px";
      });
}

left.addEventListener("click", () => {
      if (currentPage == 1)
            return;
      right.classList.remove("disable");
      toRight.classList.remove("disable");
      currentPage--;
      setPage(currentPage, width);
      numPage.innerHTML = currentPage;
      if (currentPage == 1) {
            left.classList.add("disable")
            toLeft.classList.add("disable");

      }
})
right.addEventListener("click", () => {
      if (currentPage == maxPage)
            return;
      left.classList.remove("disable");
      toLeft.classList.remove("disable");
      currentPage++;
      setPage(currentPage, width);
      numPage.innerHTML = currentPage;
      if (currentPage == maxPage) {
            right.classList.add("disable")
            toRight.classList.add("disable");

      }
})
toLeft.addEventListener("click", () => {
      if (currentPage == 1)
            return;
      right.classList.remove("disable");
      toRight.classList.remove("disable");
      currentPage = 1;
      setPage(currentPage, width);
      numPage.innerHTML = currentPage;
      if (currentPage == 1) {
            left.classList.add("disable")
            toLeft.classList.add("disable");

      }
})
toRight.addEventListener("click", () => {
      if (currentPage == maxPage)
            return;
      left.classList.remove("disable");
      toLeft.classList.remove("disable");
      currentPage = maxPage;
      setPage(currentPage, width);
      numPage.innerHTML = currentPage;
      if (currentPage == maxPage) {
            right.classList.add("disable")
            toRight.classList.add("disable");

      }
})

let closeModal = () => {
      popup.classList.remove("active")
      body.classList.remove("scroll");
      burger.classList.remove("active")
      header.classList.remove("active");
      nav.classList.remove("active");
      modalBg.classList.remove("active");
      modalNavBg.classList.remove("active");

      
}
let burgerClick = () => {

      body.classList.add("scroll");
      burger.classList.toggle("active")
      header.classList.toggle("active");
      nav.classList.toggle("active");
      modalNavBg.classList.toggle("active");



}
let createModal = (pet) => {

      body.classList.add("scroll");
      popup.classList.add("active");
      modalBg.classList.add("active");

      popup.innerHTML = `
      <div class="modalClose borderButton" onclick="closeModal()"><img src="../../assets/images/Vector.svg" alt="close"></div>
            <div class="modalWindow">
                  <div class="img"  style="background: url(${pet.img}); background-size: cover;"></div>
                  <div class="content">
                        <div class="name">${pet.name}</div>
                        <div class="breed">${pet.type} - ${pet.breed}</div>
                        <div class="text">${pet.description}</div>
                        <div class="list">
                              <div class="item"><b>Age:</b> ${pet.age}</div>
                              <div class="item"><b>Inoculations:</b> ${pet.inoculations}</div>
                              <div class="item"><b>Diseases:</b> ${pet.diseases}</div>
                              <div class="item"><b>Parasites:</b> ${pet.parasites}</div>
                        </div>
                  </div>

            </div>
            `
}
cards.forEach(e => {
      e.addEventListener("click", () => {
            createModal(pets[pets.findIndex(el => el.name === e.getAttribute("name"))])
      })
});
burger.addEventListener("click", burgerClick)

navLinks.forEach(e => {
      if (window.matchMedia("(max-width: 767px)").matches)
            e.addEventListener("click", burgerClick)
});

modalNavBg.addEventListener("click", closeModal);
modalBg.addEventListener("click", closeModal);
