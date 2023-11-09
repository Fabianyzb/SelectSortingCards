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

// generar simbolo aleatorio
let generateRandomSuit = () => {
  let suit = ["diamond", "spade", "heart", "club"];
  // SELECCIONAR SIMBOLO
  let indexSuit = Math.floor(Math.random() * suit.length);
  return suit[indexSuit];
};

// convertir valores de cartas
function convertCardValue(value) {
  switch (value) {
    case "1":
      return "A";
    case "11":
      return "J";
    case "12":
      return "Q";
    case "13":
      return "K";
    default:
      return value;
  }
}

// func para generar cartas aleatorias y mostrarlas en el contenedor
let generateRandomCards = () => {
  const numCards = parseInt(document.getElementById("num-cards").value, 10);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  for (let i = 0; i < numCards; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add(generateRandomSuit());
    const randomNumber = generateRandomNumber();
    card.innerHTML = convertCardValue(randomNumber); // Aplicar la conversión
    cardContainer.appendChild(card);
  }
};

// func para ordenar las cartas usando el algoritmo de selección y mostrar los cambios
function sortAndShowChanges() {
  const cardsContainer = document.getElementById("card-container");
  const cards = Array.from(cardsContainer.querySelectorAll(".card"));
  const cambiosDificilesContainer = document.getElementById(
    "cambios-dificiles-container"
  );

  cambiosDificilesContainer.innerHTML = ""; // Limpia registro

  function selectionSortWithChanges(cards) {
    const n = cards.length;
    let step = 0;

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

        // Clonar cartas para mostrar etapas
        const clonedCards = cards.map(card => card.cloneNode(true));

        // Agregar el número de etapa y las cartas al registro horizontal
        step++;
        const stepLabel = document.createElement("span");
        stepLabel.innerText = `PASO ${step}: `;
        cambiosDificilesContainer.appendChild(stepLabel);
        clonedCards.forEach(clonedCard => {
          cambiosDificilesContainer.appendChild(clonedCard);
        });

        //SEPARADOR
        const separator = document.createElement("span");
        separator.innerText = " | ";
        cambiosDificilesContainer.appendChild(separator);
      }
    }
  }

  selectionSortWithChanges(cards);
}
