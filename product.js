// =============================
//       PRODUCT PAGE LOGIC
// =============================

document.addEventListener("DOMContentLoaded", () => {

    /* ------------------------------
       讀取網址參數
    --------------------------------*/
    const params = new URLSearchParams(window.location.search);
    const sport = params.get("sport") || "soccer";
    const rarity = params.get("rarity") || "gold";

    /* ------------------------------
       取得 DOM
    --------------------------------*/
    const productImg = document.querySelector(".product-img");
    const category = document.querySelector(".category");
    const title = document.querySelector(".title");
    const subtitle = document.querySelector(".subtitle");
    const buyBtn = document.querySelector(".buy-btn");

    /* ------------------------------
       動態設定商品頁內容
    --------------------------------*/
    productImg.src = `src/img/${sport}.png`;
    category.textContent = sport.toUpperCase();
    title.textContent = `${sport.charAt(0).toUpperCase() + sport.slice(1)} ${rarity.charAt(0).toUpperCase() + rarity.slice(1)} Pack`;
    subtitle.textContent = "COLLECTIBLE";
    buyBtn.classList.add(rarity.toLowerCase());

    /* ======================================================
       自動化卡池：你只要填圖片檔名
       (圖片放在 src/img/[sport]/ )
    =======================================================*/

    const cardFiles = {
        soccer: [
            "Antoine Griezmann.jpg",
            "Antoine Griezmann 1.jpg",
            "Christian Pulisic 1.jpg",
            "Christian Pulisic.jpg",
            "Cristiano Ronaldo_epic.jpg",
            "Cristiano Ronaldo 1_epic.jpg",
            "Cristiano Ronaldo 2_epic.jpg",
            "Julian Alvarez.jpg",
            "Kylian Mbappe.jpg",
            "Kylian Mbappe 1.jpg",
            "Kylian Mbappe 2.jpg",
            "Kylian Mbappe 3.jpg",
            "Lamine Yamal.jpg",
            "Lamine Yamal 1.jpg",
            "Lamine Yamal 2.jpg",
            "Lamine Yamal 3.jpg",
            "Lionel Messi_epic.jpg",
            "Lionel Messi 1_epic.jpg",
            "Lionel Messi 2_epic.jpg",
            "Luka Modrić_rare.jpg",
            "Luka Modrić 1_rare.jpg",
            "Luka Modrić 2_rare.jpg",
            "Luka Modrić 3_rare.jpg",
            "Luka Modrić 4_rare.jpg",
            "Mason Mount.jpg",
            "Neymar.jpg",
            "Neymar 1.jpg",
            "Neymar 2.jpg",
            "Pablo Gavi.jpg",
            "Pedro González López.jpg",
            "Pedro González López 1.jpg",
            "Pedro González López 2.jpg",
            "Pedro González López 3.jpg",
            "Pelé.jpg",
            "Pelé 1.jpg",
            "Pelé 2.jpg",
            "Robert Lewandowski_rare.jpg",
            "Robert Lewandowski 1_rare.jpg",
            "Robert Lewandowski 2_rare.jpg",
            "Robert Lewandowski 3_rare.jpg",
            "Zinedine Zidane.jpg",
            "Zinedine Zidane 1.jpg",
            "Zinedine Zidane 2.jpg",
            "Zinedine Zidane 3.jpg",
            "Zinedine Zidane 4.jpg",
            "ya yu yu_epic.jpg",
            "YI_epic.jpg",
        ],
        basketball: [
            "april 1_epic.jpg",
            "bryan_epic.jpg",
            "kobe bryant_rare.jpg",
            "lebron james_rare.jpg",
            "lebron james 1_rare.jpg",
            "lebron james 2_rare.jpg",
            "lebron james 3_rare.jpg",
            "lebron james 4_rare.jpg",
            "michael jordan_epic.jpg",
            "Nikola Jokić.jpg",
            "Nikola Jokić 1.jpg",
            "Nikola Jokić 2.jpg",
            "Nikola Jokić 3.jpg",
            "Nikola Jokić 4.jpg",
            "Stephen Curry_epic.jpg",
            "Stephen Curry 1_epic.jpg",
            "Stephen Curry 2_epic.jpg",
            "teddy_epic.jpg",
        ],
        f1: [
            "Alexander Albon.jpg",
            "Alexander Albon 1.jpg",
            "Alexander Albon 2.jpg",
            "Alexander Albon 3.jpg",
            "Alexander Albon 4.jpg",
            "april_epic.jpg",
            "Carlos Sainz.jpg",
            "Charles Leclerc_rare.jpg",
            "Esteban Ocon.jpg",
            "Fernando Alonso.jpg",
            "Franco Colapinto.jpg",
            "Franco Colapinto 1.jpg",
            "Franco Colapinto 2.jpg",
            "Gabriel Bortoleto.jpg",
            "Gabriel Bortoleto 1.jpg",
            "Gabriel Bortoleto 2.jpg",
            "George Russell.jpg",
            "Isack Hadjar.jpg",
            "Kimi Antonelli_rare.jpg",
            "Kimi Antonelli 1_rare.jpg",
            "Kimi Antonelli 2_rare.jpg",
            "Lance Stroll.jpg",
            "Lance Stroll 1.jpg",
            "Lance Stroll 2.jpg",
            "lewis hamilton_epic.jpg",
            "lewis hamilton 1_epic.jpg",
            "lewis hamilton 2_epic.jpg",
            "Liam Lawson.jpg",
            "Liam Lawson 1.jpg",
            "Liam Lawson 2.jpg",
            "lily_epic.jpg",
            "max verstappen_epic.jpg",
            "Nico Hülkenberg.jpg",
            "Nico Hülkenberg 1.jpg",
            "Nico Hülkenberg 2.jpg",
            "Oliver Bearman.jpg",
            "Oscar Piastri_rare.jpg",
            "Oscar Piastri 1_rare.jpg",
            "Oscar Piastri 2_rare.jpg",
            "Pierre Gasly.jpg",
            "Pierre Gasly 1.jpg",
            "Pierre Gasly 2.jpg",
            "rose_epic.jpg",
            "yuki tsunoda.jpg",
            "yuki tsunoda 1.jpg",
            "yuki tsunoda 2.jpg",

        ]
    };

    /* ======================================================
       依卡包稀有度設定抽卡機率
    =======================================================*/

    const packRates = {
    gold:   { epic: 50, rare: 30, common: 20 },
    silver: { epic: 30,  rare: 50, common: 20 },
    bronze: { epic: 20,  rare: 30, common: 50 }
};


    /* ======================================================
       自動判斷稀有度（依檔名）
    =======================================================*/
    function detectRarity(filename) {
        const lower = filename.toLowerCase();
        if (lower.includes("epic")) return "Epic";
        if (lower.includes("rare")) return "Rare";
        return "Common";
    }
    function getWeightByPack(rarity, packType) {
    const rate = packRates[packType];

    if (rarity === "Epic") return rate.epic;
    if (rarity === "Rare") return rate.rare;
    return rate.common;
}


    /* ======================================================
       自動生成卡池（自動 name、rarity、img、weight）
    =======================================================*/
    function generateCardPool(category, rarityParam) {

    return cardFiles[category].map((file, index) => {

        const cleanName = file
            .replace(/\.(png|jpg|jpeg)/, "")
            .replace(/_epic/i, "")
            .replace(/_rare/i, "")
            .replace(/_/g, " ");

        const rarity = detectRarity(file);

        return {
            id: index + 1,
            name: cleanName,
            rarity: rarity,
            img: `src/img/${category}/${file}`,
            weight: getWeightByPack(rarity, rarityParam)
        };
    });
}


    /* ------------------------------
       生成卡池（自動）
    --------------------------------*/
    const pool = generateCardPool(sport, rarity.toLowerCase());

    /* ------------------------------
       加權抽卡
    --------------------------------*/
    function drawOneCard(pool) {
        const totalWeight = pool.reduce((sum, c) => sum + c.weight, 0);
        let rand = Math.random() * totalWeight;

        for (const card of pool) {
            if (rand < card.weight) return card;
            rand -= card.weight;
        }
        return pool[pool.length - 1];
    }

    /* ------------------------------
        抽卡並存到收藏
    --------------------------------*/
buyBtn.addEventListener("click", () => {

    // 1️⃣ 只抽一次卡
    const card = drawOneCard(pool);

    // 2️⃣ 存入 sessionStorage（不會永久保存）
    let collection = JSON.parse(sessionStorage.getItem("collection")) || [];

    collection.push({
        name: card.name,
        rarity: card.rarity,
        image: card.img
    });

    sessionStorage.setItem("collection", JSON.stringify(collection));

    console.log("📌 Saved to session:", card);

    // 3️⃣ 顯示彈窗（顯示同一張 card）
    showCardPopup(card);
});




    // /* ------------------------------
    //    BUY NOW → 抽卡
    // --------------------------------*/
    // buyBtn.addEventListener("click", () => {
    //     const card = drawOneCard(pool);
    //     showCardPopup(card);
    // });

    /* ======================================================
       抽卡彈窗：光柱 + 稀有度 + 翻牌
    =======================================================*/
    function showCardPopup(card) {
        const popup = document.getElementById("card-popup");
        const nameEl = document.getElementById("popup-card-name");
        const rarityEl = document.getElementById("popup-card-rarity");
        const imgEl = document.getElementById("popup-card-img");
        const beam = document.getElementById("lightbeam");
        const popupContent = document.querySelector(".popup-content");
        const cardInner = document.getElementById("card-inner");

        cardInner.classList.remove("flip");

        nameEl.textContent = card.name;
        rarityEl.textContent = card.rarity;

        rarityEl.className = "";
        popupContent.className = "popup-content";
        beam.className = "";

        if (card.rarity === "Common") {
            rarityEl.classList.add("rarity-common");
            popupContent.classList.add("border-common");
            beam.style.display = "none";
        }

        if (card.rarity === "Rare") {
            rarityEl.classList.add("rarity-rare");
            popupContent.classList.add("border-rare");
            beam.style.display = "block";
            beam.classList.add("big-light", "big-rare");
        }

        if (card.rarity === "Epic") {
            rarityEl.classList.add("rarity-epic");
            popupContent.classList.add("border-epic");
            beam.style.display = "block";
            beam.classList.add("big-light", "big-epic");
        }

        imgEl.src = card.img;

        popup.classList.remove("hidden");

        beam.style.animation = "none";
        void beam.offsetWidth;
        beam.style.animation = "";

        setTimeout(() => {
            cardInner.classList.add("flip");
        }, 400);
    }

    /* ------------------------------
       關閉彈窗
    --------------------------------*/
    document.getElementById("close-popup").addEventListener("click", () => {
        document.getElementById("card-popup").classList.add("hidden");
    });

});
