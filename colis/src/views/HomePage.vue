<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonInput, IonButton, IonText } from '@ionic/vue';
import { AuthService } from '/services/auth';

const router = useRouter();
const email = ref('');
const password = ref('');
const erreur = ref('');
const loginEmail = async () => {
  erreur.value = '';
  try {
    await AuthService.signIn({email: email.value, password: password.value});
    router.replace('/home'); // Redirige vers l'accueil après connexion
  } catch (e: any) {
    erreur.value = e.message || 'Échec de la connexion';
  }
};

const loginGoogle = async () => {
  erreur.value = '';
  try {
    await AuthService.signInWithGoogle();
    router.replace('/home');
  } catch (e: any) {
    erreur.value = e.message || 'Échec de la connexion Google';
  }
};
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-input v-model="email" type="email" label="E-mail" label-placement="floating" />
      <ion-input v-model="password" type="password" label="Mot de passe" label-placement="floating" />

      <ion-text color="danger" v-if="erreur"><p>{{ erreur }}</p></ion-text>

      <ion-button expand="block" @click="loginEmail">Se connecter</ion-button>
      <ion-button expand="block" color="light" @click="loginGoogle">Continuer avec Google</ion-button>
    </ion-content>
  </ion-page>
</template>
