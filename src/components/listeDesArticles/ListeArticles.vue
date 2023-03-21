<template>
  <div class="composant-global-liste-article">
    <h2>Mes articles</h2>
    <!-- liste des articles -->
    <div class="liste-des-articles">
      <v-expansion-panels v-model="indexArticleSelectionne">
        <v-expansion-panel
          v-for="(article, index) in listeDesArticles"
          :key="index"
        >
          <v-expansion-panel-header @click="ouvrirInfoArticle(article)">{{
            article.nomArticle
          }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <InformationArticle :article="article" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import InformationArticle from "@/components/listeDesArticles/InformationArticle.vue";

export default {
  name: "ListeArticles",
  props: {
    listeDesArticles: {
      type: Array,
      required: true,
    }
  },
  components: {
    InformationArticle,
  },
  data() {
    return {
      indexArticleSelectionne: null,
    };
  },
  methods: {
    ouvrirInfoArticle(article) {
      this.$store.state.articleSelectionne = article;
    },
  },
  watch: {
    indexArticleSelectionne: function (valeur) {
      // Si un article est selectionne, l'ajout d'article passe en modification
      if (!valeur && valeur !== 0) {
        this.$store.state.articleSelectionne = null;
      }
      this.$store.state.indexArticleSelectionne = valeur;
    },
    "$store.state.indexArticleSelectionne": function (index) {
      // Obligatoire de fermer les expensionpanel a cause du composant qui n'est pas reactif
      if (index === -1) {
        this.indexArticleSelectionne = -1;
      }
    },
  },
};
</script>
<style scoped>
.liste-des-articles {
  padding: 3rem;
}
.composant-global-liste-article {
  padding: 1rem;
  flex: 50%;
}

/* Responsive */
@media (max-width: 800px) {
  .liste-des-articles {
    padding: 0;
  }
}
</style>
