const sun = document.getElementById("sun") as HTMLSelectElement;
const moon = document.getElementById("moon") as HTMLSelectElement;
const rising = document.getElementById("rising") as HTMLSelectElement;
const suggestions = document.getElementById("suggestions") as HTMLUListElement;


// Here, when the value of sun is changed, we will call the method postAndUpdate.
sun.addEventListener('change', function () {
    console.log("Sun: " + sun.value);
    postAndUpdate();
});

moon.addEventListener('change', function () {
    console.log("Moon: " + moon.value);
    postAndUpdate();
})

rising.addEventListener('change', function () {
    console.log("Rising: " + rising.value);
    postAndUpdate();
})

type MatchesRequestData = {
    sun: string;
    moon: string;
    rising: string;
}

type Matches = {matches: string[];}

function postAndUpdate(): void {
    suggestions.innerHTML = "";

    let postParameters : MatchesRequestData;
    postParameters = {
        sun: sun.value,
        moon: moon.value,
        rising: rising.value
    };

    console.log(postParameters)

    fetch("http://localhost:4567/results" ,{
        method: 'post',
        body: JSON.stringify({
            postParameters
        }),
        headers: {
            "Access-Control-Allow-Origin":"*"
        }
    })
        .then((response) => response.json())
        .then((data) => updateSuggestions(data));
}

function updateSuggestions(matches: string[]): void {
    console.log(matches)
    for (let key in matches) {
        let value = matches[key];
        suggestions.innerHTML += "<li tabindex='0'>" + value + "</li>"
    }

}

const keyFunction = (e:KeyboardEvent) => {
    console.log(e.key)
    switch(e.key) {
        case "r": {
            updateValues( "taurus", "scorpio", "gemini")
            postAndUpdate();
            break;
        }

        default: {
            break;
        }
    }
}

document.addEventListener("keyup", keyFunction)



async function updateValues(sunVal: string, moonVal: string, risingVal: string): Promise<void> {
    // This line asynchronously waits 1 second before updating the values.
    // It's unnecessary here, but it simulates asynchronous behavior you often have to account for.
    await new Promise(resolve => setTimeout(resolve, 1000));
    sun.value = sunVal;
    moon.value = moonVal;
    rising.value = risingVal;
}
