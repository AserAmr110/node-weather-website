console.log("Client side javascript file is loaded ! ");

// fetch("http://localhost:3000/weather?address=!")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log("the returned data", data);
//     console.log(data.address);
//     console.log(data.forecast);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = "from java script";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'loading...'
  messageTwo.textContent = ''
  
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          messageTwo = ''
        } else {
          messageOne.textContent = data.address;
          messageTwo.textContent = data.forecast
        }
      });
    },
  );
});
