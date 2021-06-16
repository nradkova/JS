function editElement(ref, match, replacer) {
    const newContent = ref.textContent.replace(new RegExp(match, 'g'), replacer);
    ref.textContent = newContent;
}

