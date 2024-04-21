<template>
  <div style="text-align: center;">
    <h1>{{props.title}}</h1>
      <h2>{{ props.subtitle}} </h2>
      <img :src="props.imageSrc"></img>
        <div class="buttons">  
          <button @click="emit('handleAction')" class="primary-button">
            <h2>{{ props.buttonTitle }}</h2>
          </button>
        </div>
      </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string;
    subtitle: string;
    buttonTitle: string;
    imageSrc: string;
  }>();

const emit = defineEmits(['handleAction']);

</script>

<style scoped>
img{
    
    max-height:300px;
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

 .buttons{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}


</style>