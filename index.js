// Initialising constants and variables.
let myLeads = [] // array stores all of the saved urls
const inputEl = document.getElementById("input-el") 
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")
// myLeads be an empty array before saving any urls. If urls have been saved, 
// will read the array of urls in string format from the localStorage,
// then parse it into an array.
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")) 

// function captures if there are existing leads in the local storage.
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// function to allow manual input of urls in input box.
inputBtn.addEventListener("click", function() {
    // Save whatever is in input box into myLeads array.
    myLeads.push(inputEl.value)

    inputEl.value = "" // Clear input field after saving to myLeads array

    // Convert myLeads array to string form, and save to localStorage
    // This is to allow traversing across webpages, while maintaining
    // array of URLs.
    localStorage.setItem("myLeads", JSON.stringify(myLeads)) 

    // To render the saved array afterwards. See function below.
    render(myLeads)
    
})

// This function takes the whole leads array, breaks it into the indiv
// url, and renders it out on the extension. 
function render(leads) {
    // Initialise string: Will eventually compile all of the HTML needed,
    // based on the number of urls in leads array, and then push the 
    // compiled HTML into the innerHTML attribute of the unordered list element.
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        // For every item on the leads array, to append a new
        // list tag, and within each list tag, to have an 
        // anchor tag which converts saved url as a hyperlink
        listItems += ` 
            <li>
                <a href='${leads[i]}' target='_blank'> 
                    ${leads[i]}
                </a>
            </li>
                     ` 

    }
    
    // Set innerHTML of the unordered list elements as list items.
    ulEl.innerHTML = listItems 

}

// function to save the current tab that user is on, without
// inputting anything. 
tabBtn.addEventListener("click", function() {
    // Grab URL of current tab, in the current window (in the event where 
    // have multiple windows of Chrome, will select the front-facing one)
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

// function clears DOM i.e. clears list of saved urls
deleteBtn.addEventListener("dblclick", function() {
    myLeads = []
    localStorage.clear()
    render(myLeads) // renders the emptied list, so DOM should be cleared.
})