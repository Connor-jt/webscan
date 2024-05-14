
let ACTIVE_FILTERS = [];
// DEBUG //
ACTIVE_FILTERS.push({ name: "test", color_code: "#FF00FF", entries: ["year", "month"] }); // uh doesn't this defeat the purpose???
function ApplySearches() {
}
const delimiter_regex = /[^.\<\>]/;
function FindSentenceDelimiter(source, look_index, direction) {
    for (; delimiter_regex.test(source[look_index]); look_index += direction)
        ;
    return look_index - direction; // go back one
}
function FindStringSentencesIn(source, lookfor) {
    let match_indicies = [...source.matchAll(new RegExp(lookfor, 'gi'))].map(a => a.index);
    let results = [];
    for (let i = 0; i < match_indicies.length; i++) {
        let char_index = match_indicies[i];
        let sentence_start = FindSentenceDelimiter(source, char_index, -1);
        let sentence_end = FindSentenceDelimiter(source, char_index + lookfor.length, 1);
        // cutout string and push()
        results.push(source.substring(sentence_start, sentence_end).trimStart()); // if delimited by a . then theres going to be spaces!!
    }
    return results;
}

function scan_active_page() {
    status_text.innerText = "button pressed!!";
    chrome.tabs.executeScript({
        code: 'document.body.innerHTML'
    }, parsehtml);
}

function parsehtml(resultsArray){
    scanHTML(resultsArray[0]);
}
function scanHTML(source){
    status_text.innerText = ""
    for(let filter_index = 0; filter_index < ACTIVE_FILTERS.length; filter_index++){
        let curr_filter = ACTIVE_FILTERS[filter_index];
        for(let filter_entry = 0; filter_entry < curr_filter.entries.length; filter_entry++){
            let curr_entry = curr_filter.entries[filter_entry];
            status_text.innerText += "RESULT: " + FindStringSentencesIn(source, curr_entry)
        } 
    } 
}

// INIT DATA STUFF
let status_text = undefined;
document.addEventListener('DOMContentLoaded', function () {
    status_text = document.getElementById("status_text");
    status_text.innerText = "loaded!!";
    document.getElementById("scan_button").addEventListener('click', function() {
        scan_active_page();
    });
});
