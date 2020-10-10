const URL =
    "https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/photos.json";

const app = document.querySelector("#app");
const interval = 100;
const columnQuantity = 1;
const getPhotos = URL => {
    fetch(URL)
        .then(response => onSuccessResponse(response))
        .catch(error => onErrorResponse(error));
};
const createImg = photo => {
    const img = document.createElement("img");
    img.setAttribute("src", photo.url);
    return img;
};

const createColumn = () => {
    const divColumn = document.createElement("div");
    divColumn.classList = "column";
    return divColumn;
};
const createRow = () => {
    const divRow = document.createElement("div");
    divRow.classList = "row";
    return divRow;
};
const onSuccessResponse = response =>
    response.json().then(photos => {
        let row;
        for (const photoIndex in photos) {
            setTimeout(() => {
                const column = createColumn();
                const img = createImg(photos[photoIndex]);
                const name = document.createElement("p");
                name.innerText = photos[photoIndex].title;
                if (photoIndex % columnQuantity === 0) row = createRow();
                row.appendChild(column);
                column.appendChild(img);
                column.appendChild(name);
                app.appendChild(row);
                let fecha = new Date(photos[photoIndex].pubdate);
                let dia = fecha.getUTCDate();
                let mes = fecha.getUTCMonth();
                let year = fecha.getUTCFullYear();
                console.log(dia, mes, year);
                const date = document.createElement("p");
                date.innerText = `fecha: ${dia} / ${mes} / ${year}`;
                column.appendChild(date);
            }, interval * photoIndex);

        }
    });

const onErrorResponse = error => console.error("Aqui esta el error", error);
getPhotos(URL);

/*
fetch('url')
.then(Resolve)
.then(Reject) OR .catch(Reject)

OR directly 

fetch('url').then(ResolveFuntion, RejectFuntion)

*/