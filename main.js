alert("Double click the screen to know the prayer times.");
const wrapperElement = document.querySelector("#wrapper");

window.navigator.geolocation.getCurrentPosition(async success => {

    const lat = success.coords.latitude
    const long = success.coords.longitude
    const tBodyElement = document.querySelector(".tbody")
    const cityElement = document.querySelector(".city");

    let responce = await fetch(`https://api.aladhan.com/v1/timings/calendar?latitude=${lat}&longitude=${long}&method=3&school=1&month=${new Date().getMonth()}&year=${new Date().getFullYear()}`)

    responce = await responce.json();

    cityElement.textContent = `(${responce.data.meta.timezone})`

    for (let data in responce.data.timings) {
        // console.log(data , responce.data.timings[data])
        const trElement = document.createElement("tr")
        const tdNameElement = document.createElement("td")
        const tdTimeElement = document.createElement("td")
        tdNameElement.classList.add("fw-bold")
        tdTimeElement.classList.add("fw-bold")

        tdNameElement.textContent = data;
        tdTimeElement.textContent = responce.data.timings[data];

        trElement.appendChild(tdNameElement);
        trElement.appendChild(tdTimeElement);

        tBodyElement.appendChild(trElement);

    }
}, error => {
    alert("You don't give permission to get location")
})

window.addEventListener("dblclick" , event => {
    wrapperElement.classList.remove("d-none")
})

