<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="statutSnackbar" :timeout="3000" :color="couleur">
      {{ texte }}
      <template v-slot:action>
        <v-btn plain @click="statutSnackbar = false"> Fermer </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "SnackbarComposant",
  data() {
    return {
      statutSnackbar: false,
      texte: "",
      couleur: "",
    };
  },
  methods: {},
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "AFFICHER_SNACKBAR") {
        this.texte = state.snackbarTexte;
        this.couleur = state.snackbarCouleur;
        this.statutSnackbar = true;
      }
    });
  },
};
</script>