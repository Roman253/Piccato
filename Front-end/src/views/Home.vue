<template>
  <div id="hello">
    <section>
      <a href="#" class="smallbtn" @click="$router.push('/login')">Log In</a>
    </section>
    <section>
      <h1>Piccato</h1>
    </section>
    <section>
      <img src="https://placekitten.com/150/150" alt="logo">
    </section>
    <section class="infotxt">
      <p>Make a socialworkers happy!
        <br>This is the Kommunala kattkonstlagret, where you can rent artwork of cats.
        <br>Login to book our art.
      </p>
    </section>
    <section>
      <a href="#" @click="$router.push('/booking')">
        <h2>Rent an artwork!</h2>
      </a>
    </section>

    <!-- // will only show up if your logged 
    <section>
      <a href="#" @click="$router.push('/listRentedArt')">
        <h2>Your booked artwork!</h2>
      </a>
    </section>-->
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style lang="scss">
@import "../scss/main.scss";
@import "../scss/components.scss";

#hello {
  display: grid;
  height: 100%;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  justify-content: center;

  section {
    &:first-child {
      margin: 1.5rem;
      text-align: right;
    }

    &:last-child {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      margin-bottom: 1rem;
    }
    img {
      border-radius: 10px;
      border: solid white 2px;
    }

    h2 {
      font-size: 1.6rem;
    }
  }
}
</style>
