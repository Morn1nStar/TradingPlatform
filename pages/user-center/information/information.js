// pages/user-center/information/information.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl, // 用户头像 URL
    userInfo: '',  // 用户昵称
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },

  // 处理保存用户信息
  onSaveUserInfo() {
    // 获取昵称输入框的值
    const nickname = this.data.nickname;

    // 模拟保存操作，例如保存到本地存储或服务器
    wx.setStorageSync('userAvatarUrl', this.data.avatarUrl);
    wx.setStorageSync('userNickname', nickname);

    wx.showToast({
      title: '用户信息已保存',
      icon: 'success',
    });
  },

  onButtonClick(e) {
    this.onSaveUserInfo();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  // 从本地存储中获取上次保存的选择结果
  const avatarUrl = wx.getStorageSync('avatarBase64');
  const userInfo = wx.getStorageSync('userInfo');

  if (avatarUrl) {
    this.setData({ avatarUrl });
  }

  if (userInfo) {
    this.setData({ userInfo });
  }
  },

  onGetUserInfo(e) {
    console.log(e.detail.userInfo); // 用户的微信信息，包括昵称
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo // 更新页面上显示的用户信息
      });
    }
  },

  onClick() {
    this.setData({
      show: true,
    });
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