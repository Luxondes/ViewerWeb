const feed = document.getElementById("feed");

fetch('http://localhost:3000')
    .then(response => response.json())
    .then(data => {
            console.log(data.zip[0]);
            feed.insertAdjacentHTML('beforeend', data);
    })