const modal = document.getElementById("modal")
const modal_open = document.getElementById("modal_open")
const modal_close = document.getElementById("modal_close")

const open = () => {
    modal.classList.add("modal")
    console.log("open")
}

const close = () => {
    modal.classList.remove("modal")
    console.log("closed")
}


modal_open.addEventListener("click", () => open())
modal_close.addEventListener("click", () => close())