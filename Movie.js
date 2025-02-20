class Movie {
    constructor(title, genre, director, /*moreInfoLink,*/ plot, watchStatus) {
        if (typeof(title) != "string" || typeof(genre) != "string"
        || typeof(director) != "string"/* || typeof(moreInfoLink) != "string"*/
        || typeof(plot) != "string") {
            throw new TypeError("All parameters must be strings.");
        }
        if ((!(Number.isInteger(watchStatus)))) {
            throw new TypeError("Watch status must be an integer.");
        }
        if (watchStatus < 0 || watchStatus > 2) {
            throw new RangeError("Watch status must be from 0-2, inclusive.");
        }
        this.title = title;
        this.genre = genre;
        this.director = director;
        this.plot = plot;
        /*this.hyperlink = document.createElement("a");
        this.hyperlink.href = moreInfoLink;
        this.hyperlink.insertAdjacentText("afterbegin", hyperLinkText);*/
        this.watchStatus = watchStatus;
    }

    getWatchStatusString() {
        switch(this.watchStatus) {
            case 0:
                return "not watched";
            case 1:
                return "currently watching";
            default:
                return "Finished watching";
        }
    }
}