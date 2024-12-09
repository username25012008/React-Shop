let bar = document.querySelector("#bar")
function noShow(){
    bar.classList.add("translate-y-[-200px]")
}
function show(){
    bar.classList.toggle("translate-y-[-200px]")
}