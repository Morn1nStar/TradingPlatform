// pages/user-center/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:''
  },

  login: function() {  
    const username = this.data.username;  
    const password = this.data.password;  
  
    if (!username || !password) {  
        wx.showToast({  
            title: '用户名或密码不能为空',  
            icon: 'none',  
            duration: 2000  
        });  
        return;  
    } else if(username == "admin" && password == "123456"){
      wx.navigateTo({
        url: '/pages/user-center/manager/manager',
      })
    } else {
      wx.showToast({
        title: "账号或密码错误",
        icon: "error"
      })
    }

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