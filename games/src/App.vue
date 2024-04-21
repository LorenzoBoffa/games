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
                    :right-icon-src="rightIconSrc"
                    :leftIconSrc="leftIconSrc"
                    :leftHighlighted="player1Wins"
                    :rightHighlighted="player2Wins"
                    :playStateMessage="!player1Wins && !player2Wins ? 'Pari!' : player1Wins ? 'Vinto!' : 'Perso'"
                    :player1Points="player1Pts"
                    :player2Points="player2Pts"
                    />

                <GameControls 
                    :available-choices="gameLevel === 1 ? choices : gameLevel === 2 ? choicesExtended : choices"
                    @user-pick="playRound"/>
            </div>

            
            <GameFinalResult v-else 
            :title="player1Pts > player2Pts ? 'Hai vinto!' : 'Oh no! Hai perso!' "
            :subtitle="`${player1Pts} - ${player2Pts}`"
            :button-title="finalButtonTitle"
            :image-src="finalImageSrc"
            @handle-action="handleFinalAction()"
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
import { computed, defineAsyncComponent, ref, watch } from 'vue';
import { PlayState, choices, choicesExtended, getPlayResult, getRandomChoice, type Choice } from './helpers/gameModel';
import { winMeme, winMemeNextLevel, lostMeme, winIconPaths, iconPaths } from './assets/sources';
import { getFooBar } from './helpers/foobar'
import GameControls from './components/GameControls.vue';
import GameRoundChoices from './components/GameRoundChoices.vue';

// Import components
const GameFinalResult = defineAsyncComponent(
  () => import('./components/GameFinalResult.vue'),
);

const choice1 = ref<Choice>(); //first player choice
const choice2 = ref<Choice>(); //second player choice
const player1Pts = ref(0); // first player total points for the current game
const player2Pts = ref(0); // second player total points for the current game
const player1Wins = ref(false); // first player total wins
const player2Wins = ref(false); // second player total wins

const targetPoints = 3; // total points to clear each level
const gameEnded = ref(false); // determines if level is finished
const gameLevel = ref(1); // level number
const showFooBarComponent = ref(false); // allows foobar component to diplay

const finalButtonTitle = ref<string>(""); // button label after level is cleared
const finalImageSrc = ref<string>(""); // image to show after level is cleared

// Sets the icon for the first player
const leftIconSrc = computed(()=> {
  if (choice1.value) return player1Wins.value ? winIconPaths[choice1.value] : iconPaths[choice1.value];
  else return undefined;
})
// Sets the icon for the second player
const rightIconSrc = computed(()=> {
  if (choice2.value) return player2Wins.value ? winIconPaths[choice2.value] : iconPaths[choice2.value];
  else return undefined;
})

/**
 * Watches when a player wins the game
 */
watch([player1Pts, player2Pts], ([pt1, pt2]) => {
  gameEnded.value = pt1 >= targetPoints || pt2 >= targetPoints ? true : false;

    // Round is lost so returning back to first level
    if (player1Pts.value < player2Pts.value){
      finalButtonTitle.value = "Riprova";
      finalImageSrc.value = lostMeme;
  }
  // Round is won and game is not ended yet
   else if (player1Pts.value > player2Pts.value && gameLevel.value === 1){
    finalButtonTitle.value = "Livello Successivo";
    finalImageSrc.value = winMemeNextLevel;
  }
  // Round is won and game is finished
  else if (player1Pts.value > player2Pts.value && gameLevel.value === 2){
    finalButtonTitle.value = "Riscatta il premio";
    finalImageSrc.value = winMeme;
  }
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

/**
 * Handles the action coming from the result component based on game state
 */
function handleFinalAction(){
  // Round is lost so returning back to first level
  if (player1Pts.value < player2Pts.value){
    restartGame();
  }
  // Round is won and game is not ended yet
  else if (player1Pts.value > player2Pts.value && gameLevel.value === 1){
    goToNextLevel();
  }
  // Round is won and game is finished
  else if (player1Pts.value > player2Pts.value && gameLevel.value === 2){
    showFooBarComponent.value = true;
  }
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
