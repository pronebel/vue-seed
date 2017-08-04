import dateMath from 'date-arithmetic'

export let formatEventStatus=(status,endTime,isTransform)=>{


  const enumS = {
    unstart:"即将开始",
    start:"进行中",
    end:"已结束",
    award:"已评奖"
  }
  if(isTransform &&  status=='start'){
    let days = dateMath.diff(new Date(), endTime, "day",true)
    let dayTotal = Math.ceil(days);
    if(dayTotal>15 || dayTotal<=0){
      return enumS[status]
    }else{
      return '最后'+dayTotal+'天'
    }
  }else{
    return enumS[status]
  }
}
