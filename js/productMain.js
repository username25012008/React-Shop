let cart = []
let badge = document.querySelector("#badge")
let showcart = document.querySelector("#showToCart")
let showDiv = document.querySelector("#showCartDiv")
let cart_btn = document.querySelector("#cart_btn")
let list = document.querySelector("#list")
let loader = document.querySelector("#loader")
let categories_list = document.querySelector("#categories")
let errorMessage = document.querySelector("#errorMessage")
let totalPrice = document.querySelector("#totalPrice")
let check = document.querySelector("#check")
let productDiv = document.querySelector("#productDiv")
let inputFind = document.querySelector("#inputFind")
let allPrice = 0
// let paginate = document.createElement("div")
// paginate.classList.add("flex", "gap-2", "items-center")
// let pagination = document.querySelector("#pagination")
function getProd() {
    fetch(`https://fakestoreapi.com/products`, {
        method: "GET",
    })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            listProd(res)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            loader.classList.add("hidden")
        })
}
getProd()
function listProd(products) {
    list.innerHTML = ""
    products.forEach((prod) => {
        let box = document.createElement("div")
        box.classList.add("col-span-1", "lg:p-7", "p-3", "border", "border-[#262626]", "rounded-xl", "w-full", "justify-center", "flex", "flex-col", "items-center")
        let prod_h1 = document.createElement("h1")
        if (prod.title.split(" ")[2] == "&") {
            prod_h1.textContent = prod.title.split(" ").slice(0, 2).join(" ")
        } else {
            prod_h1.textContent = prod.title.split(" ").slice(0, 3).join(" ")
        }
        prod_h1.classList.add("text-white", "text-xl", "mb-2", "font-semibold")
        let prod_p = document.createElement("p")
        let prod_p_span = document.createElement("span")
        let prod_desc = document.createElement("div")
        prod_desc.classList.add("flex", "gap-1")
        prod_p_span.textContent = "Read More"
        prod_p_span.classList.add("text-white", "text-xs", "font-bold")
        prod_p.textContent = `${prod.description.slice(0, 20)} ...`
        prod_p.classList.add("text-[#999999]", "text-xs")
        let prod_img = document.createElement("img")
        prod_img.src = prod.image
        prod_img.alt = prod.title
        prod_img.classList.add("xl:w-full", "w-[288px]", "rounded-lg", "mb-7", "lg:h-[288px]", "h-[288px]", "duration-150", "easy-in")
        let prod_category = document.createElement("span")
        prod_category.textContent = prod.category
        prod_category.classList.add("bg-[#1A1A1A]", "border", "rounded-full", "border-[#262626]", "text-white", "text-[14px]", "font-semibold", 'py-[9px]', "px-[13px]", "inline-block", "mt-2")
        let prod_price_box = document.createElement("div")
        prod_price_box.classList.add("flex", "justify-between", "items-center", "mt-4", "w-full")
        let prod_price_box_l = document.createElement("div")
        prod_price_box_l.classList.add("flex", "flex-col")
        let prod_price_p1 = document.createElement("p")
        prod_price_p1.textContent = "Price"
        prod_price_p1.classList.add("text-[#999999]", "text-xs")
        let prod_price_p2 = document.createElement("p")
        prod_price_p2.textContent = `$ ${Math.round(prod.price)}`
        prod_price_p2.classList.add("text-white", "text-[18px]", "font-semibold")
        let prod_price_btn = document.createElement("button")
        prod_price_btn.textContent = "Add To Cart"
        prod_price_btn.classList.add("text-[18px]", "bg-[#703BF7]", "text-white", "px-4", "py-1", "rounded-lg", "active:bg-purple/70", "duration-150", "easy-in-out")
        prod_price_btn.setAttribute("onclick", `addToCart(${prod.id})`)
        box.appendChild(prod_img)
        box.appendChild(prod_h1)
        prod_desc.appendChild(prod_p)
        prod_desc.appendChild(prod_p_span)
        box.appendChild(prod_desc)
        box.appendChild(prod_category)
        box.appendChild(prod_price_box)
        prod_price_box.appendChild(prod_price_box_l)
        prod_price_box_l.appendChild(prod_price_p1)
        prod_price_box_l.appendChild(prod_price_p2)
        prod_price_box.appendChild(prod_price_btn)
        list.appendChild(box)
    });
}
async function getCategory() {
    let res = await fetch('https://fakestoreapi.com/products/categories', {
        method: "GET"
    })
    res = await res.json()
        .then((res) => {
            findCategory(res)
        })
}
function findCategory(cat) {
    cat.unshift("all")
    cat.forEach((item, i) => {
        let category_li = document.createElement("li")
        let category_ul = document.createElement("ul")
        category_li.textContent = item
        category_li.classList.add("text-white", "text-[18px]", "px-2", "py-1", "my-2", "cursor-pointer", "bg-gradient-to-r", "from-[#1A1A1A]", "to-transparent")
        category_li.setAttribute("onclick", `filterByCategory("${item}")`)
        let firstElementSet = false
        if (i === 0 && !firstElementSet) {
            category_li.classList.add("border-l-2", "border-[#703BF7]")
            firstElementSet = true
        }
        category_li.addEventListener("click", () => {
            let allCategories = categories_list.querySelectorAll("li");
            allCategories.forEach((li) => {
                li.classList.remove("border-l-2", "border-[#703BF7]");
            });
            category_li.classList.add("border-l-2", "border-[#703BF7]");
        });
        category_ul.appendChild(category_li);
        categories_list.appendChild(category_ul);
    })
}
const filterByCategory = async (category) => {
    let res = await fetch(`https://fakestoreapi.com/products/category/${category}`)
    res = await res.json()
    if (category == "all") {
        getProd()
    } else {
        listProd(res)
    }
}
getCategory()
async function addToCart(params) {
    let res = await fetch(`https://fakestoreapi.com/products/${params}`)
    res = await res.json()
    let filter = cart.find((item) => {
        return item.id == res.id
    })
    if (filter == undefined) {
        cart.push({ ...res, count: 1 })
    } else {
        setTimeout(function () {
            errorMessage.classList.remove("translate-x-[2000px]")
        }, 1);
        setTimeout(function () {
            errorMessage.classList.add("translate-x-[2000px]")
        }, 3000);
    }
    badge.textContent = cart.length
    renderCard(res)
}
function renderCard() {
    if (cart !== 0) {
        cart_btn.classList.remove("hidden")
    }
    showcart.innerHTML = ""
    totalPrice.innerHTML = ""
    cart.forEach((item, id) => {
        allSum()
        let box = document.createElement("div")
        box.classList.add("col-span-1", "lg:p-7", "p-3", "group", "border", "border-[#262626]", "rounded-xl", "sm:w-[330px]", "w-full", "justify-center", "flex", "inline-block", "flex-col", "items-center", "overflow-y-auto")
        let prod_h1 = document.createElement("h1")
        if (item.title.split(" ")[2] == "&") {
            prod_h1.textContent = item.title.split(" ").slice(0, 2).join(" ")
        } else {
            prod_h1.textContent = item.title.split(" ").slice(0, 3).join(" ")
        }
        prod_h1.classList.add("text-white", "text-xl", "mb-2", "font-semibold")
        let prod_p = document.createElement("p")
        let prod_p_span = document.createElement("span")
        let prod_desc = document.createElement("div")
        prod_desc.classList.add("flex", "gap-1")
        prod_p_span.textContent = "Read More"
        prod_p_span.classList.add("text-white", "text-xs", "font-bold")
        prod_p.textContent = `${item.description.slice(0, 20)} ...`
        prod_p.classList.add("text-[#999999]", "text-xs")
        let prod_img = document.createElement("img")
        prod_img.src = item.image
        prod_img.alt = item.title
        prod_img.classList.add("xl:w-full", "w-[288px]", "rounded-lg", "mb-7", "lg:h-[288px]", "h-[250px]")
        let prod_category = document.createElement("span")
        prod_category.textContent = item.category
        prod_category.classList.add("bg-[#1A1A1A]", "border", "rounded-full", "border-[#262626]", "text-white", "text-[14px]", "font-semibold", 'py-[9px]', "px-[13px]", "inline-block", "mt-2")
        let prod_price_box = document.createElement("div")
        prod_price_box.classList.add("flex", "justify-between", "items-center", "mt-4", "w-full")
        let prod_price_box_l = document.createElement("div")
        prod_price_box_l.classList.add("flex", "flex-col")
        let prod_price_p1 = document.createElement("p")
        prod_price_p1.textContent = "Price"
        prod_price_p1.classList.add("text-[#999999]", "text-xs")
        let prod_price_p2 = document.createElement("p")
        prod_price_p2.textContent = `$ ${Math.round(item.price * item.count)}`
        prod_price_p2.classList.add("text-white", "sm:text-[18px]", "text-[14px]", "font-semibold")
        let prod_price_box_r = document.createElement("div")
        prod_price_box_r.classList.add("flex", "gap-1", "text-white", "items-center", "lg:text-[24px]", "md:text-[20px]", "text-base")
        let deleteDiv = document.createElement("div")
        deleteDiv.classList.add("bg-red-600", "sm:w-[45px]", "sm:h-[45px]", "w-[30px]", "h-[30px]", "rounded-lg", "flex", "justify-center", "items-center", "cursor-pointer")
        let removeProd = document.createElement("i")
        removeProd.classList.add("fa-solid", "fa-trash-can")
        deleteDiv.setAttribute("onclick", `deleteProd(${id})`)
        let plus = document.createElement("button")
        plus.textContent = "+"
        plus.classList.add("bg-purple", "sm:w-[45px]", "sm:h-[45px]", "w-[30px]", "h-[30px]", "text-center", "rounded-lg", "font-bold",)
        plus.setAttribute("onclick", `increment(${item.id})`)
        let span = document.createElement("span")
        span.textContent = item.count
        span.classList.add("py-3", "w-[45px]", "font-bold", "text-center")
        let minus = document.createElement("button")
        minus.textContent = "-"
        minus.classList.add("bg-purple", "sm:w-[45px]", "sm:h-[45px]", "w-[30px]", "h-[30px]", "text-center", "rounded-lg", "font-bold",)
        minus.setAttribute("onclick", `discrement(${item.id})`)
        box.appendChild(prod_img)
        box.appendChild(prod_h1)
        prod_desc.appendChild(prod_p)
        prod_desc.appendChild(prod_p_span)
        box.appendChild(prod_desc)
        box.appendChild(prod_category)
        box.appendChild(prod_price_box)
        prod_price_box.appendChild(prod_price_box_l)
        prod_price_box.appendChild(prod_price_box_r)
        prod_price_box_l.appendChild(prod_price_p1)
        prod_price_box_l.appendChild(prod_price_p2)
        deleteDiv.appendChild(removeProd)
        prod_price_box_r.appendChild(deleteDiv)
        prod_price_box_r.appendChild(minus)
        prod_price_box_r.appendChild(span)
        prod_price_box_r.appendChild(plus)
        showcart.appendChild(box)
    })
}
function increment(i) {
    let findProd = cart.find((item) => {
        return item.id === i
    })
    if (findProd.count < findProd.rating.count) {
        findProd.count += 1;
        renderCard()
        allSum()
    }
}
function discrement(i) {
    let findProd = cart.find((item) => {
        return item.id === i
    })
    if (findProd.count > 1) {
        findProd.count -= 1
        renderCard()
        allSum()
    }
}
function deleteProd(i) {
    cart.splice(i, 1)
    renderCard()
    if (cart.length == 0) {
        showDiv.classList.add("translate-y-[-2000px]")
        cart_btn.classList.add("hidden")
    }
    allSum()
}
async function findToProd() {
    let res = await fetch('https://fakestoreapi.com/products')
    res = await res.json()
    filteredByProduct(res)
}
function filteredByProduct(prod) {
    let filteredProduct = prod.filter((item) => {
        return item.title.toLowerCase().includes(inputFind.value.toLowerCase())
    })
    listProd(filteredProduct)
}
function showCart() {
    showDiv.classList.toggle("translate-y-[-2000px]")
}
function noshow() {
    showDiv.classList.add("translate-y-[-2000px]")
}
function noshowtwo() {
    errorMessage.classList.add("translate-x-[2000px]")
}
function allSum() {
    allPrice = cart.reduce((first, item) => {
        return first + item.count * item.price
    }, 0)
    totalPrice.textContent = Math.round(allPrice)
}
function bought() {
    productDiv.classList.add("hidden")
    check.classList.remove("hidden")
    cart_btn.classList.add("hidden")
    cart = []

}
// function render_pagination() {
//     pagination.innerHTML = ""
//     let fragment = document.createDocumentFragment()
//     for (let i = 1; i <= 5; i++) {
//         let btn_pag = document.createElement("button")
//         btn_pag.classList.add("bg-purple", "w-[34px]", "h-[34px]", "rounded-lg", "text-white")
//         btn_pag.textContent = i
//         btn_pag.setAttribute("onclick", `getProd()`)
//         fragment.appendChild(btn_pag)
//     }
//     pagination.appendChild(fragment)
// }
// render_pagination()