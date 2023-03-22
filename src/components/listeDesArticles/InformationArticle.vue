<template>
  <div>
    <div v-if="affichageMobileEnCours">
      <v-text-field
        :value="article.prixUnitaireHorsTaxe"
        type="number"
        placeholder="Prix unitaire hors Taxe"
        outlined
        @change="articleModifie.prixUnitaireHorsTaxe = parseInt($event)"
      >
        <template v-slot:prepend>
          <span class="label-champ-de-saisie">Prix unitaire hors Taxe</span>
        </template>
      </v-text-field>
      <v-text-field
        :value="article.montantTva"
        type="number"
        placeholder="Montant de la TVA"
        outlined
        @change="articleModifie.montantTva = parseInt($event)"
      >
        <template v-slot:prepend>
          <span class="label-champ-de-saisie">Montant de la TVA</span>
        </template>
      </v-text-field>

      <p>Prix total TTC : {{ prixTtc }} €</p>

      <button
        class="btn btn--medium btn--blue"
        :disabled="regleAjoutArticle()"
        @click="modifierArticle()"
      >
        Modifier l'article
      </button>
    </div>
    <div v-else>
      <p>Prix unitaire hors taxe : {{ article.prixUnitaireHorsTaxe }}</p>
      <p>Montant de la TVA : {{ article.montantTva }}</p>
      <p>Prix total TTC : {{ prixTtc }} €</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "InformationArticle",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      articleModifie: {
        prixUnitaireHorsTaxe: this.article.prixUnitaireHorsTaxe,
        montantTva: this.article.montantTva,
      },
    };
  },
  methods: {
    regleAjoutArticle() {
      const champsRequis = [
        this.article.prixUnitaireHorsTaxe,
        this.article.montantTva,
      ];
      return champsRequis.every((champ) => champ) ? false : true;
    },
    modifierArticle() {
      this.$emit("modifier-article", this.articleModifie);
      this.$store.state.indexArticleSelectionne = -1; // Utilise pour fermer la liste des articles
      this.$store.state.articleSelectionne = null; // Permet de reset les champ une fois la modification terminée

      this.$store.commit("AFFICHER_SNACKBAR", {
        texte: "Modification effectuée",
        couleur: "primary",
      });
    },
  },
  computed: {
    affichageMobileEnCours: {
      get() {
        if (window.innerWidth < 768) {
          return true;
        } else {
          return false;
        }
      },
    },
    prixTtc: {
      get() {
        const prixTva =
          this.articleModifie.prixUnitaireHorsTaxe *
          (this.articleModifie.montantTva / 100);

        return this.articleModifie.prixUnitaireHorsTaxe + prixTva;
      },
    },
  },
};
</script>
<style lang="scss">
.label-champ-de-saisie {
  width: 7rem;
}
</style>