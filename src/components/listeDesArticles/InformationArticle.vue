<template>
  <div>
    <p>Prix unitaire hors taxe : {{ article.prixUnitaireHorsTaxe }}</p>
    <p>Montant de la TVA : {{ article.montantTva }}</p>
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
};
</script>

<style>
</style>