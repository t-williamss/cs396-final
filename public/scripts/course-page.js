const base_URL = 'http://localhost:8081';

let module_id;

const getModuleID = () => {
    let URL = window.location.href;
    module_id = URL.split("=")[1];
    console.log(module_id)
}

const updatePageTitle = () => {
    fetch('/Module')
    .then(response => response.json())
        .then(data => {
            const currentModule = data.filter(item => item._id === module_id)[0]
            const pageTitle = `<h1 class="bar-heading">${currentModule.title} | Roots</h1>`;
            document.getElementById('pageTitleContent').innerHTML = pageTitle;
        })
}


const loadSideBar = () => {
    fetch('/Module/'+module_id)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let theHTML = `
            <div class="sidebar-content">
            <div class="back-buttons">
                <a href="index.html">
                    <h1>&lt <img src="/assets/images/roots-logo1.png" width="80"></h1>
                </a>
            </div>
            <h3 class="bar-heading">
                ${data.module.title}
            </h3>
            <ul>
            `;
            const sideBar = data.children.map(item => `
                    <li>
                        <a href="course-page.html" class="side-link">
                            ${item.step_title}
                        </a>
                    </li>`
            )
            theHTML += sideBar.join('') + `
            </ul>
            </div>`
            document.getElementById('sideBarContent').innerHTML = theHTML;
        })
    }

const loadPage = () => {
    fetch('/Module/'+module_id)
        .then(response => response.json())
        .then(data => {
            const textContent = data.children.map(item => `
            <p>
                ${item.text}
            </p>`
            )
            document.getElementById('textContainer').innerHTML = textContent.join('');
        })
}

getModuleID();
updatePageTitle();
loadSideBar();
loadPage();