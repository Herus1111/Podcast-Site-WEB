const ul = document.getElementById("podcastList");
const Btn = document.getElementById("toggleViewBtn");

let istTileView = true;

function render() {
    if (istTileView) {
        Btn.textContent = "Listenansicht";
        tileView();
    } else {
        Btn.textContent = "Kachelansicht";
        listView();
    }
}

function listView() {
    ul.className = "listview";
}

function tileView() {
    ul.className = "tileView";
}
Btn.addEventListener("click", () => {
    istTileView = !istTileView;
    render();
});

render();