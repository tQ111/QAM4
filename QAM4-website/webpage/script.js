let data;

async function init() {
    let link = "https://studious-potato-jj7j4q4wpr5q2j745-8501.app.github.dev";
    let route = "/menu";

    let menuInfo = await fetch(link + route);
    menuData = await menuInfo.json();
 
    let nutritionRes = await fetch(link + "/nutrition");
    nutritionData = await nutritionRes.json();
 
    generateCards(menuData);
}

function generateCards(items){
    let output = document.getElementById("output");
    let build = "";

    for(let i = 0; i < items.length; i++){
        let item = items[i];
        let nutrition = getNutrition(item.itemName);

        let nutritionHTML = "";
        if(nutrition.length > 0){
            let n = nutrition[0];
            nutritionHTML += `<div class="nutrition">`;
            nutritionHTML += `<span>Calories: ${n.calories}</span>`;
            nutritionHTML += `<span>Protein: ${n["protein(g)"]}g</span>`;
            nutritionHTML += `<span>Carbs: ${n["carbs(g)"]}g</span>`;
            nutritionHTML += `<span>Fat: ${n["fat(g)"]}g</span>`;
            nutritionHTML += `</div>`;
        }

        build += `<div class="card" onclick="toggleCard(this)">`;
        build += `<div class="card-summary">`;
        build += `<h3>${item.itemName}</h3>`;
        build += `<span class="price">$${item.price}</span>`;
        build += `</div>`;
        build += `<div class="card-details">`;
        build += `<img src="images/${item.imageText}" alt="${item.itemName}">`;
        build += `<p class="category-tag">${item.categoryName}</p>`;
        build += nutritionHTML;
        build += `</div>`;
        build += `</div>`;
    }

    output.innerHTML = build;
}

function toggleCard(card){
    if(card.className == "card"){
        card.className = "card expanded";
    }else{
        card.className = "card";
    }
}

function filterCards(){
    let search = document.getElementById("searchBox").value;
    let filtered = [];

    for(let i = 0; i < menuData.length; i++){
        let item = menuData[i];
        let nameMatch = item.itemName.indexOf(search) !== -1;
        let categoryMatch = activeCategory == "All" || item.categoryName == activeCategory;
        if(nameMatch && categoryMatch){
            filtered.push(item);
        }
    }

    generateCards(filtered);
}

function filterByCategory(category, btn){
    activeCategory = category;
    let btns = document.getElementsByClassName("filterBtn");
    for(let i = 0; i < btns.length; i++){
        btns[i].className = "filterBtn";
    }
    btn.className = "filterBtn active";
    filterCards();
}

