// Import stylesheets
import './style.css';

// Write Javascript code!
function createResultsList (content) { 
  var newList = document.createElement("ul"); 
  //console.log(content);
  content.Search.forEach(element => {
      var newListItem = document.createElement("li");
      newListItem.addEventListener('mouseover',handleHover);
      newListItem.innerHTML = '<div class="tooltip" id=top'+element.imdbID+'><div class="movie-title" id=' + element.imdbID + '> '+ JSON.stringify(element.Title).slice(1, -1) + '</div><div class="image-container"><img id=' + element.imdbID + ' src='+ element.Poster +'/></div><div class="movie-type" id=' + element.imdbID + '> '+ JSON.stringify(element.Type).slice(1, -1) + '</div></div>';
      newList.appendChild(newListItem);  
    });
  document.getElementById("results-container").appendChild(newList);
}

const handleInput = async function (evt) {
  if (!evt.target.value || evt.target.value === '') {
    return;
  }
  const response = await fetch(`https://www.omdbapi.com/?apikey=aba065d3&s=${evt.target.value}`);
  const content = await response.json();
  if(content.Response === 'False'){
    var Error = JSON.stringify(content.Error).slice(1,-1);
    document.getElementById("results-container").innerHTML = Error; 
  }
  else {
    document.getElementById("results-container").innerHTML = "";
    createResultsList(content);
    }
}

const handleHover = async function (evt) {
  const response = await fetch(`https://www.omdbapi.com/?apikey=aba065d3&i=${evt.target.id}`);
  const content = await response.json();
  if(content.Director){
   var element = document.getElementById('top'+evt.target.id);
   element.innerHTML += '<span class="tooltiptext">Title - '+ content.Title + ' <br />Year - '+ content.Year + '<br />Rating - '+ content.imdbRating +'<br />Director - '+ content.Director +'</span>';
  }
  else {

  }
}

const search = document.getElementById('search');
search.addEventListener('input', handleInput);

// document.querySelectorAll('li').forEach(element => {
//   element.addEventListener('mouseenter', handleHover);
// })

// const resultsContainer = document.getElementById('results-container');
// resultsContainer.addEventListener('mouseover', handleHover);

// allElements.forEach(element => {
//   element.addEventListener('mouseenter',handleHover);
// })