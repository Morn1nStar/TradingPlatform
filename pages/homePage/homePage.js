Page({
  data: {
    active: 0,
    show: false,
    products: [],
    recentProducts:[],
    digitalProducts:[],
    food:[],
    clothes:[],
    daily:[],
    books:[]
  },

  onClose() {
    this.setData({ show: false });
  },

  goToDetail(event) {
    console.log(event.currentTarget.dataset.nowdata);
    const productId = event.currentTarget.dataset.nowdata.id;
    console.log(productId);
    wx.navigateTo({
      url: '/pages/homePage/detail/detail?id='+productId,
    });
  },

  onLoad() {
    const fromLogin = wx.getStorageSync('fromLogin');
    
    if (fromLogin === true) {
      // 清除标志位，确保下次加载时不会显示弹出框
      wx.removeStorageSync('fromLogin');
    } else {
      this.checkLoginStatus();
    }

    this.fetchProducts();
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
        pageSize: 1000,  
        // 可以根据需要添加 categoryId 和 state 参数  
        state: "已上架"
      },  
      success: (res) => {  
        if (res.data.code === 0) {  
          this.setData({  
            products: res.data.data.items, // 更新商品列表数据  
          });  
        // console.log(this.data.products)

          // 更新页面数据以展示近一个月内的商品
          const currentDate = new Date();  
          const oneMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());  
          const recentProducts = this.data.products.filter(product => {  
          const productDate = new Date(product.createdTime);  
           return productDate >= oneMonthAgo;  
          });  
          this.setData({  
            recentProducts: recentProducts   
         });  

         // 更新页面数据以展示数码产品
         const digitalProducts = this.data.products.filter(product => {
           return product.categoryId === 1; 
         });
         this.setData({
           digitalProducts: digitalProducts 
         });
         // 更新页面数据以展示美食
         const food = this.data.products.filter(product => {
          return product.categoryId === 2; 
        });
        this.setData({
          food: food 
        });
         // 更新页面数据以展示服饰信息
        const clothes = this.data.products.filter(product => {
          return product.categoryId === 3; 
        });
        this.setData({
          clothes: clothes 
        });

        // 更新页面数据以展示日用品
        const daily = this.data.products.filter(product => {
          return product.categoryId === 4; 
        });
        this.setData({
          daily: daily 
        });

       // 更新页面数据以展示书籍
       const books = this.data.products.filter(product => {
        return product.categoryId === 5; 
      });
      this.setData({
        books: books 
      });

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

  checkLoginStatus() {
    // 假设 checkLoginStatus 是检查登录状态的方法
    const isLoggedIn = false; // 你可以替换为实际的登录状态检查逻辑

    if (!isLoggedIn) {
      this.setData({ show: true });
    }
  },

  onLoginClick() {
    wx.navigateTo({
      url: '/pages/homePage/login/login'
    });
  },

  onShow() {
    // 页面显示时的逻辑
    this.fetchProducts();
  },

  onHide() {
    // 页面隐藏时的逻辑
  },

  onPullDownRefresh() {
    // 页面下拉刷新逻辑
  },

  onReachBottom() {
    // 页面上拉触底逻辑
  },

  onShareAppMessage() {
    // 分享逻辑
  }
});
