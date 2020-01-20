<template>
  <div class="articles">
    <header class="articles__header">
      <h1>{{ msg }}</h1>
    </header>

    <main>
      <section class="error" v-if="error">
        <p>
          We're sorry, we're not able to retrieve articles at the moment, please
          try back later or contact administrator with message described below.
        </p>
        <small>{{ error }}</small>
      </section>

      <div v-if="loading">Loading...</div>

      <article
        v-else
        v-for="(article, index) in articles"
        v-bind:key="index"
        class="article"
      >
        <Article :article="article" />
      </article>
    </main>

    <footer class="articles__footer" v-if="!error && !loading">
      <a class="btn" @click="fetchMore()">Show more</a>
    </footer>
  </div>
</template>

<script>
import { fetchApi } from "@/api.js";
import Article from "@/components/Article.vue";

export default {
  name: "Index",
  props: {
    msg: String
  },
  components: {
    Article
  },
  data() {
    return {
      page: 1,
      articles: [],
      error: null,
      loading: true
    };
  },
  methods: {
    fetchArticles(page) {
      fetchApi(page)
        .then(
          response => (this.articles = [...this.articles, ...response.articles])
        )
        .catch(error => {
          this.error = error;
        })
        .finally(() => (this.loading = false));
    },

    fetchMore() {
      this.fetchArticles((this.page += 1));
    }
  },
  mounted() {
    this.fetchArticles(this.page);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.articles {
  width: 90vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media (min-width: 576px) {
    main {
      flex-direction: column;
    }

    .article {
      width: 100%;
    }
  }

  @media (min-width: 992px) {
    main {
      flex-direction: row;
    }

    .article {
      width: 33.333%;

      /* Make first two articles wider than others */
      &:nth-child(-n + 2) {
        width: 50%;
      }
    }
  }

  main {
    display: flex;
    flex-wrap: wrap;
  }

  &__header {
    margin: 1em;
    text-align: left;
  }

  .error {
    margin: 0.75em;
    width: 100%;
    text-align: center;
  }

  &__footer {
    width: 100%;
    display: flex;
    .btn {
      width: 100%;
    }
  }

  .article {
    text-align: left;
  }
}
</style>
