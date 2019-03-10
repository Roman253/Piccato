<template>
    <article class="art">
        <section class="artimg">{{artwork.artwork}}</section>
        <section class="artinfo">
            <h3>{{artwork.title}}</h3>
            <h3>{{artwork.artist}}</h3>
        </section>
        <section class="artprice">
            {{artwork.price}}
        </section>
    </article>
</template>

<script>
export default {
    name: 'artwork', 
    props: ['artwork']

}
</script>

<style>

</style>
