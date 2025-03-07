class Movie {
    constructor(title, genre, director, /*moreInfoLink,*/ plot, poster, watchStatus, year, rating) {
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
        if ((!(Number.isInteger(rating)))) {
            throw new TypeError("rating must be an integer.");
        }
        if (rating < 1 || rating > 5) {
            throw new RangeError("rating must be from 1-5, inclusive.");
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
        this.rating = rating;
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

    getRatingString() {
        var ratingString = "";
        for (var i = 0; i < this.rating; i++) {
            ratingString = ratingString.concat("⭐️");
        }
        return ratingString;
    }

    static getStaticRatingString(rating) {
        var ratingString = "";
        if ((!(Number.isInteger(rating)))) {
            throw new TypeError("rating must be an integer.");
        }
        if (rating < 1 || rating > 5) {
            throw new RangeError("rating must be from 1-5, inclusive.");
        }
        for (var i = 0; i < rating; i ++) {
            ratingString = ratingString.concat("⭐️");
        }
        return ratingString;
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

    setValueFromRatingString(ratingString) {
        if (typeof(ratingString) != "string") {
            throw new TypeError("ratingString must be a string.");
        }
        var ratingNum = (ratingString.match(/⭐️/g) || []).length;
        console.log(ratingNum);
        //⭐️ emoji is 2 units instead of 1 as explained by ChatGPT
        if (ratingNum < 1 || ratingNum > 5) {
            throw new Error("ratingString must have 1-5 stars.");
        }
        /*find all occurrences of ⭐️ and return either an empty array if no
        matches are found or an array with all occurrences of ⭐️ then get the length of array
        to get the length of the rating string*/
        /*
        for (var i = 0; i < ratingString.length; i++) {
            if (ratingString.substring(i, i + 2) != "⭐️") {
                throw new Error("ratingString must only have stars.");
            }
            else {
                ratingNum++;
            }
        }*/
        this.rating = ratingNum;
    }

    equals(object) {
        if (typeof(object) != "object") {
            throw new TypeError("object must be of type Object.");
        }
        return object instanceof Movie && object.title == this.title && this.year == object.year && object.director == this.director;
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

    getDirectorList() {
        return this.director.split(", ");
    }

    static avgRatingsByDirector(movieArr) {
        //the following code was generated by ChatGPT.
            if (!(Array.isArray(movieArr))) {
                throw new TypeError("movieArr must be an array.");
            }
        
            let directorRatings = {}; // Object to store total ratings & count for each director
            let avgRatingsByDirector = []; // Array to store the final result
        
            // Iterate through all movies
            for (let movie of movieArr) {
                if (!(movie instanceof Movie)) {
                    throw new TypeError("movieArr must be an array of Movies.");
                }
        
                let directors = movie.getDirectorList(); // Get array of directors
        
                // Iterate through all directors in this movie
                for (let director of directors) {
                    if (!(director in directorRatings)) {
                        directorRatings[director] = { sum: 0, count: 0 };
                    }
                    directorRatings[director].sum += movie.rating;
                    directorRatings[director].count += 1;
                }
            }
        
            // Iterate over directorRatings object to create the result array
            for (let director in directorRatings) {
                let avgRating = directorRatings[director].sum / directorRatings[director].count;
                avgRatingsByDirector.push({ dir: director, avgRating: avgRating });
            }
        
            return avgRatingsByDirector; // Return the result array
        }
        //legacy code that I tried
        /*
        var avgRatingsByDirector = [];
        var dirRatings = {};    //object for director and rating pair (part of ChatGPT code snippet)
        if ((!(Array.isArray(movieArr)))) {
            throw new TypeError("movieArr must be an array.");
        }
        
        for (var i = 0; i < movieArr.length; i++) {
            if ((!(movieArr[i] instanceof Movie)))
                throw new TypeError("movieArr must be an array of Movies.");
            var directorSet = movieArr[i].getDirectorList();
            for (var j = 0; j < directorSet.length; j++) {
                if ((!(directorSet[j] in dirRatings)))  //check if the current director is accounted for in the dirRatings object
                    dirRatings[j] = {sum: 0, count: 0};
                dirRatings[j].sum += movieArr[i].rating;
                dirRatings[j].count++;
            }
            
            
        }
        for (var i = 0; i < dirRatings.length; i++) {
            avgRatingsByDirector.push({dir: dirRatings[i].dir, avgRating: dirRatings[i].sum / dirRatings[i].count});
        }
        for (var i = 0; i < movieArr.length; i++) {
            var sumForDirector = 0.0;
            var numMoviesByDirector = 0;
            var director = "";
            for (var d of directorSet) {
                if (movieArr[i].director.includes(d))
                    sumForDirector += movieArr[i].rating;
                    numMoviesByDirector++;
                    director = d;
                    break;
            }
            avgRatingsByDirector.add({dir: director, avgRating: sumForDirector / numMoviesByDirector});
        }
        return avgRatingsByDirector;
    }*/
}