// Функция открытия/закрытия модального окна
function interactionModal(modal) {
  modal.classList.toggle('hidden');
}

// Обновляем токен
function updateState() {
  const token = localStorage.getItem('token');
  if (token) {
    linkToProfile.classList.remove('hidden');
    buttonOpeningModalLogin.classList.add('hidden');
    buttonOpeningModalRegister.classList.add('hidden');
  } else {
    linkToProfile.classList.add('hidden');
    buttonOpeningModalLogin.classList.remove('hidden');
    buttonOpeningModalRegister.classList.remove('hidden');
  }
}


// Ссылка на бек
const SERVER_URL = 'https://academy.directlinedev.com';
const API_URL = SERVER_URL + '/api';

// Функция обработки серверных запросов
function sendRequest({ url, method, headers, body }) {
  const settings = {
    method,
    body,
    headers,
  };

  return fetch(`${API_URL}${url}`, settings);
}

function handler() {
  input.classList.remove('is-invalid');
  input.removeEventListener('input', handler);
}

function setErrorMessage(input, message) {
  let messageError = input.parentNode.querySelector('.invalid-feedback');
  messageError.innerText = message;
  input.insertAdjacentElement('afterend', messageError);
  input.classList.add('is-invalid');
  input.addEventListener('input', handler);
  return messageError;
}

function setErrorsToForm(form, errors) {
  const inputs = form.querySelectorAll('input');
  for (const input of inputs) {
    if (errors[input.name]) {
      if (input.type === 'checkbox' || input.type === 'radio') {
        setErrorMessage(input, '');
      } else {
        setErrorMessage(input, errors[input.name]);
      }
    }
  }
  const textareas = form.querySelectorAll('textarea');
  for (const textarea of textareas) {
    if (errors[textarea.name]) {
      setErrorMessage(textarea, errors[textarea.name]);
    }
  }
}

function removeErrorsFromForm(form) {
  const inputs = form.querySelectorAll('input');
  for (const input of inputs) {
    input.classList.remove('is-invalid');
    input.removeEventListener('input', handler);
    let messageError = input.parentNode.querySelector('.invalid-feedback');
    messageError.innerText = '';
  }

  const textareas = form.querySelectorAll('textarea');
  for (const textarea of textareas) {
    textarea.classList.remove('is-invalid');
    textarea.removeEventListener('input', handler);
    let messageError = textarea.parentNode.querySelector('.invalid-feedback');
    messageError.innerText = '';
  }
}

function setDataToForm(form, data) {
  const inputs = form.querySelectorAll('input');
  for (const input of inputs) {
    switch (input.type) {
      case 'radio':
        input.removeAttribute('disabled');
        if (data[input.name] !== undefined && data[input.name] === input.value) {
          input.checked = true;
        }
        break;
      case 'checkbox':
        input.removeAttribute('disabled');
        if (data[input.name] !== undefined) {
          for (let item of data[input.name]) {
            if (item === input.value) {
              input.checked = true;
              break;
            }
          }
        }
        break;
      default:
        input.removeAttribute('readonly');
        if (data[input.name] !== undefined) {
          input.value = data[input.name];
        }
    }
  }
  const textareas = form.querySelectorAll('textarea');
  for (const textarea of textareas) {
    if (data[textarea.name]) {
      textarea.value = data[textarea.name];
    }
  }
  return data;
}

function getDataFromForm(form, type = 'js') {
  if (type === 'js') {
    let data = {};
    const inputs = form.querySelectorAll('input');
    for (const input of inputs) {
      switch (input.type) {
        case 'radio':
          if (input.checked) {
            data[input.name] = input.value;
          }
          break;
        case 'checkbox':
          if (!data[input.name]) {
            data[input.name] = [];
          }
          if (input.checked) {
            data[input.name].push(input.value);
          }
          break;
        case 'file':
          data[input.name] = input.files;
          break;
        default:
          data[input.name] = input.value;
      }
    }
    const textareas = form.querySelectorAll('textarea');
    for (const textarea of textareas) {
      data[textarea.name] = textarea.value;
    }
    return data;
  } else if(type === 'formData') {
    return new FormData(form);
  }

}