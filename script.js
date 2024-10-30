let users = JSON.parse(localStorage.getItem('users')) || [];
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const workInput = document.getElementById('work');
const phoneNumberInput = document.getElementById('phoneNumber');
const crudList = document.querySelector('.crud-list');

function renderTable() {
    crudList.innerHTML = '';
    users.forEach((user, index) => {
        crudList.innerHTML += `
            <tr>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.work}</td>
                <td>${user.phoneNumber}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editUser(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function addUser() {
    const user = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        work: workInput.value,
        phoneNumber: phoneNumberInput.value
    };
    users.push(user);
    saveToLocalStorage();
    renderTable();
    clearInputs();
}

function editUser(index) {
    const user = users[index];
    firstNameInput.value = user.firstName;
    lastNameInput.value = user.lastName;
    workInput.value = user.work;
    phoneNumberInput.value = user.phoneNumber;

    document.querySelector('.btn-primary').onclick = function () {
        updateUser(index);
    };
}

function updateUser(index) {
    users[index] = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        work: workInput.value,
        phoneNumber: phoneNumberInput.value
    };
    saveToLocalStorage();
    renderTable();
    clearInputs();
    document.querySelector('.btn-primary').onclick = addUser; 
}

function deleteUser(index) {
    if (confirm("Are you sure?")) {
        users.splice(index, 1); 
        saveToLocalStorage(); 
        renderTable();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}

function clearInputs() {
    firstNameInput.value = '';
    lastNameInput.value = '';
    workInput.value = '';
    phoneNumberInput.value = '';
}

document.querySelector('.btn-primary').onclick = addUser;
renderTable();