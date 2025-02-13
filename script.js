var movies = [
    new Movie("Wicked", "Movie Musical", "Jon M. Chu", "https://www.wickedmovie.com/synopsis/",
        "Wicked Movie Synopsis", 0
    )
];

console.log(movies);
for (var i = 0; i < movies.length; i++) {
    displayMovieInTable(movies[i]);
}
console.log(document.getElementsByTagName("td"));


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
    /*var movieRowData = document.getElementsByClassName(`movie-${movies.indexOf(movie)}`);
    console.log(document.getElementsByClassName(`movie-${movies.indexOf(movie)}`));
    console.log(movieRowData);
    for (var i = 0; i < movieRowData.length; i++) {
        movieRow.insertAdjacentElement("beforeend", movieRowData[i]);
    }*/
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
            return movie.director;
        case 2:
            return movie.genre;
        case 3:
            return movie.hyperlink;
        default:
            return movie.getWatchStatusString();
    }
}