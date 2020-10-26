const input = document.getElementById("Name");
const content = document.getElementById("text");
const button = document.getElementById("post");
const posts = document.getElementById("myId");
const press = document.getElementById("post");
const proxy = 'https://cors-anywhere.herokuapp.com/';

function getData() {
  fetch(`https://t-m-a.herokuapp.com/`)
    .then((res) => res.json())
    .then((data) => {
      const count = data.length;
      for (let i = 0; i < count; i++) {
        posts.innerHTML += `<h1>${data[i].name}</h1>
        <p>${data[i].content}</p> 
        ${data[i].timeAndDate}
        <br>
        <br>
        `;
      }
    });
}

getData();

function update() {
  posts.innerText = '';
  getData();
}

function putData() {
  let d = new Date();
  if (!input.value) return alert('supply a name');
  if (!content.value) return alert('supply text');
  const send = {
    name: input.value,
    content: content.value,
    timeAndDate:  d.getDate() + " | " + d.getMonth() + " | " + d.getFullYear() + " Time: " + d.getHours()%12 + ":" + d.getMinutes(),
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(send),
  };
  fetch(`${proxy}https://t-m-a.herokuapp.com/`, options)
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      update();
    });
}

press.addEventListener("click", () => {
  putData();
  input.value = '';
  content.value = '';
  update();
});

var overlay = document.getElementById("overlay");

window.addEventListener('load', function(){
  overlay.style.display = 'none';
});