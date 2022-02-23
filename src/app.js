const navigator = document.querySelector("#navigator");
window.addEventListener("DOMContentLoaded", () => {});

document.addEventListener("init", (e) => {
  if (e.target.id === "home") {
    fetchListPageData();
  } else if (e.target.id === "details") {
    fetchDetailsPageData(navigator.topPage.data.pageId);
  }
});

const fetchListPageData = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
    .then((response) => response.json())
    .then((data) => addDataToList(data));
};

const addDataToList = (data) => {
  var list = document.querySelector("#pokemonList");
  data.results.forEach((element, index) => {
    list.appendChild(createChevronListItem(element.name, index));
  });
};

const itemClickListener = (e) => {
  changePage("details.html", { pageId: e.currentTarget.id });
};

const fetchDetailsPageData = (pageId) => {
  fetch("https://pokeapi.co/api/v2/pokemon/" + pageId)
    .then((response) => response.json())
    .then((data) => bindDetailPage(data));
};

const bindDetailPage = (data) => {
  let tbTitle = document.querySelector("#tbTitle");
  let imgPokemon = document.querySelector("#imgPokemon");
  let pokemonTitle = document.querySelector("#pokemonTitle");
  
  
  tbTitle.innerHTML = data.species.name;
  imgPokemon.src = data.sprites.front_default;
  pokemonTitle.innerHTML = data.species.name + " #" + data.game_indices[0].game_index;
  addTypesList(data.types);
  addStatList(data.stats);
};

const addTypesList = (types) => {
  let typesListNode = document.querySelector("#typesList");
  types.forEach((typeItem) => {
    typesListNode.appendChild(createListItem(typeItem.type.name));
  });
}

const addStatList = (stats) => {
  let statsListNode = document.querySelector("#statsList");
  stats.forEach((statsItem) => {
    statsListNode.appendChild(
        createListItem(
          statsItem.stat.name, statsItem.effort, statsItem.base_stat
        ));
  });
}

const changePage = (page, data) => {
  navigator.pushPage(page, { data });
};

function createChevronListItem(input, index) {
  let item = document.createElement("ons-list-item");
  item.setAttribute("modifier", "chevron");
  item.setAttribute("tappable", "true");
  item.innerHTML = input;
  item.id = "" + (index + 1);
  item.addEventListener("click", itemClickListener);
  return item;
}

function createListItem(name, effort, stat) {
  let item = document.createElement("ons-list-item");
  var spanItem = document.createElement("span");
  spanItem.innerHTML = name;
  spanItem.style.marginRight = "10px";
  item.appendChild(spanItem);
  
  if(typeof effort !== "undefined") {
  spanItem = document.createElement("span");
  spanItem.className = "notification";
  spanItem.style.backgroundColor = "blue";
  spanItem.style.marginRight = "10px";
  spanItem.innerHTML = effort;
  item.appendChild(spanItem);
  }

  if(typeof stat !== "undefined") {
  spanItem = document.createElement("span");
  spanItem.className = "notification";
  spanItem.style.backgroundColor = "red";
  spanItem.innerHTML = stat;
  item.appendChild(spanItem);
  }
  return item;
}

const popPage = () => navigator.popPage();
// Padd the history with an extra page so that we don't exit right away
window.addEventListener('load', () => window.history.pushState({ }, ''));
// When the browser goes back a page, if our navigator has more than one page we pop the page and prevent the back event by adding a new page
// Otherwise we trigger a second back event, because we padded the history we need to go back twice to exit the app.
window.addEventListener('popstate', () => {
  const { pages } = navigator;
  if (pages && pages.length > 1) {
    popPage();
    window.history.pushState({ }, '');
  } else {
    window.history.back();
  }
});
