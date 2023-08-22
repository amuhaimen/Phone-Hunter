const loadPhones = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data);
};

const displayPhones = (phones) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerText = "";

  //display 9 phones only
  phones = phones.slice(0, 9);

  //no found message
  const noPhone = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  phones.forEach((phone) => {
    console.log(phone);
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
     <div class="card p-5">
     <img src="${phone.image}" class="card-img-top " alt="..." />
     <div class="card-body">
       <h5 class="card-title"> ${phone.phone_name}</h5>
       <p class="card-text">
         This is a longer card with supporting text below as a natural
         lead-in to additional content. This content is a little bit
         longer.
       </p>
     </div>
     `;
    phonesContainer.appendChild(phoneDiv);
  });
  toggleSpinner(false);
};

document.getElementById("search-btn").addEventListener("click", function () {
  toggleSpinner(true);
  const searchFeild = document.getElementById("search-feild");
  const searchText = searchFeild.value;
  loadPhones(searchText);
  searchFeild.value = "";
});

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

loadPhones("apple");
