<template>
  <div class="pick-content" v-show="value">
    <div class="content">
      <div ref="viewYear" data-date="valYear" class="scroll-content" @scroll="onScroll">
        <ul class="scroll-ul">
          <li class="scroll-li" :class="[lastList.valYear.index==index?'active':'normal']"
              v-for="(item, index) in valYear" :key="index">{{item}}
          </li>
        </ul>
      </div>
      <div ref="viewMonth" data-date="valMonth" class="scroll-content" @scroll="onScroll">
        <ul class="scroll-ul">
          <li class="scroll-li" :class="[lastList.valMonth.index==index?'active':'normal']"
              v-for="(item, index) in valMonth" :key="index">{{item}}
          </li>
        </ul>
      </div>
      <div ref="viewDay" data-date="valDay" class="scroll-content" @scroll="onScroll">
        <ul class="scroll-ul">
          <li ref="valLi" class="scroll-li" :class="[lastList.valDay.index==index?'active':'normal']"
              v-for="(item, index) in valDay" :key="index">{{item}}
          </li>
        </ul>
      </div>

    </div>
    <div class="button-group">
      <button class="" @click="$emit('input', false)">取消</button>
      <button class="" @click="saveDate">确定</button>
    </div>
  </div>

</template>

<script>
  /* eslint-disable */

  export default {
    name: 'datetime-picker',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      startYear: {
        type: Number,
        default: 1900
      },
      endYear: {
        type: Number,
        default: 2100
      },
      defaultDate: {
        type: Date,
        default() {
          return new Date()
        }
      },
    },
    data () {
      return {
        fontSize: 38,
        fontFamily: '',
        color: '#000',
        lineHeight: 1.6,
        spaceRows: 2,
        bttop: 0,
        bmtop: 0,
        fontStyle: '',
        mheight: '',
        mwidth: '',
        theight: '',
        bheight: '',
        liHeight: '',
        activeYear: 0,
        activeMonth: 0,
        activeDay: 0,
        lastList: {
          valYear: {
            list: [],
            name: '',
            index: 0
          },
          valMonth: {
            list: [],
            name: '',
            index: 0
          },
          valDay: {
            list: [],
            name: '',
            index: 0
          },
        },
        prev: 0,
        valYear: [],
        valMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        valDay: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        valDate: {
          valYear: 0,
          valMonth: 1,
          valDay: 1,
        }
      }
    },
    created () {
      this.initHtml()
    },
    mounted () {
      this.$nextTick(() => {
        //this.initDOM()
      })
    },
    watch: {
      value (n, o) {
        let _this = this
        n && setTimeout(function () {
          _this.initDOM()
        }, 0)
      }
    },
    methods: {
      initHtml () {
        this.liHeight = parseInt(this.fontSize * this.lineHeight)
        this.theight = this.liHeight * this.spaceRows
        this.bheight = this.theight
        this.mheight = this.theight + this.bheight + this.liHeight
        this.mwidth = this.width
        this.bttop = -this.mheight
        this.bmtop = this.liHeight
        if (this.fontFamily.length > 1) this.fontStyle = this.fontFamily
        if (this.fontSize > 5) this.fontStyle = this.fontSize
        let startYear = this.startYear
        while (startYear < this.endYear) {
          this.valYear.push(startYear)
          startYear++
        }
      },
      initDOM () {
        // 初始化赋值
        let year = this.defaultDate.getFullYear()
        let month = this.defaultDate.getMonth()
        let day = this.defaultDate.getDate()
        this.$refs.viewYear.scrollTop = this.valYear.indexOf(year) * this.liHeight
        this.$refs.viewMonth.scrollTop = month * this.liHeight
        this.$refs.viewDay.scrollTop = day * this.liHeight
        this.valDate.valYear = year
        this.valDate.valMonth = month + 1
        this.valDate.valDay = day
      },
      onScroll (e) {
        let dateNme = e.target.getAttribute('data-date')
        this.lis = e.target.children[0].children
        let _this = this
        let liHeighe = this.liHeight
        let vIndex = e.target.scrollTop / liHeighe
        if (vIndex === Math.round(vIndex)) {
          let tv = Math.round(vIndex)
          if (tv >= 0 && tv < _this.lis.length) {
            _this.lastList[dateNme] = {
              list: _this.lis,
              name: dateNme,
              index: tv
            }
            _this.dateChoose(dateNme, tv)
          }
        } else {
          _this.prev > vIndex ? e.target.scrollTop -= 1 : e.target.scrollTop += 1
        }
        _this.prev = vIndex
      },
      dateChoose (flag, num) {
        this.valDate[flag] = this[flag][num]
        if (flag === 'valMonth') {
          let d = new Date(this.valDate.valYear, this[flag][num], 0)
          this.valDay = []
          let i = 0
          while (i < d.getDate()) {
            this.valDay.push(i + 1)
            i++
          }
          this.$refs.viewDay.scrollTop = 0
        }
      },
      saveDate () {
        let valDate = this.valDate.valYear
        let valMonth = this.valDate.valMonth
        let valDay = this.valDate.valDay
        let strDate = valDate + '年' + valMonth + '月' + valDay + '日'
        let chooseDate = new Date(valDate + '-' + valMonth + '-' + valDay)
        console.log(strDate)
        this.$emit('getVal', chooseDate)
      }
    },
  }
</script>
<style>
  .pick-content {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 80%;
    height: 360px;
    background-color: #ffffff;
  }

  .content {
    width: 100%;
    display: flex;
  }

  .normal {
    font-weight: 100;
  }

  .active {
    font-weight: 900;
    background-color: #dbdbdb;
    border-radius: 30px;
  }

  .none {
    display: none;
  }

  .block {
    display: block;
  }

  .scroll-content {
    width: 100%;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    overflow: scroll;
    z-index: 2;
    height: 300px;
  }

  .scroll-ul {
    padding: 0;
    width: 100%;
    z-index: 1;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    margin-top: 120px;
    margin-bottom: 120px;
  }

  .scroll-li {
    margin: 0;
    padding: 0;
    text-align: center;
    font-size: 25px;
    line-height: 60px;
    height: 60px;
  }

  .cover_top {
    background-color: #fff;
    width: 100%;
    z-index: 3;
    opacity: 0.6;
    border-bottom: 2px solid grey;
    pointer-events: none;
    -ms-touch-action: none;
  }

  .cover_bottom {
    background-color: #fff;
    width: 100%;
    z-index: 3;
    opacity: 0.6;
    border-top: 2px solid grey;
    pointer-events: none;
    -ms-touch-action: none;
  }

  .button-group {
    display: flex;
    justify-content: space-around;
  }

  .button-group button {
    margin: 20px;
    background-color: white;
    border: 1px grey solid;
    border-radius: 5px;
    padding: 5px 20px;
    outline: none;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
</style>
