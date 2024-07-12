/*
let hour = 19;

let name = "Abdul Hadi";

if(hour >= 6 && hour <= 12){
  console.log(`Good Morning ${name}`);
}else if(hour >=13 && hour <= 17){
  console.log(`Good Afternoon ${name}`);
}else{
  console.log(`Good night ${name}`);
}



let age = 170;

const isHolidy = false;

if((age <= 6 || age >= 65)&&(isHolidy != true)){
  console.log(`Discount`);
}else{
  console.log(`No discount`);
}



let num = Math.random();

let result;

if(num < 0.5){
  result="Heads";
}else{
  result="Tails";
}

console.log(result);



function greet(name){
  console.log(`Hello, ${name}`);
}


function convertToFarenheit(celcius){
  farenheit = (celcius * 9/5)+32;
  return farenheit;
}


function convertToCelcius(farenheit){
  celcius = (farenheit - 32)*5/9;
  return celcius;
}


function convertLength(length, from, to){
  if(from === 'km' && to === 'miles'){
    return `${length / 1.6} miles`;
  } else if(from === 'miles' && to === 'km'){
    return `${length * 1.6} km`;
}else if(from === to){
  return `${length} ${to}`;
}

if(from === 'km' && to === 'ft'){
  return `${length *  3281} ft`;
} else if(from === 'miles' && to === 'ft'){
  return `${length * 5280} km`;
}else if(from === to){
return `${length} ${to}`;
}


}

console.log(convertLength(50, 'miles', 'km'));
console.log(convertLength(32, 'km', 'miles'));
console.log(convertLength(50, 'km', 'km'));

*/


//___________________________________________________________________
//===================================================================|
//==============================OBJECTS==============================|
//===================================================================|
//___________________________________________________________________












// function compaerPrice(product1, product2){
  



//     if(product1.price < product2.price){
//       console.log(product2);
//     }else if(product1.price > product2.price){
//       console.log(product1);
//     }



// }

// compaerPrice()

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const close = document.getElementById("close");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinks.classList.add("show");
    hamburger.style.display = "none";
    close.style.display = "block";
  });

  close.addEventListener("click", () => {
    navLinks.classList.remove("show");
    hamburger.style.display = "block";
    close.style.display = "none";
  });
});


// Example JavaScript to fetch apartment data dynamically (if needed)
// This example assumes you have an API endpoint that returns a list of apartments

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://api.example.com/apartments') // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => {
          const featuredSection = document.getElementById('featured-apartments');
          featuredSection.innerHTML = '<h2>Featured Apartments</h2>'; // Clear existing content

          data.forEach(apartment => {
              const apartmentDiv = document.createElement('div');
              apartmentDiv.classList.add('apartment');

              apartmentDiv.innerHTML = `
                  <img src="${apartment.image}" alt="${apartment.name}">
                  <h3>${apartment.name}</h3>
                  <p>${apartment.description}</p>
                  <p><strong>Price:</strong> ${apartment.price}/month</p>
              `;

              featuredSection.appendChild(apartmentDiv);
          });
      })
      .catch(error => console.error('Error fetching apartments:', error));
});


document.getElementById('newsletter-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  
  // Simple form validation
  if (email) {
      alert(`Thank you for subscribing, ${email}!`);
      // You can add more code here to actually handle the subscription, 
      // such as sending the email to your server or an email marketing service.
      document.getElementById('newsletter-form').reset();
  } else {
      alert('Please enter a valid email address.');
  }
});



//responsive navbar
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('#mobile-menu');
  const navbarMenu = document.querySelector('.navbar-menu');

  menuToggle.addEventListener('click', () => {
      if (navbarMenu.classList.contains('active')) {
          navbarMenu.classList.remove('active');
          navbarMenu.classList.add('closing');
          navbarMenu.addEventListener('animationend', () => {
              navbarMenu.classList.remove('closing');
              navbarMenu.style.display = 'none';
          }, { once: true });
      } else {
          navbarMenu.style.display = 'flex';
          navbarMenu.classList.add('active');
      }
  });
});

