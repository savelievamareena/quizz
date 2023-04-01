export default function getSiblings(element) {
    let siblings = [];
    let sibling = element.target.parentNode.firstElementChild;

    while(sibling) {
        if (sibling.nodeType === 1 && sibling !== element) {
            siblings.push(sibling);
            sibling = sibling.nextElementSibling;
        }
    }
    return siblings;
}