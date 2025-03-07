var sound = new Audio("yeah-sound.wav");
var movies = [];
//var stepButtons = "<button class=\"btn btn-dark\" id=\"step-up\">‸</button><button class=\"btn btn-dark\" id=\"step-down\">˯</button>";
console.log(`Is movies an array? ${Array.isArray(movies)}`);
console.log(document.getElementsByTagName("p"));
var canAddMovie = true, canDeleteMovie = true, addingMovies = false, deletingMovies = false;
var numAddClicks = 0;
var showMovies = true, showRatings = false;
var ratingData;
loadMovies();
console.log(document.getElementsByClassName("table-bordered")[0].style);
var scrollToTop = document.createElement("button");
document.getElementsByTagName("table")[0].insertAdjacentElement("afterend", scrollToTop);
scrollToTop.classList.add("btn");
scrollToTop.classList.add("btn-dark");
scrollToTop.innerText = "Go To Top";
scrollToTop.id = "go-to-top";
scrollToTop.setAttribute("hidden", "");
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
document.getElementById("add-movie").addEventListener("mouseup", (event) => {
    numAddClicks++;
    if (deletingMovies && !canDeleteMovie) {
        throw new Error("You cannot add a movie while you are deleting movies.");
    }
    if (showRatings) {
        throw new Error("You cannot add a movie to the log while you are viewing movie statistics.");
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
        if (err.message == "You cannot add a movie while you are deleting movies." || err.message == "You cannot add a movie to the log while you are viewing moie statistics.") {
            document.getElementsByTagName("p")[0].removeAttribute("hidden");
            document.getElementsByTagName("p")[0].innerText = err.message;
            if ((!(document.getElementsByTagName("p")[0].classList.contains("text-danger"))))
                document.getElementsByTagName("p")[0].classList.add("text-danger");
            document.getElementsByTagName("p")[1].setAttribute("hidden", "");
        }
        else {
            document.getElementsByTagName("p")[1].removeAttribute("hidden");
            document.getElementsByTagName("p")[1].innerText = err.message;
            if ((!(document.getElementsByTagName("p")[1].classList.contains("text-danger"))))
                document.getElementsByTagName("p")[1].classList.add("text-danger");
            document.getElementsByTagName("p")[0].setAttribute("hidden", "");
            scrollTo(0, getSecondParagraph());
        }
    }
});
document.getElementById("show-ratings").addEventListener("mouseup", () => {
    showMovies = !showMovies;
    showRatings = !showRatings;
});
document.getElementById("add-movie").addEventListener("mouseover", () => {
    (canAddMovie) ? document.getElementById("add-movie").setAttribute("style", "cursor: pointer") : document.getElementById("add-movie").setAttribute("style", "cursor: not-allowed");
});
document.getElementById("delete-movie").addEventListener("mouseover", () => {
    (movies.length == 0 || (!canDeleteMovie && !deletingMovies)) ? document.getElementById("delete-movie").setAttribute("style", "cursor: not-allowed") : document.getElementById("delete-movie").setAttribute("style", "cursor: pointer");
});
document.getElementById("delete-movie").addEventListener("mouseup", () => {
    try {
    if (showRatings) {
        throw new Error("You cannot delete a movie from the log while you are viewing movie statistics.");
    }
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
        document.getElementsByTagName("p")[1].setAttribute("hidden", "");
    }
});
document.getElementById("movie-form").addEventListener("submit", (event) => {
    try {
    event.preventDefault();
    for (var i = 0; i < document.getElementsByTagName("p").length; i++) {
        document.getElementsByTagName("p")[i].setAttribute("hidden", "");
    }
    var title, year, genre, watchStatus, rating;
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
    if (document.getElementById("rating").value == "") {
        throw new Error("You must specify a rating.");
    }
    else
        rating = Number.parseInt(document.getElementById("rating").value);
    if (document.getElementById("year").value != "")
        year = Number.parseInt(document.getElementById("year").value);
    if (year == undefined) {
        getMovieFromTitle_WatchStatus(title, genre, watchStatus, rating).then(() => {
    //document.getElementById("add-movie-form").remove();
    canAddMovie = true;
    addingMovies = false;
    canDeleteMovie = true;
    deletingMovies = false;
    numAddClicks = 0;
    }).catch((error)  => {
        console.log(error.message);
        document.getElementsByTagName("p")[1].removeAttribute("hidden");
        document.getElementsByTagName("p")[1].innerText = error.message;
        if ((!(document.getElementsByTagName("p")[1].classList.contains("text-danger"))))
            document.getElementsByTagName("p")[1].classList.add("text-danger");
        document.getElementsByTagName("p")[0].setAttribute("hidden", "");
        scrollTo(0, getSecondParagraph());
    })
}
else {
    getMovieFromTitle_WatchStatus_Year(title, genre, watchStatus, year, rating).then(() => {
        //document.getElementById("add-movie-form").remove();
        canAddMovie = true;
        addingMovies = false;
        canDeleteMovie = true;
        deletingMovies = false;
        numAddClicks = 0;
        }).catch((error)  => {
            console.log(error.message);
            document.getElementsByTagName("p")[1].removeAttribute("hidden");
            document.getElementsByTagName("p")[1].innerText = error.message;
            if ((!(document.getElementsByTagName("p")[1].classList.contains("text-danger"))))
                document.getElementsByTagName("p")[1].classList.add("text-danger");
            document.getElementsByTagName("p")[0].setAttribute("hidden", "");
            scrollTo(0, getSecondParagraph());
})
}
}
catch(err) {
    console.log(err.message);
            document.getElementsByTagName("p")[1].removeAttribute("hidden");
            document.getElementsByTagName("p")[1].innerText = err.message;
            if ((!(document.getElementsByTagName("p")[1].classList.contains("text-danger"))))
                document.getElementsByTagName("p")[1].classList.add("text-danger");
            document.getElementsByTagName("p")[0].setAttribute("hidden", "");
            scrollTo(0, getSecondParagraph());
}
console.log("Watch status cells:");
console.log(document.getElementsByClassName("watch-status"));});
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
    for (var i = 0; i < 8; i++) {
        var tableData = document.createElement("td");
        console.log(`movie-${movies.indexOf(movie)}`);
        (i == 6) ? tableData.className = "watch-status" : ((i == 7) ? tableData.className = "star-rating" : tableData.className = `movie-${movies.indexOf(movie)}`);
        if (i == 6) {
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
                document.getElementsByClassName("watch-status")[movies.indexOf(movie)].insertAdjacentElement("beforeend", dropdownDiv);
                console.log(tableData);
            }
        });
        tableData.addEventListener("mouseleave", () => {
            deleteDropdown(document.getElementById("watch-status-dropdown"));
        });
        }
        if (i == 7) {
            tableData.addEventListener("mouseenter", () => {
                if (!deletingMovies) {
                    console.log(document.getElementsByClassName("star-rating"));
                    //console.log(document.getElementsByClassName("star-rating").innerHTML);
                    tableData.insertAdjacentHTML("afterbegin", "<button class=\"btn btn-dark\" id=\"inc-rating\">‸</button");
                    tableData.insertAdjacentHTML("beforeend", "<button class=\"btn btn-dark\" id=\"dec-rating\">˯</button>");
                    console.log(document.getElementsByClassName("star-rating"));
                    //console.log(document.getElementsByClassName("star-rating").innerHTML);
                    document.getElementById("inc-rating").addEventListener("mouseup", () => {
                        try {
                            var thisCell = document.getElementsByClassName("star-rating")[movies.indexOf(movie)];
                            console.log(thisCell.innerText);
                            console.log(thisCell.innerHTML);
                            var oldString = thisCell.innerText.trim();
                            if (oldString.length / 2 > 5)
                                throw new RangeError();
                            console.log(`${oldString} length: ${oldString.length}`);
                            movie.setValueFromRatingString(oldString.concat("⭐️"));
                            movies[movies.indexOf(movie)] = movie;
                            thisCell.innerText = Movie.getStaticRatingString(movie.rating);
                            }
                            catch(err) {
                                if (err instanceof RangeError && err.message == "")
                                    movies[movies.indexOf(movie)].rating = 1;
                                    thisCell.innerText = "⭐️";
                            }
                            finally {
                                ratingData = Movie.avgRatingsByDirector(movies);
                            }
                        });
                    document.getElementById("dec-rating").addEventListener("mouseup", () => {
                        try {
                        var thisCell = document.getElementsByClassName("star-rating")[movies.indexOf(movie)];
                        console.log(thisCell.innerText);
                        console.log(thisCell.innerHTML);
                        var oldString = (thisCell.innerText.substring(1, thisCell.innerText.length - 2));
                        if (oldString.length < 1)
                            throw new RangeError();
                        console.log(`${oldString} length: ${oldString.length}`);
                        movie.setValueFromRatingString(oldString);
                        movies[movies.indexOf(movie)] = movie;
                        thisCell.innerText = Movie.getStaticRatingString(movie.rating);
                        }
                        catch(err) {
                            if (err instanceof RangeError)
                                movies[movies.indexOf(movie)].rating = 5;
                                thisCell.innerText = "⭐️⭐️⭐️⭐️⭐️";
                        }
                        finally {
                            ratingData = Movie.avgRatingsByDirector(movies);
                        }
                    });
                }
            });
            tableData.addEventListener("mouseleave", () => {
                document.getElementById("inc-rating").remove();
                document.getElementById("dec-rating").remove();
            });
        }
        var movieAttributeData = getMovieAttribute(movie, i);
        console.log(movieAttributeData);
        console.log(tableData);
        (movieAttributeData instanceof HTMLImageElement) ? tableData.insertAdjacentElement("afterbegin", movieAttributeData) : tableData.insertAdjacentText("afterbegin", movieAttributeData);
        movieRow.insertAdjacentElement("beforeend", tableData);
    }
    document.getElementsByTagName("tbody")[0].insertAdjacentElement("beforeend", movieRow);
    if (movie.watchStatus == 2)
        sound.play();
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
            return movie.year;
        case 2:
            return movie.genre;
        case 3:
            return movie.director;
        case 4:
            return movie.plot;
            //return movie.hyperlink;
        case 5:
            return movie.image;
        case 6:
            return movie.getWatchStatusString();
        default:
            return movie.getRatingString();
    }
}

function addMovieForm() {
    if (!canAddMovie && addingMovies) {
    var newRow = document.createElement("tr");
    newRow.id = "add-movie-form";
    for (var i = 0; i < 9; i++) {
        var formCell = document.createElement("td");
        if (i < 3 || i == 7) {
            var textId = (i == 0) ? "title" : ((i == 1) ? "year" : ((i == 7) ? "rating": "genre"));
            var inputType = (textId == "year" || textId == "rating") ? "tel" : "text";
            formCell.insertAdjacentHTML("beforeend", `<input type=\"${inputType}\" id=\"${textId}\" form=\"movie-form\">`);
            if (i == 1) {
                formCell.insertAdjacentHTML("beforeend", "<button class=\"btn btn-dark\" id=\"step-up\">‸</button>");
                formCell.insertAdjacentHTML("beforeend", "<button class=\"btn btn-dark\" id=\"step-down\">˯</button>");
            }
            if (i == 7) {
                formCell.insertAdjacentHTML("beforeend", "<button class=\"btn btn-dark\" id=\"rating-up\">‸</button>");
                formCell.insertAdjacentHTML("beforeend", "<button class=\"btn btn-dark\" id=\"rating-down\">˯</button>");
            }
            /*
            var cellInput = document.createElement("input");
            cellInput.type = "text";
            cellInput.form = document.getElementById("movie-form");
            formCell.insertAdjacentElement("beforeend", cellInput);*/
        }
        else if (i == 6) {
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
        else if (i == 8) {
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
    document.getElementById("step-up").addEventListener("mouseup", () => {
        stepUp();
    });
    document.getElementById("step-down").addEventListener("mouseup", () => {
        stepDown();
    });
    document.getElementById("rating-up").addEventListener("mouseup", () => {
        ratingUp();
    });
    document.getElementById("rating-down").addEventListener("mouseup", () => {
        ratingDown();
    });
    scrollTo(0, getFormX());
    //document.getElementById("year").removeAttribute("step");
    //document.getElementById("year").setAttribute("inputmode", "numeric");
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
    await fetch(`https://www.omdbapi.com/?apikey=ad3c3cc5&t=${titleString}&type=movie&plot=full`).then(
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
    await fetch(`https://www.omdbapi.com/?apikey=ad3c3cc5&t=${titleString}&type=movie&plot=full`).then(
        (response) => response.json()
    ).then(
        (json) => {
            console.log(json.Response);
            if (json.Response == "True") {
                console.log(json);
                console.log(json.Director);
                console.log(json.Plot);
                console.log(json.Poster);
                console.log(json.Year);
                var newMovie = new Movie(title, genre, json.Director, json.Plot, json.Poster, 0, Number.parseInt(json.Year), 5)
                if (Movie.findMovie(movies, newMovie) > -1)
                    throw new Error("This movie is already in the log. Please add a different one.");
                movies.push(newMovie);
                console.log(movies);
                displayMovieInTable(movies[movies.length - 1]);
                console.log(Movie.avgRatingsByDirector(movies));
                ratingData = Movie.avgRatingsByDirector(movies);
                console.log("Watch status cells:");
                console.log(document.getElementsByClassName("watch-status"));
            }
            else {
                console.log(json);
                throw new Error(json.Error);
            }
        }
    ).catch(
        (error) => {
            document.getElementsByTagName("p")[1].removeAttribute("hidden");
            document.getElementsByTagName("p")[1].innerText = error.message;
            if ((!(document.getElementsByTagName("p")[1].classList.contains("text-danger"))))
                document.getElementsByTagName("p")[1].classList.add("text-danger");
            document.getElementsByTagName("p")[0].setAttribute("hidden", "");
            scrollTo(0, getSecondParagraph());
            console.log(error);
        }
    );
}

async function getMovieFromTitle_WatchStatus(title, genre, watchStatus, rating) {
    if (typeof(title) != "string" || typeof(genre) != "string") {
        throw new TypeError("Parameters must be a string.");
    }
    if ((!(Number.isInteger(watchStatus)))) {
        throw new TypeError("Watch status must be an integer.");
    }
    if (watchStatus < 0 || watchStatus > 2) {
        throw new RangeError("Watch status must be from 0-2, inclusive.");
    }
    if ((!(Number.isInteger(rating)))) {
        throw new TypeError("Rating must be an integer.");
    }
    if (rating < 1 || rating > 5) {
        throw new RangeError("Rating must be from 1-5, inclusive.");
    }
    var titleString = title;
    titleString.trim();
    titleString.replaceAll(" ", "+");
    titleString.replaceAll(/[.,:?]/g, "%3A");
    await fetch(`https://www.omdbapi.com/?apikey=ad3c3cc5&t=${titleString}&type=movie&plot=full`).then(
        (response) => response.json()
    ).then(
        (json) => {
            console.log(json.Response);
            if (json.Response == "True") {
                console.log(json);
                console.log(json.Director);
                console.log(json.Plot);
                console.log(json.Poster);
                console.log(json.Year);
                var newMovie = new Movie(title, genre, json.Director, json.Plot, json.Poster, watchStatus, Number.parseInt(json.Year), rating)
                if (Movie.findMovie(movies, newMovie) > -1)
                    throw new Error("This movie is already in the log. Please add a different one.");
                movies.push(newMovie);
                console.log(movies);
                displayMovieInTable(movies[movies.length - 1]);
                console.log(Movie.avgRatingsByDirector(movies));
                ratingData = Movie.avgRatingsByDirector(movies);
                document.getElementById("add-movie-form").remove();
            }
            else {
                console.log(json);
                throw new Error(`${json.Error} Please add a different movie.`);
            }
        }
    ).catch(
        (error) => {
            document.getElementsByTagName("p")[1].removeAttribute("hidden");
            document.getElementsByTagName("p")[1].innerText = error.message;
            if ((!(document.getElementsByTagName("p")[1].classList.contains("text-danger"))))
                document.getElementsByTagName("p")[1].classList.add("text-danger");
            document.getElementsByTagName("p")[0].setAttribute("hidden", "");
            scrollTo(0, getSecondParagraph());
            console.log(error);
        }
    );
}

async function getMovieFromTitle_WatchStatus_Year(title, genre, watchStatus, year, rating) {
    if (typeof(title) != "string" || typeof(genre) != "string") {
        throw new TypeError("Parameters must be a string.");
    }
    if ((!(Number.isInteger(watchStatus)))) {
        throw new TypeError("Watch status must be an integer.");
    }
    if (watchStatus < 0 || watchStatus > 2) {
        throw new RangeError("Watch status must be from 0-2, inclusive.");
    }
    if ((!(Number.isInteger(year)))) {
        throw new TypeError("year must be an integer.");
    }
    if (year < 1878 || year > 2025) {
        throw new RangeError("year must be from 1878 (first motion picture release) to 2025 (current year), inclusive.");
    }
    if (rating < 1 || rating > 5) {
        throw new RangeError("Rating must be from 1-5, inclusive.");
    }
    var titleString = title;
    titleString.trim();
    titleString.replaceAll(" ", "+");
    titleString.replaceAll(/[.,:?]/g, "%3A");
    await fetch(`https://www.omdbapi.com/?apikey=ad3c3cc5&t=${titleString}&type=movie&plot=full&y=${year}`).then(
        (response) => response.json()
    ).then(
        (json) => {
            console.log(json.Response);
            if (json.Response == "True") {
                console.log(json);
                console.log(json.Director);
                console.log(json.Plot);
                console.log(json.Poster);
                console.log(json.Year);
                var newMovie = new Movie(title, genre, json.Director, json.Plot, json.Poster, watchStatus, year, rating)
                if (Movie.findMovie(movies, newMovie) > -1)
                    throw new Error("This movie is already in the log. Please add a different one.");
                movies.push(newMovie);
                console.log(movies);
                displayMovieInTable(movies[movies.length - 1]);
                console.log(Movie.avgRatingsByDirector(movies));
                ratingData = Movie.avgRatingsByDirector(movies);
                document.getElementById("add-movie-form").remove();
            }
            else {
                console.log(json);
                throw new Error(`${json.Error} Please add a different movie.`);
            }
        }
    ).catch(
        (error) => {
            document.getElementsByTagName("p")[1].removeAttribute("hidden");
            document.getElementsByTagName("p")[1].innerText = error.message;
            if ((!(document.getElementsByTagName("p")[1].classList.contains("text-danger"))))
                document.getElementsByTagName("p")[1].classList.add("text-danger");
            document.getElementsByTagName("p")[0].setAttribute("hidden", "");
            scrollTo(0, getSecondParagraph());
            console.log(error);
        }
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
    button.addEventListener("mouseup", () => {
        console.log(index);
        var index = Number.parseInt(Array.from(document.getElementsByTagName("button")).indexOf(button)) - 4;   //there are 4 buttons on top so we need to exclude them
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
            canDeleteMovie = false;
            canAddMovie = true;
            addingMovies = false;
        }
        document.getElementById("delete-movie").innerText = "Delete Movies";
    }
    if ((numAddClicks > 0 && !canAddMovie) || showRatings) {
        //document.getElementById("add-movie").classList.remove("btn-dark");
        //document.getElementById("add-movie").setAttribute("disabled", "");
        document.getElementById("add-movie").classList.add("disabled");
        //document.getElementById("add-movie").classList.add("btn-secondary");
        document.getElementById("add-movie").classList.add("shadow-none");
        //document.getElementById("add-movie").style.backgroundColor = window.getComputedStyle(document.getElementsByTagName("html")[0]).getPropertyValue("--bs-btn-bg");
        document.getElementById("add-movie").setAttribute("aria-disabled", "true");
        //document.getElementById("add-movie").style.color = "none";
    }
    else {
        document.getElementById("add-movie").classList.remove("disabled");
        document.getElementById("add-movie").classList.remove("shadow-none");
        document.getElementById("add-movie").removeAttribute("aria-disabled");
    }
    if ((!canDeleteMovie && !deletingMovies) || showRatings) {
        //document.getElementById("delete-movie").classList.remove("btn-dark");
        //document.getElementById("delete-movie").setAttribute("disabled", "");
        document.getElementById("delete-movie").classList.add("disabled");
        //document.getElementById("delete-movie").classList.add("btn-secondary");
        document.getElementById("delete-movie").classList.add("shadow-none");
        //document.getElementById("delete-movie").style.backgroundColor = window.getComputedStyle(document.getElementsByTagName("html")[0]).getPropertyValue("--bs-btn-bg");
        document.getElementById("delete-movie").setAttribute("aria-disabled", "true");
        //document.getElementById("delete-movie").style.color = "none";
    }
    else {
        document.getElementById("delete-movie").classList.remove("disabled");
        document.getElementById("delete-movie").classList.remove("shadow-none");
        document.getElementById("delete-movie").removeAttribute("aria-disabled");
    }
    if (showMovies && !showRatings) {
        hideAvgRatings();
    }
    else {
        showAvgRatings();
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
    if (movie.watchStatus == 2)
        sound.play();
    else
        sound.pause();
        sound.currentTime = 0.0;
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

function stepUp() {
    try {
    if (document.getElementById("year").value == "")
        document.getElementById("year").value = 1878;
    else {
        if (Number.parseInt(document.getElementById("year").value) >= 2025)
            throw new RangeError("Year must not be greater than the current year.");
        document.getElementById("year").value++;
    }
    }
    catch (err) {
        if (err instanceof RangeError)
            document.getElementById("year").value = 1878;
    }
}

function stepDown() {
    try {
        if (document.getElementById("year").value == "")
            document.getElementById("year").value = 2025;
        else {
            if (Number.parseInt(document.getElementById("year").value) <= 1878)
                throw new RangeError("Year must not be less than the year in which the first motion picture was released.");
            document.getElementById("year").value--;
        }
        }
        catch (err) {
            if (err instanceof RangeError)
                document.getElementById("year").value = 2025;
        }
}

function ratingUp() {
    try {
        if (document.getElementById("rating").value == "")
            document.getElementById("rating").value = 1;
        else {
            if (Number.parseInt(document.getElementById("rating").value) >= 5)
                throw new RangeError("Rating cannot be greater than 5.");
            document.getElementById("rating").value++;
        }
    }
    catch(err) {
        if (err instanceof RangeError)
            document.getElementById("rating").value = 1;
    }
}

function ratingDown() {
    try {
        if (document.getElementById("rating").value == "")
            document.getElementById("rating").value = 5;
        else {
            if (Number.parseInt(document.getElementById("rating").value) <= 1)
                throw new RangeError("Rating cannot be less than 1.");
            document.getElementById("rating").value--;
        }
    }
    catch(err) {
        if (err instanceof RangeError)
            document.getElementById("rating").value = 5;
    }
}

function showAvgRatings() {
    ratingData = Movie.avgRatingsByDirector(movies);
    document.getElementById("show-ratings").innerText = "Show Movie Log";
    document.getElementsByTagName("tbody")[1].innerHTML = "";
    for (var i = 0; i < ratingData.length; i++) {
        document.getElementsByTagName("tbody")[1].insertAdjacentHTML("beforeend", `<tr class=\"rating-row\"><td>${ratingData[i].dir}</td><td>${Number.parseFloat(ratingData[i].avgRating)}</td></tr>`);
    }
    document.getElementsByTagName("table")[0].setAttribute("hidden", "");
    document.getElementsByTagName("table")[1].removeAttribute("hidden");
}

function hideAvgRatings() {
    document.getElementById("show-ratings").innerText = "Group Movies by Director";
    document.getElementsByTagName("table")[1].setAttribute("hidden", "");
    document.getElementsByTagName("table")[0].removeAttribute("hidden");
}