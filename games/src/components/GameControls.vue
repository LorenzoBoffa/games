<template>
    <div>
      <div v-if="humanMode" class="buttons">
        <button v-for="(choice, idx) in availableChoices" :key="idx" @click="emitUserChoice(choice)" class="icon-button">
          <img :src="iconPaths[choice]" class="icon" />  
        </button>
      </div>
      <div v-else class="buttons">
        <button @click="emitUserChoice(undefined)" class="icon-button">
          <img :src="swordsIcon" class="icon" />  
        </button>
      </div>
  
      <div class="buttons" style="margin-bottom: none;">
        <button @click="humanMode = !humanMode" class="primary-button">
          <h3>
            {{ humanMode ? 'Gioca come computer' : 'Gioca come umano' }}
          </h3> 
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits } from 'vue';
  import { type Choice } from '@/helpers/gameModel';
  import { swordsIcon, iconPaths } from '@/assets/sources';
  
  const props = defineProps<{
    availableChoices: Choice[];
  }>();
  
  const emit = defineEmits(['userPick']);
  
  const humanMode = ref<boolean>(true);
  
  /**
   * Emit della scelta al parent component
   * @param choice scelta del giocatore 1, se computer mode emitta un undefined
   */
  function emitUserChoice(choice: Choice | undefined) {
    emit('userPick', choice);
  }
  
  </script>
  <style scoped>
   .buttons{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
   }

   .icon {
    width: 42px; 
    height: 42px;
    padding: 20px;
  }
  
  .icon-button {
    background-color: transparent; 
    border: none; 
    cursor: pointer; 
    padding: 0; 
  }
  
  .icon-button:hover .icon {
    border: 1px solid #fff;
    background-color: var(--color-black-soft);
    border-radius: 10px;
  }

  @media only screen and (max-width: 440px) {
  .icon {
    width: 32px;
    height: 32px;
    padding: 10px;
  }
}
  </style>