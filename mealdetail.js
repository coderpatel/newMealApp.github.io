let currUrl = document.URL
//console.log(currUrl.split('%20'));
let tempName = currUrl.split('%20')
let fullNameArray = []
for(let i=0;i<tempName.length;i++){
    
    if(i == 0){
        fullNameArray[i] = tempName[i].split('=')[1]
    }
    else{
        fullNameArray[i]=tempName[i]
    }
}

let fullName = fullNameArray.join(' ')


document.getElementById('foodname').innerText = fullName;

let mealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='+fullName

fetch(mealUrl).then(res => { return res.json()}).then((data) =>{
    
        //console.log(mealData)
        //for tags
        if(data.meals[0]["strTags"] != null){
            let tgs = data.meals[0]["strTags"].split(',')
            for(let t in tgs){
                let tags = document.getElementById("tags")
                tags.innerHTML += '<button class="tag">'+tgs[t]+'</button>'
            }
        }
        document.getElementById("dishname").innerText = fullName
        let imageSrc = data.meals[0]["strMealThumb"]
        
        document.getElementById("mealImgDiv").innerHTML = '<img src = '+imageSrc+' class="img-fluid rounded float-right" >'
        let instructions = data.meals[0]["strInstructions"].split('\r\n')
        let instructionList = document.getElementById("instructionList")
        for(let i=0;i<instructions.length;i++){
            let ins = instructions[i].split('.')
            
            for(let j=0;j<ins.length;j++){
                if(j == ins.length-1) continue
                // console.log(isNaN(Number(ins[j])))
                if(!isNaN(Number(ins[j]))) continue
                instructionList.innerHTML += '<li>'+ins[j]+'</li>'
            }
            //console.log("")
        }
})


let isFav = document.getElementById("isFavourite")
if(localStorage.getItem(fullName) != null){
    isFav.innerText = "Remove this dish from Favourites"
}
else{
    isFav.innerText = "Add this dish to Favourites"
}
function changeFavStatus(){
    
    if(localStorage.getItem(fullName) != null){
        localStorage.removeItem(fullName)
        isFav.innerText = "Remove this dish from Favourites"
        window.location.reload();
    }
    else{
        localStorage.setItem(fullName,fullName)
        isFav.innerText = "Add this dish to Favourites"
        window.location.reload();
    }
}

let favList = document.getElementById("favouriteList")

for(let i in localStorage){
    if(localStorage.getItem(i) != null){
        favList.innerHTML += '<li><a href = "mealdetails.html?name=\''+localStorage.getItem(i).toUpperCase()+'\'">'+localStorage.getItem(i)+'</a></li>'
    }
}