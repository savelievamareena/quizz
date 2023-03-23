export default function decodeString(string) {
    var txt = document.createElement("textarea");
    txt.innerHTML = string;
    return txt.value;
}