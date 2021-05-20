<script>
  import { fly } from 'svelte/transition'

</script>

<style lang="scss">
  .modal-container {
    grid-area: mainCenter;
    width: 100%;
    max-width: 400px;
    border-radius: 1rem;
    background: v(modal-container-bg);
    padding: 2rem 1.5rem;
    height: 600px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
  }
</style>

<div
  class="modal-container"
>
    <slot />
</div>    

<!-- in:fly={{ x: 50, duration: 200 }}
out:fly={{ x: -50, duration: 200 }} -->