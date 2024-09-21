Page({
  data: {
    // 页面数据
    username:'',
    password:''
  },


  register: function() {  
    const username = this.data.username;  
    const password = this.data.password;  

    console.log(username);
    
    if (!username || !password) {  
      wx.showToast({  
        title: '用户名或密码不能为空',  
        icon: 'none',  
        duration: 2000  
      });  
      return;  
    }  
  
    wx.request({  
      url: 'http://localhost:8080/user/register', 
      method: 'POST',  
      header: {  
        'content-type': 'application/x-www-form-urlencoded'  
      },  
      data: {  
        username: username,  
        password: password  
      },  
      success: function(res) {  
        if (res.data.code === 0) {  
          wx.showToast({  
            title: '注册成功',  
            icon: 'success',  
            duration: 2000  
          });  
          // 注册成功后，可以跳转到登录页面或进行其他操作  
          wx.setStorageSync('fromLogin', true); // 设置标志位
          wx.reLaunch({
            url: '/pages/homePage/homePage', // 替换为实际首页路径
          });
        } else {  
          wx.showToast({  
            title: '注册失败: ' + res.data.message,  
            icon: 'none',  
            duration: 2000  
          });  
        }  
      },  
      fail: function(err) {  
        wx.showToast({  
          title: '请求失败',  
          icon: 'none',  
          duration: 2000  
        });  
      }  
    });  
  },  
  // goToHomePage: function() {
  //   wx.setStorageSync('fromLogin', true); // 设置标志位
  //   wx.reLaunch({
  //     url: '/pages/homePage/homePage', // 替换为实际首页路径
  //   });
  // },

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
    }  
  
    wx.request({  
        url: 'http://localhost:8080/user/login', // 替换为实际的登录接口地址  
        method: 'POST',  
        header: {  
            'content-type': 'application/x-www-form-urlencoded'  
        },  
        data: {  
            username: username,  
            password: password  
        },  
        success: function(res) {  
            if (res.data.code === 0) {  
                wx.showToast({  
                    title: '登录成功',  
                    icon: 'success',  
                    duration: 2000  
                });  
                // 登录成功后，可以跳转到首页或进行其他操作  
                wx.setStorageSync('fromLogin', true); // 设置标志位
                wx.setStorageSync('userToken', res.data.data); // 假设data是JWT令牌，将其存储起来  
                wx.reLaunch({  
                    url: '/pages/homePage/homePage', // 替换为实际首页路径  
                });  
            } else {  
                wx.showToast({  
                    title: '登录失败: ' + res.data.message,  
                    icon: 'none',  
                    duration: 2000  
                });  
            }  
        },  
        fail: function(err) {  
            wx.showToast({  
                title: '请求失败',  
                icon: 'none',  
                duration: 2000  
            });  
        }  
    });  
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