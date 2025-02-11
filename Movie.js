class Movie {
    constructor(title, genre, director, moreInfoLink) {
        if (typeof(title) != "string" || typeof(genre) != "string"
        || typeof(director) != "string" || typeof(moreInfoLink) != "string") {
            throw new TypeError("All parameters must be strings.");
        }
        this.title = title;
        this.genre = genre;
        this.director = director;
        this.hyperlink = new HTMLAnchorElement();
        this.hyperlink.href = moreInfoLink;
    }
}