let searchTxt = "";//to store the input chracters
let mealsArray = [] // to store the meals
let favourite = []//to store favourite meals
function searchMeal(){
    //let searchTxt = ""
    let ul = document.querySelector('ul.d-flex')
    //let element = document.createElement('li');
    searchTxt = document.getElementById("searchDish").value.toLowerCase();
    //if there is no text, nothing will be displayed also mealsArray will also contain nothing
    if(searchTxt === ''){
        mealsArray = []
        document.getElementById("replacable").innerHTML = ''
    }
    console.log(searchTxt);
    //if there are meals in the mealsArray
    if(mealsArray.length > 0){
        //clerring the screen before appending html elements
        document.getElementById("replacable").innerHTML = ''
        //creating elements to append inside the body
        for(let i=0;i<mealsArray.length;i++){
            if(mealsArray[i].startsWith(searchTxt.toUpperCase())){
                element = document.createElement('li');
                element.classList.add('list-group-item','align-items-center','d-flex')
                let initialChars = searchTxt.toUpperCase();
                let lenInitialChars = initialChars.length;
                let col="white";
                if(localStorage.getItem(mealsArray[i]) != null){
                    col="yellow"
                }
                element.innerHTML = `<a class="btn text-white btn-floating m-1 me-3" onclick="toggleFav('${mealsArray[i].toUpperCase()}')";
                style="background-color: hsl(337, 89%, 26%);" href="#!" role="button"><i class="fa fa-star fa-2x" style="color:
                 ${col}" id="${mealsArray[i]}"></i></a><a class="btn text-black btn-floating m-1 me-3"
                  href="mealdetails.html?name=${mealsArray[i].toUpperCase()}" 
                  target="_blank"><b>${initialChars}</b>${mealsArray[i].substring(lenInitialChars)}</a>`
                //'<a class="btn text-white btn-floating m-1 me-3" onclick="toggleFav()"; style="background-color: hsl(337, 89%, 26%);" href="#!" role="button"><i class="fa fa-star fa-2x" style="color: '+col+'" id='+mealsArray[i]+'></i></a><a class="btn text-black btn-floating m-1 me-3" href="mealdetails.html?name=\''+mealsArray[i].toUpperCase()+'\'" target="_blank"><b>'+initialChars+'</b>'+mealsArray[i].substring(lenInitialChars)+'</a>' 
                //`<a class="btn text-white btn-floating m-1 me-3" onclick="toggleFav(${mealsArray[i]})" style="background-color: hsl(337, 89%, 26%);" href="#!" role="button"><i class="fa fa-star fa-2x" style="color: ${col}" id=${mealsArray[i]}></i></a><a class="btn text-black btn-floating m-1 me-3" href="#" onclick="displayInformation()"><b>${initialChars}</b>${mealsArray[i].substring(lenInitialChars)}</a>`
                //         
                ul.appendChild(element)
            }
        }
    }
    //if there are no elements in the mealsArray
    else{
         //to fetch the details from the api charachter wise
        let url = 'https://www.themealdb.com/api/json/v1/1/search.php?f='+searchTxt
       
        fetch(url).then(res => { return res.json()}).then((data) => {
            if(data.meals != null){
                 for(let i=0;i<data.meals.length;i++){
                    mealsArray.push(data.meals[i].strMeal.toUpperCase())
                    //creating elements to append inside the body
                    element = document.createElement('li');
                    element.classList.add('list-group-item','align-items-center','d-flex')
                    let firstChar="";
                    if(mealsArray[i].length>0){
                        firstChar = mealsArray[i].charAt(0);
                    }
                    let col="white";
                    if(localStorage.getItem(mealsArray[i]) != null){
                        col="yellow"
                    }
                    element.innerHTML = `<a class="btn text-white btn-floating m-1 me-3" onclick="toggleFav('${mealsArray[i].toUpperCase()}')"
                    style="background-color: hsl(337, 89%, 26%);" href="#!" role="button"><i class="fa fa-star fa-2x" style="color:
                     ${col}" id="${mealsArray[i]}"></i></a><a class="btn text-black btn-floating m-1 me-3"
                      href="mealdetails.html?name=${mealsArray[i].toUpperCase()}" 
                      target="_blank"><b>${firstChar}</b>${mealsArray[i].substring(1)}</a>`
                    //'<a class="btn text-white btn-floating m-1 me-3" onclick="toggleFav(\''+mealsArray[i].toUpperCase()+'\')"; style="background-color: hsl(337, 89%, 26%);" href="#!" role="button"><i class="fa fa-star fa-2x" style="color: '+col+'" id=\''+mealsArray[i]+'\'></i></a><a class="btn text-black btn-floating m-1 me-3" href="mealdetails.html?name=\''+mealsArray[i].toUpperCase()+'\'" target ="_blank"><b>'+firstChar+'</b>'+mealsArray[i].substring(1)+'</a>'     
                    //`<a class="btn text-white btn-floating m-1 me-3" onclick="toggleFav(${mealsArray[i]})" style="background-color: hsl(337, 89%, 26%);" href="#!" role="button"><i class="fa fa-star fa-2x" style="color: ${col}" id=${mealsArray[i]}></i></a><a class="btn text-black btn-floating m-1 me-3" href="#" onclick="displayInformation()"><b>${firstChar}</b>${mealsArray[i].substring(1)}</a>`     
                    ul.appendChild(element);
                }
            }
        });
    }
    // searchTxt="";
}


//function to toggle the value of of an element as added to favourite and removed from favourite
function toggleFav(item){
    //remove the item from favourite and make bg color white
    if(localStorage.getItem(item) != null){
       
        localStorage.removeItem(item)
        //favourite = favourite.splice(0,ind+1).concat(favourite.splice(ind))
        let elem = document.getElementById(item)
        elem.style.color = "white"
        deletePopUp()
    }
    else{
        //add item in favourite and make bg color yellow
        localStorage.setItem(item,item)
        let elem = document.getElementById(item)
        elem.style.color = "yellow"
        addPopUP()
    }
}

let popup = document.getElementById("popup")
let deletepopup = document.getElementById("deletepopup")
//to displacy the add pop up
function addPopUP(){
    deletepopup.classList.remove("open-popup")
    popup.classList.add("open-popup")
}

//to display the remove popup
function deletePopUp(){
    popup.classList.remove("open-popup")
    deletepopup.classList.add("open-popup")
}

//to close the popup
function closePopUp(){
    popup.classList.remove("open-popup")
    deletepopup.classList.remove("open-popup")
}

