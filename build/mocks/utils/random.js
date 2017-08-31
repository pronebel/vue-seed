module.exports = {
  element:function(arr){

    return function () {
      let length = arr.length;

      let seed = Math.round(Math.random()*(length-1))

      return arr[seed]
    }


  },
  number :function (max) {
    return function () {
      return  Math.round(Math.random()* max)
    }
  }

}
