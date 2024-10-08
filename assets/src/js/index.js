function getLinks() {
    const container = document.getElementById("link-list");

    container.innerHTML = "";

    fetch("assets/links.xml", {mode: 'cors'}).then(response => {
        return response.text();
    }).then(xmlString => {
        const xmlDocument = new DOMParser().parseFromString(xmlString, "text/xml");
        const links = xmlDocument.querySelectorAll("link");

        const items = Array.from(links).map(link => {
            const text = link.getElementsByTagName("text")[0].childNodes[0].nodeValue;
            const url = link.getElementsByTagName("url")[0].childNodes[0].nodeValue;

            console.log(text, url);

            return `
                <div class="link">
                    <a href="${url}"  target="_blank">
                        <h3>${text}</h3>
                    </a>
                </div>
            `;
        });

        if(items.length == 0) {
            container.innerHTML += `<h2>No links available</h2>`;
        }else {
            console.log("join");
            container.innerHTML += items.join("");
        }
    });
}

getLinks();
