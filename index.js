// Import stylesheets
import './style.css';

// Write Javascript code!
function createResultsList (content) { 
  var newList = document.createElement("ul"); 
  content.Search.forEach(element => {
      var newListItem = document.createElement("li");
      newListItem.setAttribute("id",element.imdbID);
      newListItem.setAttribute("class","tooltip");
      newListItem.innerHTML = '<div><div class="movie-title"> '+ JSON.stringify(element.Title).slice(1, -1) + '</div><div class="image-container"><img src='+ element.Poster +'/></div><div class="movie-type"> '+ JSON.stringify(element.Type).slice(1, -1) + '</div></div>';
      newListItem.addEventListener('mouseenter',handleMouseEnter);
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

let hoverId = '';
const handleMouseEnter = async function (evt) {
   if (evt.target.id !== hoverId) {
      hoverId = evt.target.id;
      const response = await fetch(`https://www.omdbapi.com/?apikey=aba065d3&i=${evt.target.id}`);
      const content = await response.json();
      if(content.Director){
        var element = document.getElementById(evt.target.id);
        element.innerHTML += '<span class="tooltiptext">Title - '+ content.Title + ' <br />Year - '+ content.Year + '<br />Rating - '+ content.imdbRating +'<br />Director - '+ content.Director +'</span>';
      }
      else {

      }
   }
}
  
const search = document.getElementById('search');
search.addEventListener('input', handleInput);