<template>
    <h1>{{props.player1Points > props.player2Points ? 'Hai vinto!' : 'Oh no! Hai perso!'}}</h1>
      <h2>{{ `${props.player1Points} - ${props.player2Points}`}} </h2>
      <img :src="props.player1Points > props.player2Points ? winMeme : lostMeme" width="50%"></img>
        <div class="buttons">  
          <button @click="emit('resetGame')" class="primary-button">
            <h2>Riprova</h2>
          </button>
        </div>
</template>

<script setup lang="ts">
import { winMeme, lostMeme } from '@/assets/sources';

const props = defineProps<{
    player1Points: number;
    player2Points: number;
  }>();

const emit = defineEmits(['resetGame']);

</script>

<style scoped>

.primary-button {
  background-color: #0c0c0c;
  color: #fff;
  border: 1px solid #fff;
  display:flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 0.3rem 1rem !important;
  height: 37px;
  border-radius: 10px;
  margin: 0 5px;
}
.primary-button:hover {
  background-color: #fff; 
  color: #0c0c0c;
}

.players, .buttons, .primary-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>