<script>
  export let itemChecked, content
</script>

<style lang="scss">
  .filter-item {
    height: 1.6rem;
    flex: 0;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      .checkbox {
        border: 2px solid v(purple-500);

        svg {
          opacity: 0.2;
        }
      }
    }

    p {
      color: v(main-text-color);
      font-weight: v(font-bold);
    }

    .checkbox {
      width: 1.6rem;
      height: 1.6rem;
      margin-right: 1.3rem;
      background: v(invoices-checkbox-bg);
      transition: background 250ms ease;
      border: 1px solid v(invoices-checkbox-border);
      border-radius: 2px;
      position: relative;
      display: grid;
      place-items: center;

      svg {
        opacity: 0;
        transition: opacity 250ms ease;
      }

      &.checked {
        background: v(invoices-checkbox-checked-bg);
      }

      &.checked svg {
        opacity: 1;
      }
    }
  }
</style>

<div class="filter-item" on:click>
  <div class="checkbox {itemChecked ? 'checked' : ''}">
    <svg width="10" height="8">
      <path
        d="M1.5 4.5l2.124 2.124L8.97 1.28"
        stroke="#FFF"
        stroke-width="2"
        fill="none"
        fill-rule="evenodd" />
    </svg>
  </div>
  <p class="normal">{content}</p>
</div>
