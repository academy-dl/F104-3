const profileImg = document.querySelector(".j-profile-img");
const profileName = document.querySelector(".j-profile-name");
const profileSurname = document.querySelector(".j-profile-surname");
const profileEmail = document.querySelector(".j-profile-email");
const profileLocation = document.querySelector(".j-profile-location");
const profileAge = document.querySelector(".j-profile-age");

const buttonOpeningModalEditing = document.querySelector(".j-editing-button");
const modalEditing = document.querySelector(".j-modal-editing");
const buttonCloseModalEditing = document.querySelector(".j-close-modal-editing");

const editingForm = document.forms.editingForm;

const buttonOpeningModalRegister = document.querySelector(".j-register-button");
const buttonOpeningModalLogin = document.querySelector(".j-login-button");
const linkToProfile = document.querySelector(".j-to-profile");
let userData;
function updateUserData() {
  sendRequest({
    url: '/users/'+localStorage.getItem('userId'), 
    method: 'GET', 
  })
  .then(res => res.json())
  .then(res => {
    if(res.success) {
      userData = res.data;
      const editingForm = document.forms.editingForm;

      profileImg.style.backgroundImage = `url('${SERVER_URL}${userData.photoUrl}')`;
      profileName.innerText = editingForm.name.value = userData.name;
      profileSurname.innerText = editingForm.surname.value = userData.surname;
      profileEmail.innerText = editingForm.email.value = userData.email;
      profileLocation.innerText = editingForm.location.value = userData.location;
      profileAge.innerText = editingForm.age.value = userData.age;

      updateState();
    } else {
      throw res;
    }
  })
  .catch(err => {
    console.error(err);
  })
}

function changeData(e) {
  e.preventDefault();

  const body = getDataFromForm(e.target, 'formData');
  console.log(body.get('avatar'));
  e.target.classList.add('is-loading');
  sendRequest({
    url: '/users/', 
    method: 'PUT', 
    headers: {
      'x-access-token': localStorage.getItem('token')
    },
    body,
  })
  .then(res => res.json())
  .then(res => {
    if(res.success) {
      updateUserData();
      interactionModal(modalEditing);
    } else {
      throw res;
    }
  })
  .catch(err => {
    setErrorsToForm(e.target, err.errors);
    console.error(err);
  })
  .finally(() => {
    e.target.classList.remove('is-loading');
  });
}

updateUserData();

buttonOpeningModalEditing.addEventListener('click', () => {
  interactionModal(modalEditing);
  removeErrorsFromForm(editingForm);

  editingForm.name.value = userData.name;
  editingForm.surname.value = userData.surname;
  editingForm.email.value = userData.email;
  editingForm.location.value = userData.location;
  editingForm.age.value = userData.age;
});
buttonCloseModalEditing.addEventListener('click', () => {
  interactionModal(modalEditing)
});

modalEditing.addEventListener('submit', (e) => {
  changeData(e)
});

