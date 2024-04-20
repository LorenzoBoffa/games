<template>
  <div class="title">
    <h1>{{props.player1Points > props.player2Points ? 'Hai vinto!' : 'Oh no! Hai perso!'}}</h1>
      <h2>{{ `${props.player1Points} - ${props.player2Points}`}} </h2>
      <img :src="props.player1Points > props.player2Points ? (props.isGameFinished ? winMeme : winMemeNextLevel) : lostMeme"></img>
        <div class="buttons">  
          <button v-if="props.player1Points < props.player2Points" @click="emit('restartGame')" class="primary-button">
            <h2>Riprova</h2>
          </button>
          <button v-if="props.player1Points > props.player2Points && !isGameFinished" @click="emit('nextLevel')" class="primary-button">
            <h2>Livello Successivo</h2>
          </button>
          <button v-if="props.player1Points > props.player2Points && isGameFinished" @click="emit('getFooBar')" class="primary-button">
            <h1>Riscatta il premio</h1>
          </button>
        </div>
      </div>
</template>

<script setup lang="ts">
import { winMeme, winMemeNextLevel, lostMeme } from '@/assets/sources';

const props = defineProps<{
    player1Points: number;
    player2Points: number;
    isGameFinished: boolean;
  }>();

const emit = defineEmits(['restartGame', 'nextLevel', 'getFooBar']);

</script>

<style scoped>
img{
    width:50%;
    max-width:600px;
}

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