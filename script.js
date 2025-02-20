var movies = [];
getMovieFromTitle("Wicked", "Movie Musical");
getMovieFromTitle("In the Heights", "Movie Musical");
getMovieFromTitle("Crazy Rich Asians", "Romantic Comedy");

console.log(movies);
for (var i = 0; i < movies.length; i++) {
    displayMovieInTable(movies[i]);
}
//getMovieData(movies[0]);
console.log(document.getElementsByTagName("td"));
document.getElementById("add-movie").addEventListener("click", () => {
    var newRow = document.createElement("tr");
    newRow.className = "movie-rows";
    var movieEntryForm = document.createElement("form");
    newRow.insertAdjacentElement("beforeend", movieEntryForm);
    for (var i = 0; i < 6; i++) {
        var newCell = document.createElement("td");
        var cellInput = document.createElement("input");
        cellInput.type = (i == 5) ? "submit" : "text";
        newCell.insertAdjacentElement("afterbegin", cellInput);
        newRow.insertAdjacentElement("beforeend", newCell);
    }
    document.getElementsByTagName("tbody")[0].insertAdjacentElement("beforeend", newRow);
});


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
    title.trim();
    title.replaceAll(" ", "+");
    title.replaceAll(/[.,:!?]/g, "%3A");
    await fetch(`http://www.omdbapi.com/?apikey=ad3c3cc5&t=${title}&type=movie&plot=full`).then(
        (response) => response.json()
    ).then(
        (json) => {
            console.log(json.Director);
            console.log(json.Plot);
            console.log(json.Poster);
            movies.push(new Movie(title, genre, json.Director, json.Plot, json.Poster, 0));
            displayMovieInTable(movies[movies.length - 1]);
        }
    );
}