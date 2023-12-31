import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class MongoDB{
async connect() {
  this.uri = "mongodb+srv://shanestallman:366xQh1k6czkhr3M@movierecommender.mna23oz.mongodb.net/?retryWrites=true&w=majority"
  try{
  this.client = await MongoClient.connect(this.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  this.db = this.client.db('Movies');
        this.collection = this.db.collection('info');
        console.log("Connected to Movies.info collection");
        console.log("Connected");
  }
  catch(error){
    console.error(error);
  }
}

async createNewMovie(information, ratings) {
  try {
    const res = await this.collection.insertOne({information});
    await this.addRating(information.title, ratings);
    console.log(`Success`);
    return res;
} catch (error) {
    console.error(error);
    throw new Error('Failed to add Movie');
}
}

async addRating(title, rating){
  const filter = {'information.title': title}
  const update = { $set: {} };
  update.$set[`ratings`] = [];
  const res = await this.collection.updateOne(filter, update);
  return res
}

async searchMovieByID(title) {
  const res = await this.collection.find({'information.title': title}).toArray();
  return res;
}

async deleteMovieByID(title) {
  try {
    const res = await this.collection.deleteOne({'information.title': title });
    if (res.deletedCount === 1) {
      return { success: true, message: 'Movie deleted successfully' };
    } else {
      return { success: false, message: 'Movie not found or not deleted' };
    }
  } catch (error) {
    return { success: false, message: 'An error occurred while deleting the movie' };
  }
}

async getMyList(list) {
  console.log(list);
  let resArray = []
  for(let i = 0; i < list.length; ++i){
    let res = await this.collection.find({'information.title': list[i]}).toArray();
    resArray.push(res[0]);
  }
  return resArray;
}

async searchMoviesByGenre(genre) {
  let regex = new RegExp(genre, "i");
  const res = await this.collection.find({'information.genres': regex}).toArray();
  return res;
}

async readAllMovies() {
  let res = await this.collection.find({}).toArray();
  let returnArray = res.sort((a, b) => a.information.title.localeCompare(b.information.title));
  let sliceNumber = 20;
  if(sliceNumber >= res.length){
    sliceNumber = res.length;
  }
  const allMovies20 = returnArray.slice(0,sliceNumber);
  return allMovies20;
}

async compareAllMovies(type, title) {
  const baseMovieArray = await this.collection.find({'information.title': title}).toArray();
  if(baseMovieArray.length == 0){
    return [];
  }
  else{
  let baseMovie = baseMovieArray[0];
  
  const allMovies = await this.collection.find({}).toArray();
  let sortingArray = [];
  for(let movie in allMovies){
    let points = 0;
    if(allMovies[movie].information.type == type && allMovies[movie].information.title != title){
      //Calculate Title

      //Calculate Genres
      let baseGenresArray = baseMovie.information.genres.split(", ");
      let compareGenresArray = allMovies[movie].information.genres.split(", ");
      for(let baseGenre in baseGenresArray){
        for(let compareGenre in compareGenresArray){
          if(baseGenresArray[baseGenre] == compareGenresArray[compareGenre]){
            points += 1;
          }
        }
      }
      //Calculate Actors
      let baseActorsArray = baseMovie.information.castList.split(", ");
      let compareActorsArray = allMovies[movie].information.castList.split(", ");
      for(let baseActor in baseActorsArray){
        for(let compareActor in compareActorsArray){
          if(baseActorsArray[baseActor] == compareActorsArray[compareActor]){
            points += 1;
          }
        }
      }
      //Calculate Directors
      let baseDirectorsArray = baseMovie.information.directors.split(", ");
      let compareDirectorsArray = allMovies[movie].information.directors.split(", ");
      for(let baseDirectors in baseDirectorsArray){
        for(let compareDirectors in compareDirectorsArray){
          if(baseDirectorsArray[baseDirectors] == compareDirectorsArray[compareDirectors]){
            points += 2;
          }
        }
      }
      //Calculate Tags
      let baseRatingsArray = baseMovie.ratings;
      let compareRatingsArray = allMovies[movie].ratings;
      for(let baseRatings in baseRatingsArray){
        let baseTagsArray = baseMovie.ratings[baseRatings].tags.split(", ");
        for(let compareRatings in compareRatingsArray){
          let compareTagsArray = allMovies[movie].ratings[compareRatings].tags.split(", ");
          for(let baseTags in baseTagsArray){
            for(let compareTags in compareTagsArray){
              if(baseTagsArray[baseTags] == compareTagsArray[compareTags]){
                points += 0.2;
            }
          }
        }
      }
    }

      sortingArray.push({"title": allMovies[movie].information.title, "points": points})
      
    }
  }
  let returnArray = [];
  sortingArray.sort((a, b) => b.points - a.points);
  
  for(let item in sortingArray){
    let response = await this.collection.find({'information.title': sortingArray[item].title}).toArray();
    returnArray.push(response[0]);
  }

  returnArray.slice(0,20);  
  return returnArray;
}
}

async getWhatsNew() {
  const res = await this.collection.find({}).toArray();
  console.log(res[0].information.releaseDate.y);
  res.sort((a,b) => b.information.releaseDate.y - a.information.releaseDate.y);
  let sliceNumber = 20;
  if(sliceNumber >= res.length){
    sliceNumber = res.length;
  }
  const latest20 = res.slice(0,sliceNumber);
  return latest20;
}

async getRandom(){
  const res = await this.collection.aggregate([{ $sample: { size: 1 } }]).toArray();
  return res;
}

async editMovie(title, field, newValue){
  const filter = {'information.title': title}
  const update = { $set: {} };
  update.$set[`information.${field}`] = newValue;
  const res = await this.collection.updateOne(filter, update);
  return res
}

async addRatingMovie(title, rating){
  let currRatings = await this.collection.find({'information.title': title}).toArray();
  let ratings = currRatings[0].ratings;
  console.log(rating);
  ratings.push(rating);
  let pushRating = ratings;
  console.log(pushRating)
  const filter = {'information.title': title}
  const update = { $set: {} };
  update.$set[`ratings`] = pushRating;
  const res = await this.collection.updateOne(filter, update);
  return res
}

async close() {
  await this.client.close();
}
}

let mongo = new MongoDB();
export{mongo};
