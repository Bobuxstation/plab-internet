var input = document.getElementById("url-bar");
var iframe = document.getElementById("iframe");
var currentURL = ''
iframe.src = window.location.origin + window.location.pathname.split('/').slice(0, 2).join('/') + '/bu/hub'

function reloadIframe() {
    try {
        iframe.contentWindow.document.location.reload()
    } catch (error) {
        iframe.src += ''
    }
}

function sharePage(inMarkdown) {
    try {
        var copyURL = new URL(window.location.origin + window.location.pathname.split('/').slice(0, 2).join('/'))
        copyURL.searchParams.set('url', currentURL)

        if (inMarkdown) {
            copyURL = `[plab://${currentURL}](${copyURL})`
        } else {
            copyURL = copyURL.toString()
        }

        navigator.clipboard.writeText(copyURL)
    } catch (error) {
        alert("Failed to copy page URL: " + error)
    }
}

function loadUrl(url) {
    currentURL = url

    if (!url.includes("/")) {
        var directory = (url + "/").split("/")
        var subdomains = directory[0].split(".").reverse()
        var fullURL = window.location.origin + window.location.pathname.split('/').slice(0, 2).join('/') + '/'
        var extDirectory = ""
    } else {
        var directory = url.split("/")
        var subdomains = directory[0].split(".").reverse()
        var fullURL = window.location.origin + window.location.pathname.split('/').slice(0, 2).join('/') + '/'
        var extDirectory = ""
    }

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

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        if (input.value == "") return;
        loadUrl(input.value)
    }
})

setInterval(() => {
    try {
        document.getElementById('title').innerText = iframe.contentWindow.document.title
    } catch (error) {
        document.getElementById('title').innerText = 'PLABNet'
    }
}, 0);

let urlArgs = new URLSearchParams(window.location.search);
if (urlArgs.has('url')) {
    var url = urlArgs.get('url')
    input.value = url
    loadUrl(url)
}