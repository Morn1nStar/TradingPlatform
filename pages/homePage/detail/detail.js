// pages/homePage/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    advertsLideArray: [
      { src: '/images/icons/shopping.png' },
      { src: '/images/icons/avatar.png' },
      { src: '/images/icons/order.png'}
    ],
    productDetail: {}
  },

  onClickIcon() {
    Toast('进入客服');
  },

  onClickButton() {
    Toast('点击按钮');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {  
    const productId = options.id; // 从页面参数中获取商品ID  
    console.log(productId);
    if (productId) {  
      this.getProductDetail(productId);  
    } 
  },  

  /**  
   * 获取商品详情  
   */  
  getProductDetail(productId) {  
    const jwtToken = wx.getStorageSync('userToken');

    wx.request({  
      url: 'http://localhost:8080/product/detail', 
      method: 'GET',  
      header: {  
        'Authorization': `${jwtToken}` // 将JWT令牌添加到请求头中  
      }, 
      data: {
        id: productId
      },
      success: (res) => {  
        if (res.data.code === 0) {  
          this.setData({  
            productDetail: res.data.data  
          });  
          console.log(this.data.productDetail);
        } else {  
          wx.showToast({  
            title: '获取商品详情失败',  
            icon: 'none'  
          });  
        }  
      },  
      fail: () => {  
        wx.showToast({  
          title: '网络请求失败',  
          icon: 'none'  
        });  
      }  
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