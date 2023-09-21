/* Initial console.log to check if js file is connected */
console.log('%c HI', 'color: firebrick')

/* Event that will run functionality when HTML is fully loaded */
document.addEventListener("DOMContentLoaded", () => {
    /* Global variables */
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const dogImageContainer = document.querySelector("#dog-image-container");
    const dogBreeds = document.querySelector("#dog-breeds");
    const breedDropdown = document.querySelector("#breed-dropdown");
    let allBreeds = [];
    let bool = true;
    /* Empty the value of the dropdown so that its functionality works on the first selection */
    breedDropdown.value = "";
    
    /* Function that will change the font color on the element attached to the event that called the function */
    const highlightBreed = (e) => {
        e.target.style.color = "firebrick"
    }

    /* Function that takes a url as an argument, creates a image with the url as its src value, and appends image element to the page */
    const displayImage = (dogImageUrl) => {
        const img = document.createElement("img");
        img.src = dogImageUrl;
        img.alt = "Dog image";
        dogImageContainer.append(img);
    }

    /* Function that takes an array as an argument and, if the array is not empty, will iterate through the array, creates an li for each index of the array, and uses the value at each index of the array for the li's textContent */
    const listBreeds = (breedArr) => {
        if (breedArr.length > 0) {
            breedArr.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                li.addEventListener("click", highlightBreed);
                dogBreeds.append(li);
                /* If the value of bool is true, will push the value of each index of the array into 'allBreeds' to gather all dogs to be used in later functionality */
                if (bool) {
                    allBreeds.push(item);
                }
            })
        }
    }

    /* Function that takes a url and a function as arguments and performs a GET request. Two fetches were necessary for this assignment, so I coded this in a versatile way to be able to return different data types for both calls */
    const getData = (url, func) => {
        fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw (response.statusText);
            }
        })
        .then(data => {
            /* If 'data' is an array */
            if (Array.isArray(data.message)) {
                /* Use an array iteration to call the function on each index of 'data' */
                data.message.forEach(item => {
                    func(item);
                });
            } else {
                /* Else clear out the ul 'dogBreeds' */
                dogBreeds.innerHTML = "";
                /* Use an object iteration on each property of 'data' */
                for (let each in data.message) {
                    func(data.message[each]);
                }
                /* Set 'bool' to false so 'allBreeds' does not effected by future 'listBreeds' function calls. Research Sets */
                bool = false;
            }

        })
        /* Catch any errors not caught by earlier 'response.ok' conditional */
        .catch(err => alert(err))
    }
    /* Call function to display the dog images */
    getData(imgUrl, displayImage);
    /* Call function to display the dog breeds */
    getData(breedUrl, listBreeds);

    /* Change event listener on the dropdown 'breedDropdown'  */
    breedDropdown.addEventListener("change", () => {
        /* Create a new array from 'allBreeds' with only the breeds that start with the letter the user selects in dropdown 'breedDropdown' */
        let newArr = allBreeds.filter(item => {
            /* Ternary - return the value of the index or nothing if the first letter of the index value is equal to the dropdown selection */
            return item ? item[0].toLowerCase() === breedDropdown.value : null;
        })
        /* Clear out the ul 'dogBreeds' */
        dogBreeds.innerHTML = "";
        /* Call 'listBreeds' on 'newArr' */
        listBreeds(newArr);
    })
})