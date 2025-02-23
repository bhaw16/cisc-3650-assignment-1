var movies = [];
//var movieForm = "<tr><td><input type=\"text\" form=\"movie-form\"></td><td><input type=\"text\" form=\"movie-form\"></td><td></td><td></td><td></td></tr>";
var canAddMovie = true;
loadMovies();

console.log(movies);
for (var i = 0; i < movies.length; i++) {
    displayMovieInTable(movies[i]);
}
//getMovieData(movies[0]);
console.log(document.getElementsByTagName("td"));
document.getElementById("add-movie").addEventListener("click", () => {
    try {
    if (canAddMovie) {
        canAddMovie = false;
        addMovieForm();
    }
    else {
        throw new Error("Finish adding this movie before adding another one.");
    }
    }
    catch(err) {
        console.log(err.message);
    }
});
document.getElementById("add-movie").addEventListener("mouseover", () => {
    (canAddMovie) ? document.getElementById("add-movie").setAttribute("style", "cursor: pointer") : document.getElementById("add-movie").setAttribute("style", "cursor: not-allowed");
});

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
        tableData.className = `movie-${movies.indexOf(movie)}`;
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
    var newRow = document.createElement("tr");
    for (var i = 0; i < 7; i++) {
        var formCell = document.createElement("td");
        if (i < 2) {
            formCell.insertAdjacentHTML("beforeend", "<input type=\"text\" form=\"movie-form\">");
            /*
            var cellInput = document.createElement("input");
            cellInput.type = "text";
            cellInput.form = document.getElementById("movie-form");
            formCell.insertAdjacentElement("beforeend", cellInput);*/
        }
        else if (i == 5) {
            for (var j = 0; j < 3; j++) {
                formCell.insertAdjacentHTML("beforeend", `<input type=\"radio\" id=\"${getRadioId(j)}\" name=\"watch-status\" value=\"${j}\" form=\"movie-form\">`);
                formCell.insertAdjacentHTML("beforeend", `<label for=\"${getRadioId(j)}\" form=\"movie-form\">${Movie.getStaticWatchStatusString(j)}</label>`);
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
            formCell.insertAdjacentHTML("beforeend", "<input type=\"submit\" form=\"movie-form\">");
            /*
            var cellInput = document.createElement("input");
            cellInput.type = "submit";
            cellInput.form = document.getElementById("movie-form");
            formCell.insertAdjacentElement("beforeend", cellInput);*/
        }
        newRow.insertAdjacentElement("beforeend", formCell);
    }
    document.getElementsByTagName("tbody")[0].insertAdjacentElement("beforeend", newRow);
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
    titleString.replaceAll(/[.,:!?]/g, "%3A");
    await fetch(`http://www.omdbapi.com/?apikey=ad3c3cc5&t=${titleString}&type=movie&plot=full`).then(
        (response) => response.json()
    ).then(
        (json) => {
            console.log(json.Director);
            console.log(json.Plot);
            console.log(json.Poster);
            movies.push(new Movie(title, genre, json.Director, json.Plot, json.Poster, 0));
            console.log(movies);
            displayMovieInTable(movies[movies.length - 1]);
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
    titleString.replaceAll(/[.,:!?]/g, "%3A");
    await fetch(`http://www.omdbapi.com/?apikey=ad3c3cc5&t=${titleString}&type=movie&plot=full`).then(
        (response) => response.json()
    ).then(
        (json) => {
            console.log(json.Director);
            console.log(json.Plot);
            console.log(json.Poster);
            movies.push(new Movie(title, genre, json.Director, json.Plot, json.Poster, watchStatus));
            console.log(movies);
            displayMovieInTable(movies[movies.length - 1]);
        }
    ).catch(
        (error) => console.log(error)
    );
}

async function loadMovies() {
    await getMovieFromTitle("Wicked", "Movie Musical");
    await getMovieFromTitle("In the Heights", "Movie Musical");
    await getMovieFromTitle("Crazy Rich Asians", "Romantic Comedy");
    await getMovieFromTitle("Sailor Moon SuperS: The Movie", "Mahou Shojo");
}