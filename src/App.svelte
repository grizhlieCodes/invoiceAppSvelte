<script>
	import Main from './components/Main.svelte'
	import {writable} from 'svelte/store';
	import {setContext} from 'svelte';
	import Nav from './components/Nav.svelte'
	import darkMode from './stores/darkModeStore.js'
	import initialiseFirebaseAuth from './stores/initialiseFirebase.js'
	initialiseFirebaseAuth()

	let body = document.body

	$: if ($darkMode === true ){body.classList.add('dark')} 
		else {body.classList.remove('dark')}

	let innerWidth
	let size = writable('mobile')
	setContext('size', size)

	$: if(innerWidth >= 1110) {$size = "desktop";}
		else if (innerWidth >= 768) {$size = "tablet";}
		else {$size = "mobile";}

</script>

<svelte:window bind:innerWidth={innerWidth}/>

<Nav/>

<Main />



<style lang="scss">

:global(:root body.dark){
	//Nav/Sidebar
	--invoices-sidebar-bg: var(--purple-750);

	//pageBackground
	--page-bg: var(--purple-800);

}

:global(body){
	transition: background 250ms ease;
	background: var(--page-bg);
}

</style>