/**
 * Created by Gezhg on 2019/3/15.
 */
/* eslint-disable */
import Util from '~utils/Util' // Toast Indicator
import { Toast } from 'vant';
// 输入验证器
function InputValidators() {
  // this.validators = []
  this.strategies = {}
}
//        validators.addValidationStrategy('isAllEmpty', function (errMsg, value1, value2) {
//          if ((isEmpty(value1) && isEmpty(value2)) || (isEmpty(value1) && value2 === 'undefined')) {
//            return validators.buildInvalidObj(errMsg, value1)
//          }
//        })
// 添加验证方法
// 参数:
//  rule: 验证策略字符串
//  errMsg: 验证失败时显示的提示信息
//  value: 被验证的值
InputValidators.prototype.addValidator = function(checkList) {
  for (let i = 0; i < checkList.length; i++) {
    let checkItem = checkList[i]
    let that = this
    let ruleElements = checkItem[0].split(':')

    let validators = function() {
      let strategy = ruleElements.shift()
      let params = ruleElements
      params.unshift(checkItem[2])
      params.unshift(checkItem[1])

      return that.strategies[strategy].apply(that, params)
    }
    let result = validators()
    if (result) return result
  }
}

// 添加验证策略函数
// 参数:
//  name: 策略名称
//  strategy: 策略函数
InputValidators.prototype.addValidationStrategy = function(name, strategy) {
  this.strategies[name] = strategy
}

// 从策略对象导入验证策略函数
// 参数:
//  strategies: 包含各种策略函数的对象
InputValidators.prototype.importStrategies = function(strategies) {
  for (let strategyName in strategies) {
    this.addValidationStrategy(strategyName, strategies[strategyName])
  }
}

// 验证失败时，将相关的错误信息打包返回
// 参数:
//   errMsg: 验证失败时的提示消息
//    value: 被验证的值
InputValidators.prototype.buildInvalidObj = function(errMsg, value) {
  console.log(errMsg)
  Toast(errMsg)
  return {
    value: value,
    errMsg: errMsg
  }
}

// 验证策略对象，包含默认的验证策略函数
let validationStrategies = {
  isNoEmpty: function(errMsg, value) {
    if (Util.Util.isEmpty(value)) {
      return this.buildInvalidObj(errMsg, value)
    }
  },

  maxLength: function(errMsg, value, length) {
    if (Util.Util.isEmpty(value)) return
    if (value.length > length) {
      return this.buildInvalidObj(errMsg, value)
    }
  },
  minLength: function(errMsg, value, length) {
    if (Util.Util.isEmpty(value)) return
    if (value.length < length) {
      return this.buildInvalidObj(errMsg, value)
    }
  },

  isName: function(errMsg, value) {
    let nameReg = /^([A-Za-z0-9]|[\u4E00-\u9FA5])*$/
    if (!nameReg.test(value)) {
      return this.buildInvalidObj(errMsg, value)
    }
  },
  isNull: function(errMsg, value) {
    if (value.toLowerCase() === 'null') {
      return this.buildInvalidObj(errMsg, value)
    }
  },
  isEmail: function(errMsg, value) {
    if (Util.Util.isEmpty(value)) return
    let emailReg = /^[a-z0-9](\w|\.|-)*@([a-z0-9]+-?[a-z0-9]+\.){1,3}[a-z]{2,4}$/
    if ( !emailReg.test(value)) {
      return this.buildInvalidObj(errMsg, value)
    }
  },
  isPhoneNum: function(errMsg, value) {
    if (Util.Util.isEmpty(value)) return
    let reg = /^1\d{10}$/
    if (!reg.test(value)) {
      return this.buildInvalidObj(errMsg, value)
    }
  },
  isTrue: function(errMsg, value) {
    if (!value) {
      return this.buildInvalidObj(errMsg, value)
    }
  },

  isAllEmpty: function(errMsg, value1, value2) {
    if ((Util.Util.isEmpty(value1) && Util.Util.isEmpty(value2)) || (Util.Util.isEmpty(value1) && value2 === 'undefined')) {
      return this.buildInvalidObj(errMsg, value1)
    }
  },

  idCardCheck: function(errMsg, value) {
    if (Util.Util.idCardCheck(value) !== 'true') {
      return this.buildInvalidObj(errMsg, value)
    }
  }
}
let newValidator = new InputValidators()
newValidator.importStrategies(validationStrategies)

export default { newValidator }

