const modal = document.getElementById("modal")
const modal_open = document.getElementById("modal_open")
const modal_close = document.getElementById("modal_close")

const open = () => {
    modal.classList.add("modal")
}

const close = () => {
    modal.classList.remove("modal")
}


modal_open.addEventListener("click", () => open())
modal_close.addEventListener("click", () => close())