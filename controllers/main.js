import CallData from '../utils/callData.js';
import ListChosen from '../models/ListChosen.js';
import ChoseItem from '../models/ChoseItem.js';

let callData = new CallData();
let listChosen = new ListChosen();

callData.getJSON(data => {
    let contentPill = "";
    let contentTabPane = "";
    data.navPills.forEach(item => {
        let activeClass = item.tabName === "tabTopClothes" ? "active" : "";
        let fadeClass = item.tabName !== "tabTopClothes" ? "fade" : "";

        contentPill += getElmTabPills(item, activeClass);

        contentTabPane +=
            `<div class="tab-pane container ${fadeClass} ${activeClass}" id="${item.tabName}">
                <div class="row">
                    ${renderTabPane(item.tabName, data.tabPanes)}
                </div>
            </div>`;
    });

    document.querySelector(".nav-pills").innerHTML = contentPill;
    document.querySelector(".tab-content").innerHTML = contentTabPane;
});

const getElmTabPills = (nav, activeClass) => {
    return `<li class="nav-item">
        <a class="nav-link btn-default ${activeClass}" data-toggle="pill" href="#${nav.tabName}">
            ${nav.showName}
        </a>
    </li>`;
}

const renderTabPane = (tabName, arrTabPanes) => {
    let tempArr = null;
    let elmItem = null;
    switch (tabName) {
        case "tabTopClothes":
            tempArr = getTypeArr("topclothes", arrTabPanes);
            elmItem = getElmItem(tempArr);
            break;
        case "tabBotClothes":
            tempArr = getTypeArr("botclothes", arrTabPanes);
            elmItem = getElmItem(tempArr);
            break;
        case "tabShoes":
            tempArr = getTypeArr("shoes", arrTabPanes);
            elmItem = getElmItem(tempArr);
            break;
        case "tabHandBags":
            tempArr = getTypeArr("handbags", arrTabPanes);
            elmItem = getElmItem(tempArr);
            break;
        case "tabNecklaces":
            tempArr = getTypeArr("necklaces", arrTabPanes);
            elmItem = getElmItem(tempArr);
            break;
        case "tabHairStyle":
            tempArr = getTypeArr("hairstyle", arrTabPanes);
            elmItem = getElmItem(tempArr);
            break;
        case "tabBackground":
            tempArr = getTypeArr("background", arrTabPanes);
            elmItem = getElmItem(tempArr);
            break;

        default:
            break;
    }
    return elmItem;
}

const getTypeArr = (tabType, data) => {
    let tempArr = [];
    data.forEach(function (item) {
        if (item.type === tabType) {
            tempArr.push(item);
        }
    });
    return tempArr;
}

const getElmItem = tempArr => {
    let elmItem = "";
    tempArr.forEach(function (item) {
        elmItem +=
            `<div class="col-md-3">
            <div class="card text-center">
                <img src="${item.imgSrc_jpg}" />
                <h4>
                    <b>${item.name}</b>
                </h4>
                <button data-id="${item.id}" data-type="${item.type}" data-name="${item.name}" data-desc="${item.desc}" data-imgsrcjpg="${item.imgSrc_jpg}"  data-imgsrcpng="${item.imgSrc_png}" class="changeStyle" onclick="tryOn(this)">Thử đồ</button>
            </div>
        </div>
    `;
    });
    return elmItem;
}

const findIndex = type => {
    let index = -1;
    if (listChosen.arr && listChosen.arr.length > 0) {
        listChosen.arr.forEach((_item, i) => {
            if (_item.type === type) {
                index = i;
            }
        });
    }
    return index;
}

const tryOn = (e) => {
    let id = e.getAttribute("data-id");
    let type = e.getAttribute("data-type");
    let name = e.getAttribute("data-name");
    let desc = e.getAttribute("data-desc");
    let imgsrc_jpg = e.getAttribute("data-imgsrcjpg")
    let imgSrc_png = e.getAttribute("data-imgsrcpng");

    let choseItem = new ChoseItem(id, type, name, desc, imgsrc_jpg, imgSrc_png);

    let index = findIndex(choseItem.type);

    if (index !== -1) {
        listChosen.arr[index] = choseItem;
    } else {
        listChosen.addAddItem(choseItem);
    }

    renderContain(listChosen.arr);
}

const renderContain = chosenItems => {
    if (chosenItems && chosenItems.length > 0) {
        chosenItems.forEach(item => {
            if (item.type === "topclothes") {
                renderBikiniTop(item.imgsrc_png);
            }
            if (item.type === "botclothes") {
                renderBikiniBottom(item.imgsrc_png);
            }
            if (item.type === "shoes") {
                renderFeet(item.imgsrc_png);
            }
            if (item.type === "handbags") {
                renderHandbags(item.imgsrc_png);
            }
            if (item.type === "necklaces") {
                renderNecklace(item.imgsrc_png);
            }
            if (item.type === "hairstyle") {
                renderHairstyle(item.imgsrc_png);
            }
            if (item.type === "background") {
                renderBackground(item.imgsrc_png);
            }
        });
    }
}

const renderBikiniTop = img => {
    document.querySelector(".bikinitop").style.cssText = `
        width: 500px;
        height: 500px;
        background: url(${img});
        position: absolute;
        top: -9%;
        left: -5%;
        z-index: 3;
        transform: scale(0.5)
    `;
}

const renderBikiniBottom = img => {
    document.querySelector(".bikinibottom").style.cssText = `
        width: 500px;
        height: 1000px;
        background: url(${img});
        position: absolute;
        top: -30%;
        left: -5%;
        z-index: 2;
        transform: scale(0.5)
    `;
}

const renderFeet = img => {
    document.querySelector(".feet").style.cssText= `
        width: 500px;
        height: 1000px;
        background: url(${img});
        position: absolute;
        bottom: -37%;
        right: -3.5%;
        transform: scale(0.5);
        z-index: 1
    `;
}

const renderHandbags = img => {
    document.querySelector(".handbag").style.cssText = `
        width: 500px;
        height: 1000px;
        background: url(${img});
        position: absolute;
        bottom: -40%;
        right: -3.5%;
        transform: scale(0.5);
        z-index: 4
    `;
}

const renderNecklace = img => {
    document.querySelector(".necklace").style.cssText = `
        width: 500px;
        height: 1000px;
        background: url(${img});
        position: absolute;
        bottom: -40%;
        right: -3.5%;
        transform: scale(0.5);
        z-index: 4
    `;
}

const renderHairstyle = img => {
    document.querySelector(".hairstyle").style.cssText = `
        width: 1000px;
        height: 1000px;
        background: url(${img});
        position: absolute;
        top: -75%;
        right: -57%;
        transform: scale(0.15);
        z-index: 4
    `;
}

const renderBackground = img => {
    document.querySelector(".background").style.cssText = `
        background-image: url(${img})
    `;
}

window.tryOn = tryOn;


