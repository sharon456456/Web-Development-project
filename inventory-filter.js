// Must exist on page
const input = document.querySelector(".search input");
const goBtn = document.querySelector(".go-btn");

// Safety check
if (!input || !goBtn) {
  console.error("Filter init failed: elements not found");
}

goBtn.addEventListener("click", filterCards);

function filterCards() {

  const keyword = input.value.trim().toLowerCase();

  document.querySelectorAll(".card-item").forEach(card => {

    const name = card.querySelector("p")
      .innerText
      .trim()
      .toLowerCase();

    card.style.display =
      !keyword || name.startsWith(keyword)
        ? "block"
        : "none";

  });
}

