// Import stylesheets
import './style.css';

// Write Javascript code!
function createResultsList (content) { 
  var newList = document.createElement("ul"); 
  content.Search.forEach(element => {
      var newListItem = document.createElement("li");
      newListItem.addEventListener('mouseover',handleHover);
      newListItem.innerHTML = '<div class="element" id=' + element.imdbID + '> Name : '+ JSON.stringify(element.Title) + '</div><div><img id=' + element.imdbID + ' src='+ element.Poster +'/></div><div id=' + element.imdbID + '> Type : '+ JSON.stringify(element.Type) + '</div>';
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
    document.getElementById("results-container").innerHTML = JSON.stringify(content.Error)
  }
  else {
    document.getElementById("results-container").innerHTML = "";
    createResultsList(content);
    }
}

const handleHover = async function (evt) {
  const response = await fetch(`https://www.omdbapi.com/?apikey=aba065d3&i=${evt.target.id}`);
  const content = await response.json();
  console.log(content.Director);
}

const search = document.getElementById('search');
search.addEventListener('input', handleInput);

const resultsContainer = document.getElementById('results-container');
resultsContainer.addEventListener('mouseover', handleHover);