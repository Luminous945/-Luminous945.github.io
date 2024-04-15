const globalMixin = {
  created() {
    // 在组件实例创建时执行的逻辑
    // 可以添加全局属性或方法
    // 例如：
    if(window.localStorage.getItem('stuName') === null){
      this.$show = true
    }else{
      this.$show = false
    }
  },
};

  export default globalMixin;