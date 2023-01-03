<template>
  <div id="app">
      <!-- <h2>{{state.count}}</h2> -->
      <!-- <h2>{{ count.a }}</h2> -->
      <!-- <h2>{{ count }}</h2> -->
      <h2>{{ count }}</h2>
      <button @click="add">点击</button>
      <h3>{{x}}, {{y}}</h3>
  </div>
</template>

<script>
import {reactive, ref, toRefs, toRef, computed, watchEffect, watch, onMounted, onUpdated, onUnmounted } from '@vue/composition-api';
// import func from '../vue-temp/vue-editor-bridge';
// import func from '../vue-temp/vue-editor-bridge';

export default {
  name: 'App',
  setup() {
    // const state = reactive({
    //   count: 0
    // });
    // setTimeout(()=>{
    //   state.count++;
    // }, 2000)
    // return {state}

    // const count = ref('333');
    // setTimeout(() => {
    //   count.value++;
    // }, 2000);
    // console.log('coutn', count);
    // return {count}


    // const count = ref(0);
    // const state = reactive({
    //   count
    // });
    // setTimeout(() => {
    //   state.count++
    // }, 2000);

    // return { count }


    // const state = reactive({
    //   count: 0
    // });
    // setTimeout(() => {
    //   state.count++
    // }, 2000);
    // // 就是把普通的数据转成ref()方法对应的响应式数据
    // const { count } = toRefs(state);
    // return { count }



    // const state = reactive({
    //   count: 0
    // });
    // const count = toRef(state, 'count');
    // setTimeout(() => {
    //   state.count++
    // }, 2000);
    // return {count}

    // 计算属性
    // const count = ref(2);
    // const double = computed(() => {
    //   return count.value * 2;
    // })
    // setTimeout(() => {
    //   count.value++;
    // }, 2000)

    // return {
    //   count, double
    // }

    // const state = reactive({
    //   count: 1,
    //   double: computed(() => state.count * 2)
    // });
    // setTimeout(() => {
    //   state.count++;
    // }, 2000)
    // return toRefs(state);

    // 事件
    // const count = ref(3);
    // const add = () => {
    //   count.value++
    // };
    // return {
    //   count,
    //   add
    // }

    // watchEffect
    // const count = ref(3);
    // const add = () => {
    //   count.value++;
    //   if(count.value == 5) {
    //     stop(); //停止执行下面的console
    //   }
    // };
    // const stop = watchEffect( (cancel) => {
    //   console.log(count.value);
    // })

    // const stop = watchEffect(async (cancel) => {
    //   console.log(count.value);
    //   await new Promise((resolve, reject) => {
    //     console.log('promise', count.value);
    //     resolve();
    //   })
    //   cancel(() => { //会在异步之前进行触发,清除副作用
    //     console.log('cancel');
    //   })
    // })

    // watch(count, (count, prevCount) => {
    //   console.log('watch', count, prevCount);
    // })
    // return {
    //   count,
    //   add
    // }


    // -------------生命周期
    // 注：这些新的生命周期钩子函数，必须在setup()函数中进行使用
    const count = ref(0);
    const add = () => {
      count.value++;
    }

    // useMounted();

    const {x, y} = useMousePosition();
    return {
      count,
      add,
      x,
      y
    }
  },
};

function useMounted() {
  onMounted(() => {
    console.log('onMounted');
  });

  onUpdated(() => {
    console.log('onUpdated');
  });

  onUnmounted(() => {
    console.log('onUnmounted');
  })

}

function useMousePosition() {
  const x = ref(0);
  const y = ref(0);
  function update(e) {
    x.value = e.pageX;
    y.value = e.pageY;
  }

  onMounted(() => {
    window.addEventListener('mousemove', update);
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update);
  })

  return {x, y};
}

</script>

<style>

</style>
