/* eslint-disable */
import "bootstrap";
import "./style.css";

window.onload = () => {
  document
    .getElementById("generate-btn")
    .addEventListener("click", generateRandomCards);
  document
    .getElementById("sort-btn")
    .addEventListener("click", sortAndShowChanges);
};

let generateRandomNumber = () => {
  let numbers = [
    "A",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "J",
    "Q",
    "K"
  ];
  let indexNumbers = Math.floor(Math.random() * numbers.length);
  return numbers[indexNumbers];
};

let generateRandomSuit = () => {
  let suit = ["diamond", "spade", "heart", "club"];
  let indexSuit = Math.floor(Math.random() * suit.length);
  return suit[indexSuit];
};

let generateRandomCards = () => {
  const numCards = parseInt(document.getElementById("num-cards").value, 10);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; // Limpiar el contenedor

  for (let i = 0; i < numCards; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add(generateRandomSuit());
    card.innerHTML = generateRandomNumber();
    cardContainer.appendChild(card);
  }
};

function selectionSort(cards) {
  const n = cards.length;

  for (let i = 0; i < n - 1; i++) {
    let min = i;

    for (let j = i + 1; j < n; j++) {
      if (cards[j].innerHTML < cards[min].innerHTML) {
        min = j;
      }
    }

    if (min !== i) {
      const temp = cards[i].innerHTML;
      cards[i].innerHTML = cards[min].innerHTML;
      cards[min].innerHTML = temp;
    }
  }
}

function sortAndShowChanges() {
  const cardsContainer = document.getElementById("card-container");
  const cards = Array.from(cardsContainer.querySelectorAll(".card"));
  const cambiosDificilesContainer = document.getElementById(
    "cambios-dificiles-container"
  );

  cambiosDificilesContainer.innerHTML = ""; // Limpiar el registro

  function selectionSortWithChanges(cards) {
    const n = cards.length;
    const changes = []; // Array para almacenar los cambios

    for (let i = 0; i < n - 1; i++) {
      let min = i;

      for (let j = i + 1; j < n; j++) {
        if (cards[j].innerHTML < cards[min].innerHTML) {
          min = j;
        }
      }

      if (min !== i) {
        // Guardar los cambios: tarjeta en posición i intercambiada con tarjeta en posición min
        changes.push({ from: i, to: min });
        const temp = cards[i].innerHTML;
        cards[i].innerHTML = cards[min].innerHTML;
        cards[min].innerHTML = temp;
      }
    }

    return changes; // Devolver el array de cambios
  }

  const cambiosDificiles = selectionSortWithChanges(cards);

  cambiosDificiles.forEach((cambio, index) => {
    const cambioDiv = document.createElement("div");
    cambioDiv.textContent = `Cambio ${index + 1}: Mover carta desde posición ${
      cambio.from
    } a posición ${cambio.to}`;
    cambiosDificilesContainer.appendChild(cambioDiv);
  });

  // Agregar las cartas al registro
  const cartasDiv = document.createElement("div");
  cartasDiv.classList.add("registro-cartas");
  cards.forEach(card => {
    cartasDiv.appendChild(card.cloneNode(true));
  });
  cambiosDificilesContainer.appendChild(cartasDiv);
}
