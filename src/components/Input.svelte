<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  export let type = "text",
    inputClass = '',
    placeholder = '',
    id = '',
    label = '',
    flex = '',
    value = '',
    listItem = false,
    disabled = false,
    valid = true,
    saveAndSendClicked = false

</script>

<style lang="scss">
  .form-item {
    margin: 0 0rem 2.4rem 0rem;
    font-size: 1.2rem;
    letter-spacing: -0.025rem;
    line-height: 1.5rem;
    padding: 1px;

  }

  .label-container {
    display: flex;
    justify-content: space-between;

    p {
      color: v(red-500);
    }
  }
  label {
    color: v(label-text);
    font-size: 1.2rem;
    letter-spacing: -0.025rem;
    line-height: 1.5rem;
    transition: color 200ms ease;
    margin-bottom: 1rem;
  }
  input {
    margin: 1rem 0rem 0 0rem;
    background: v(input-background);
    border: 1px solid v(input-border);
    color: v(input-text);
    font-size: 1.2rem;
    letter-spacing: -0.025rem;
    line-height: 1.5rem;
    outline: none;
    width: calc(100% - 0.2rem);
    height: 4.8rem;
    border-radius: 0.4rem;
    padding: 0 2rem;
    transition: color 200ms ease, background 200ms ease;
    font-weight: v(font-bold);

    &:focus-within {
      box-shadow: 0 0 1pt 1pt v(input-outline);
    }
  }

  input.invalid {
    border: 1px solid v(red-500);
  }

  .f-full {
    flex: 1 0 100%;
  }
  .f-share {
    flex: 1 0 15.2rem;
  }
  input#total {
    border: none;
    background: none;
    padding: 0;
  }

  // input.item {
  //   width: min-content;
  // }
</style>

{#if !listItem}
  <div class="form-item {flex}">
    <div class="label-container">
      <label for={id}>{label}</label>
      {#if !valid && saveAndSendClicked}
         <p class="invalid-message">
           * required
         </p>
      {/if}
    </div>
    <input
      autocomplete="nope"
      {type}
      class={inputClass}
      class:invalid={!valid && saveAndSendClicked}
      on:input
      {placeholder}
      {id}
      {value} />
  </div>
{:else}
  <div class="form-item">
    <label for={id} >{label}</label>
    <input
      on:blur
      on:focus
      autocomplete="nope"
      {type}
      class="{inputClass} item"
      on:input
      {placeholder}
      {id}
      {value} 
      {disabled}/>
  </div>
{/if}
