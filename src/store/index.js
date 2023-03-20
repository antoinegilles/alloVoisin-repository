import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articleSelectionne: null,
    indexArticleSelectionne: null,
    snackbarTexte: "",
    snackbarCouleur: "",
  },
  getters: {
  },
  mutations: {
    AFFICHER_SNACKBAR(state, contenu) {
      state.snackbarTexte = contenu.texte;
      state.snackbarCouleur = contenu.couleur;
    },
  },
  modules: {
  }
})
