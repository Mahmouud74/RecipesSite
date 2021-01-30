$('.intro').show('3',()=>{
    $('.welcome').fadeIn('5')
})
let search = document.getElementById("search");
let recipes =[]
let row =document.getElementById("row");
async function getPasta(term){
let apiRespons = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term.toLowerCase()}`)
apiRespons= await apiRespons.json()
recipes= apiRespons.recipes
console.log(recipes);
console.log(recipes[1].publisher);
let cartoona=``
console.log(recipes.length);
for (let i = 0; i < recipes.length; i++) {
      cartoona+=`<div class="col-md-4 p-1 card"  >
        <div class="item recipes p-2">
        <img class="w-100" src="${recipes[i].image_url}" id="${recipes[i].recipe_id}" alt="yarab">
        <h5 class="title">${recipes[i].title}</h5>
        <p>${recipes[i].publisher}</p>
    </div>
    </div>`;
}
$('#row').html(cartoona);
}

document.getElementById("search").addEventListener("click",()=>{
    let temp = document.getElementById('searchInp').value
    getPasta(temp)
})
let ingredients =[]
async function displayiIngredients(id){
    $('#ingr').hide('2');
    let res=await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
    res = await res.json()
    ingredients = res.recipe;
    console.log(ingredients);
    cartoona = ``;
    cartoonaI=``;   
    for (let i = 0; i < ingredients.ingredients.length; i++) {
        cartoonaI+=`<li>  <li><span class="fa-li "><i class="fas fa-utensils "></i></span>List icons can</li><hr>
        ${ingredients.ingredients[i]}</li>
        `     
    }
    cartoona+=`<div class="col-md-12">
    <h5 class="title">${ingredients.title}</h5>
    <img src="${ingredients.image_url}" alt="" class="mb-3 w-100 rounded-pill ">
    <ul class="fa-ul">${cartoonaI}</ul>
    </div>
    `  
    $('#ingr').html(cartoona);
    $('#ingr').show('2');

}
document.getElementById('row').addEventListener('click',function(e){
    recipeId=e.target.id
    console.log(recipeId);
    if(recipeId!=undefined){
    displayiIngredients(recipeId)
    }   
})