var input = document.getElementById("url-bar");
var iframe = document.getElementById("iframe");

function reloadIframe() {
    try {
        iframe.contentWindow.document.location.reload()
    } catch (error) {
        iframe.src += ''
    }
}

setInterval(() => {
    try {
        document.getElementById('title').innerText = iframe.contentWindow.document.title
    } catch (error) {
        document.getElementById('title').innerText = 'PLABNet'
    }
}, 0);

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        if (!input.value.includes("/")) {
            var directory = (input.value + "/").split("/")
            var subdomains = directory[0].split(".").reverse()
            var fullURL = "../"
            var extDirectory = ""
        } else {
            var directory = input.value.split("/")
            var subdomains = directory[0].split(".").reverse()
            var fullURL = "../"
            var extDirectory = ""
        }

        input.value = ''

        subdomains.forEach((element, index) => {
            if (index == subdomains.length - 1) {
                directory.forEach((dir, index) => {
                    if (index != 0) {
                        extDirectory += "/" + dir

                        if (index == directory.length - 1) {
                            fullURL += element
                            fullURL += extDirectory
                            fetch(fullURL).then((response) => {
                                if (response.ok) {
                                    iframe.src = fullURL;
                                } else {
                                    iframe.src = '404.html';
                                }
                            }).catch((error) => { iframe.src = '404.html'; });
                        }
                    }
                })
            } else {
                fullURL += element + '/'
            }
        });
    }
});