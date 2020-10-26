//const request = require('request-promise-native');
const filters = {
    ingredients: "i=",
    fistLetter: "f=",
    name: "s=",
    idCocktail: "i=",
    idIngredient: "iid=",
    category: "c=",
    alcoholic: "a=",
    glass: "g="
};

function sentRequest(method, params) {
    var options ={
        url:"https://www.thecocktaildb.com/api/json/v1/1/" + method + ".php",
        json:true
    }
    
    if(params) {
        options.url += "?" + filters[params.filter] + params.value;
    }

    return new Promise((resolve, reject) =>{
        fetch(options.url).then(rta => {
            resolve(rta.json())
        });
    })
}

function getRandomCocktail() {
    var params = { filter: "random"};
    return sentRequest("random").then(cocktails => cocktails.drinks[0]);
}

function getCocktailFormated(data) {
    return data.map(cocktail => {
        var ingredientsKeys = Object.keys(cocktail).filter(key => {
            return key.indexOf("strIngredient") != -1 && cocktail[key] != null;
        });

        var ingredients = [];
        ingredientsKeys.forEach(ingredient => {
            ingredients.push(cocktail[ingredient]);
        })


        return {
            id: cocktail.idDrink,
            isAlcoholic: cocktail.strAlcoholic == "Alcoholic",
            category: cocktail.strCategory,
            name: cocktail.strDrink,
            ingredients: ingredients,
            picture: cocktail.strDrinkThumb,
            instructions: cocktail.strInstructions
        }
    })
}

export function getListRandomCocktail(amountResult) {
    return new Promise((resolve, reject) => {
        var promises = [];
        for(var i = 0; i < amountResult; i++) {
            promises.push(getRandomCocktail());
        }
        
        Promise.all(promises).then(data => {
            resolve(getCocktailFormated(data));
        }).catch(error => {
            reject();
        })
    });
};

export function getCocktailFilteredName(name) {
    var params = { filter: "name", value: name};
    return new Promise((resolve, reject) => {
        sentRequest("search", params).then(data =>{
            resolve(getCocktailFormated(data.drinks));
        }).catch(error => {
            reject();
        })
    });
}

export function getCocktailById(id) {
    var params = { filter: "idCocktail", value: id};
    return new Promise((resolve, reject) => {
        sentRequest("lookup", params).then(data =>{
            resolve(getCocktailFormated(data.drinks))
        }).catch(error => {
            reject();
        })
    });
}