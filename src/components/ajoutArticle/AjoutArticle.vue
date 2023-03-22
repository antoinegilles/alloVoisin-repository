<template>
  <div class="composant-global-ajout-article">
    <h2 v-if="$store.state.articleSelectionne && !affichageMobileEnCours">
      Modifier un article
    </h2>
    <h2 v-else>Ajouter un article</h2>

    <div class="saisie-des-champs">
      <div>
        <v-text-field
          v-model="nouvelArticle.nomArticle"
          type="text"
          aria-label="Nom de l'article a ajouter"
          placeholder="Nom de l'article"
          outlined
        >
        </v-text-field>
      </div>
      <div>
        <v-text-field
          v-model.number="nouvelArticle.prixUnitaireHorsTaxe"
          type="number"
          aria-label="Prix unitaire hors taxe en euros"
          placeholder="Prix unitaire HT"
          outlined
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          v-model.number="nouvelArticle.montantTva"
          type="number"
          aria-label="Montant de la TVA en pourcentage"
          placeholder="TVA en %"
          outlined
        ></v-text-field>
      </div>
    </div>

    <div class="prix-total">
      <p>Prix total TTC</p>
      <p>{{ prixTtc }} €</p>
    </div>

    <!-- Boutton d'action pour l'enregistrement ou la modification d'article -->
    <div
      v-if="$store.state.articleSelectionne && !affichageMobileEnCours"
      class="boutton-enregistrer"
    >
      <button
        class="btn btn--medium btn--blue"
        :disabled="regleAjoutArticle()"
        @click="modifierArticle()"
      >
        Modifier l'article
      </button>
    </div>

    <div v-else class="boutton-enregistrer">
      <button
        class="btn btn--medium btn--orange-premier"
        :disabled="regleAjoutArticle()"
        @click="ajouterArticle()"
      >
        Enregistrer l'article
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AjoutArticle",
  data() {
    return {
      nouvelArticle: {
        nomArticle: null,
        prixUnitaireHorsTaxe: null,
        montantTva: null,
        montantTtc: null,
      },
      snackbarStatut: false,
    };
  },
  computed: {
    prixTtc: {
      get() {
        const prixTva =
          this.nouvelArticle.prixUnitaireHorsTaxe *
          (this.nouvelArticle.montantTva / 100);

        return this.nouvelArticle.prixUnitaireHorsTaxe + prixTva;
      },
    },
    affichageMobileEnCours: {
      get() {
        if (window.innerWidth < 768) {
          return true;
        } else {
          return false;
        }
      },
    },
  },

  methods: {
    regleAjoutArticle() {
      const champsRequis = [
        this.nouvelArticle.nomArticle,
        this.nouvelArticle.prixUnitaireHorsTaxe,
        this.nouvelArticle.montantTva,
      ];
      return champsRequis.every((champ) => champ) ? false : true;
    },

    ajouterArticle() {
      this.$emit("ajouter-article", this.nouvelArticle);
      this.nouvelArticle = {
        // Reset des champs
        nomArticle: null,
        prixUnitaireHorsTaxe: null,
        montantTva: null,
        montantTtc: null,
      };

      this.$store.commit("AFFICHER_SNACKBAR", {
        texte: "Article ajouté !",
        couleur: "success",
      });
    },

    modifierArticle() {
      this.$emit("modifier-article", this.nouvelArticle);
      this.$store.state.indexArticleSelectionne = -1; // Utilise pour fermer la liste des articles
      this.$store.state.articleSelectionne = null; // Permet de reset les champ une fois la modification terminée

      this.$store.commit("AFFICHER_SNACKBAR", {
        texte: "Modification effectuée",
        couleur: "primary",
      });
    },
  },
  watch: {
    prixTtc: function (valeur) {
      this.nouvelArticle.montantTtc = valeur;
    },
    "$store.state.articleSelectionne": function (articleSelectionne) {
      if (!this.affichageMobileEnCours) {
        if (articleSelectionne) {
          // Un article est en cours de selection
          this.nouvelArticle = { ...articleSelectionne };
        } else {
          this.nouvelArticle = {
            nomArticle: null,
            prixUnitaireHorsTaxe: null,
            montantTva: null,
            montantTtc: null,
          };
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.saisie-des-champs {
  padding-left: 3rem;
  padding-right: 3rem;
}
.boutton-enregistrer {
  display: flex;
  justify-content: center;
}
.composant-global-ajout-article {
  margin-left: 1rem;
  padding: 1rem;
  box-shadow: 0 0.4rem 0.8rem 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  flex: 30%;
}
.prix-total {
  padding-top: 0.2rem;
  display: flex;
  justify-content: space-around;
}

/* Responsive */
@media (max-width: 800px) {
  .saisie-des-champs {
    padding: 1rem;
  }
  .composant-global-ajout-article {
    margin-top: 1rem;
    width: 80%;
    margin-left: 0;
  }
}
</style>