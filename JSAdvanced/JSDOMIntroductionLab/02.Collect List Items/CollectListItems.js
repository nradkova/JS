function extractText() {
    document.getElementById('result').textContent = Array
        .from(document.getElementsByTagName('li'))
        .map(x => x.textContent)
        .join('\n');
}