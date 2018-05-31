<template>
  <div id="app">
    <img src="./assets/logo.png">

    <hello></hello>
    <button @click="test23()">test</button>
    <button @click="test24()">test1</button>
    <button @click="test2()">test2</button>
  </div>
</template>

<script>
import Hello from './components/Hello'
import MyLogger from './logger/MyLogger'
import {Logger} from './components/Logger'


export default {
  name: 'app',
  components: {
    Hello
  },
  methods:{
    test23:function(){
      var log  = new MyLogger();
      log.setLevel(MyLogger.DEBUG)
      log.debug("444");
      log.warn("444");
      log.error("444")
      log.moduleFlag = ["tree","tree1"]

      log.getMoudle("tree").debug("66666");
      log.getMoudle("tree1").debug("44444");
      //Logger.useDefaults()
     // Logger.error("333")



    },
    test24:function(){
      var log  = new MyLogger();



      log.getMoudle("BBBBB").debug("66666");
    },
    test2:function(){
//      Logger.debug("ghhhhhh")

    }
  },
  mounted()
  {

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
