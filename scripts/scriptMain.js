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
const sliderContent = document.getElementById("sliderContent");
let sliders = [];
var petNum = 0;
let width1 = true;
let width2 = false;
let width3 = false;

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
      scrollTo(0, 0)
      body.classList.toggle("scroll");
      burger.classList.toggle("active")
      header.classList.toggle("active");
      nav.classList.toggle("active");
      modalNavBg.classList.toggle("active");



}
let createModal = (pet) => {

      body.classList.toggle("scroll");
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
let appendCard = (pet, slider) => {

      let div = document.createElement("div")
      div.className = "card";
      div.setAttribute("name", pet.name);

      div.innerHTML = `
                                    <img src="${pet.img}" alt="${pet.name}">
                                    <div class="name">${pet.name}</div>
                                    <div class="borderButton">Learn more</div>
                  `;
      slider.append(div)
      cards.push(div);
      cards[cards.length - 1].addEventListener("click", () => {
            createModal(pets[pets.findIndex(el => el.name === div.getAttribute("name"))]);
      })

}
cards.forEach(e => {
      e.addEventListener("click", () => {
            createModal(pets[pets.findIndex(el => el.name === e.getAttribute("name"))])
      })
});

let appendSlider = () => {
      let cardsNum = 3;
      if (window.matchMedia("(max-width: 767px)").matches)
            cardsNum = 1;
      else if (window.matchMedia("(max-width: 1279px)").matches)
            cardsNum = 2;

      let slider = document.createElement("div");
      slider.className = "slider sliderR";
      slider.id = "slider";
      for (let i = 0; i < cardsNum; i++) {
            appendCard(pets[petNum], slider);

            petNum++
            if (petNum == pets.length)
                  petNum = 0;
      }

      sliders.push(slider)
      if (sliders.length > 1) {
            sliders[sliders.length - 2].style.opacity = 0;
      }

      sliderContent.append(slider);
      setTimeout(() => {

            slider.classList.add("active");
            if (sliders.length > 1) {
                  sliders[sliders.length - 2].style.display = "none";
            }
      }, 300);

}


let prepandSlider = () => {
      let cardsNum = 3;
      if (window.matchMedia("(max-width: 767px)").matches)
            cardsNum = 1;
      else if (window.matchMedia("(max-width: 1279px)").matches)
            cardsNum = 2;

      let slider = document.createElement("div");
      slider.className = "slider sliderL";
      slider.id = "slider";
      for (let i = 0; i < cardsNum; i++) {
            appendCard(pets[petNum], slider);

            petNum--
            if (petNum == -1)
                  petNum = pets.length - 1;
      }

      sliders.push(slider)
      if (sliders.length > 1) {
            sliders[sliders.length - 2].style.opacity = 0;
      }

      sliderContent.append(slider);
      setTimeout(() => {

            slider.classList.add("active");
            if (sliders.length > 1) {
                  sliders[sliders.length - 2].style.display = "none";
            }
      }, 300);
}


leftArrow.addEventListener("click", () => {
      prepandSlider()
})
rightArrow.addEventListener("click", () => {
      appendSlider();
})


/* 
let leftCard = 0;
let cardMoveLeft = (e, num, left) => {
      e.style.left = (left * 3) - (num + 1) * left + "px";
      setTimeout(() => {
            e.style.opacity = 1;
      }, 300);

}
rightArrow.addEventListener("click", () => {
      let left = 360;
      let times = 3;
      if (window.matchMedia("(max-width: 767px)").matches) {
            times = 1;
            left = 310;
      }
      else if (window.matchMedia("(max-width: 1279px)").matches) {
            left = 310;
            times = 2;
      }


      cards.forEach(e => {

            e.style.left = getComputedStyle(e).left.replace("px", "") - left * times + "px"
      });

      for (let i = 0; i < times; i++)
            cards[leftCard + i].style.opacity = 0;
      
      setTimeout(() => {
            for (let i = 0; i < times; i++) {
                  cardMoveLeft(cards[leftCard], leftCard-i, left)
                  leftCard++;
                  if (leftCard >= cards.length)
                        leftCard = 0;
            }
      }, 300);

})
let cardMoveRight = async (e, num, left) => {
      e.style.left = (num + 1) * (-1 * left) + "px";
      setTimeout(() => {
            e.style.opacity = 1;
      }, 300);
}
leftArrow.addEventListener("click", () => {
      let left = 360;
      if (window.matchMedia("(max-width: 1279px)").matches)
            left = 310;
      cards.forEach(e => {

            e.style.left = parseInt(getComputedStyle(e).left.replace("px", "")) + left + "px"
      });

      leftCard--;
      if (leftCard == -1)
            leftCard = cards.length - 1;
      cards[leftCard].style.opacity = 0;
      setTimeout(() => {
            cardMoveRight(cards[leftCard], (leftCard), left)

      }, 300);
}) */
burger.addEventListener("click", burgerClick)

navLinks.forEach(e => {
      if (window.matchMedia("(max-width: 767px)").matches)
            e.addEventListener("click", burgerClick)
});

modalNavBg.addEventListener("click", closeModal);
modalBg.addEventListener("click", closeModal);


if (window.matchMedia("(max-width: 767px)").matches) {
      width1 = true;
      width2 = true;
      width3 = false;
      prepandSlider();
}
else if (window.matchMedia("(max-width: 1279px)").matches) {
      width1 = true;
      width2 = false;
      width3 = true;
      prepandSlider();
}
else if (window.matchMedia("(min-width: 1280px)").matches) {

      width1 = false;
      width2 = true;
      width3 = true;
      prepandSlider();
}
setInterval(() => {
      if (window.matchMedia("(max-width: 767px)").matches && width3) {
            width1 = true;
            width2 = true;
            width3 = false;
            prepandSlider();
      }
      else if (window.matchMedia("(max-width: 1279px) and (min-width: 768px)").matches && width2) {
            width1 = true;
            width2 = false;
            width3 = true;
            prepandSlider();
      }
      else if (window.matchMedia("(min-width: 1280px)").matches && width1) {

            width1 = false;
            width2 = true;
            width3 = true;
            prepandSlider();
      }
}, 500);
