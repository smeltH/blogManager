<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
    body{font-family: "Microsoft YaHei",serif;user-select:none;}
    body,dl,dd,p,h1,h2,h3,h4,h5,h6{margin:0;}
    ol,ul,li{margin:0;padding:0;list-style:none;}
    img{border:none;display:block;}
    a{text-decoration:none;color:#000;}
    .line {
        width: 100%;
        height: 1px;
        background-color: #ccc;
    }
    #app{
        background-color: #eee;
    }
</style>
