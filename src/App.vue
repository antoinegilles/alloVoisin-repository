<template>
  <v-app>
    <v-main>
      <div class="vue-global-article">
        <ListeArticles :listeDesArticles="listeDesArticles" />
        <AjoutArticle
          v-on:ajouter-article="ajouterArticle"
          v-on:modifier-article="modifierArticle"
        />
      </div>

      <!-- Snackbar -->
      <snackbar-composant />
    </v-main>
  </v-app>
</template>

<script>
import ListeArticles from "@/components/listeDesArticles/ListeArticles.vue";
import AjoutArticle from "@/components/ajoutArticle/AjoutArticle.vue";
import SnackbarComposant from "@/components/shared/SnackbarComposant.vue";

export default {
  name: "App",
  components: {
    ListeArticles,
    AjoutArticle,
    SnackbarComposant,
  },

  data() {
    return {
      listeDesArticles: [
        {
          nomArticle: "Achat de matériel",
          prixUnitaireHorsTaxe: 10,
          montantTva: 10,
          montantTtc: 11,
        },
        {
          nomArticle: "Dépose des murs",
          prixUnitaireHorsTaxe: 18,
          montantTva: 20,
          montantTtc: 21.6,
        },
        {
          nomArticle: "Dépose des radiateurs",
          prixUnitaireHorsTaxe: 150,
          montantTva: 10,
          montantTtc: 165,
        },
        {
          nomArticle: "Dépose des sols",
          prixUnitaireHorsTaxe: 130,
          montantTva: 12,
          montantTtc: 145.6,
        },
        {
          nomArticle: "Remplacement sanitaire",
          prixUnitaireHorsTaxe: 90,
          montantTva: 9,
          montantTtc: 98.1,
        },
        {
          nomArticle: "Pose meuble vasque",
          prixUnitaireHorsTaxe: 59,
          montantTva: 10,
          montantTtc: 64.9,
        },
      ],
    };
  },
  methods: {
    ajouterArticle(nouvelArticle) {
      const monNouvelArticle = { ...nouvelArticle };
      this.listeDesArticles.push(monNouvelArticle);
    },
    modifierArticle(modificationDeLarticle) {
      this.listeDesArticles[this.$store.state.indexArticleSelectionne] =
        modificationDeLarticle;
    },
  },
};
</script>
<style lang="scss">
// Surcharge a la librairie vuetify
.v-main__wrap {
  background-color: #d6f0ff91 !important;
}
</style>

<style lang="scss" scoped>
.vue-global-article {
  display: flex;
  align-items: center;
  height: 100vh;
}

/* Responsive */
@media (max-width: 800px) {
  .vue-global-article {
    flex-direction: column;
  }
}
</style>
