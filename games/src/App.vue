<template>

  <div v-if="!gameEnded">
    <h1 class="title">Rock, Paper, Scissors</h1>
    <p class="title">Il primo che arriva a {{ targetPoints }} punti vince!</p>
    
    <div class="players">
      <div class="player">
        <p class="player-name">Giocatore 1</p>
        <div :class="{ 'card-choice': true, 'win': player1Wins }">
          <img v-if="choice1 ":src="player1Wins ? winIconPaths[choice1] : iconPaths[choice1]" class="icon" /> 
        </div>
        <h3 class="player-score">{{ player1Pts }} pt</h3>
      </div>
      
      <p>vs</p>
      
      <div class="player">
        <p class="player-name">Avversario</p>
        <div :class="{ 'card-choice': true, 'win': player2Wins }">
          <img v-if="choice2 ":src="player2Wins ? winIconPaths[choice2] : iconPaths[choice2]" class="icon" /> 
        </div>
        <h3 class="player-score">{{ player2Pts }} pt</h3>
      </div>
    </div>

    <div v-if="player1IsHuman" class="buttons">
      <button v-for="(choice, idx) in choices" :key="idx" @click="playRound(choice)" class="icon-button">
        <img :src="iconPaths[choice]" class="icon" />  
      </button>
    </div>
    <div v-else class="buttons">
      <button @click="playRound()" class="icon-button">
        <img :src="swordsIcon" class="icon" />  
      </button>
    </div>

    <div class="primary-button-container">
      <button @click="player1IsHuman= !player1IsHuman" class="primary-button">
        <h3>
          {{player1IsHuman ? 'Gioca come computer' : 'Gioca come umano'}}
        </h3> 
      </button>
    </div>
  </div>

  <div v-else class="title">
    <h1>{{player1Pts > player2Pts ? 'Hai vinto!' : 'Oh no! Hai perso!'}}</h1>
    <h2>{{ `${player1Pts} - ${player2Pts}`}} </h2>
     <img :src="player1Pts > player2Pts ? winMeme : lostMeme" width="50%"></img>
     <div class="primary-button-container">  
        <button @click="resetGame()" class="primary-button">
          <h2>Riprova</h2>
        </button>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { PlayState, choices, getPlayResult, getRandomChoice, type Choice } from './helpers/gameModel';
import { iconPaths, winIconPaths, swordsIcon, lostMeme, winMeme } from './assets/sources'

const choice1 = ref<Choice>();
const choice2 = ref<Choice>();
const player1IsHuman = ref(true);
const player1Pts = ref(0);
const player2Pts = ref(0);
const player1Wins = ref(false);
const player2Wins = ref(false);

const targetPoints = 3;
const gameEnded = ref(false);

/**
 * Monitora quando un giocaore vince la partita
 */
watch([player1Pts, player2Pts], ([pt1, pt2]) => {
  gameEnded.value = pt1 >= targetPoints || pt2 >= targetPoints ? true : false;
});


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
</script>

<style scoped>
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
