let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// ✅ Shows the correct initial data - 3 marks
let allproduct=[];
function fetchdata() {
  fetch("http://localhost:3000/pitches")
    .then((res) => res.json())
    .then((data) => {
      allproduct=data
      Cardlist(data)
    })
    .catch((err) => console.log(err));
}

fetchdata();

function Cardlist(data){
  let cardlist = `
  <div class="card-list">
  ${data.map((el) =>
    Card(el.title, el.price, el.founder, el.category, el.image, el.id)
  )}
  </div>
  
  `;
  mainSection.innerHTML = cardlist;
}

function Card(title, price, founder, category, image, id) {
  let card = `
    <div class="card" data-id=${id}>
      <div class="card-img">
        <img src=${image} alt="">
      </div>
      <div class="card-body">
        <h4 class="card-title">${title}</h4>
        <p class="card-founder">Founder:${founder}</p>
        <p class="card-category">${category}</p>
        <p class="card-price">${price}</p>
        <a href="#" data-id=${id} class="card-link">Edit</a>
        <button data-id=${id} class="card-button">Delete</button>
        <button data-id=${id} class="Add-cart-button">Add To Cart</button>
      </div>
    </div>
    
    `;
  return card;
}

// ✅ Able to add new pitch - 2 marks

pitchCreateBtn.addEventListener("click", () => {
  let singleproduct = {
    title: pitchTitleInput.value,
    price: pitchPriceInput.value,
    founder: pitchfounderInput.value,
    category: pitchCategoryInput.value,
    image: pitchImageInput.value,
  };

  fetch("http://localhost:3000/pitches", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(singleproduct),
  })
    .then((res) => alert("Product added succesfully"))
    .catch((err) => alert("Something went Wrong"));
});

// ✅ Able to delete a pitch - 2 marks

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("card-button")) {
    DeletePitch(event.target.dataset.id);
  }
});

function DeletePitch(id) {
  fetch(`http://localhost:3000/pitches/${id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

// ✅ Able to edit all fields of the pitch - 2 marks

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("card-link")) {
    console.log(e.target.dataset.id)
    PopluateForm(e.target.dataset.id);
  }
});

// Populate
function PopluateForm(id) {
  fetch(`http://localhost:3000/pitches/${id}`)
    .then((res) => res.json())
    .then((data) => {
      updatePitchIdInput.value = data.id;
      updatePitchTitleInput.value = data.title;
      updatePitchImageInput.value = data.image;
      updatePitchfounderInput.value = data.founder;
      updatePitchCategoryInput.value = data.category;
      updatePitchPriceInput.value = data.price;
    })
    .catch((err) => console.log(err));
}

updatePitchBtn.addEventListener("click", () => {
  let data = {
    image: updatePitchImageInput.value,
    price: updatePitchPriceInput.value,
    category: updatePitchCategoryInput.value,
    title: updatePitchTitleInput.value,
    id: updatePitchIdInput.value,
    founder: updatePitchfounderInput.value,
  };

  fetch(`http://localhost:3000/pitches/${updatePitchIdInput.value}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => alert("data Update ..."))
    .catch((err) => alert("Smothing went wrong"));
});

// Add To cart

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("Add-cart-button")) {
    let id = event.target.dataset.id;

    fetch(`http://localhost:3000/pitches/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // post data in cart

        fetch("http://localhost:3000/cartpage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((result) => alert("Data added into card"))
          .catch((err) => alert("Someting went wrong"));
      })
      .catch((err) => console.log(err));
   }
});


sortAtoZBtn.addEventListener("click", ()=>{
  let sortdata=allproduct.sort((a,b)=>a.price-b.price)
  Cardlist(sortdata)
  })
  
  sortZtoABtn.addEventListener('click',()=>{
      let sortdata=allproduct.sort((a,b)=>b.price-a.price)
  Cardlist(sortdata)
  })
  
  filterFood.addEventListener('click',()=>{
      let filterdata=allproduct.filter((el,i)=>el.category=="Food")
       Cardlist(filterdata)
      console.log(filterdata)
  
  })
  
  filterElectronics.addEventListener('click',()=>{
      let filterdata=allproduct.filter((el,i)=>el.category=="Electronics")
       Cardlist(filterdata)
      console.log(filterdata)
  
  })
  
  filterPersonalCare.addEventListener('click',()=>{
      let filterdata=allproduct.filter((el,i)=>el.category=="Personal Care")
       Cardlist(filterdata)
      console.log(filterdata)
  
  })