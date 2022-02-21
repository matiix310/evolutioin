const svgLogo = '<svg class="svg-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 822.52 755.78"><path class="cls-1" d="M1189.49,520.29,1367,924.78,1148.44,626.21c-47.36,37.33-103.15,60.86-166,72.85l-23.88,62.46-33.44-80.38c-51.67-10.1-98-32.48-139.74-65.68L552.48,921.2,730.3,532l-.87-1a250.26,250.26,0,0,1-22.6-103.92C706.83,289.91,819.74,177,957,177s250.13,112.91,250.13,250.13A250.17,250.17,0,0,1,1189.21,520Z" transform="translate(-548.48 -173)"/></svg>'
const svgLogoHtml = document.createElement("div");
svgLogoHtml.classList.add('svg-container');
svgLogoHtml.innerHTML = svgLogo;

setInterval(() => {
    var randomh = Math.round(Math.random()*(innerHeight-300));
    var randomw = Math.round(Math.random()*(innerWidth-300));
    var randomRotation = Math.round(Math.random()*90-45);

    svgLogoHtml.style.left = randomw+"px";
    svgLogoHtml.style.top = randomh+"px";
    svgLogoHtml.style.transform = "rotate("+randomRotation+"deg)";
    document.getElementById("header").before(svgLogoHtml);
}, 4000);

$('.menu-selector').on('click', (e) => {
    if (!e.target.nodeName === "SPAN" || e.target.classList.contains('active')) return;

    $('.menu-selector').find('span').each((index, element) => {
        element.classList.remove('active');
    });

    e.target.classList.add('active');

    // set new datas
    index = $('.menu-selector').find('span').index(e.target);
    if (index >= 0) setNewDatas(index);
})


// datas managment

let datas;

function readJsonFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(JSON.parse(rawFile.responseText));
        }
    }
    rawFile.send(null);
}

readJsonFile("./datas.json", (data) => {
    datas = data.datas;

    // init
    setNewDatas(0);
});

function setNewDatas(index) {
    $('.description').text(datas[index].description);
    $('.date').text(datas[index].date);
}