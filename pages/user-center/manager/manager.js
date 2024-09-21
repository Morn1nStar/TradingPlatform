// pages/user-center/manager/manager.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    products:[],
    id:''
  },
  fetchProducts() {  
    const jwtToken = wx.getStorageSync('userToken');
    console.log(this.data.id);
    wx.request({  
      url: 'http://localhost:8080/product', // 商品列表接口地址  
      method: 'GET',  
      header: {  
        'Authorization': `${jwtToken}` // 将JWT令牌添加到请求头中  
      }, 
      data: {  
        pageNum: 1,  
        pageSize: 1000,  
        state: '待审核'
        // 可以根据需要添加 categoryId , state  和 judge参数  
      },  
      success: (res) => {  
        if (res.data.code === 0) {  
          this.setData({  
            products: res.data.data.items, // 更新商品列表数据  
          });  
        // console.log(this.data.products)
        } else {  
          // 处理错误情况  
          wx.showToast({  
            title: '加载商品失败',  
            icon: 'none',  
            duration: 2000  
          });  
        }  
      },  
      fail: () => {  
        // 处理请求失败的情况  
        wx.showToast({  
          title: '请求失败',  
          icon: 'none',  
          duration: 2000  
        });  
      }  
    });  
  }, 

  illegal:function() {
    const jwtToken = wx.getStorageSync('userToken');
    
    wx.request({  
      url: 'http://localhost:8080/product', // 商品列表接口地址  
      method: 'PUT',  
      header: {  
        'Authorization': `${jwtToken}` // 将JWT令牌添加到请求头中  
      }, 
      data: {  
        id: this.data.id,  
        state: '未通过'
      },  
      success: (res) => {  
        wx.showToast({  
          title: '审批通过',  
          icon: 'success',  
          duration: 2000  
        });
      },  
      fail: () => {  
        // 处理请求失败的情况  
        wx.showToast({  
          title: '请求失败',  
          icon: 'none',  
          duration: 2000  
        });  
      }  
    }); 
  },
  pass:function(e) {
    const jwtToken = wx.getStorageSync('userToken');
    const id = e.currentTarget.dataset.id;
    const state = '已上架';
    const requestData = {
      id: id,
      state: state
    };
    var that = this;

    wx.request({  
      url: 'http://localhost:8080/product', // 商品列表接口地址  
      method: 'PUT',  
      header: {  
        'Authorization': `${jwtToken}`, // 将JWT令牌添加到请求头中  
        'content-type': 'application/x-www-form-urlencoded'
      }, 
      data: requestData,  
      success: (res) => {  
        if (res.data.code === 0) {
          wx.showToast({  
            title: '审批通过',  
            icon: 'success',  
            duration: 2000  
          }); 
          that.onLoad();
        } else {
          wx.showToast({  
            title: '更新失败',  
            icon: 'error',  
            duration: 2000  
          }); 
        }
      },  
      fail: () => {  
        // 处理请求失败的情况  
        wx.showToast({  
          title: '请求失败',  
          icon: 'none',  
          duration: 2000  
        });  
      }  
    }); 
  },
  delete:function() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchProducts();
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