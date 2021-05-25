<script>
    import Input from '../Input.svelte'
    let name, quantity, price, total


</script>

<style lang="scss">

</style>

<div class="listItemContainer">
    <Input
    listItem='true'
    type="text"
    on:input
    placeholder=" "
    id="name"
    value={name}/>
</div>
