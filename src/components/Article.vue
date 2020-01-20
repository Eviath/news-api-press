<template>
  <router-link
    :to="{
      name: 'article',
      params: { title: parameterizedTitle(), article: article }
    }"
    class="article__inner"
  >
    <figure>
      <img
        :src="article.urlToImage"
        :alt="article.title"
        class="article__thumbnail"
      />
    </figure>
    <header class="article__header">
      <small class="article__author">{{ article.author }}</small>
      <h1 class="article__title">{{ article.title }}</h1>
    </header>
  </router-link>
</template>

<script>
export default {
  name: "Article",
  props: {
    article: Object
  },
  methods: {
    // Parameterized title of article, to pass as param for router  /article/:title
    parameterizedTitle() {
      return this.article.title
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 -]/, "")
        .replace(/\s/g, "-");
    }
  }
};
</script>

<style lang="scss">
.article {
  /* Create spacing between articles */
  &__inner {
    text-decoration: none;
    padding: 1em;
    display: flex;
    flex-direction: column;
  }

  /* Override default agent-stylesheet styling, normally would use reset.css */
  figure {
    margin: 0;
  }

  &__header {
    margin: 0.75em 0;
  }

  /* Images should be all the same height to keep them aligned */
  &__thumbnail {
    width: 100%;
    max-height: 400px;
    min-height: 400px;
    object-fit: cover;
  }

  &__title {
    font-size: 2em;
    font-weight: 300;
    margin: 0.75em 0;
  }

  &__author {
    text-transform: uppercase;
    color: cornflowerblue;
    font-weight: 600;
    letter-spacing: 0.05em;
  }
}
</style>
