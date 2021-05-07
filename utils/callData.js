export default class CallData {
    getJSON = (callback) => {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.overrideMimeType('application/json');
        xmlhttp.open("GET", ".././data/Data.json", true);
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(xmlhttp.responseText));
            }
        };
        xmlhttp.send();
    }
}
