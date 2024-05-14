
import browser from 'webextension-polyfill';


class FilterClass{
    name:string = "";
    color_code:string = "";
    entries:string[] = []
}

let ACTIVE_FILTERS:FilterClass[] = []
// DEBUG //
ACTIVE_FILTERS.push({name: "test", color_code: "#FF00FF", entries: ["year", "month"]}) // uh doesn't this defeat the purpose???

function ApplySearches(){

}
const delimiter_regex = /[^.<>]/;
function FindSentenceDelimiter(source:string, look_index:number, direction:number):number{
    for (; delimiter_regex.test(source[look_index]); look_index += direction);
    return look_index - direction; // go back one
}

function FindStringSentencesIn(source:string, lookfor:string):string[]{
    let match_indicies = FindStringsIn(source, lookfor);
    let results:string[] = []
    for (let i = 0; i < match_indicies.length; i++){
        let char_index:number = match_indicies[i]!;
        let sentence_start = FindSentenceDelimiter(source, char_index, -1);
        let sentence_end = FindSentenceDelimiter(source, char_index+lookfor.length, 1);
        // cutout string and push()
        results.push(source.substring(sentence_start, sentence_end).trimStart()); // if delimited by a . then theres going to be spaces!!
    }
    return results;
}

function FindStringsIn(source:string, lookfor:string){
    return [...source.matchAll(new RegExp(lookfor, 'gi'))].map(a => a.index);
}




function scan_active_page(){

    console.log("scanning page!!");
    let elem = document.getElementById("status_text");
    if (elem != undefined) elem.innerText = "button pressed!!"
    browser.tabs.executeScript({
        code: 'alert(document.title)'
    })

    // NOTE: we actually need to process it as html so we can appropriately splice text content and highlight


}
function scan_link(){
    
}



// INIT DATA STUFF
function INIT(){
    console.log("loaded!!");
    let elem = document.getElementById("status_text");
    if (elem != undefined) elem.innerText = "loaded!!"
    let scan_button:HTMLButtonElement = (document.getElementById("scan_button") as HTMLButtonElement);


    scan_button.addEventListener('click', function() {
        console.log("event listened!!");
        scan_active_page();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    INIT();
});