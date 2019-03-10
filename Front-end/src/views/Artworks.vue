<template>
    <main id="artwork">
        <section>
            <h2>Artwork</h2>
        </section>
        <section class="search">
            
        </section>


        <section class="list">
            <artwork-item v-for="artwork in artwork-item" :key="artwork.id" :artwork="artwork"/>
        </section>

    </main>
</template>

<script>
import artworkItem from '@/components/artwork-item';

export default {
    name: 'artworks', 
    data() {
        return {
            artwork: []
        }
    }, 
    components: {
        artworkItem
    }, 
    computed: {
        artworks() {
            return this.$store.state.artworks;
        }
    }
}
</script>

<style>

</style>
