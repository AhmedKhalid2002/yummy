// * SELECT ELEMENT HTML
let navLink=document.querySelectorAll(".nav_link li a");
let sections=document.querySelectorAll("[data-sec]");
let category=document.getElementById('category_row');
let area=document.getElementById('area_row');
let ingredients=document.getElementById('ingredients_row');
let showData=document.getElementById('Data');
let searchName=document.getElementById('searchName');
let searchFirstLetter=document.getElementById('searchFirstLetter')
let inputName=document.getElementById('inputName')
let inputEmail=document.getElementById('inputEmail')
let inputPhone=document.getElementById('inputPhone')
let inputAge=document.getElementById('inputAge')
let inputPassword=document.getElementById('inputPassword')
let inputRePassword=document.getElementById('inputRePassword')
let submit=document.getElementById('submit')
// & regex

let nameReg=/^[a-zA-Z]{3,}$/;
let emailReg=/^[A-Za-z0-9]{1,}@(gmail|yahoo)\.com$/;
let phoneReg=/^01[0125][0-9]{8}$/;
let ageReg=/^[0-9]{1,2}$/;
let passwordReg=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;



for(let i=0;i<navLink.length;i++){
    navLink[i].addEventListener("click",function(){
        for(let i=0;i<sections.length;i++){
            showData.innerHTML=''
            sections[i].classList.replace("d-block",'d-none');
        }
        sections[i].classList.replace("d-none","d-block");
    });
}

// ^ submit disp


// ^ Api

function displayMeals(arrItem){
    let mealContainer=``;
    for(let i=0;i< arrItem.length; i++){
        mealContainer+=`
        <div class="col-md-3">
            <div class="item"  onclick="getMealDetails('${arrItem[i].idMeal}')">
                <img src="${arrItem[i].strMealThumb}" class="w-100" alt="">
                <div class="text w-100 text-center border rounded-2 d-flex justify-content-center align-items-center">
                    <h2>${arrItem[i].strMeal}</h2>
                </div>
            </div>
        </div>
        
        `;
    }
    showData.innerHTML=mealContainer;
}

//^ Category

async function getCategories(){
  
    let http=await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let response=await http.json();
    displayCategories(response.categories)
};

getCategories()

function displayCategories (arrItem){
    
    let categoryContainer=``;
    for(let i=0;i<arrItem.length;i++){
        categoryContainer+=`
        <div class="col-lg-3 col-md-4">
                        <div class="item" onclick="getCategoryMeal('${arrItem[i].strCategory}')">
                            <img src="${arrItem[i].strCategoryThumb}" >
                            <div class="text  text-center border rounded-2">
                                <h2>${arrItem[i].strCategory}</h2>
                                <p>${arrItem[i].strCategoryDescription }</p>
                            </div>
                        </div>
                    </div>
        `
    }
    category.innerHTML=categoryContainer;
}

//^ Area
async function getArea(){
    let http= await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    let response= await http.json();
    displayArea(response.meals)
}
getArea()
function displayArea (arrItem){
    let areaContainer=``;
    for(let i=0;i<arrItem.length;i++){
        areaContainer+=`
        <div class="col-lg-3 col-md-4 text-center">
            <div class="item text-white" onclick="getAreaMeal('${arrItem[i].strArea}')">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${arrItem[i].strArea}</h3>
                </div>
        </div>
        `
    }
    area.innerHTML=areaContainer;
}
//^ ingredient
async function getingredient(){
    let http=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let response=await http.json();
    displayIngredient(response.meals.slice(0, 25))
}
getingredient()
function displayIngredient (arrItem){
    let ingredientContainer=``;
    for(let i=0;i<arrItem.length;i++){
        ingredientContainer+=`
        <div class="col-lg-3 col-md-4">
            <div class="item text-white text-center" onclick="getIngredientMeal('${arrItem[i].strIngredient}')">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${arrItem[i].strIngredient}</h3>
                <p>${arrItem[i].strDescription.split(" ").slice(0,30).join(" ")}</p>
            </div>
        </div>
        `
    }
    ingredients.innerHTML=ingredientContainer;
}


//^ Category Meal

async function getCategoryMeal(category){
    showData.innerHTML=''
    let http= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let response= await http.json();
    for(let i=0;i<sections.length;i++){
        sections[i].classList.replace('d-block','d-none');
    }
    displayMeals(response.meals);
}
async function getAreaMeal(area){
    showData.innerHTML=''
    let http= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let response= await http.json();
    for(let i=0;i<sections.length;i++){
        sections[i].classList.replace('d-block','d-none');
    }
    displayMeals(response.meals);
}
async function getIngredientMeal(ing){
    showData.innerHTML=''
    let http= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`);
    let response= await http.json();
    for(let i=0;i<sections.length;i++){
        sections[i].classList.replace('d-block','d-none');
    }
    displayMeals(response.meals);
}

async function getMealDetails(id){
    let http=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let response=await http.json();
    displaymealDetail(response.meals[0])
}
function displaymealDetail(m){
    let ingredient=``;
    for(let i=0;i<=20;i++){
        if(m[`strIngredient${i}`]){
            ingredient+=`
                <li class="alert alert-info m-2">${m[`strMeasure${i}`]} ${m[`strIngredient${i}`]}</li>
        `
        } 
    }
    let tags=m.strTags?.split(',');
    if(!tags){
        tags=[];
    }
    let tagInfo='';
    for(let i=0 ;i<tags.length;i++){
        tagInfo+=`
        <li class='alert alert-danger m-2 w-25 text-center'>${tags[i]}</li>
        `
    }
    let mealDetailContainer=`
    <div class="col-md-4">
    <div class="img_text">
        <img src="${m.strMealThumb}" alt="" class="rounded-2 w-100">
        <h2 class="text-center text-white mt-2">${m.strMeal}</h2>
    </div>
</div>
<div class="col-md-8">
    <div class="content_info text-white">
        <h2>Instructions</h2>
        <p>${m.strInstructions}</p>
        <div class="detail">
            <h2>Area : ${m.strArea}</h2>
            <h2>Category :  ${m.strCategory}</h2>
            <h2>Recipes :</h2>
            <div class="details">
                <ul class="d-flex flex-wrap">
                    ${ingredient}
                </ul>
                <h2>tags:</h2>
                <ul>
                ${tagInfo}
                </ul>
                <a target="_blank" href="${m.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" class="btn btn-danger" href="${m.strYoutube}">Youtube</a>
            </div>
        </div>
    </div>
</div>`
showData.innerHTML=mealDetailContainer;
}

async function searchByName(name){
    let http=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let response= await http.json();
    if(response.meals){
        displayMeals(response.meals);
    }else{
        displayMeals([]);
    }
}


async function searchByFirstLetter(first){
    let http=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${first}`);
    let response= await http.json();
    if(response.meals){
        displayMeals(response.meals);
    }else{
        displayMeals([]);
    }
}

function validate(regex,element){
    if(regex.test(element.value)){
        element.nextElementSibling.classList.add('d-none')    
        return true
    }else{
        element.nextElementSibling.classList.remove('d-none')    
        return true;
    }
}
function submitDis(){
if(validate(nameReg ,inputName)&&validate(ageReg , inputAge)&&validate(emailReg, inputEmail)&&validate(phoneReg , inputPhone)&&validate(passwordReg , inputPassword)&&validate(passwordReg , inputRePassword)){
    submit.removeAttribute('disabled')
}else{
    submit.setAttribute('disabled',true)
}
}

// * Event

searchName.addEventListener('input',function(){
    searchByName(searchName.value);
    submitDis()
});
searchFirstLetter.addEventListener('input',function(){
    searchByFirstLetter(searchFirstLetter.value)
    submitDis()
});
inputName.addEventListener('input',function(){
    validate(nameReg , inputName)
    submitDis()
})
inputAge.addEventListener('input',function(){
    validate(ageReg , inputAge)
    submitDis()

})
inputEmail.addEventListener('input',function(){
    validate(emailReg, inputEmail)
    submitDis()
})
inputPhone.addEventListener('input',function(){
    validate(phoneReg , inputPhone)
    submitDis()

})
inputPassword.addEventListener('input',function(){
    validate(passwordReg , inputPassword)
    submitDis()

})
inputRePassword.addEventListener('input',function(){
    if(inputPassword.value==inputRePassword.value){
        validate(passwordReg , inputRePassword);
    }else{
        validate(passwordReg , inputRePassword);
    }
    submitDis()
})


// ^ query syn
let navWidth=$('.nav_links').width();
$('.close').click(()=>{
    $('nav').animate({left:-navWidth},1000);
    $('.open').removeClass('d-none');
    $('.open').addClass('d-block');
    $('.close').removeClass('d-block');
    $('.close').addClass('d-none');
});
$('.open').click(()=>{
    $('nav').animate({left:navWidth - navWidth},1000);
    $('.open').removeClass('d-block');
    $('.open').addClass('d-none');
    $('.close').removeClass('d-none');
    $('.close').addClass('d-block');
});


$('.nav_link li a').click(function(){
    $('nav').animate({left:-navWidth},1000);
    $('.open').removeClass('d-none');
    $('.open').addClass('d-block');
    $('.close').removeClass('d-block');
    $('.close').addClass('d-none');
})
$(document).ready(function(){
    $('#spinner').fadeOut(3000,function(){
        $('body').css('overflow','auto')
    })
})