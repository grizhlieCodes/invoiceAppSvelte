<script>
  import { getContext } from 'svelte'
  import { fly } from 'svelte/transition'
  import FilterItem from './FilterItem.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  let filterOpen = false
  let allowWindowListener = false
  $: if (filterOpen) {
    setTimeout(() => {
      allowWindowListener = true
    }, 100)
  } else {
    allowWindowListener = false
  }

  let checkboxChecked = false
  let currentFilter = ''
  const size = getContext('size')

  const toggleSelection = () => {
    filterOpen = !filterOpen
  }

  function check(selectedFilter) {
    let removeFilters = currentFilter === selectedFilter
    let updateCheckedItem = currentFilter !== selectedFilter && checkboxChecked

    if (updateCheckedItem) {
      currentFilter = selectedFilter
    } else if (removeFilters) {
      currentFilter = ''
      checkboxChecked = !checkboxChecked
    } else {
      currentFilter = selectedFilter
      checkboxChecked = !checkboxChecked
    }
    setTimeout(() => {
      filterOpen = !filterOpen
    }, 300)

    dispatch('filter', currentFilter)
  }

  $: draftChecked = checkboxChecked && currentFilter === 'draft'
  $: paidChecked = checkboxChecked && currentFilter === 'paid'
  $: pendingChecked = checkboxChecked && currentFilter === 'pending'
  $: noFilter = currentFilter === '' && !checkboxChecked

  document.addEventListener('click', (e) => {
    let filterSelections = document.querySelector('.filterSelections')
    let actualElement = e.target
    let closestFilterSelections = actualElement.closest('.filterSelections')
    let clickedOutsideFilterSelections =
      filterSelections != closestFilterSelections

    if (clickedOutsideFilterSelections && allowWindowListener) {
      setTimeout(() => {
        filterOpen = false
      }, 100)
    }
  })
</script>

<style lang="scss">
  p.normal {
    color: v(main-text-color);
    font-weight: v(font-bold);
    transition: color 200ms ease;
  }

  .selection {
    height: 100%;
    position: relative;
    z-index: 1;
    flex-grow: 0;
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
      margin: 0 0 0 2.1rem;
      transition: transform 250ms ease-in-out;

      span {
        position: absolute;
        width: 0.623rem;
        height: 0.2rem;
        background: v(invoices-accent);
        transition: background 200ms ease;

        &:nth-child(1) {
          left: 0.25px;
          transform: rotate(45deg);
        }
        &:nth-child(2) {
          right: 0.25px;
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
    transition: background 200ms ease, box-shadow 200ms ease;
    padding: 0 0 0 2.4rem;
    margin: 0;
    box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25);
    border-radius: 8px;

    & + * {
      margin-bottom: 1.6rem;
    }

    @supports (row-gap: 1.6rem){
      row-gap: 1.6rem;
      .filterSelections + * {
        margin-bottom: 0;
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
    class:toggled={filterOpen}>

    {#if $size === 'mobile'}
      <p class="normal">Filter</p>
    {:else}
      <p class="normal">Filter by status</p>
    {/if}

    <div class="span-container">
      <span />
      <span />
    </div>
  </div>

  {#if filterOpen}
    <div class="filterSelections" transition:fly={{ y: -20, duration: 300 }}>
      <FilterItem
        itemChecked={draftChecked}
        content="Draft"
        on:click={() => check('draft')} />
      <FilterItem
        itemChecked={paidChecked}
        content="Paid"
        on:click={() => check('paid')} />
      <FilterItem
        itemChecked={pendingChecked}
        content="Pending"
        on:click={() => check('pending')} />
    </div>
  {/if}

</div>
