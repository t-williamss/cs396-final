const base_URL = 'http://localhost:8081';

const displayForm = () => {
  document.querySelector('#showForm').innerHTML = `
  <form>
      <!-- Title -->
      <label for="title">Title</label>
      <input type="text" id="title">

      <!-- Description -->
      <label for="description">Description</label>
      <input type="text" id="description">

      <!-- Tags -->
      <label for="tags">Tags</label>
      <input type="text" id="tags">

      <!-- Users -->
      <br>
        <label for="users">Users:</label>
        <select id="users" name="users">
          <option value="Teachers">Teachers</option>
          <option value="Youth">Youth</option>
        </select>
      </br>

      <!-- Buttons -->
      <button class="btn" id="cancel">Cancel</button>
      <button class="btn btn-main" id="create">Save</button>
  </form> `
  document.querySelector('#create').onclick = createModule;
  document.querySelector('#cancel').onclick = cancelModule;
}

const createModule = ev => {
    ev.preventDefault();
    console.log("submitting Form")
    const data = {
        title: document.getElementById('title').value,
        tags: document.getElementById('tags').value.split(','),
        description: document.getElementById('description').value,
        users: document.getElementById('users').value
    }
    if (!data.title) {
        document.getElementById('create').innerHTML += `
        <p>Title is not valid.</p>`
     } else if (!data.tags) {
        document.getElementById('create').innerHTML += `
        <p>Tags listed are not valid.</p>` 
     } else if (!data.description) {
        document.getElementById('create').innerHTML += `
        <p>Description is not valid.</p>` 
     } else if (!data.users) {
        document.getElementById('create').innerHTML += `
        <p>Users are not valid.</p>` 
     }
    fetch(`${base_URL}/Module`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                // send to catch block:
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .then(data => {
            console.log('Success:', data);
            showSubmitScreen();
        })
        .catch(err => {
            console.error(err);
            alert('Error!');
        });
    ev.preventDefault();
};

const showSubmitScreen = () => {
    document.querySelector('#showForm').innerHTML = `
    <h1 style="text-align: center;margin-top: 60px;">Form Submitted</h1>`
}

const cancelModule = (ev) => {
  ev.preventDefault();
  window.location.href="index.html" 
}

displayForm();