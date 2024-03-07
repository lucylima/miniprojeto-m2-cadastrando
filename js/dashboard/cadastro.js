const $formularioCadastro = document.getElementsByClassName('formulario')[0]
const $tipoAnimal = document.getElementsByClassName('input-radio-animal')
const $especialidade = document.getElementsByClassName('especialidades')[0]
const $nomeTutor = document.getElementById('nome')
const $nomePet = document.getElementById('nomePet')
const $index = document.getElementById('nome').dataset.index

const definirLocalStorage = (banco) => localStorage.setItem("banco_clinicat_pets", JSON.stringify(banco))
const pegarLocalStorage = () => JSON.parse(localStorage.getItem('banco_clinicat_pets')) ?? []
const lerBanco = () => pegarLocalStorage()

const salvarPet = (pet) => {
  const banco = pegarLocalStorage()
  banco.push(pet)
  definirLocalStorage(banco)
} 

const limparCampos = () => {
  $nomeTutor.value = ''
  $nomePet.value = '' 
  $especialidade.value = ''
  for (let radio of $tipoAnimal) radio.checked = false
  document.getElementById('nome').dataset.index = 'novo'
}

class Animal {
  constructor(id, nome, raca, especialidade, dono) {
    this.id = id
    this.nome = nome
    this.raca = raca
    this.especialidade = especialidade
    this.dono = dono
  }
}

// o cadastro que for feito aqui irá direto para banco.pets
$formularioCadastro.addEventListener('submit', e => {
  e.preventDefault()
  let tipoAnimal

  const index = document.getElementById('nome').dataset.index

  for (let radio of $tipoAnimal) {
    if (radio.checked) tipoAnimal = radio.value 
  }

  let novoPet = new Animal(
    index, 
    $nomePet.value,
    tipoAnimal,
    $especialidade.value,
    $nomeTutor.value
  )
  if(index === 'novo'){
    salvarPet(novoPet)
    limparCampos()
    $modal.style.display = "none"
  }else {
    
  }
  Toastify({
    text: "Pet cadastrado com sucesso!",
    duration: 4000,
    style: {
      background: "linear-gradient(25deg, rgba(106,102,242,1) 1%, rgba(124,120,247,1) 50%, rgba(156,153,255,1) 100%)",
    }
  }).showToast();
  console.log(novoPet)
  console.log(index) 
})


