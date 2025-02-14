var movies = [
    new Movie("Wicked", "Movie Musical", "Jon M. Chu", "https://www.wickedmovie.com/synopsis/",
        "Wicked Movie Synopsis", 0
    ),
    new Movie("In the Heights", "Movie Musical", "Jon M. Chu", "https://www.warnerbros.com/movies/heights",
        "Warner Bros' In the Heights Movie Page", 0
    ),
    new Movie("Crazy Rich Asians", "Romantic Comedy", "Jon M. Chu", "https://www.imdb.com/title/tt3104988/",
        "Crazy Rich Asians IMDb Page", 0
    )
];

console.log(movies);
for (var i = 0; i < movies.length; i++) {
    displayMovieInTable(movies[i]);
}
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
    for (var i = 0; i < 5; i++) {
        var tableData = document.createElement("td");
        console.log(`movie-${movies.indexOf(movie)}`);
        tableData.className = `movie-${movies.indexOf(movie)}`;
        var movieAttributeData = getMovieAttribute(movie, i);
        console.log(movieAttributeData);
        console.log(tableData);
        (movieAttributeData instanceof HTMLAnchorElement) ? tableData.insertAdjacentElement("afterbegin", movieAttributeData) : tableData.insertAdjacentText("afterbegin", movieAttributeData);
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
            return movie.hyperlink;
        default:
            return movie.getWatchStatusString();
    }
}