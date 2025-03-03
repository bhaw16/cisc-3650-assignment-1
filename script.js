var movies = [];
console.log(`Is movies an array? ${Array.isArray(movies)}`);
console.log(document.getElementsByTagName("p"));
var canAddMovie = true, canDeleteMovie = true, addingMovies = false, deletingMovies = false;
var numAddClicks = 0;
loadMovies();
var scrollToTop = document.createElement("button");
document.getElementsByTagName("table")[0].insertAdjacentElement("afterend", scrollToTop);
scrollToTop.classList.add("btn");
scrollToTop.classList.add("btn-dark");
scrollToTop.innerText = "Go To Top";
scrollToTop.id = "go-to-top";
scrollToTop.addEventListener("click", () => {
    scrollTo(0, 0);
});
window.addEventListener("scroll", () => {
    if (window.scrollY > 20)
        scrollToTop.removeAttribute("hidden");
    else
        scrollToTop.setAttribute("hidden", "");
});
console.log(document.getElementsByTagName("button"));

console.log(movies);
for (var i = 0; i < movies.length; i++) {
    displayMovieInTable(movies[i]);
}
//getMovieData(movies[0]);
console.log(document.getElementsByTagName("td"));
document.getElementById("add-movie").addEventListener("click", (event) => {
    numAddClicks++;
    if (deletingMovies && !canDeleteMovie) {
        throw new Error("You cannot add a movie while you are deleting movies.");
    }
    try {
        if (canAddMovie && !addingMovies) {
            addingMovies = true;
            canAddMovie = false;
            canDeleteMovie = false;
            deletingMovies = false;
            addMovieForm();
        }
        if (addingMovies && !canAddMovie) {
            canAddMovie = false;
            canDeleteMovie = false;
            deletingMovies = false;
            if (numAddClicks > 1)
                throw new Error("Finish adding this movie before adding another one.");
        }
    }
    catch(err) {
        canAddMovie = false;
        console.log(err.message);
        if (err.message == "You cannot add a movie while you are deleting movies.") {
            document.getElementsByTagName("p")[0].removeAttribute("hidden");
            document.getElementsByTagName("p")[0].innerText = err.message;
            if ((!(document.getElementsByTagName("p")[0].classList.contains("text-danger"))))
                document.getElementsByTagName("p")[0].classList.add("text-danger");
        }
        else {
            document.getElementsByTagName("p")[1].removeAttribute("hidden");
            document.getElementsByTagName("p")[1].innerText = err.message;
            if ((!(document.getElementsByTagName("p")[1].classList.contains("text-danger"))))
                document.getElementsByTagName("p")[1].classList.add("text-danger");
            scrollTo(0, getSecondParagraph());
        }
    }
});
document.getElementById("add-movie").addEventListener("mouseover", () => {
    (canAddMovie) ? document.getElementById("add-movie").setAttribute("style", "cursor: pointer") : document.getElementById("add-movie").setAttribute("style", "cursor: not-allowed");
});
document.getElementById("delete-movie").addEventListener("mouseover", () => {
    (movies.length != 0 || !addingMovies) ? document.getElementById("delete-movie").setAttribute("style", "cursor: pointer") : document.getElementById("delete-movie").setAttribute("style", "cursor: not-allowed");
});
document.getElementById("delete-movie").addEventListener("click", () => {
    try {
    if (addingMovies) {
        throw new Error("You cannot delete movies while adding one.");
    }
    if (movies.length == 0) {
        throw new Error("There are no movies to delete.");
    }
    if (canDeleteMovie && !deletingMovies) {
        deletingMovies = true;
        canAddMovie = false;
        addingMovies = false;
        canDeleteMovie = false;
        addDeleteButtons();
        document.getElementById("delete-movie").innerText = "Cancel Delete";
    }
    else if (!addingMovies) {
        removeDeleteButtons();
        deletingMovies = false;
        canDeleteMovie = true;
        canAddMovie = true;
        addingMovies = false;
        document.getElementById("delete-movie").innerText = "Delete Movies";
    }
    }
    catch(err) {
        console.log(err.message);
        document.getElementsByTagName("p")[0].removeAttribute("hidden");
        document.getElementsByTagName("p")[0].innerText = err.message;
        if ((!(document.getElementsByTagName("p")[0].classList.contains("text-danger"))))
            document.getElementsByTagName("p")[0].classList.add("text-danger");
    }
});
document.getElementById("movie-form").addEventListener("submit", (event) => {
    event.preventDefault();
    var title, genre, watchStatus;
    if (document.getElementById("title").value == "") 
        throw new Error("You must enter a title.");
    else 
        title = document.getElementById("title").value;
    if (document.getElementById("genre").value == "") 
        throw new Error("You must enter a genre.");
    else
        genre = document.getElementById("genre").value;
    var radioButtons = document.getElementsByName("watch-status");
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked)
            watchStatus = Number.parseInt(radioButtons[i].value);
    }
    if (watchStatus == undefined)
        throw new Error("You must specify a watch status.");
    document.getElementById("add-movie-form").remove();
    getMovieFromTitle_WatchStatus(title, genre, watchStatus);
    canAddMovie = true;
    addingMovies = false;
    canDeleteMovie = true;
    deletingMovies = false;
    numAddClicks = 0;
});
console.log("Watch status cells:");
console.log(document.getElementsByClassName("watch-status"));
/*for (var i = 0; i < document.getElementsByClassName("watch-status").length; i++) {
    var cell = document.getElementsByClassName("watch-status")[i];
    cell.addEventListener("mouseenter", () => {
        var editButton = document.createElement("button");
        editButton.className = "btn";
        editButton.id = "edit-watch-status";
        cell.insertAdjacentElement("beforeend", editButton);
    });
    cell.addEventListener("mouselleave", () => {
        deleteButton(document.getElementById("edit-watch-status"));
    });
}*/

    /*var newRow = document.createElement("tr");
    newRow.className = "movie-rows";
    for (var i = 0; i < 6; i++) {
        var newCell = document.createElement("td");
        var cellInput = document.createElement("input");
        cellInput.type = (i == 5) ? "submit" : "text";
        newCell.insertAdjacentElement("afterbegin", cellInput);
        newRow.insertAdjacentElement("beforeend", newCell);
    }
    document.getElementsByTagName("tbody")[0].insertAdjacentElement("beforeend", newRow);*/



function displayMovieInTable(movie) {
    if ((!(movie instanceof Movie))) {
        throw new TypeError("Parameter must be of type Movie.");
    }
    var movieRow = document.createElement("tr");
    movieRow.className = "movie-rows";
    for (var i = 0; i < 6; i++) {
        var tableData = document.createElement("td");
        console.log(`movie-${movies.indexOf(movie)}`);
        (i == 5) ? tableData.className = "watch-status" : tableData.className = `movie-${movies.indexOf(movie)}`;
        if (i == 5) {
        tableData.addEventListener("mouseenter", () => {
            if (!deletingMovies) {
                var dropdownDiv = document.createElement("div");
                dropdownDiv.className = "dropdown";
                dropdownDiv.id = "watch-status-dropdown";
                var editButton = document.createElement("button");
                editButton.classList.add("btn");
                editButton.classList.add("btn-dark");
                editButton.classList.add("dropdown-toggle");
                editButton.setAttribute("data-bs-toggle", "dropdown");
                editButton.id = "edit-watch-status";
                editButton.innerText = "Edit";
                var spanCaret = document.createElement("span");
                spanCaret.className = "caret";
                editButton.insertAdjacentElement("beforeend", spanCaret);
                dropdownDiv.insertAdjacentElement("beforeend", editButton);
                var dropdown = document.createElement("ul");
                dropdown.className = "dropdown-menu";
                for (var j = 0; j < 3; j++) {
                    if (j == movie.watchStatus)
                        continue;
                    var dropdownItem = document.createElement("li");
                    var dropdownLink = document.createElement("a");
                    dropdownLink.href = "#";
                    dropdownLink.innerText = Movie.getStaticWatchStatusString(j);
                    addEventListenerToDropdownLink(dropdownLink, movie);
                    dropdownItem.insertAdjacentElement("beforeend", dropdownLink);
                    dropdown.insertAdjacentElement("beforeend", dropdownItem);
                    console.log(dropdownItem);
                    console.log(dropdownLink);
                }
                console.log(editButton);
                console.log(dropdown);
                console.log(dropdownDiv);
                dropdownDiv.insertAdjacentElement("beforeend", dropdown);
                tableData.insertAdjacentElement("beforeend", dropdownDiv);
                console.log(tableData);
            }
        });
        tableData.addEventListener("mouseleave", () => {
            deleteDropdown(document.getElementById("watch-status-dropdown"));
        });
        }
        var movieAttributeData = getMovieAttribute(movie, i);
        console.log(movieAttributeData);
        console.log(tableData);
        (movieAttributeData instanceof HTMLImageElement) ? tableData.insertAdjacentElement("afterbegin", movieAttributeData) : tableData.insertAdjacentText("afterbegin", movieAttributeData);
        movieRow.insertAdjacentElement("beforeend", tableData);
    }
    document.getElementsByTagName("tbody")[0].insertAdjacentElement("beforeend", movieRow);
}

function getMovieAttribute(movie, number) {
    if ((!(movie instanceof Movie))) {
        throw new TypeError("Parameter must be of type Movie.");
    }
    console.log("adding movie info to table...");
    switch (number) {
        case 0:
            return movie.title;
        case 1:
            return movie.genre;
        case 2:
            return movie.director;
        case 3:
            return movie.plot;
            //return movie.hyperlink;
        case 4:
            return movie.image;
        default:
            return movie.getWatchStatusString();
    }
}

function addMovieForm() {
    if (!canAddMovie && addingMovies) {
    var newRow = document.createElement("tr");
    newRow.id = "add-movie-form";
    for (var i = 0; i < 7; i++) {
        var formCell = document.createElement("td");
        if (i < 2) {
            var textId = (i == 0) ? "title" : "genre";
            formCell.insertAdjacentHTML("beforeend", `<input type=\"text\" id=\"${textId}\" form=\"movie-form\">`);
            /*
            var cellInput = document.createElement("input");
            cellInput.type = "text";
            cellInput.form = document.getElementById("movie-form");
            formCell.insertAdjacentElement("beforeend", cellInput);*/
        }
        else if (i == 5) {
            for (var j = 0; j < 3; j++) {
                formCell.insertAdjacentHTML("beforeend", "<div class=\"radio\">");
                formCell.insertAdjacentHTML("beforeend", `<input type=\"radio\" id=\"${getRadioId(j)}\" name=\"watch-status\" class=\"watch-status-radio\" value=\"${j}\" form=\"movie-form\">`);
                formCell.insertAdjacentHTML("beforeend", `<label for=\"${getRadioId(j)}\" form=\"movie-form\">${Movie.getStaticWatchStatusString(j)}</label>`);
                formCell.insertAdjacentHTML("beforeend", "</div>");
                /*
                var cellInput = document.createElement("input");
                cellInput.type = "radio";
                cellInput.name = "watch-status";
                cellInput.value = j;
                cellInput.form = document.getElementById("movie-form");
                formCell.insertAdjacentElement("beforeend", cellInput);
                */
            }
        }
        else if (i == 6) {
            formCell.insertAdjacentHTML("beforeend", "<input class=\"btn btn-dark\" type=\"submit\" form=\"movie-form\">");
            /*
            var cellInput = document.createElement("input");
            cellInput.type = "submit";
            cellInput.form = document.getElementById("movie-form");
            formCell.insertAdjacentElement("beforeend", cellInput);*/
        }
        newRow.insertAdjacentElement("beforeend", formCell);
    }
    document.getElementsByTagName("tbody")[0].insertAdjacentElement("beforeend", newRow);
    scrollTo(0, getFormX());
    }
    else {
        throw new Error("Finish adding this movie before adding another one.");
    }
}

function getRadioId(num) {
    if ((!(Number.isInteger(num)))) {
        throw new TypeError("num must be an integer.");
    }
    if (num < 0 || num > 2) {
        throw new RangeError("num must be from 0-2, inclusive.");
    }
    switch(num) {
        case 0:
            return "NW";
        case 1:
            return "CW";
        default:
            return "W";
    }
}


async function getMovieData(movie) {
    if ((!(movie instanceof Movie))) {
        throw new TypeError("Parameter must be of type Movie.");
    }
    var titleString = movie.title;
    titleString.toLowerCase();
    titleString.trim();
    titleString.replaceAll(" ", "+");
    titleString.replaceAll(/[.,:!?]/g, "%3A");
    await fetch(`http://www.omdbapi.com/?apikey=ad3c3cc5&t=${titleString}&type=movie&plot=full`).then(
        (response) => response.json()
    ).then(
        (json) => console.log(json)
    );
}

async function getMovieFromTitle(title, genre) {
    if (typeof(title) != "string" || typeof(genre) != "string") {
        throw new TypeError("Parameters must be a string.");
    }
    var titleString = title;
    titleString.trim();
    titleString.replaceAll(" ", "+");
    titleString.replaceAll(/[.,:?]/g, "%3A");
    await fetch(`http://www.omdbapi.com/?apikey=ad3c3cc5&t=${titleString}&type=movie&plot=full`).then(
        (response) => response.json()
    ).then(
        (json) => {
            console.log(json.Response);
            if (json.Response == "True") {
                console.log(json);
                console.log(json.Director);
                console.log(json.Plot);
                console.log(json.Poster);
                movies.push(new Movie(title, genre, json.Director, json.Plot, json.Poster, 0));
                console.log(movies);
                displayMovieInTable(movies[movies.length - 1]);
                console.log("Watch status cells:");
                console.log(document.getElementsByClassName("watch-status"));
            }
            else {
                console.log(json);
                throw new Error(json.Error);
            }
        }
    ).catch(
        (error) => console.log(error)
    );
}

async function getMovieFromTitle_WatchStatus(title, genre, watchStatus) {
    if (typeof(title) != "string" || typeof(genre) != "string") {
        throw new TypeError("Parameters must be a string.");
    }
    if ((!(Number.isInteger(watchStatus)))) {
        throw new TypeError("Watch status must be an integer.");
    }
    if (watchStatus < 0 || watchStatus > 2) {
        throw new RangeError("Watch status must be from 0-2, inclusive.");
    }
    var titleString = title;
    titleString.trim();
    titleString.replaceAll(" ", "+");
    titleString.replaceAll(/[.,:?]/g, "%3A");
    await fetch(`http://www.omdbapi.com/?apikey=ad3c3cc5&t=${titleString}&type=movie&plot=full`).then(
        (response) => response.json()
    ).then(
        (json) => {
            console.log(json.Response);
            if (json.Response == "True") {
                console.log(json);
                console.log(json.Director);
                console.log(json.Plot);
                console.log(json.Poster);
                movies.push(new Movie(title, genre, json.Director, json.Plot, json.Poster, watchStatus));
                console.log(movies);
                displayMovieInTable(movies[movies.length - 1]);
            }
            else {
                console.log(json);
                throw new Error(json.Error); 
            }
        }
    ).catch(
        (error) => console.log(error)
    );
}

function addDeleteButtons() {
   
    for (var i = 0; i < document.getElementsByTagName("tr").length; i++) {
        var newCell = document.createElement("td");
        if (i > 0) {
            //var j = i - 1;
            var deleteButton = document.createElement("button");
            deleteButton.id = `delete-${i}`;
            deleteButton.innerText = "🗑️";
            deleteButton.classList.add("btn");
            deleteButton.classList.add("btn-danger");
            deleteRowWithButton(deleteButton);
            /*var index = Number.parseInt(Array.from(document.getElementsByTagName("button")).indexOf(deleteButton)) - 1;
            deleteButton.onclick = () => {
                console.log(index);
                var deletedMovie = Movie.getMovieAt(movies, index);
                delete movies[Movie.findMovie(movies, deletedMovie)];
                movies = movies.filter((movie) => {
                    return movie != undefined;
                });
                document.getElementsByTagName("tr")[index + 1].remove();
                console.log(movies);
            };*/
            newCell.insertAdjacentElement("afterbegin", deleteButton);
        }
        document.getElementsByTagName("tr")[i].insertAdjacentElement("afterbegin", newCell);
    }
}

function removeDeleteButtons() {
    for (var i = 0; i < document.getElementsByTagName("tr").length; i++) {
        document.getElementsByTagName("tr")[i].children[0].remove();
    }
}

async function loadMovies() {
    await getMovieFromTitle("Wicked", "Movie Musical");
    await getMovieFromTitle("In the Heights", "Movie Musical");
    await getMovieFromTitle("Crazy Rich Asians", "Romantic Comedy");
    await getMovieFromTitle("Sailor Moon SuperS: The Movie", "Mahou Shojo");
}

function getFormX() {
    return document.getElementsByTagName("h1")[0].offsetTop + document.getElementsByTagName("table")[0].offsetTop + document.getElementById("add-movie-form").offsetTop;
}

function getSecondParagraph() {
    return getFormX() + document.getElementsByTagName("p")[1].offsetTop;
}

function deleteRowWithButton(button) {
    if ((!(button instanceof HTMLButtonElement))) {
        throw new TypeError("button must be a button.");
    }
    button.addEventListener("click", () => {
        console.log(index);
        var index = Number.parseInt(Array.from(document.getElementsByTagName("button")).indexOf(button)) - 2;
        var deletedMovie = Movie.getMovieAt(movies, index);
            delete movies[Movie.findMovie(movies, deletedMovie)];
            movies = movies.filter((movie) => {
                return movie != undefined;
            });
            document.getElementsByTagName("tr")[index + 1].remove();
            console.log(movies);
            console.log(document.getElementsByTagName("table")[0]);
    });
}

setInterval(() => {
    if (movies.length == 0) {
        if (document.getElementsByTagName("td").length == 1) {
            document.getElementsByTagName("td")[0].remove();
            deletingMovies = false;
            canDeleteMovie = true;
            canAddMovie = true;
            addingMovies = false;
        }
        document.getElementById("delete-movie").innerText = "Delete Movies";
    }
}, 10);

function deleteDropdown(dropdownDiv) {
    if ((!(dropdownDiv instanceof HTMLDivElement)) && (!(dropdownDiv.classList.contains("dropwdown")))) {
        throw new TypeError("dropdownDiv must be a Bootstrap Dropwdown menu.");
    }
    dropdownDiv.remove();
}
/*
function setLinkWatchStatus(dropdownLink, int) {
    if ((!(dropdownLink instanceof HTMLAnchorElement)) && (!(dropdownLink.parentElement.parentElement.classList.contains("dropdown-menu")))) {
        throw new TypeError("dropdownLink must be an <a> elemnt inside of a Bootstrap dropdown menu.");
    }
    if ((!(Number.isInteger(int)))) {
        throw new TypeError("int must be an integer.");
    }
    if (int < 0 || int > 2) {
        throw new RangeError("int must be from 0-2, inclusive.");
    }
    dropdownLink.innerText = Movie.getStaticWatchStatusString(int);
}*/

function editWatchStatus(dropdownLink, movie) {
    if ((!(dropdownLink instanceof HTMLAnchorElement)) && (!(dropdownLink.parentElement.parentElement.classList.contains("dropdown-menu")))) {
        throw new TypeError("dropdownLink must be an <a> elemnt inside of a Bootstrap dropdown menu.");
    }
    if ((!(movie instanceof Movie))) {
        throw new TypeError("movie must be of type Movie.");
    }
    var movieIndex = Movie.findMovie(movies, movie);
    movie.setValueFromWatchStatusString(dropdownLink.innerText);
    movies[movieIndex] = movie;
    console.log(movies);
    document.getElementsByClassName("watch-status")[movieIndex].innerText = movie.getWatchStatusString();
}

function addEventListenerToDropdownLink(dropdownLink, movie) {
    if ((!(dropdownLink instanceof HTMLAnchorElement)) && (!(dropdownLink.parentElement.parentElement.classList.contains("dropdown-menu")))) {
        throw new TypeError("dropdownLink must be an <a> elemnt inside of a Bootstrap dropdown menu.");
    }
    if ((!(movie instanceof Movie))) {
        throw new TypeError("movie must be of type Movie.");
    }
    dropdownLink.addEventListener("click", (event) => {
        event.preventDefault();
        editWatchStatus(dropdownLink, movie);
    });
}