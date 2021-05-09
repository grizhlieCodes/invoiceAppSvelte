<script>
    export let type = 'h1', content;
</script>

{#if type === 'h1'}
     <h1>
        {content}
     </h1>
{:else if  type === 'h2'}
     <h2>
         {content}
     </h2>
{:else if  type === 'h3'}
    <h3>
        {content}
    </h3>
{:else if  type === 'h4'}
    <h4>
        {content}
    </h4>
{/if}


<style lang="scss">
    h1 {
        font-family: var(--spartan);
        font-size: 2rem;
        color: var(--main-text-color);
        letter-spacing: -0.0063rem;
        font-weight: var(--font-bold);

        @include mq(tablet){
            font-size: 3.2rem;
            letter-spacing: -0.01rem;
        }
    }
    h2 {
        font-family: var(--spartan);
        font-size: 2rem;
        color: var(--main-text-color);
        letter-spacing: -0.0063rem;
        font-weight: var(--font-bold);
    }
    h3 {
        font-family: var(--spartan);
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: var(--main-text-color);
        letter-spacing: -0.008rem;
        font-weight: var(--font-bold);
    }
    h4 {
        font-family: var(--spartan);
        font-size: 1.2rem;
        line-height: 1.5rem;
        color: var(--main-text-color);
        letter-spacing: -0.0025rem;
        font-weight: var(--font-bold);
    }

</style>
