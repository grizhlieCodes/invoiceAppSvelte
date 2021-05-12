<script>
  import { getContext } from 'svelte'
  import { fly } from 'svelte/transition'
  let selectionActive = false
  let checkboxChecked = false
  let checkbox = ''
  const size = getContext('size')

  const toggleSelection = () => {
    selectionActive = !selectionActive
  }

  function check(checkboxString) {
    if (checkbox !== checkboxString && checkboxChecked) {
      checkbox = checkboxString
    } else if (checkbox === checkboxString) {
      checkbox = ''
      checkboxChecked = !checkboxChecked
    } else {
      checkbox = checkboxString
      checkboxChecked = !checkboxChecked
    }
    console.log(checkbox, checkboxChecked)
  }

  $: draftChecked = checkboxChecked && checkbox === 'draft'
  $: paidChecked = checkboxChecked && checkbox === 'paid'
  $: pendingChecked = checkboxChecked && checkbox === 'pending'
  $: noFilter = checkbox === '' && !checkboxChecked
</script>

<style lang="scss">
  p.normal {
    color: v(main-text-color);
    font-weight: v(font-bold);
  }

  .selection {
    height: 100%;
    position: relative;
  }

  .selection-toggle {
    height: 100%;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;

    .span-container {
      height: 100%;
      position: relative;
      width: 10px;
      margin: 0 3rem 0 2.1rem;
      transition: transform 250ms ease-in-out;

      span {
        position: absolute;
        width: 0.623rem;
        height: 0.2rem;
        background: v(invoices-accent);
        transition: background 250ms ease;

        &:nth-child(1) {
          left: 0;
          transform: rotate(45deg);
        }
        &:nth-child(2) {
          right: 0;
          transform: rotate(-45deg);
        }
      }
    }

    &.toggled {
      .span-container {
        transform: rotate(180deg);
      }
    }
  }

  .filterSelections {
    top: 3.5rem;
    left: -3rem;
    position: absolute;
    width: 19.2rem;
    height: 12.8rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
    background: v(invoices-selection-bg);
    transition: background 250ms ease;
    padding: 0 0 0 2.4rem;
    margin: 0;
    row-gap: 1.6rem;
    box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25);
    border-radius: 8px;

    .filter-item {
      height: 1.6rem;
      flex: 0;
      display: flex;
      align-items: center;
      cursor: pointer;

      p {
        font-weight: v(font-bold);
      }

      .checkbox {
        width: 1.6rem;
        height: 1.6rem;
        margin-right: 1.3rem;
        background: v(invoices-checkbox-bg);
        transition: background 250ms ease;
        border: 1px solid v(invoices-checkbox-border);
        box-sizing: border-box;
        border-radius: 2px;
        position: relative;

        &.checked {
          background: v(invoices-checkbox-checked-bg);
        }

        span {
          opacity: 0;
          transition: opacity 250ms ease;
        }

        &.checked span {
          opacity: 1;
        }

        span:nth-child(1) {
          position: absolute;
          left: 20%;
          top: 50%;
          width: 0.4rem;
          height: 0.2rem;
          transform: rotate(45deg);
          background: white;
        }

        span:nth-child(2) {
          position: absolute;
          right: 40%;
          top: 50%;
          width: 0.7rem;
          height: 0.2rem;
          transform: rotate(-45deg) translate(4px, 1px);
          background: v(invoices-checkbox-tick);
        }
      }
    }
  }

  :global(body.dark) {
    .filterSelections {
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
    }
  }
</style>

<div class="selection">
  <div
    class="selection-toggle"
    on:click={toggleSelection}
    class:toggled={selectionActive}>
    {#if $size === 'mobile'}
    <p class="normal">Filter</p>
    {:else}
       <!-- else content here -->
       <p class="normal">Filter by status</p>
    {/if}
    <div class="span-container">
      <span />
      <span />
    </div>
  </div>

  {#if selectionActive}
    <div class="filterSelections" transition:fly={{ y: -20, duration: 250 }}>
      <div class="filter-item" on:click={() => check('draft')}>
        <div class="checkbox {draftChecked ? 'checked' : ''}">
          <span />
          <span />
        </div>
        <p class="normal">Draft</p>
      </div>
      <div class="filter-item" on:click={() => check('pending')}>
        <div class="checkbox {pendingChecked ? 'checked' : ''}">
          <span />
          <span />
        </div>
        <p class="normal">Pending</p>
      </div>
      <div class="filter-item" on:click={() => check('paid')}>
        <div class="checkbox {paidChecked ? 'checked' : ''}">
          <span />
          <span />
        </div>
        <p class="normal">Paid</p>
      </div>
    </div>
  {/if}

</div>
