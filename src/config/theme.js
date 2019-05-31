/**
 * Created by Administrator on 2019/5/30.
 * 夜间主题 class文件
 */

const backgroundColorLight = '#282d3b'
const backgroundColorWhite = '#282d3b'
const fontColorLightGrey = '#282d3b'

const THEME = {
  night: `
  .bg-white{ background-color: ${backgroundColorWhite} !important;}
  .bg-light-grey{ background-color: ${backgroundColorLight} !important;}
  body{ background-color: ${backgroundColorLight} !important;color:${fontColorLightGrey}}
  .bg-gray{ background-color: ${backgroundColorLight} !important;}
  .van-tabs__nav { background-color: ${backgroundColorLight} !important;}
  .nav-title { background-color: ${backgroundColorLight} !important;}
  .van-tabbar { background-color: ${backgroundColorLight} !important;}
  .comment { background-color: ${backgroundColorLight} !important;}
  .van-popup { background-color: ${backgroundColorLight} !important;}
  .bg-light { background-color: ${backgroundColorLight} !important;}
  .van-cell { background-color: ${backgroundColorLight} !important;}
  `,
  day: ``
}
export default {THEME}
