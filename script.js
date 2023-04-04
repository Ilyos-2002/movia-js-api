let elForm = select("#form")
let elList = select("#list-card")
let elSearch = select("#search");
let elGener = select("#sortbygenre");
let elCardTemplate = select("#card-template");
let elCardTemplates = document.createDocumentFragment()
let elModalTemlate = select("#modal-temlate");
let key = "58ed228a"

elForm.addEventListener("submit", evt => {
    evt.preventDefault()
    elList.innerHTML = ` <div class="spinner-border text-blue" role="status">
      <span class="visually-hidden">Loading...</span>
      </div>`;



    let { searchInp, sortbygenre, sortbyw: alfa } = evt.target.elements;

    getApi(searchInp.value.trim(), key)
    // let regax = new RegExp(searchInp.value.trim(), "gi");
    // let searchedFilmed = data.filter(film => film.Title.match(regax))

    // if (sortbygenre.value != "All") {
    //     let filteredByGener = searchedFilmed.filter(film => film.genres.includes(sortbygenre.value))
    //     searchedFilmed = filteredByGener
    // }

    // if (alfa.value == "a-z") {
    //     searchedFilmed.sort((a, b) => {
    //         if (a.Title > b.Title) {
    //             return 1
    //         } else if (a.Title < b.Title) {
    //             return -1
    //         } else {
    //             return 0
    //         }
    //     })
    // }

    // if (alfa.value == "z-a") {
    //     searchedFilmed.sort((a, b) => {
    //         if (b.Title > a.Title) {
    //             return 1
    //         } else if (b.Title < a.Title) {
    //             return -1
    //         } else {
    //             return 0
    //         }
    //     })
    // }
    // renderFunc(searchedFilmed, elListCard);
});





async function getApi(searchInp, key) {
    let data = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${searchInp}`)
        .then((res) => res.json())
        .then((data) => data.Search)
        .catch((error) => console.log(error))

    console.log(data);
    renderFunc(data, elList)
}


function renderFunc(array, element) {
    element.innerHTML = null
    array.forEach(film => {
        let cloneTemplate = elCardTemplate.cloneNode(true);

        let li = select("li", cloneTemplate.content);
        let img = select("img", cloneTemplate.content);
        let h2 = select("h2", cloneTemplate.content);
        let btn = select("button", cloneTemplate.content);
        let p = select("p", cloneTemplate.content);

        img.src = film.Poster;
        h2.textContent = film.Title;
        p.textContent = film.Year;
        btn.dataset.id = film.imdbID;

        // img.setAttribute("width", "270px")
        // img.setAttribute("height", "270px")

        btn.addEventListener("click", (evt) => {
            let filmId = evt.target.dataset.id

            let cloneTemplateModal = elModalTemlate.cloneNode(true).content;
            let foundFilm = array.find(item => item.imdbID == filmId)

            // console.log(cloneTemplateModal);
            let modal = select("#modal", cloneTemplateModal)
            // let iframe = select("iframe", cloneTemplateModal)
            let h2m = select("h2", cloneTemplateModal)
            let h4 = select("h4", cloneTemplateModal)
            let p = select("p", cloneTemplateModal)
            let img = select("img", cloneTemplateModal)
            // let delBtn = select("button", cloneTemplateModal)

            img.src = foundFilm.Poster
            h2m.textContent = foundFilm.Title
            p.textContent = foundFilm.Type
            document.querySelector("body").append(modal)

        })
        element.append(li)

    })

}

function deleteModal() {
    let elModal = select("#modal")
    elModal.remove()
}