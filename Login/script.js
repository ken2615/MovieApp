const links = document.querySelectorAll(".link");
const forms = document.querySelector(".forms");

links.forEach (link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        forms.classList.toggle("show-signup");
    })
})