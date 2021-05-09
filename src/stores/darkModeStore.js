import {writable} from 'svelte/store';

//1. Check if darkmode exists in localStorage.
//2. If it doesn't return a function and continue with normal store
//3. If it does exist, update the store.
//4. The store is a single boolean value, initially set to false.
//5. It will have multiple functions, predominantly focused on switching the
//   value on button click.

const darkMode = writable(false)

if (localStorage.getItem('darkMode')){
    darkMode.update(mode => {
        mode = JSON.parse(localStorage.getItem('darkMode'))
    })
} else {
    console.log('no dark mode stored')
}

let customDarkMode = {
    subscribe: darkMode.subscribe,
    toggleDarkMode: () => {
        darkMode.update(mode => {
            !mode
        })
        localStorage.setItem('darkMode',JSON.stringify(darkMode))
        console.log(darkMode)
        console.log(JSON.parse(localStorage.getItem('darkMode')))
    }
}

export default customDarkMode;''