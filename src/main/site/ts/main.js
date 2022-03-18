"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const rising = document.getElementById("rising");
const suggestions = document.getElementById("suggestions");
// Here, when the value of sun is changed, we will call the method postAndUpdate.
sun.addEventListener('change', function () {
    console.log("Sun: " + sun.value);
    postAndUpdate();
});
moon.addEventListener('change', function () {
    console.log("Moon: " + moon.value);
    postAndUpdate();
});
rising.addEventListener('change', function () {
    console.log("Rising: " + rising.value);
    postAndUpdate();
});
function postAndUpdate() {
    suggestions.innerHTML = "";
    let postParameters;
    postParameters = {
        sun: sun.value,
        moon: moon.value,
        rising: rising.value
    };
    console.log(postParameters);
    fetch("http://localhost:4567/results", {
        method: 'post',
        body: JSON.stringify({
            postParameters
        }),
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
        .then((response) => response.json())
        .then((data) => updateSuggestions(data));
}
function updateSuggestions(matches) {
    console.log(matches);
    for (let key in matches) {
        let value = matches[key];
        suggestions.innerHTML += "<li tabindex='0'>" + value + "</li>";
    }
}
const keyFunction = (e) => {
    console.log(e.key);
    switch (e.key) {
        case "r": {
            updateValues("taurus", "scorpio", "gemini");
            postAndUpdate();
            break;
        }
        default: {
            break;
        }
    }
};
document.addEventListener("keyup", keyFunction);
function updateValues(sunVal, moonVal, risingVal) {
    return __awaiter(this, void 0, void 0, function* () {
        // This line asynchronously waits 1 second before updating the values.
        // It's unnecessary here, but it simulates asynchronous behavior you often have to account for.
        yield new Promise(resolve => setTimeout(resolve, 1000));
        sun.value = sunVal;
        moon.value = moonVal;
        rising.value = risingVal;
    });
}
