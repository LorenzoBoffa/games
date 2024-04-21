<template>
<div class="results-container">
      <div class="player">
        <p style="margin: 0">Giocatore 1</p>
        <div :class="{ 'card-choice': true, 'win': props.player1Wins }">
          <img v-if="props.choice1" :src="props.player1Wins ? winIconPaths[props.choice1] : iconPaths[props.choice1]" class="icon" /> 
        </div>
        <h3 class="player-score">{{ props.player1Points }} pt</h3>
      </div>
      
      <p>vs</p>
      
      <div class="player">
        <p style="margin: 0">Avversario</p>
        <div :class="{ 'card-choice': true, 'win': props.player2Wins }">
          <img v-if="props.choice2 ":src="props.player2Wins ? winIconPaths[props.choice2] : iconPaths[props.choice2]" class="icon" /> 
        </div>
        <h3 class="player-score">{{ props.player2Points }} pt</h3>
      </div>
    </div>

    <div class="results-container">
    <h2 v-if="choice1 && choice2" > {{ !props.player1Wins && !props.player2Wins ? 'Pari!' : props.player1Points ? 'Vinto!' : 'Perso' }} </h2>
    <h2 v-else> Scegli una mossa </h2>
  </div>
  </template>
  
  <script setup lang="ts">
  import type { Choice } from '@/helpers/gameModel';
  import { iconPaths, winIconPaths } from '@/assets/sources';
  
  const props = defineProps<{
    choice1: Choice | undefined;
    choice2: Choice | undefined;
    player1Wins: boolean;
    player2Wins: boolean;
    player1Points: number;
    player2Points: number;
  }>();
  </script>
  
  <style scoped>
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .results-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .player {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
  }

  .player-score {
    margin: 5px 0px 0px 0px;
  }
  
  .icon {
    width: 84px; 
    height: 84px;
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
    width: calc(50vw - 50px);
    height: calc(50vw - 50px);
    max-height: 160px;
    max-width: 160px;
    border-radius: 10px;
  }
  
  .card-choice.win {
    background-color: #fff;
    color: #0c0c0c;
  }
  
  @media only screen and (max-width: 440px) {
  .icon {
    width: 42px;
    height: 42px;
    padding: 10px;
  }
}

  </style>
  