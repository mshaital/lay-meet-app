/**
 * Created by Administrator on 2018/11/22.
 */
export default {
  contentCut: function (value) {
    value = value.replace(/<\/?[^>]*>/g, '') // 去除HTML tag
    value = value.replace(/[ | ]*\n/g, '\n') // 去除行尾空白
    // str = str.replace(/\n[\s| | ]*\r/g,'\n') // 去除多余空行
    value = value.replace(/ /ig, '')// 去掉
    if (value.length > 120) {
      value = value.substring(0, 120) + '...'
    }
    return value
  }
}
