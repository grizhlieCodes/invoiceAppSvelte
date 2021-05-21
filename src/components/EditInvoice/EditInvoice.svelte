<script>

</script>

<style lang="scss">
    .overlay, .editInvoice {
        grid-column: 1/4;
        grid-row: 2/4;
    }

    .overlay{
        @include mq(tablet){
            grid-column: 2/5;
            grid-row: 1/3;
        }
    }
    .editInvoice {
        @include mq(tablet){
            grid-column: 2/5;
            grid-row: 1/3;
        }
    }

    .overlay {
        background: black;
        width: 100%;
        height: 100%;
        z-index:100;
        opacity: 50%;
    }

    .editInvoice {
        z-index: 200;
        color: white;
        height: 100%;
        width: clamp(37.5rem, 100%, 61.6rem);
        background: v(edit-invoice-bg);


    }
    
</style>

<div class="overlay">
    
</div>

<div class="editInvoice">TESTING</div>