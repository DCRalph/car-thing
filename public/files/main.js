let CONNECTED = false
const connectedBar = document.querySelector('#connectedBar')

const setConnected = (state) => {
  CONNECTED = state
  connectedBar.innerHTML = state ? 'Connected' : 'Disconnected'
  connectedBar.classList.toggle('bg-blue-500', false)
  connectedBar.classList.toggle('bg-green-500', state)
  connectedBar.classList.toggle('bg-red-500', !state)
}
setConnected(false)

class tab {
  constructor(nav, name, id, icon = null, color = null) {
    this.nav = nav
    this.name = name
    this.id = id
    this.icon = icon

    this.pageElement = document.querySelector(`#tab-${id}`)

    if (this.pageElement == null) return

    const colors = {
      default: ['text-gray-400', 'hover:border-white', 'hover:text-white'],
      red: ['text-red-500', 'hover:border-red-600', 'hover:text-red-600'],
      green: [
        'text-green-500',
        'hover:border-green-600',
        'hover:text-green-600',
      ],
      blue: ['text-blue-500', 'hover:border-blue-600', 'hover:text-blue-600'],
      purple: [
        'text-purple-500',
        'hover:border-purple-600',
        'hover:text-purple-600',
      ],
      pink: ['text-pink-500', 'hover:border-pink-600', 'hover:text-pink-600'],
      orange: [
        'text-orange-500',
        'hover:border-orange-600',
        'hover:text-orange-600',
      ],
      teal: ['text-teal-500', 'hover:border-teal-600', 'hover:text-teal-600'],
    }

    this.color = colors[color] || colors.default

    this.classes = {
      both: `flex gap-2 items-center px-4 py-2 rounded-t-lg border-b-2 select-none`,
      notActive: `border-transparent ${this.color.join(' ')} group`,
      active: ' text-blue-500 border-blue-500 group',
    }

    this.div = document.createElement('div')
    this.div.className = this.classes.both + ' ' + this.classes.notActive

    if (icon != null) {
      this.div.innerHTML += icon
    }

    this.div.innerHTML += name

    this.div.addEventListener('click', () => {
      this.nav.selectTab(this.id)
    })

    this.nav.addPage(this)
  }

  activate(state) {
    if (state) {
      this.div.className = this.classes.both + ' ' + this.classes.active
      this.pageElement.classList.toggle('hidden', false)
    } else {
      this.div.className = this.classes.both + ' ' + this.classes.notActive
      this.pageElement.classList.toggle('hidden', true)
    }
  }
}

class navbar {
  constructor() {
    this.pages = {}
    this.activePage = null

    this.div = document.createElement('div')
    this.div.className =
      'flex -mb-px overflow-x-auto sora h-12 justify-start gap-2 font-medium text-center'
  }

  render() {
    for (const key in this.pages) {
      this.div.appendChild(this.pages[key].div)
    }

    document.querySelector('#navbar').appendChild(this.div)
    document.querySelector('#tabs').classList.toggle('hidden', false)
  }

  selectTab(id) {
    let tab = this.pages[id]
    if (tab == null) return

    let oldTab = this.pages[this.activePage]
    if (oldTab != null) {
      oldTab.activate(false)
    }

    this.activePage = id
    tab.activate(true)
  }

  addPage(tab) {
    this.pages[tab.id] = tab
    tab.pageElement.classList.toggle('hidden', true)

    if (this.activePage == null) {
      this.selectTab(tab.id)
    }
  }
}

const homeSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
</svg>`

const radioSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
<path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
</svg>`

const lightSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
<path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
</svg>`

const settingsSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>`

const nav = new navbar()

const home = new tab(nav, 'Home', 'home', homeSvg)
const radio = new tab(nav, 'Radio', 'radio', radioSvg)
const light = new tab(nav, 'Light', 'light', lightSvg)
const settings = new tab(nav, 'Settings', 'settings', settingsSvg)

nav.render()

nav.selectTab('light')

const radioNotPlaying = document.querySelector('#radio-not-playing')
const radioPlaying = document.querySelector('#radio-playing')
const radioPlayingSong = document.querySelector('#radio-playing-song')
const radioPlayingFreq = document.querySelector('#radio-playing-freq')

const radioSong = document.querySelector('#radio-song')
const radioFreq = document.querySelector('#radio-freq')
const radioName = document.querySelector('#radio-name')
const radioText = document.querySelector('#radio-text')
const radioPlay = document.querySelector('#radio-play')
const radioStop = document.querySelector('#radio-stop')

const lightUnderOn = document.querySelector('#light-under-on')
const lightUnderC1 = document.querySelector('#light-under-color-c1')
const lightUnderC2 = document.querySelector('#light-under-color-c2')
const lightUnderC3 = document.querySelector('#light-under-color-c3')
const lightUnderPreset = document.querySelector('#light-under-preset')

let data = {}

const socket = io()

const emit = (event, data) => {
  // if (!socket.connected) return
  socket.emit(event, data)
  console.log(`emit ${event} ${JSON.stringify(data) || ''}`)
}

const updateRadioMusic = (music) => {
  radioSong.innerText = ''
  music.forEach((song, i) => {
    const option = document.createElement('option')
    option.value = i
    option.innerText = song
    radioSong.appendChild(option)
  })
}

const updateRadioBanner = () => {
  const radio = data.radio
  if (radio.state) {
    radioPlaying.classList.toggle('hidden', false)
    radioNotPlaying.classList.toggle('hidden', true)
    radioPlayingSong.innerText = radio.song
    radioPlayingFreq.innerText = `on ${radio.freq}`
  } else {
    radioPlaying.classList.toggle('hidden', true)
    radioNotPlaying.classList.toggle('hidden', false)
  }
}

const playRadio = () => {
  const song = radioSong.value
  const freq = radioFreq.value
  const name = radioName.value
  const text = radioText.value

  if (song == null || freq == null) {
    return
  }

  emit('play-radio', { song, freq, name, text })
}

const updateLightPresets = (presets) => {
  lightUnderPreset.innerHTML = ''
  const option = document.createElement('option')
  option.value = 'none'
  option.innerText = 'none'
  lightUnderPreset.appendChild(option)
  for (const key in presets) {
    const option = document.createElement('option')
    option.value = key
    option.innerText = key
    lightUnderPreset.appendChild(option)
  }
}

const updateLightRefresh = () => {
  const rgbtohex = (r, g, b) => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  lightUnderOn.checked = data.light.under.state.on
  lightUnderC1.value = rgbtohex(...data.light.under.state.c1)
  lightUnderC2.value = rgbtohex(...data.light.under.state.c2)
  lightUnderC3.value = rgbtohex(...data.light.under.state.c3)
}

const updateLight = () => {
  console.log('updateLight')
  function hextorgb(hex) {
    return [
      ('0x' + hex[1] + hex[2]) | 0,
      ('0x' + hex[3] + hex[4]) | 0,
      ('0x' + hex[5] + hex[6]) | 0,
    ]
  }
  const lightData = {
    under: {
      on: lightUnderOn.checked,
      c1: hextorgb(lightUnderC1.value),
      c2: hextorgb(lightUnderC2.value),
      c3: hextorgb(lightUnderC3.value),
      preset: lightUnderPreset.value,
    },
  }

  emit('update-light', lightData)
}

socket.on('connect', () => {
  setConnected(true)
  emit('data')
})

socket.on('data', (d) => {
  console.log(d)
  data = d

  updateRadioBanner()
  updateLightRefresh()
})

socket.on('disconnect', () => {
  setConnected(false)
})

fetch('/data')
  .then((res) => res.json())
  .then((d) => {
    console.log(d)
    updateRadioMusic(d.music)
    updateLightPresets(d.presets)
  })

radioPlay.addEventListener('click', playRadio)
radioStop.addEventListener('click', () => emit('stop-radio'))

lightUnderOn.addEventListener('click', updateLight)
lightUnderC1.addEventListener('change', updateLight)
lightUnderC2.addEventListener('change', updateLight)
lightUnderC3.addEventListener('change', updateLight)

lightUnderPreset.addEventListener('change', updateLight)
