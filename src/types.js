
export class MovieInfo {
    constructor (type, image, title, {m,d,y}, genres, castList, directors, summary, ratings){
        this.type = type;
        this.image = image;
        this.title = title;
        this.releaseDate = {m,d,y};
        this.castList = castList;
        this.directors = directors;
        this.summary = summary;
        this.genres = genres;
        this.ratings = ratings;
    }
}

export class Rating {
    constructor (stars, review, tags, author){
        this.stars = stars;
        this.review = review;
        this.tags = tags;
        this.author = author;
    }
}