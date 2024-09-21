// pages/user-center/user-center.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false
  },

  goToInformation:function(){
    wx.navigateTo({
      url: '/pages/user-center/information/information',
    })
  },

  goToReleasing:function(){
    wx.navigateTo({
      url: '/pages/user-center/releasing/releasing',
    })
  },

  goToOrder:function(){
    wx.navigateTo({
      url: '/pages/user-center/order/order',
    })
  },

  goToMessage:function(){
    wx.navigateTo({
      url: '/pages/user-center/message/message',
    })
  },

  goToSet:function(){
    wx.navigateTo({
      url: '/pages/user-center/set/set',
    })
  },

  goToManager:function(){
    wx.navigateTo({
      url: '/pages/user-center/manager/manager',
    })
  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  onClickLogin:function() {
    wx.navigateTo({
      url: '/pages/user-center/login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})