let count=0
let countEle = 0
let favouritecards = document.getElementById("favouriteCards")
let elem;
for(let meal in localStorage){
    if(localStorage.getItem(meal)!= null){
        
        
        let mealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='+meal
        fetch(mealUrl).then(res => { return res.json()}).then((data) =>{
            if(count == 0){
                //elem.innerHTML=''
                elem = document.createElement('div')
                elem.classList.add("card-group")
                //favouritecards.innerHTML+=elem
            }
            
            let imgSrc = data.meals[0]["strMealThumb"]
            elem.innerHTML += `<div class="card">
            <img class="card-img-top" src="${imgSrc}" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title text-center">${meal}</h5>
            <p class="card-text text-center"><a href="mealdetails.html?name=${localStorage.getItem(meal)}">Click Here to Know More</a></p>
            </div>
            <div class="card-footer text-center">
            <button type="button" class="btn btn-secondary text-center" onclick = "removeItem('${meal.toUpperCase()}')">Remove from Favourites</button>
            </div>
            </div>`
            count++
            countEle++
            console.log(countEle)
            if(count == 3){
                favouritecards.append(elem)
                count = 0
            }
            if(countEle <= localStorage.length && count>0){
                
                favouritecards.append(elem)
            }
        })
        
    }
}

function removeItem(item){
    localStorage.removeItem(item)
    window.location.reload();
}