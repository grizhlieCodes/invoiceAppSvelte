<script>
	import Header from './components/Heading.svelte'
	import {writable} from 'svelte/store';
	import {setContext} from 'svelte';
	import Nav from './components/Nav.svelte'



	let innerWidth
	let size = writable('mobile')
	setContext('size', size)

	$: if(innerWidth >= 1110) {$size = "desktop";}
		else if (innerWidth >= 768) {$size = "tablet";}
		else {$size = "mobile";}




</script>

<svelte:window bind:innerWidth={innerWidth}/>

<Nav />
<main>

</main>




<style lang="scss">



</style>