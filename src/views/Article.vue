<template>
  <main class="page__wrapper">
    <router-link class="btn" to="/">Go back</router-link>
    <article class="article">
      <header class="article__header">
        <h4 class="article__title">{{ article.title }}</h4>
        <section class="article__section">
          <small>
            Author:
            <strong class="article__author"> {{ article.author }}</strong>
          </small>
          <time class="article__publication-time"
            >Published at: {{ formatDate(article.publishedAt) }}</time
          >
        </section>
      </header>

      <section class="article__section">
        <figure>
          <img
            :src="article.urlToImage"
            class="article__thumbnail"
            :alt="article.title"
          />
          <figcaption>
            <h1 class="article__description">{{ article.description }}</h1>
          </figcaption>
        </figure>
      </section>

      <section class="article__section">
        <p class="article__content">{{ article.content }}</p>
      </section>

      <a :href="article.url">source</a>
    </article>
    <section class="article__source" v-if="sourceArticles">
      <h4>More from {{ article.source.name }}</h4>
      <ul>
        <li v-for="(source, index) in processedArticles" v-bind:key="index">
          <router-link
            :to="{
              name: 'article',
              params: {
                title: parameterizedTitle(source.title),
                article: source
              }
            }"
            >{{ source.title }}</router-link
          >
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import { fetchApi } from "@/api.js";
import moment from "moment";

export default {
  name: "article",
  props: {
    article: Object
  },
  data() {
    return {
      sourceArticles: []
    };
  },
  computed: {
    processedArticles: function() {
      return this.sourceArticles.filter(
        article => article.title !== this.article.title
      );
    }
  },
  methods: {
    parameterizedTitle: function(title) {
      return title
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 -]/, "")
        .replace(/\s/g, "-");
    },
    formatDate(string) {
      return moment(String(string)).format("MM/DD/YYYY hh:mm");
    }
  },
  watch: {
    // Set localstorage article item on props change
    article() {
      localStorage.setItem("article", JSON.stringify(this.article));
    }
  },
  mounted() {
    // We are keeping article in localstorage to dont lose it on page reload, normally we would use vuex/redux persisted storage, its using localstorage anyway.
    // We could also fetch article with its id or url from api if it would provide us that possibility, newsapi.org doesnt.
    if (this.article) {
      // with each component mount save current viewed article as localstorage key/value
      localStorage.setItem("article", JSON.stringify(this.article));
    }

    if (localStorage.article) {
      // if there's key named 'article' in localstorage, load it from memory
      this.article = JSON.parse(localStorage.getItem("article"));
    }

    fetchApi(1, this.article.source.id).then(
      response => (this.sourceArticles = response.articles)
    );
  }
};
</script>

<style scoped lang="scss">
.article {
  text-align: left;

  &__title {
    font-weight: 800;
  }

  &__content {
    padding: 1em;
  }

  &__publication-time {
    font-weight: 600;
    font-size: 1em;
  }

  &__source {
    ul,
    h4 {
      text-align: left;
    }
  }

  &__header {
    margin: 0.75em 0;

    @media (max-width: 576px) {
      .article__section {
        flex-direction: column;
        align-items: center;
      }
    }

    @media (min-width: 992px) {
      .article__section {
        flex-direction: row;
      }
    }

    .article__section {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
