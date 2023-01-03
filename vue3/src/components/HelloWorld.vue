<template>
  <div class="hello">
    <!-- <h1>{{searchWord}}</h1> -->
    
  </div>
</template>

<script lang="ts">
// import { Component, Prop, Vue } from 'vue-property-decorator';

// @Component
// export default class HelloWorld extends Vue {
//   @Prop() private msg!: string;
// }
import {defineComponent, toRefs, reactive, watchEffect} from '@vue/composition-api';
import { use } from 'vue/types/umd';
import {useStore} from '../useSearchWord';
export default defineComponent({
  setup() {
    // const state = reactive({
    //   searchWord: useStore()
    // }) 

    // return toRefs(state);
    const searchWord = useStore();
    watchEffect(() => {
      console.log('thisis' + searchWord.value);
    })

  }
})
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
