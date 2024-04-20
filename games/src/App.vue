<template>
  <div>
    <h1 class="title">Rock, Paper, Scissors</h1>
    
    <div class="players">
      <div class="player">
        <p class="player-name">Giocatore 1</p>
        <div :class="{ 'card-choice': true, 'win': player1Wins }">
          <h2>{{ choice1 }}</h2>
        </div>
        <h3 class="player-score">{{ player1Pts }} pt</h3>
      </div>
      
      <p>vs</p>
      
      <div class="player">
        <p class="player-name">Avversario</p>
        <div :class="{ 'card-choice': true, 'win': player2Wins }">
          <h2>{{ choice2 }}</h2>
        </div>
        <h3 class="player-score">{{ player2Pts }} pt</h3>
      </div>
    </div>

    <div class="buttons">
      <button v-for="(choice, idx) in choices" :key="idx" @click="player1IsHuman ? playRound(choice) : playRound()">{{ choice }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PlayState, choices, getPlayResult, getRandomChoice, type Choice } from './helpers/gameModel';

const choice1 = ref<Choice>();
const choice2 = ref<Choice>();
const player1IsHuman = ref(true);
const player1Pts = ref(0);
const player2Pts = ref(0);
const player1Wins = ref(false);
const player2Wins = ref(false);

/**
 * Gioca un round.
 * @param choice scelta del giocatore 1. Se undefined viene scelta in automatico (es modalita computer)
 */
function playRound(choice: Choice = getRandomChoice()) {
  const opponentChoice = getRandomChoice(); 

  choice1.value = choice;
  choice2.value = opponentChoice;

  const result = getPlayResult(choice, opponentChoice)

  if ( result === PlayState.Win){
    player1Pts.value++
    player1Wins.value = true;
    player2Wins.value = false;
  }else if (result === PlayState.Lose){
    player2Pts.value++
    player1Wins.value = false;
    player2Wins.value = true;
  }else{
    player1Wins.value = false;
    player2Wins.value = false;
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 20px;
}

.players {
  display: flex;
  justify-content: center;
  align-items: center;
}

.player {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
}

.player-name {
  margin: 0;
}

.card-choice {
  background-color: #0c0c0c;
  color: #fff;
  border: 1px solid #fff;
  text-align: center;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  height: 100px;
  width: 100px;
  border-radius: 10px;
}

.card-choice.win {
  background-color: #fff;
  color: #0c0c0c;
}

.player-score {
  margin: 5px 0 0;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button {
  background-color: #0c0c0c;
  color: #fff;
  border: 1px solid #fff;
  text-align: center;
  text-decoration: none;
  padding: 0.3rem 1rem !important;
  display: flex;
  align-items: center;
  height: 37px;
  border-radius: 10px;
  margin: 0 5px;
}

button:hover {
  background-color: #fff; 
  color: #0c0c0c;
}
</style>
