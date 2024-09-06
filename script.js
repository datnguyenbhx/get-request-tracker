async function apiCall(path="") {
    console.log(path)
    try {
        const response = await fetch(path);
        if (response.ok) {
            try {
                const data = await response.json();
                return Object.entries(data)
                    .map(([key, value]) => `${key}\n___________\n${value}`)
                    .join("\n");

            } catch (error) {
                console.error('Error converting response:', error)
                const data = await response.text()
                return data
            }
        } else {
            return 'Failed to fetch logs';
        }
    } catch (error) {
        console.error('Error fetching status:', error);
    }
}

function addBox(event) {
    var parentDiv = event.target.parentElement;
    var newBox = parentDiv.querySelector('.resize-box').cloneNode(true);
    newBox.style.display = "inline-block";
    parentDiv.appendChild(newBox);
}

function rmParent(event) {
    var parentElement = event.target.parentElement;
    parentElement.remove();
}

async function refreshData(){
    let urls = Array.from(document.querySelectorAll(".url-input"));
    urls.splice(0, 1); 
    for (const input of urls) {
        const url = input.value;
        if(!url) continue
        const res = await apiCall(url); 
        const parentDiv = input.parentElement; 
        parentDiv.querySelector(".content").innerText = res;
    }
}
setInterval(refreshData, 10000);
refreshData()
