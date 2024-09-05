function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}
document.addEventListener("DOMContentLoaded", function() {
    const token = getCookie('address');
    if (!token) {
        window.location.href = "/login";
    }
});
async function fetchStatus(path="",index=0) {
    try {
        const response = await fetch(`http://${getCookie("address")}/bot-tracking/logs/${path}`);
        if (response.ok) {
            const data = await response.json();
            document.getElementById(`panel${index}`).textContent = data.response;
        } else {
            document.getElementById(`panel${index}`).textContent = 'Failed to fetch logs';
        }
    } catch (error) {
        console.error('Error fetching status:', error);
        document.getElementById(`panel${index}`).textContent = 'Error fetching status';
        // document.cookie = "address=;path=/";
    }
}
function refreshData(){
    fetchStatus("login",1); 
    fetchStatus("error",2); 
    fetchStatus("token",3); 
}
setInterval(refreshData, 10000);

