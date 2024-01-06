const inputEl = document.getElementById("input");
const title = document.getElementById("title");
const meaning = document.getElementById("meaning");
const audio = document.getElementById("audio");
const textInfo = document.querySelector(".text-info");
const dictDetails = document.querySelector(".dict-details");






async function fetchApi(word) {

    try {

        textInfo.innerText = `searching the meaning of ${word}`
        textInfo.style.display = "block";

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

        const result = await fetch(url).then((res) => res.json() )
        
        if (result.title) {
            dictDetails.style.display = "block";
            textInfo.style.display = "none";
            title.innerText = word ;
            meaning.innerText = "N/A";
            audio.style.display= "none";
        }else {
            title.innerText = result[0].word ;
            meaning.innerText = result[0].meanings[0].definitions[0].definition;
            audio.style.display= "inline-flex";
            audio.src = result[0].phonetics[0].audio;

            textInfo.style.display = "none";
            dictDetails.style.display = "block";
            inputEl.innerText = "";
        }

        

    } catch (error) {
        console.log(error)
        textInfo.innerText = "Opps ! something happened , try again later"
    }
    

}

inputEl.addEventListener("keyup" , (e) => {
    if (e.target.value && e.key === "Enter") {
        fetchApi (e.target.value);
    }
})