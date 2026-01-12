<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  
    <h2>Login in</h2>
    <label for="email">Email:</label>
    <input type="email" id="email" placeholder="Email" /><br>
    <label for="password">Password:</label>
    <input type="password" id="password" placeholder="Password" /><br>
    <button>Login</button>
    <p>Not registered? <router-link to="/register">Create an account</router-link></p>
    
 
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
  },
})
export default class HelloWorld extends Vue {
  msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
