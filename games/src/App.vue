<template>
  <div class="prevent-select" :class="!showFooBarComponent ? 'page' : ''">
      <div v-if="!showFooBarComponent">
            <div v-if="!gameEnded">
                <div class="title-container">
                  <h2>Livello {{ gameLevel }}</h2>
                  <h1>{{ gameLevel === 1 ? 'Rock, Paper, Scissors' : gameLevel === 2 ? 'Rock, Paper, Scissors, Lizard, Spock' : ''}}</h1>
                  <p>Il primo che arriva a {{ targetPoints }} punti vince!</p>
                </div>

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


  <div v-else class="foobar-container">
    <p v-for="(item, index) in getFooBar()" :key="index">{{ item }}</p>
    <button @click="restartGame(); showFooBarComponent = false;" class="primary-button">
      <h3 >
        Ricomincia
      </h3> 
    </button>
  </div>
</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, watch } from 'vue';
import { PlayState, choices, choicesExtended, getPlayResult, getRandomChoice, type Choice } from './helpers/gameModel';
import { getFooBar } from './helpers/foobar'
import GameControls from './components/GameControls.vue';
import GameRoundChoices from './components/GameRoundChoices.vue';

// Import components
const GameFinalResult = defineAsyncComponent(
  () => import('./components/GameFinalResult.vue'),
);

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
 * Watch when a player wins the game
 */
watch([player1Pts, player2Pts], ([pt1, pt2]) => {
  gameEnded.value = pt1 >= targetPoints || pt2 >= targetPoints ? true : false;
}, {immediate: true});


/**
 * Play a round:
 * - a choice is provided in "human" mode
 * - undefined is provided in "computer" mode
 * @param choice choice of player 1. Player 2 is considered to be a computer
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
 * Resets game variables
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
 * Increases the level number
 */
function goToNextLevel(){
  if (gameLevel.value !== 2){
    gameLevel.value++;
  }
  resetGame();
}

/**
 * Restarts the game from the first level
 */
function restartGame(){
  gameLevel.value = 1;
  resetGame();
}

</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}

.foobar-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
}
.title-container {
  text-align: center;
  margin-bottom: 50px;
}

</style>
