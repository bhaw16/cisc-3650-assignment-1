var movies = [
    new Movie("Wicked", "Movie Musical", "Jon M. Chu", "https://www.wickedmovie.com/synopsis/",
        "Wicked Movie Synopsis", 0
    )
];

onload = () => {
    for (var i = 0; i < movies.length; i++) {
        displayMovieInTable(movies[i]);
    }
}

function displayMovieInTable(movie) {
    if ((!(movie instanceof Movie))) {
        throw new TypeError("Parameter must be of type Movie.");
    }
    var movieRow = document.createElement("tr", {class: "movie-rows"});
    for (var i = 0; i < 5; i++) {
        var tableData = document.createElement("td", {class: `movie-${movies.indexOf(movie)}`});
        var movieAttributeData = getMovieAttribute(movie, i);
        (movieAttributeData instanceof HTMLAnchorElement) ? tableData.insertAdjacentElement("afterbegin", movieAttributeData) : tableData.insertAdjacentText("afterbegin", movieAttributeData);
    }
    var movieRowData = document.getElementsByClassName(`movie-${movies.indexOf(movie)}`)
    for (var i = 0; i < movieRowData.length; i++) {
        movieRow.insertAdjacentElement("beforeend", movieRowData[i]);
    }
    document.getElementsByTagName("thead").insertAdjacentElement("beforeend", movieRow);
}

function getMovieAttribute(movie, number) {
    if ((!(movie instanceof Movie))) {
        throw new TypeError("Parameter must be of type Movie.");
    }
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