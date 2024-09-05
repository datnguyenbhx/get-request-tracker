function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}
document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault(); 
    let address = document.getElementById("address").value;
    try {
        const response = await fetch(`http://${address}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ address: address })
        });

        if (response.ok) {
            const data = await response.json();
            var now = new Date();
            now.setTime(now.getTime() + (24 * 60 * 60 * 1000));         
            var expires = "expires=" + now.toUTCString();
            document.cookie = "address="+ address +"; " + expires + "; path=/";
            window.location.href = "/";
        } else {
        }
    } catch (error) {
        console.error('Error fetching status:', error);
    }
});
