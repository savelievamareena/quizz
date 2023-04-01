export default function decodeString(string) {
    let txt = document.createElement("textarea");
    txt.innerHTML = string;
    return txt.value;
}