/**
 * Created by Administrator on 2018/11/23.
 */
/* eslint-disable */

const config = {

  limit:20,

  RES_MSE: {
    SUCCESS_MSG: 'OK',
    FAIL_MSG: 'ERROR',
    FAIL_MSG_ERROR: '账号或密码错误',
    FAIL_MSG_CODE: '验证码错误',
    FAIL_MSG_EMAIL: '邮箱错误',
    FAIL_MSG_EMAIL_REPEAT: '邮箱已被绑定',
    FAIL_MSG_REPEAT: '收藏失败重复收藏',
    FAIL_MSG_MISSING: '缺少必要参数',
    FAIL_MSG_OVERTIME: '验证码超时',
  },

  RES_CODE: {
    SUCCESS_CODE: 200,
    FAIL_CODE: 500,
  },

  RES_DATA_MSG: {
    SUCCESS_MSG: 'SUCCESS',
    FAIL_MSG: 'FAIL',
  },

  RES_DATA_CODE: {
    SUCCESS_CODE: 100, //  成功
    FAIL_CODE: 104, //  失败
    NOT_LOGIN_CODE: 103, //  未登录
    REPEAT_ERROR_CODE: 105, //  重复
    ERROR_CODE: 106, //  错误
    MISSING_ERROR_CODE: 107, //  参数缺少
    OVERTIME_ERROR_CODE: 108, //  超时
  },

}
module.exports = config
