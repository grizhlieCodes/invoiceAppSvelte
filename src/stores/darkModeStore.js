import {writable} from 'svelte/store';

const darkMode = writable(false)

if (localStorage.getItem('darkMode')){
    darkMode.update(mode => {
        return JSON.parse(localStorage.getItem('darkMode'))
    })
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches){
    darkMode.update(mode => {
        localStorage.setItem('darkMode',JSON.stringify(true))
        return true
    })
} else if(window.matchMedia('(prefers-color-scheme: light)').matches) {
    darkMode.update(mode => {
        localStorage.setItem('darkMode', JSON.stringify(false))
        return false
    })
}

let customDarkMode = {
    subscribe: darkMode.subscribe,
    toggleDarkMode: () => {
        darkMode.update(mode => {
            localStorage.setItem('darkMode',JSON.stringify(!mode))
            return !mode
        })
    }
}

export default customDarkMode;