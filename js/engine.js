//LOADER
window.addEventListener("load", function () {
  var loader = document.querySelector('.skeleton')
  setTimeout(() => {
    loader.style.display = "none"
  }, 500);
})

// window.addEventListener("load", function () {
//   var loader = document.querySelector('.preloader')
//   setTimeout(() => {
//     loader.style.display = "none"
//   }, 500);
// })

//SIDE-BAR
function navSlide() {
  const nav = document.querySelector('.menu');
  const note = document.querySelector('.note__body')
  note.classList.add('text-open_anim_reverse')
  note.classList.remove('text-open_anim')
  setTimeout(() => {
    nav.classList.add('side-bar_anim')
    nav.style.display = 'initial'
    note.classList.remove('text-open_anim_reverse')
  }, 500);
}

//MENU-ANIMATIONS


// function navSlide() {
//   const nav = document.querySelector('.menu');
//   const note = document.querySelector('.note__body')
//   note.classList.add('text-open_anim_reverse')
//   note.classList.remove('text-open_anim')
//   setTimeout(() => {
//     nav.classList.add('side-bar_anim')
//     nav.style.display = 'initial'
//     note.classList.remove('text-open_anim_reverse')
//   }, 500);
// }

//SCREENSHOT
function screenshotMode() {
  const header = document.querySelector('.header');
  const note = document.querySelector('.note__body');
  const btn = document.querySelector('.screenshot-btn');

  header.style.display = 'none';
  note.style.height = '800vh';
  btn.style.display = 'initial';
}

//SETTINGS DROP-DOWN
const settingBtn = document.querySelector('#option-btn')
const dropdown = document.querySelector('.settings')
const dropdownMenu = document.querySelector('.settings__menu')
const closeBtn = document.querySelector('.settings__close')
const settingsList = document.querySelector('.settings__menu-list')

var canClose = false

settingBtn.addEventListener('click', function () {
  dropdown.style.display = 'initial'
})

dropdownMenu.addEventListener('mouseover', function() {
  canClose = false
})

dropdownMenu.addEventListener('mouseout', function() {
  canClose = true
})

dropdown.addEventListener('click', function() {
  if (canClose == true) {
    dropdown.style.display = 'none'
  }
})

closeBtn.addEventListener('click', function() {
  dropdown.style.display = 'none'
})

//FONTS

function sansSerifFont() {
  const note = document.querySelector('.note__body')

  note.style.fontFamily = 'Mulish'
}

function serifFont() {
  const note = document.querySelector('.note__body')

  note.style.fontFamily = 'Gentium Book Plus'
}

//THEMES

function defaultTheme() {
  document.documentElement.style.setProperty('--sidebarBackground', 'linear-gradient(0deg, #ab8b89 0%, #1a517e 100%)');
  document.documentElement.style.setProperty('--theme-color', '#FCEC7B');
  document.documentElement.style.setProperty('--accent-text-color', 'black');
  localStorage.setItem('notesTheme', 'default')
}

function seaFoamGreenTheme() {
  document.documentElement.style.setProperty('--sidebarBackground', 'linear-gradient(0deg, rgba(31,64,55,1) 0%, rgba(153,242,200,1) 100%)');
  document.documentElement.style.setProperty('--theme-color', '#57855e');
  document.documentElement.style.setProperty('--accent-text-color', '#e8daa3');
  localStorage.setItem('notesTheme', 'seaFoamGreenTheme')
}

function cyberpunkTheme() {
  document.documentElement.style.setProperty('--sidebarBackground', 'linear-gradient(180deg, rgba(0,13,28,1) 0%, rgba(3,45,49,1) 50%, rgba(32,40,90,1) 100%)');
  document.documentElement.style.setProperty('--theme-color', '#e43736');
  document.documentElement.style.setProperty('--accent-text-color', 'white');
  localStorage.setItem('notesTheme', 'cyberpunkTheme')
}

function expressionTheme() {
  document.documentElement.style.setProperty('--sidebarBackground', 'linear-gradient(321deg, rgba(142,45,226,1) 0%, rgba(74,0,224,1) 100%)');
  document.documentElement.style.setProperty('--theme-color', '#00e7b2');
  document.documentElement.style.setProperty('--accent-text-color', '#000712');
  localStorage.setItem('notesTheme', 'expressionTheme')
}

window.onload = themeCheck()

function themeCheck() {
  var currentTheme = localStorage.getItem('notesTheme')

  if (currentTheme === 'default') {
    defaultTheme()
  }  if (currentTheme === 'seaFoamGreenTheme') {
    seaFoamGreenTheme()
  }  if (currentTheme === 'cyberpunkTheme') {
    cyberpunkTheme()
  }  if (currentTheme === 'expressionTheme') {
    expressionTheme()
  }
}