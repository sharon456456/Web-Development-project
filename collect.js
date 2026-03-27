document.addEventListener("DOMContentLoaded", ()=>{

  console.log("✅ collect.js LOADED");

  const grid = document.getElementById("collect-grid");
  const empty = document.getElementById("empty-text");

  if(!grid){
    console.error("❌ collect-grid not found");
    return;
  }

  let collection = [];

  try{
    collection = JSON.parse(
      sessionStorage.getItem("collection")
    ) || [];
  }catch{
    sessionStorage.removeItem("collection");
    collection=[];
  }

  console.log("COLLECTION:", collection);

  if(!collection.length){
    empty.style.display="block";
    return;
  }

  empty.style.display="none";

  grid.innerHTML="";

  collection.forEach(card=>{

    const el = document.createElement("div");
    el.className = "card-item";

    el.innerHTML=`
      <img src="${card.image}">
      <p>${card.name}</p>
      <small>${card.rarity}</small>
    `;

    grid.appendChild(el);

  });
});
