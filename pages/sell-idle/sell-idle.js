// pages/sell-idle/sell-idle.js

const options = [
  {
    text: '包邮',
    value: '包邮',
  },
  {
    text: '按距离计费',
    value: '按距离计费',
  },
  {
    text: '买家自提',
    value: '买家自提',
  },
];

const options1 = [
  {
    text: '数码产品',
    value: '1',
  },
  {
    text: '美食',
    value: '2',
  },
  {
    text: '服饰',
    value: '3',
  },
  {
    text: '日常用品',
    value: '4',
  },
  {
    text: '书本材料',
    value: '5',
  },
];

Page({

  data: {
    fileList: [],
    showDelivery: false,
    showCategory: false,
    options,
    options1,
    fieldValue: '',
    cascaderValue: '',
    productName: '',
    description: '',
    price: '',
    delivery: '',
    category: ''
  },

  onAfterRead(event) {
    console.log(event.detail.file);
    const { file } = event.detail;
    this.setData({
      fileList: [...this.data.fileList, file]
    });
  },
  
  onClickDelivery() {  
    this.setData({  
      showDelivery: true,  
    });  
  },  
  onClickCategory() {  
    this.setData({  
      showCategory: true,  
    });  
  }, 

  onCloseDelivery() {
    this.setData({
      showDelivery: false,
    });
  },

  onCloseCategory() {
    this.setData({
      showCategory: false,
    });
  },

  onFinishDelivery(e) {
    const { selectedOptions, value } = e.detail;
    const delivery = selectedOptions
        .map((option) => option.text || option.name)
        .join('/');
    this.setData({
      delivery,
      cascaderValue: value,
    })
  },

  onFinishCategory(e) {
    const { selectedOptions, value } = e.detail;
    const category = selectedOptions
        .map((option) => option.value || option.name)
        .join('/');
    this.setData({
      category,
      cascaderValue: value,
    })
  },

  onAfterRead(event) {  
    const { file } = event.detail;  
    this.setData({  
      fileList: [...this.data.fileList, file]  
    });  
  },  

  onSubmit() {  
    var that = this;

    const jwtToken = wx.getStorageSync('userToken');

    const name = this.data.productName;
    const description = this.data.description;
    const price = this.data.price;
    const fileList = this.data.fileList;
    const delivery = this.data.delivery;
    const category = this.data.category;
  
    if (!name || !description || !price || !fileList.length || !delivery|| !category) {  
      wx.showToast({ title: '请填写完整信息', icon: 'none' });  
      return;  
    }  
  
    // 准备图片URL列表  
    const productImages = fileList.map(file => ({ url: file.url }));  
  
    console.log(delivery);
    console.log(category);

    // 发送请求到服务器  
    wx.request({  
      url: 'http://localhost:8080/product', 
      method: 'POST',  
      header: {  
        'Authorization': `${jwtToken}` // 将JWT令牌添加到请求头中  
      }, 
      data: {  
        name:name,  
        description:description,  
        price: parseFloat(price),  
        categoryId: category,
        state: '待审核', 
        deliveryMethod: delivery  ,
        productImages: productImages,  
      },  
      success(res) {  
        if (res.data.code === 0) {  
          wx.showToast({ title: '商品添加成功', icon: 'success' });
          that.setData({  
            fileList: [], // 清空图片列表  
            productName: '', // 清空商品名称  
            description: '', // 清空商品描述  
            price: '', // 清空价格  
            delivery: '', // 清空发货方式  
            category: '', // 清空分类  
            cascaderValue: '', // 清空cascader的值（如果有需要）  
          });  
        } else {  
          wx.showToast({ title: res.data.message || '添加失败', icon: 'none' });  
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