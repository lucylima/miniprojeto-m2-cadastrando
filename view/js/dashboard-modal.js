import { readLocalStorage } from '../../model/Database.js'
import { elements } from './elements.js'
import { createPet } from '../../controller/petController.js'
import { createNewPet, updateCards, editPet } from '../../controller/CRUD.js'
import { noItems } from '../../controller/dashboard.js'

let id

const clearFields = () => {
  elements.modalForm.$petNameField.value = ''
  elements.modalForm.$petOwnerField.value = ''
  elements.modalForm.$specialitySelect.value = ''
  for (let radio of elements.modalForm.$animalType) radio.checked = false
}

const showModal = () => {
  elements.modal.$modal.style.display = 'block'
}

const closeModal = () => {
  clearFields()
  elements.modal.$modal.style.display = 'none'
}

const petEditModal = (pet) => {
  id = pet.id
  elements.modalForm.$petNameField.value = pet.petName
  elements.modalForm.$petOwnerField.value = pet.petOwner
  elements.modalForm.$specialitySelect.value = pet.speciality
  for (let radio of elements.modalForm.$animalType) {
    if (pet.breed == radio.value) {
      radio.checked = true
    }
  }
  elements.modalForm.$submitFormButton.value = 'Atualizar pet'
  showModal()
}

const petRegisterModal = () => {
  showModal()
  elements.modalForm.$submitFormButton.value = 'Cadastrar'
}

const submitRegister = () => {
  const database = readLocalStorage()
  let selectedRadio
  for (let radio of elements.modalForm.$animalType)
    if (radio.checked) {
      selectedRadio = radio.value
    }
  let pet = createPet(
    database.length + 1,
    elements.modalForm.$petNameField.value,
    selectedRadio,
    elements.modalForm.$specialitySelect.value,
    elements.modalForm.$petOwnerField.value
  )
  createNewPet(pet)
  updateCards()
  closeModal()
  Toastify({
    text: 'Pet registrado com sucesso!',
    duration: 3000,
    style: {
      background:
        'linear-gradient(25deg, rgba(106,102,242,1) 1%, rgba(124,120,247,1) 50%, rgba(156,153,255,1) 100%)',
    },
    gravity: "bottom", 
    position: "right"
  }).showToast()
  noItems()
}

const submitEdit = () => {
  let selectedRadio
  for (let radio of elements.modalForm.$animalType)
  if (radio.checked) {
    selectedRadio = radio.value
  }
  const overwritePet = createPet(
    id,
    elements.modalForm.$petNameField.value,
    selectedRadio,
    elements.modalForm.$specialitySelect.value,
    elements.modalForm.$petOwnerField.value
  )
  editPet(overwritePet)
  updateCards()
  closeModal()
  Toastify({
    text: 'Pet editado com sucesso!',
    duration: 3000,
    style: {
      background:
        'linear-gradient(25deg, rgba(106,102,242,1) 1%, rgba(124,120,247,1) 50%, rgba(156,153,255,1) 100%)',
    },
    gravity: "bottom", 
    position: "right"
  }).showToast()
}

elements.modalForm.$formPet.addEventListener('submit', (e) => {
  e.preventDefault()
  switch (elements.modalForm.$submitFormButton.value) {
    case 'Atualizar pet':
      submitEdit()
      break
    case 'Cadastrar':
      submitRegister()
      break
  }
})

elements.modal.$closeModal.onclick = () => closeModal()
window.onclick = (event) => {
  if (event.target == elements.modal.$modal) closeModal()
}

export { showModal, closeModal, petRegisterModal, petEditModal }
