
import { CET4Util } from '../../utils/dictionary/CET4Util'
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    num: 0,
    chinaword: "",
    japanword: "",
    list: [{ id: null, japan: "", china: "" },],
    },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("dictionary onLoad");
   
    var that = this;
    wx.request({
      url: 'https://home.zhigege.club/word/GetJsonWordList',
      data: {
      },
      header: { 'Content-Type': "application/x-www-form-urlencoded"},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res){
        console.log("----success-----");
        console.log(res.data);
        //储存服务器单词
        that.setData({
          chinaword: res.data[0].china,
          number: that.data.num,
          total: res.data.length, 
          list: res.data,
          })
      },
      fail: function (){},
      complete: function(){}
    }); 
  },

  /**
     * 更新本地单词
     */
  onloadChange: function () {
    console.log("----onloadChange-----");
    //初始默认显示0，所以点下一个需要加1才能显示
    this.data.num += 1;
    //判断是否循环完毕给出提示
    if (this.data.num >= this.data.total) 
    {
      wx.showModal({
        title: "恭喜，你已完成本章学习",
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } 
        }
      })
      this.data.num = 0
    }
    //更新中文单词
    this.setData({
      number: this.data.num,
      chinaword: this.data.list[this.data.num].china
    })

  },

  /**
   * 查看答案
   */
  onPeep: function() {
    console.log("----onPeep-----");
    
    wx.showModal({
      title: this.data.list[this.data.num].china,
      content: this.data.list[this.data.num].japan,
      showCancel: false,
      success: function (res) {
      }
    })

  },
  


  
})