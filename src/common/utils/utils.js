//查询str在list中的index
export function getIndexList(str,strlist){
  for (let i=0;i<strlist.length;i++){
    if (strlist[i]===str){
      return i
    }
  }
}
//求和
export function listSum(list){
  return list.reduce((pre,n)=>pre+n)
}
//判断时间00:00-23:59
export function isTime(time){
  let pattern = /^([01]\d|2[0-3]):?([0-5]\d)$/
  let patternExp = new RegExp(pattern)
  return  patternExp.test(time)
}
//判断纯数字且大于0
export function isNumber(num){
  let pattern = /[0-9]+/
  let patternExp = new RegExp(pattern)
  if (num>=0){
    return patternExp.test(num)
  } else {
    return false
  }
}

export function isTelephone(phone){
  let pattern = /^[1][3456789][0-9]{9}$/;
  let patternExp = new RegExp(pattern)
  return patternExp.test(phone)
}
