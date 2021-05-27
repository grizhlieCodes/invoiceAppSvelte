<script>
  import {createEventDispatcher} from 'svelte'
  const dispatch = createEventDispatcher();

</script>

<style lang="scss">
    button.back {
        grid-area: goBack;
        background: none;
        outline: none;
        border: none;
        display: flex;
        flex-flow: row nowrap;
        cursor: pointer;
        margin-bottom: 1.6rem;

        p {
          color: v(main-text-color);
          margin-left: 2.3rem;
          transition: color 200ms ease;
          font-weight: v(font-bold);
        }

        img {
          transition: transform 400ms ease;
        }

        &:hover {
          img {
            transform: rotate(360deg);
          }
          p{
            color: v(purple-500);
          }
        }
    }
</style>

<button class="back" on:click>
  <img src="./assets/icon-arrow-left.svg" alt="left arrow" />
  <p>Go back</p>
</button>
