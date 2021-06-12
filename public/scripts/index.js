const base_URL = 'http://localhost:8081';

/****************************************/
/* Functions that issue server requests */
/****************************************/

//edit for buttons
const clickButtonForContent = () => {
    document.querySelectorAll('.showModule').forEach(elem => {
        elem.onclick = showDetail;
    });
};

const showCards = () => {
    fetch('/Module')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const cards = data.map(item => `
            <div class="card">
                <h3 class="course-name">
                    ${item.title}
                </h3>
            <p class="course-description">
                ${item.description}
            </p>
            <div>
                <button class="showModule" module_id="${item._id}">
                    Grow
                </button>
            </div>
            </div>`
            );
            document.getElementById('modules').innerHTML = cards.join('')
        })
        .then(clickButtonForContent);
}

const showDetail = ev => {
    ev.preventDefault();
    window.location.href="course-page.html#id="+ev.currentTarget.getAttribute("module_id") 
}

showCards();
