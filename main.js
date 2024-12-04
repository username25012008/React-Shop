let allBtn = document.querySelectorAll(".btn_section");
allBtn[0].classList.remove("bg-[#262626]");
allBtn[0].classList.add("bg-[#6335D8]");
allBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        allBtn.forEach((button) => {
            button.classList.remove("bg-[#6335D8]")
            button.classList.add("bg-[#262626]")
        })
        btn.classList.remove("bg-[#262626]")
        btn.classList.add("bg-[#6335D8]")
    })
})
let allBtn_two = document.querySelectorAll(".btn_section_two");
let img_two = document.querySelector(".img2")
allBtn_two[0].classList.remove("border-[#333333]", "bg-[#262626]")
allBtn_two[0].classList.add("border-[#6335D8]", "bg-[#121212]")

allBtn_two.forEach((btn) => {
    btn.addEventListener("click", () => {
        allBtn_two.forEach((button) => {
            button.classList.remove("border-[#6335D8]", "bg-[#121212]")
            button.classList.add("border-[#333333]", "bg-[#262626]")
        })
        btn.classList.remove("border-[#333333]", "bg-[#262626]")
        btn.classList.add("border-[#6335D8]", "bg-[#121212]")
    })
})