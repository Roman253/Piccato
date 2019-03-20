<template>
  <div id="hello">
    <section>
      <h1>Piccato</h1>
    </section>
    <section>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/c6/IdeaLab_space_cat.svg"
        alt="logo"
        width="300px"
      >
    </section>
    <section class="infotxt">
      <p>Make your workers happy.
        <br>This is Piccato, where you can rent artwork of cats.
        <br>Login to rent our art today.
      </p>
    </section>
    <section>
      <a href="#" @click="$router.push('/booking')" class="btn">
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
    &:last-child {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      margin-bottom: 1rem;
    }

    img {
      border-radius: 10px;
    }

    h2 {
      font-size: 1.6rem;
      font-weight: lighter;
      padding: 0 1rem;
    }
    p {
      text-align: center;
    }
  }
}
</style>
