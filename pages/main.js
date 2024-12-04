let cart = []
let badge = document.querySelector("#badge")
let showcart = document.querySelector("#showToCart")
let showDiv = document.querySelector("#showCartDiv")
let cart_btn = document.querySelector("#cart_btn")
let list = document.querySelector("#list")
let loader = document.querySelector("#loader")
let categories_list = document.querySelector("#categories")
let paginate = document.createElement("div")
paginate.classList.add("flex", "gap-2", "items-center")
let pagination = document.querySelector("#pagination")
function getProd(id = 1) {
    fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${id}`, {
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
        box.classList.add("col-span-1", "p-7", "border", "border-[#262626]", "rounded-xl", "w-full", "justify-center",)
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
        prod_img.src = prod.images[0]
        prod_img.alt = prod.title
        prod_img.classList.add("w-full", "rounded-lg", "mb-7", "object-cover")
        let prod_category = document.createElement("span")
        prod_category.textContent = prod.category.name
        prod_category.classList.add("bg-[#1A1A1A]", "border", "rounded-full", "border-[#262626]", "text-white", "text-[14px]", "font-semibold", 'py-[9px]', "px-[13px]", "inline-block", "mt-2")
        let prod_price_box = document.createElement("div")
        prod_price_box.classList.add("flex", "justify-between", "items-center", "mt-4", "w-full")
        let prod_price_box_l = document.createElement("div")
        prod_price_box_l.classList.add("flex", "flex-col")
        let prod_price_p1 = document.createElement("p")
        prod_price_p1.textContent = "Price"
        prod_price_p1.classList.add("text-[#999999]", "text-xs")
        let prod_price_p2 = document.createElement("p")
        prod_price_p2.textContent = `$ ${prod.price}`
        prod_price_p2.classList.add("text-white", "text-[18px]", "font-semibold")
        let prod_price_btn = document.createElement("button")
        prod_price_btn.textContent = "Add To Cart"
        prod_price_btn.classList.add("text-[18px]", "bg-[#703BF7]", "text-white", "px-4", "py-1", "rounded-lg")
        prod_price_btn.setAttribute("onclick",`addToCart(${prod.id})`)
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
        list.appendChild(paginate)
    });
}
function getCategory() {
    fetch("https://api.escuelajs.co/api/v1/categories?limit=5", {
        method: "GET"
    })
        .then((res) => res.json())
        .then((res) => {
            findCategory(res)
        })
}
function findCategory(cat) {
    cat.forEach((item, i) => {
        let category_li = document.createElement("li")
        let category_ul = document.createElement("ul")
        category_li.textContent = item.name
        category_li.classList.add("text-white", "text-[18px]", "px-2", "py-1", "my-3", "cursor-pointer", "bg-gradient-to-r", "from-[#1A1A1A]", "to-transparent")
        category_li.setAttribute("onclick", `getProd(${item.id})`)
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
getCategory()
function render_pagination() {
    pagination.innerHTML = ""
    let fragment = document.createDocumentFragment()
    for (let i = 1; i <= 5; i++) {
        let btn_pag = document.createElement("button")
        btn_pag.classList.add("bg-purple", "w-[34px]", "h-[34px]", "rounded-lg", "text-white")
        btn_pag.textContent = i
        btn_pag.setAttribute("onclick", `getProd()`)
        fragment.appendChild(btn_pag)
    }
    pagination.appendChild(fragment)
}
render_pagination()
async function addToCart(params) {
    let res = await fetch(`https://api.escuelajs.co/api/v1/products/${params}`)
    res = await res.json()
    cart.push(res)
    console.log(cart);
    badge.textContent = cart.length
    if(cart !== 0){
        cart_btn.classList.remove("hidden")
    }
    showcart.innerHTML = ""
    cart.forEach((item)=>{
        let box = document.createElement("div")
        box.classList.add("col-span-1", "p-7", "border", "border-[#262626]", "rounded-xl", "w-full", "justify-center",)
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
        prod_img.src = item.images[0]
        prod_img.alt = item.title
        prod_img.classList.add("w-full", "rounded-lg", "mb-7", "object-cover")
        let prod_category = document.createElement("span")
        prod_category.textContent = item.category.name
        prod_category.classList.add("bg-[#1A1A1A]", "border", "rounded-full", "border-[#262626]", "text-white", "text-[14px]", "font-semibold", 'py-[9px]', "px-[13px]", "inline-block", "mt-2")
        let prod_price_box = document.createElement("div")
        prod_price_box.classList.add("flex", "justify-between", "items-center", "mt-4", "w-full")
        let prod_price_box_l = document.createElement("div")
        prod_price_box_l.classList.add("flex", "flex-col")
        let prod_price_p1 = document.createElement("p")
        prod_price_p1.textContent = "Price"
        prod_price_p1.classList.add("text-[#999999]", "text-xs")
        let prod_price_p2 = document.createElement("p")
        prod_price_p2.textContent = `$ ${item.price}`
        prod_price_p2.classList.add("text-white", "text-[18px]", "font-semibold")
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
        showcart.appendChild(box)
    })
}
function showCart(){
    showDiv.classList.remove("translate-x-[-4000px]")
}
function noshow(){
    showDiv.classList.add("translate-x-[-4000px]")
}
