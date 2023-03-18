let doc = document;

let mainMeals = doc.getElementById('mainMeals')
let tags = doc.getElementById('tags')
let recipes = doc.getElementById('recipes')

function closeBar(){
    $("#barsClosed").show();
        $("#barsOpen").hide();
        $("#sideBar").animate({left: -200}, 1000);
        $("#sideBar").next().animate({marginLeft: 75}, 1000);

        $("#search").animate({top: 100}, 300);
        $("#categories").animate({top: 100}, 300);
        $("#area").animate({top: 100}, 300);
        $("#Ingredients").animate({top: 100}, 300);
        $("#contacts").animate({top: 100}, 300, function(){
            $("#search").nextAll().hide();
        });
}
$('#bars').click(function(){
    if($("#sideBar").css('left') == "0px"){
        closeBar()

    }
    else{
        $("#barsClosed").hide();
        $("#barsOpen").show();
        $("#sideBar").animate({left: 0}, 1000);
        $("#sideBar").next().animate({marginLeft: 275}, 1000);
        $('#search').show().animate({top:0}, 300,function(){
            $("#categories").show().animate({top: 0}, 300, function(){
                $("#area").show().animate({top: 0}, 300, function(){
                    $("#Ingredients").show().animate({top: 0}, 300, function(){
                        $("#contacts").show().animate({top: 0}, 300);
                    }); 
                });
            });
        })
    }
})


function fetchApi(link, key){
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',`${link}${key}`)
    console.log(`${link}${key}`)
    httpRequest.send()
    httpRequest.addEventListener('readystatechange',function(){
    if(httpRequest.readyState == 4 && httpRequest.status == 200){
        var result = JSON.parse(httpRequest.response);
        console.log( result);
        console.log( result.meals.length);
        let cartona =""
       for(let i =0 ; i < result.meals.length ; i++){
        let mealName = result.meals[i].strMeal;
        let mealImg = result.meals[i].strMealThumb;
        cartona +=`
            <div class=" col " onclick="fetchMeal('${mealName}')">
              <div class=" rounded overflow-hidden position-relative">
              <div class=" overlay d-flex align-items-center p-2">
                <p class=" h3 ">${mealName}</p>
                <p></p>
              </div>
              <img src="${mealImg}" alt="${mealName}" class=" w-100"></div>
            </div>
         `;
       }
       mainMeals.innerHTML = cartona
}
})
}

fetchApi("https://www.themealdb.com/api/json/v1/1/search.php?s=", " ");

$('#searchN').keyup(function(e){
    $("#mainMeals").show()
    console.log($('#searchN').val());
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',`https://www.themealdb.com/api/json/v1/1/search.php?s`)
    httpRequest.send()
    httpRequest.addEventListener('readystatechange',function(){
    if(httpRequest.readyState == 4 && httpRequest.status == 200){
        var result = JSON.parse(httpRequest.response);
        console.log( result);
        console.log( result.meals.length);
        let cartona =""
       for(let i =0 ; i < result.meals.length ; i++){
             let mealName = result.meals[i].strMeal;
            if(mealName.toLowerCase().includes($('#searchN').val().toLowerCase())){
                console.log("yes")
                let mealImg = result.meals[i].strMealThumb;
                cartona +=`
                    <div class=" col " onclick="fetchMeal('${mealName}')">
                        <div class=" rounded overflow-hidden position-relative">
                            <div class=" overlay d-flex align-items-center p-2">
                                <p class=" h3 ">${mealName}</p>
                                <p></p>
                            </div>
                            <img src="${mealImg}" alt="${mealName}" class=" w-100"></div>
                    </div>
            `;
            
        }
        }
        mainMeals.innerHTML = cartona
   }
       
    })
});

 $('#searchL').keyup(function(e){
    $("#mainMeals").show()
    console.log($('#searchL').val());
    let input = $('#searchL').val().toLowerCase();
    if(input == ""){
        input = "a"
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',`https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`)
    httpRequest.send()
    httpRequest.addEventListener('readystatechange',function(){
    if(httpRequest.readyState == 4 && httpRequest.status == 200){
        var result = JSON.parse(httpRequest.response);
        console.log( result);
        console.log( result.meals.length);
        let cartona =""
       for(let i =0 ; i < result.meals.length ; i++){
             let mealName = result.meals[i].strMeal;
            if(mealName.toLowerCase().includes($('#searchL').val().toLowerCase())){
                // console.log("yes")
                let mealImg = result.meals[i].strMealThumb;
                cartona +=`
                    <div class=" col " onclick="fetchMeal('${mealName}')">
                        <div class=" rounded overflow-hidden position-relative">
                            <div class=" overlay d-flex align-items-center p-2">
                                <p class=" h3 ">${mealName}</p>
                                <p></p>
                            </div>
                            <img src="${mealImg}" alt="${mealName}" class=" w-100"></div>
                    </div>
            `;
            
             }
        }
        mainMeals.innerHTML = cartona
   }
       
 })
});

$('#categories').click(function(){
    closeBar()
    $("#searchBar").hide()
    $("#mainMeals").show()
    $("#contact").hide()
    $("#meal").hide()
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',`https://www.themealdb.com/api/json/v1/1/categories.php`)
    httpRequest.send()
    httpRequest.addEventListener('readystatechange',function(){
    if(httpRequest.readyState == 4 && httpRequest.status == 200){
        var result = JSON.parse(httpRequest.response);
        // console.log( result);
        console.log( result.categories.length);
        let cartona =""
       for(let i =0 ; i < result.categories.length ; i++){
        let mealName = result.categories[i].strCategory;
        let mealImg = result.categories[i].strCategoryThumb;
        let des = result.categories[i].strCategoryDescription;
        cartona +=`           
            <div class=" col " onclick="fetchCat('${mealName}')">
              <div class=" rounded overflow-hidden position-relative">
              <div class=" overlay p-2 overflow-hidden">
                <p class=" h3 ">${mealName}</p>
                <p>${des}</p>
              </div>
              <img src="${mealImg}" alt="${mealName}" class=" w-100"></div>
            </div>
         `;
       }
       mainMeals.innerHTML = cartona
}
})
})
function fetchCat(cat){
    fetchApi('https://www.themealdb.com/api/json/v1/1/filter.php?c=',cat);
}

$('#area').click(function(){
    closeBar()
    $("#searchBar").hide()
    $("#contact").hide()
    $("#meal").hide()
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    httpRequest.send()
    httpRequest.addEventListener('readystatechange',function(){
    if(httpRequest.readyState == 4 && httpRequest.status == 200){
        var result = JSON.parse(httpRequest.response);
        console.log(result);
        let cartona =""
       for(let i =0 ; i < result.meals.length ; i++){
        let areaName = result.meals[i].strArea;
        cartona +=`
            <div class=" col " onclick="fetchArea('${areaName}')">
              <div class=" text-white text-center">
              <i class="fa-solid fa-map-location-dot fs-1"></i>
              <p class=" h3">${areaName}</p>
              </div>
            </div>
         `;
       }
       mainMeals.innerHTML = cartona
       $("#mainMeals").show()
}
})
})
function fetchArea(area){
    fetchApi('https://www.themealdb.com/api/json/v1/1/filter.php?a=',area);
}

$('#Ingredients').click(function(){
    closeBar()
    $("#searchBar").hide()
    $("#contact").hide()
    $("#meal").hide()
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    httpRequest.send()
    httpRequest.addEventListener('readystatechange',function(){
    if(httpRequest.readyState == 4 && httpRequest.status == 200){
        var result = JSON.parse(httpRequest.response);
        console.log(result);
        let cartona =""
       for(let i =0 ; i < result.meals.length ; i++){
        let ingName = result.meals[i].strIngredient;
        // let des = result.meals[i].strDescription;
        cartona +=`
            <div class=" col " onclick="fetchIng('${ingName}')">
              <div class=" text-white text-center" >
              <i class="fa-solid fa-utensils"></i>
              <p class=" h3">${ingName}</p>
              </div>
            </div>
         `;
       }
       mainMeals.innerHTML = cartona
       $("#mainMeals").show()
}
})
})
function fetchIng(ing){
    fetchApi('https://www.themealdb.com/api/json/v1/1/filter.php?i=',ing);
}

function fetchMeal(key){
    $("#mainMeals").hide()
    $("#contact").hide()
    $("#meal").show()
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`)
    console.log(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`)
    httpRequest.send()
    httpRequest.addEventListener('readystatechange',function(){
    if(httpRequest.readyState == 4 && httpRequest.status == 200){
        var result = JSON.parse(httpRequest.response);
        console.log( result);
        $("#inst").text(result.meals[0].strInstructions);
        $("#mealArea").text(result.meals[0].strArea);
        $("#mealCat").text(result.meals[0].strCategory);
        $("#mealImg").attr("src",result.meals[0].strMealThumb);
        let btn1 = `<a href="${result.meals[0].strSource}" target="_blank" class="btn btn-success me-2">Source</a>`
        let btn2 = `<a href="${result.meals[0].strYoutube}" target="_blank" class="btn btn-danger ">Youtube</a>`
        $("#mealLink").append(btn1, btn2); 
           
    let cartona =""
    let i = 1;
    for (let [inkey, invalue] of Object.entries(result.meals[0])) {
            
            if(inkey == `strIngredient${i}`){
                if(invalue == ""){
                    break;
                }
                else{
                    // console.log(inkey, invalue);
                    // console.log(i)
                    for (let [mekey, mevalue] of Object.entries(result.meals[0])) {
                        if(mekey == `strMeasure${i}`){
                            // console.log(mekey, mevalue);
                            cartona +=`<li class=" bg-primary-subtle p-2 rounded-2"><span >${mevalue} </span>${invalue}</li>
                                 `;
                        }
                    }
                    i++;
                    
                }
            }
    }
    recipes.innerHTML = cartona
    let tag = result.meals[0].strTags.split(',');
    // console.log(tag)
    cartona =""
    for(let i = 0 ; i<tag.length;i++){
        cartona += `<li class="bg-danger-subtle p-2 rounded-2">${tag[i]}</li>`
    }
    tags.innerHTML = cartona
    
}
})
}

$('#search').click(function(){
    closeBar();
        
    $("#searchBar").show()
    $("#mainMeals").hide()
    $("#contact").hide()
    $("#meal").hide()
})
$('#contacts').click(function(){
    closeBar()
    $("#searchBar").hide()
    $("#mainMeals").hide()
    $("#meal").hide()
    $("#contact").show()
    
})

// validation
check =[];
$('#uName').keyup(function(){
    let regex = /^[A-Z][a-z]{2,15}[ ][A-Z]{0,1}[a-z]{2,15}$/;
    if (regex.test($('#uName').val()) == true){
        // console.log("true")
        check[0] =1;
        $(this).next().css('display', 'none')
    }else{
        // console.log("false")
        check[0] =0;
        $(this).next().css('display', 'block')
    }
})
$('#email').keyup(function(){
    let regex = /[@](yahoo|gmail)\.com$/;
    if (regex.test($('#email').val()) == true){
        // console.log("true")
        check[1] = 1;
        $(this).next().css('display', 'none')
    }else{
        // console.log("false")
        check[1] = 0;
        $(this).next().css('display', 'block')
    }
})
$('#tel').keyup(function(){
    let regex = /^(002){0,1}01[2015][0-9]{8}$/;
    if (regex.test($('#tel').val()) == true){
        // console.log("true")
        check[2] =1;
        $(this).next().css('display', 'none')
    }else{
        // console.log("false")
        check[2] =0;
        $(this).next().css('display', 'block')
    }
})
$('#age').keyup(function(){
    let regex = /^[1-9][0-9]{0,1}$/;
    if (regex.test($('#age').val()) == true){
        // console.log("true")
        check[3] =1;
        $(this).next().css('display', 'none')
    }else{
        // console.log("false")
        check[3] =0;
        $(this).next().css('display', 'block')
    }
})
$('#pass').keyup(function(){
    let regex = /[\d{1,}\w{1,}]{8,}/;
    if (regex.test($('#pass').val()) == true){
        // console.log("true")
        check[4] =1;
        $(this).next().css('display', 'none')
    }else{
        // console.log("false")
        check[4] =0;
        $(this).next().css('display', 'block')
    }
})
$('#repass').keyup(function(){
    if ($('#repass').val() == $('#pass').val() ){
        // console.log("true")
        check[5] =1;
        $(this).next().css('display', 'none')
    }else{
        // console.log("false")
        check[5] =0;
        $(this).next().css('display', 'block')
    }
})
$('#contact').mouseover(function(){
    // console.log("yes")
    if(check[0]==1 && check[1]==1 && check[2]==1 && check[3]==1 && check[4]==1 && check[5]==1){
        $('#submit').prop("disabled", false);
    }else{
        $('#submit').prop("disabled", true);
    }
})
$('#submit').click(function(){
    $('#submit').prop("disabled", true);
    console.log("hi");
    $('#uName').val("");
    check[0] =0;
    $('#email').val("") 
    check[1] =0;
    $('#tel').val("") 
    check[2] =0;
    $('#age').val("") 
    check[3] =0;
    $('#pass').val("")
    check[4] =0;
    $('#repass').val("")
    check[4] =0;

})

