let systemLanguage = window.navigator.language
systemLanguage = systemLanguage.slice(0, 2).toLowerCase()

const query = window.location.search.slice(1)
let queryParams = new URLSearchParams(query)

let lang = 'en'
let langs = ['en', 'es', 'fr', 'ja', 'nl', 'ru', 'zh']

if (queryParams.has('lang')) {
  lang = queryParams.get('lang')
} else {
  lang = systemLanguage
  queryParams.set('lang', lang)
  history.pushState(
    null,
    '',
    `${window.location.pathname}?${queryParams.toString()}`
  )
}
document.documentElement.setAttribute('lang', lang)

if (!langs.includes(lang)) {
  lang = 'en'
}

const getLanguage = async (language) => {
  const data = await fetch(`../store/${language}.json`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await data.json()
}
function renderHeader(data) {
  document.querySelector('.restore').innerHTML = `${data['Restore']}`
}

function renderBody(data) {
  const monthlyStyle = document.querySelector('.monthly')
  const annualyStyle = document.querySelector('.annualy')
  const btnContinueHandler = document.querySelector('.banner-body__btnContinue')
  const windowSize = document.getElementById('windowSize')
  let link
  monthlyStyle.addEventListener('click', () => {
    if (monthlyStyle.className === ' active') {
      monthlyStyle.className.replace('monthly')
      btnContinueHandler.setAttribute('disabled', '')
    } else {
      monthlyStyle.className.replace(' active')
      link = 'https://apple.com/'
      btnContinueHandler.removeAttribute('disabled')
    }
  })

  annualyStyle.addEventListener('click', () => {
    if (annualyStyle.className === ' active') {
      annualyStyle.className.replace('annualy')
      btnContinueHandler.setAttribute('disabled', '')
    } else {
      annualyStyle.className.replace(' active')
      link = 'https://google.com/'
      btnContinueHandler.removeAttribute('disabled')
    }
  })

  btnContinueHandler.addEventListener('click', () => {
    document.location.href = link
  })

  function displayWindowSize() {
    let currentWidthWindow = document.documentElement.clientWidth
    let size = currentWidthWindow * 0.08
    windowSize.style.fontSize = `${size}px`
  }
  window.addEventListener('resize', displayWindowSize)
  displayWindowSize()

  document.querySelector(
    '.title'
  ).innerHTML = `${data['Unlimited Access<br>to All Features']}`
  document.querySelector(
    '.banner-body__item__description-doc'
  ).innerHTML = `${data['Unlimited documents']}`
  document.querySelector(
    '.banner-body__item__description-mode'
  ).innerHTML = `${data['Count mode']}`
  document.querySelector(
    '.banner-body__item__description-recog'
  ).innerHTML = `${data['Text recognition (OCR)']}`
  document.querySelector(
    '.subscriptionTitle-mon'
  ).innerHTML = `${data['Monthly']}`
  document.querySelector('.subscriptionPrice-mon').innerHTML = `${data[
    `<strong>{{price}}</strong><br>per month`
  ]
    .replace(`{{price}}`, `$9.99`)
    .replace(`per month`, `<div class='fontInfoPrice'>per month</div>`)}`
  document.querySelector('.subscriptionInfo-mon').innerHTML = `${
    data[`3 DAYS FREE`]
  }`
  document.querySelector('.subscriptionSecondPrice-mon').innerHTML = `${data[
    `{{price}}/month`
  ].replace('{{price}}', '$9.99')}`
  document.querySelector('.discount').innerHTML = `${data['-83%']}`
  document.querySelector(
    '.subscriptionTitle-annu'
  ).innerHTML = `${data['Annually']}`
  document.querySelector('.subscriptionPrice-annu').innerHTML = `${data[
    `<strong>{{price}}</strong><br>per year`
  ]
    .replace(`{{price}}`, `$19.99`)
    .replace(`per year`, `<div class='fontInfoPrice'>per year</div>`)}`
  document.querySelector('.subscriptionInfo-annu').innerHTML = `${
    data[`MOST POPULAR`]
  }`
  document.querySelector('.subscriptionSecondPrice-annu').innerHTML = `${data[
    `{{price}}/month`
  ].replace('{{price}}', '$1.99')}`
  document.querySelector('.banner-body__btnContinue').innerHTML = ` ${
    data[`Continue`]
  }`
}

function renderFooter(data) {
  document.querySelector(
    '.banner-footer_notification'
  ).innerHTML = ` ${data['Auto-renewable. Cancel anytime.']}`

  document.querySelector(
    '.banner-footer_linkL'
  ).innerHTML = ` ${data['Terms of Use']}`
  document.querySelector(
    '.banner-footer_linkR'
  ).innerHTML = `  ${data['Privacy Policy']}`
}

getLanguage(lang).then((data) => {
  renderBody(data)
  renderHeader(data)
  renderFooter(data)
})
