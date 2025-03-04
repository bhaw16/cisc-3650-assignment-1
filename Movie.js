class Movie {
    constructor(title, genre, director, /*moreInfoLink,*/ plot, poster, watchStatus, year) {
        if (typeof(title) != "string" || typeof(genre) != "string"
        || typeof(director) != "string"/* || typeof(moreInfoLink) != "string"*/
        || typeof(plot) != "string" || typeof(poster) != "string") {
            throw new TypeError("All parameters must be strings.");
        }
        if ((!(Number.isInteger(watchStatus)))) {
            throw new TypeError("Watch status must be an integer.");
        }
        if ((!(Number.isInteger(year)))) {
            throw new TypeError("year must be an integer.");
        }
        if (watchStatus < 0 || watchStatus > 2) {
            throw new RangeError("Watch status must be from 0-2, inclusive.");
        }
        if (year < 1878 || year > 2025) {
            throw new RangeError("The year must be from 1878 (first motion picture release) to 2025 (current year), inclusive.");
        }
        this.title = title;
        this.genre = genre;
        this.director = director;
        this.plot = plot;
        /*this.hyperlink = document.createElement("a");
        this.hyperlink.href = moreInfoLink;
        this.hyperlink.insertAdjacentText("afterbegin", hyperLinkText);*/
        this.watchStatus = watchStatus;
        this.image = document.createElement("img");
        this.image.src = poster;
        this.image.alt = `Poster of the movie ${title}`;
        this.year = year;
        this.rating = 0;
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

    static getStaticWatchStatusString(watchStatus) {
        if ((!(Number.isInteger(watchStatus)))) {
            throw new TypeError("Watch status must be an integer.");
        }
        if (watchStatus < 0 || watchStatus > 2) {
            throw new RangeError("Watch status must be from 0-2, inclusive.");
        }
        switch(watchStatus) {
            case 0:
                return "not watched";
            case 1:
                return "currently watching";
            default:
                return "Finished watching";
        }
    }

    setValueFromWatchStatusString(watchStatusString) {
        if (typeof(watchStatusString) != "string") {
            throw new TypeError("watchStatusString must be a string.");
        }
        switch (watchStatusString.toLowerCase()) {
            case "not watched":
                this.watchStatus = 0;
                break;
            case "currently watching":
                this.watchStatus = 1;
                break;
            case "finished watching":
                this.watchStatus = 2;
                break;
            default:
                throw new Error("Invalid string.");
        }
    }

    equals(object) {
        if (typeof(object) != "object") {
            throw new TypeError("object must be of type Object.");
        }
        return object instanceof Movie && object.title == this.title && object.director == this.director;
        //&& object.genre == this.genre && object.plot == this.plot && object.image == this.image;
    }

    static findMovie(movieArr, target) {
        if ((!(Array.isArray(movieArr)))) {
            throw new TypeError("movieArr must be an array of Movies.");
        }
        if ((!(target instanceof Movie))) {
            throw new TypeError("target must be of type Movie.");
        }
        for (var i = 0; i < movieArr.length; i++) {
            if ((!(movieArr[i] instanceof Movie))) {
                throw new TypeError("movieArr must be an array of Movies.");
            }
            if (movieArr[i].equals(target)) {
                return i;
            }
        }
        return -1;
    }

    static getMovieAt(movieArr, index) {
        if ((!(Array.isArray(movieArr)))) {
            throw new TypeError("movieArr must be an array of Movies.");
        }
        if ((!(Number.isInteger(index)))) {
            throw new TypeError("index must be an integer.");
        }
        if (index < 0 || index >= movieArr.length) {
            throw new RangeError("index is out of range.");
        }
        for (var i = 0; i < movieArr.length; i++) {
            if ((!(movieArr[i] instanceof Movie))) {
                throw new TypeError("movieArr must be an array of Movies.");
            }
            if (i == index) {
                return movieArr[i];
            }
            else {
                continue;
            }
        }
    }
}