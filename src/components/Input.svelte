<script>
  export let type,
    inputClass = '',
    placeholder,
    id,
    label,
    flex,
    value = '',
    listItem = false
</script>

<style lang="scss">
  .form-item {
    margin: 0 0rem 2.4rem 0rem;
    font-size: 1.2rem;
    letter-spacing: -0.025rem;
    line-height: 1.5rem;
  }
  label {
    color: v(label-text);
    font-size: 1.2rem;
    letter-spacing: -0.025rem;
    line-height: 1.5rem;
    transition: color 250ms ease-in-out;
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
    width: 100%;
    height: 4.8rem;
    border-radius: 0.4rem;
    padding: 0 2rem;
    transition: color 250ms ease-in-out, background 250ms ease-in-out;
    font-weight: v(font-bold);

    &:focus-within {
      box-shadow: 0 0 1pt 1pt v(input-outline);
    }
  }

  .f-full {
    flex: 1 0 100%;
  }
  .f-share {
    flex: 1 0 15.2rem;
  }

  .mobileItemListLabel {
    @include mq(tablet) {
      display: none;
    }
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
    <label for={id}>{label}</label>
    <input
      autocomplete="nope"
      {type}
      class={inputClass}
      on:input
      {placeholder}
      {id}
      {value} />
  </div>
{:else}
  <div class="form-item">
    <label for={id} class="mobileItemListLabel">{label}</label>
    <input
      autocomplete="nope"
      {type}
      class="{inputClass} item"
      on:input
      {placeholder}
      {id}
      {value} />
  </div>
{/if}
