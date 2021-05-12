<script>
  export let type, inputClass = '', placeholder, id, label
</script>

<style lang="scss">
    .form-item {
        margin-bottom: 2.4rem;
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
        margin-top: 1rem;
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

        &:focus-within {
            box-shadow: 0 0 1pt 1pt v(input-outline);
        }
    }
</style>

<div class="form-item">
  <label for={id}>{label}</label>
  <input {type} class={inputClass} on:input {placeholder} {id} />
</div>
