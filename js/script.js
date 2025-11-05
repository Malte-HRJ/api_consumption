/* 
@links
* Now playing:  https://api.themoviedb.org/3/movie/now_playing
* Popular: https://api.themoviedb.org/3/movie/popular
* Top rated:  https://api.themoviedb.org/3/movie/top_rated
* Upcoming: https://api.themoviedb.org/3/movie/upcoming
*/

async function fetchData(endpoint, apiKey, queryString) {
  const url =
    "https://api.themoviedb.org/3/movie/" + endpoint + queryString ?? "";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer" + " " + apiKey,
    },
  };
  const res = await fetch(url, options);
  const json = await res.json();
  const data = json;
  return data;
}
async function testDataPopular() {
  const url = "/js/testData.json";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const res = await fetch(url, options);
  const json = await res.json();
  const data = json;
  return data;
}
function constructMovieCard(movie) {
  //? get and clone template
  const template = document.querySelector("#movieCardTemplate");
  const clone = template.content.cloneNode(true);
  const card = clone.querySelector("article.movieCard");
  console.log(template, clone, card);
  //? map data to template
  //poster
  card.querySelector(".movieImage").src =
    "https://image.tmdb.org/t/p/w300/" + movie.poster_path;
  //title
  card.querySelector(".movieTitle").textContent = movie.title;
  //release date
  card.querySelector(".movieReleaseDate").textContent = movie.release_date;
  //rating
  card.querySelector(".movieRating").textContent =
    Math.ceil(movie.vote_average * 10) + "%";
//circular bar around rating
  const circleBar = card.querySelector(".movieRatingBar>circle");
  const circleBarLength = circleBar.getTotalLength();
  circleBar.style.strokeDasharray = circleBarLength;
  circleBar.style.strokeDashoffset =
    circleBarLength - (circleBarLength * movie.vote_average) / 10;
  circleBar.style.stroke = `color-mix(in srgb, green ${
    movie.vote_average * 10
  }%,yellow ${100 - movie.vote_average * 10}%)`;
//overview
  card.querySelector(".movieOverview").textContent = movie.overview;
  return card;
}
window.addEventListener("load", async () => {
  
  const currentEndpoint = window.location.pathname.replace("/","").replace(".html","")
  const apiKey ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjI3NTA4MTI3NTQzOWRiYzcwZDRhMDczMjEzMGZlYyIsIm5iZiI6MTc1OTEzNjMyMC43ODQ5OTk4LCJzdWIiOiI2OGRhNGE0MDQ4NzQyMWM4Y2IzOGMxYjciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Ec_tx2fZ_g30A4tVgQv5_r18LNo3Z3M5DMPdJ6P5jaU"
  const data = await fetchData(currentEndpoint,apiKey,"");

  data.results.forEach((movie) => {
    const card = constructMovieCard(movie);
    
    document.querySelector("#movieCardWrapper").appendChild(card);
  });
});
