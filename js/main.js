
let ACTIVE_FILTERS = [];
// DEBUG //
ACTIVE_FILTERS.push({ name: "test", color_code: "#FF00FF", entries: ["year", "month"] }); // uh doesn't this defeat the purpose???


function scan_active_page() {
    status_text.innerText = "button pressed!!";
    // inject our color data stuff
    // serialize filters into literal code??
    let filters_to_string = 'var ACTIVE_FILTERS = [';
    for (let i = 0; i < ACTIVE_FILTERS.length; i++){
        let c = ACTIVE_FILTERS[i];
        filters_to_string += "{ name: \""+c.name+"\", color_code: \""+c.color_code+"\", entries: [";
        for (let j = 0; j < c.entries.length; j++)
            filters_to_string += "\""+c.entries[j]+"\","
        filters_to_string += "] },"
    }
    filters_to_string += "];"
    console.log(filters_to_string)
    chrome.tabs.executeScript({code: filters_to_string});
    // then run script
    chrome.tabs.executeScript({file: 'js/pagescan.js'});
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
