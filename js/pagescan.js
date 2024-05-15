



const delimiter_regex = /[^.\<\>]/;
function FindSentenceDelimiter(look_index, direction) {
    for (; delimiter_regex.test(document.body.innerHTML[look_index]); look_index += direction);
    return look_index - direction; // go back one
}
function insert(a, position, b){
    return [a.slice(0, position), b, a.slice(position)].join('');
}
const match_word_opener = "<b style=\"background-color:#FFFF00; color:#000000\">";
const match_word_closer = "</b>";
const match_sentence_opener = "<span style=\"background-color:#b6b0f7; color:#000000\">";
const match_sentence_closer = "<span>";
function FindStringSentencesIn(lookfor) {
    let updated_innerHTML = document.body.innerHTML;
    let match_indicies = [...updated_innerHTML.matchAll(new RegExp(lookfor, 'gi'))].map(a => a.index);

    for (let i = match_indicies.length-1; i >= 0; i--) { // iterate backwards so we dont mess up any of the offsets??
        let char_index = match_indicies[i];
        let sentence_start = FindSentenceDelimiter(char_index, -1);
        let sentence_end = FindSentenceDelimiter(char_index + lookfor.length, 1);
        // cutout string and push()
        let resulting_sentence = updated_innerHTML.substring(sentence_start, sentence_end).trimStart();
        // close sentence span at the end
        updated_innerHTML = insert(updated_innerHTML, sentence_end, match_sentence_closer)
        // close span at the end of found word
        updated_innerHTML = insert(updated_innerHTML, char_index+lookfor.length, match_word_closer)
        // open span at word beginning
        updated_innerHTML = insert(updated_innerHTML, char_index, match_word_opener)
        // open span at sentence beginning
        updated_innerHTML = insert(updated_innerHTML, sentence_start, match_sentence_opener)
    }
    document.body.innerHTML = updated_innerHTML
}
function scanHTML(){
    let matches = []
    for(let filter_index = 0; filter_index < ACTIVE_FILTERS.length; filter_index++){
        let curr_filter = ACTIVE_FILTERS[filter_index];
        for(let filter_entry = 0; filter_entry < curr_filter.entries.length; filter_entry++){
            let curr_entry = curr_filter.entries[filter_entry];
            FindStringSentencesIn(curr_entry);
        } 
    } 
}

// INIT THE SCAN //
scanHTML();