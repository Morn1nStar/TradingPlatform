// pages/user-center/releasing/releasing.js
import Dialog from '@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    products:[]
  },
  goToDetail(event) {
    console.log(event.currentTarget.dataset.nowdata);
    const productId = event.currentTarget.dataset.nowdata.id;
    console.log(productId);
    wx.navigateTo({
      url: '/pages/homePage/detail/detail?id='+productId,
    });
  },
  fetchProducts() {  
    const jwtToken = wx.getStorageSync('userToken');

    wx.request({  
      url: 'http://localhost:8080/product', // 商品列表接口地址  
      method: 'GET',  
      header: {  
        'Authorization': `${jwtToken}` // 将JWT令牌添加到请求头中  
      }, 
      data: {  
        pageNum: 1,  
        pageSize: 10,  
        judge: 1
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

  deleteProduct(e) {
    const jwtToken = wx.getStorageSync('userToken');
    const id = e.currentTarget.dataset.id;

    var that = this;
    wx.request({  
      url: 'http://localhost:8080/product', 
      method: 'DELETE',  
      header: {  
        'Authorization': `${jwtToken}`, // 将JWT令牌添加到请求头中  
        'content-type': 'application/x-www-form-urlencoded'
      }, 
      data: {  
        id: id
      },  
      success(res) {  
        if (res.data.code === 0) {  
          wx.showToast({ title: '商品删除成功', icon: 'success' });
          that.onLoad();
        } else {  
          wx.showToast({ title: res.data.message || '删除失败', icon: 'none' });  
        }  
      },  
      fail(err) {  
        wx.showToast({ title: '请求失败，请检查网络', icon: 'none' });  
        console.error(err);  
      }  
    });  
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