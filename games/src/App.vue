<template>
  <div v-if="!showFooBarComponent">
  <div v-if="!gameEnded">
    <h2 class="title">Livello {{ gameLevel }}</h2>
    <h1 class="title">{{ gameLevel === 1 ? 'Rock, Paper, Scissors' : gameLevel === 2 ? 'Rock, Paper, Scissors, Lizard, Spock' : ''}}</h1>
    <p class="title">Il primo che arriva a {{ targetPoints }} punti vince!</p>
    
   <GameRoundChoices 
      :choice1="choice1" 
      :choice2="choice2" 
      :player1Wins="player1Wins" 
      :player2Wins="player2Wins" 
      :player1-points="player1Pts" 
      :player2-points="player2Pts"
      />

   <GameControls 
      :available-choices="gameLevel === 1 ? choices : gameLevel === 2 ? choicesExtended : choices"
      @user-pick="playRound"/>
  </div>

  <GameFinalResult v-else 
  :player1-points="player1Pts"
  :player2-points="player2Pts"
  :is-game-finished="gameLevel === 2"
  @restart-game="restartGame()"
  @next-level="goToNextLevel()"
  @get-foo-bar="showFooBarComponent = true;"
  />
</div>

<div v-if = "showFooBarComponent" class="foobar">
  <p v-for="(item, index) in getFooBar()" :key="index">{{ item }}</p>
  <button @click="restartGame(); showFooBarComponent = false;" class="primary-button">
    <h3>
      Ricomincia
    </h3> 
  </button>
</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { PlayState, choices, choicesExtended, getPlayResult, getRandomChoice, type Choice } from './helpers/gameModel';
import { getFooBar } from './helpers/foobar'
import GameControls from './components/GameControls.vue';
import GameRoundChoices from './components/GameRoundChoices.vue';
import GameFinalResult from './components/GameFinalResult.vue';

const choice1 = ref<Choice>();
const choice2 = ref<Choice>();
const player1Pts = ref(0);
const player2Pts = ref(0);
const player1Wins = ref(false);
const player2Wins = ref(false);

const targetPoints = 3;
const gameEnded = ref(false);
const gameLevel = ref(1);
const showFooBarComponent = ref(false);

/**
 * Monitora quando un giocaore vince la partita
 */
watch([player1Pts, player2Pts], ([pt1, pt2]) => {
  gameEnded.value = pt1 >= targetPoints || pt2 >= targetPoints ? true : false;
}, {immediate: true});


/**
 * Gioca un round.
 * @param choice scelta del giocatore 1. Se undefined viene scelta in automatico (es modalita computer)
 */
function playRound(choice: Choice | undefined) {
  if (!choice) choice = getRandomChoice();
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

/**
 * Resetta le variabili di gioco
 */
function resetGame(){
  choice1.value = undefined;
  choice2.value = undefined;
  player1Wins.value = false;
  player2Wins.value = false;
  player1Pts.value = 0;
  player2Pts.value = 0;
  gameEnded.value = false;
}

/**
 * Passa al livello successivo
 */
function goToNextLevel(){
  if (gameLevel.value !== 2){
    gameLevel.value++;
  }
  resetGame();
}

function restartGame(){
  gameLevel.value = 1;
  resetGame();
}


</script>

<style scoped>
.foobar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  text-align: center;
  margin-bottom: 20px;
}

.players, .buttons, .primary-button-container {
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

.icon {
  width: 42px; 
  height: 42px;
  padding: 20px;
}

.card-choice {
  background-color: #0c0c0c;
  color: #fff;
  border: 4px solid #fff;
  text-align: center;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  height: 120px;
  width: 120px;
  border-radius: 10px;
}

.card-choice.win {
  background-color: #fff;
  color: #0c0c0c;
}

.player-score {
  margin: 5px 0 0;
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

.icon-button {
  background-color: transparent; 
  border: none; 
  cursor: pointer; 
  padding: 0; 
}

.icon-button:hover .icon {
  border: 1px solid #fff;
  border-radius: 10px;
}

</style>
