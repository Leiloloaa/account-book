// miniprogram/pages/plan.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: '',
        gradientColor: {
            '0%': '#ffd01e',
            '100%': '#ee0a24',
        },
        show: false,
        budget: '',
        list: [],
        budgetId: '',
        payAmount: ''
    },

    onClose() {
        this.setData({ show: false });
    },

    changeBudget() {
        const db = wx.cloud.database()
        db.collection('account_details').doc(this.data.budgetId).update({
            data: {
                budget: this.data.budget
            },
            success: function(res) {}
        })
    },

    showAlert() {
        this.setData({ show: true });
    },

    onChange(event) {
        // event.detail 为当前输入的值
        this.setData({ budget: event.detail });
    },
    // ListTouch触摸开始
    ListTouchStart(e) {
        this.setData({
            ListTouchStart: e.touches[0].pageX
        })
    },

    // ListTouch计算方向
    ListTouchMove(e) {
        this.setData({
            ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
        })
    },

    // ListTouch计算滚动
    ListTouchEnd(e) {
        if (this.data.ListTouchDirection == 'left') {
            this.setData({
                modalName: e.currentTarget.dataset.target
            })
        } else {
            this.setData({
                modalName: null
            })
        }
        this.setData({
            ListTouchDirection: null
        })
    },

    query() {
        // splice 是返回删掉的内容 
        const db = wx.cloud.database()
        db.collection('type_consume').get({
            success: res => {
                this.setData({
                    list: res.data.splice(0, 5),
                })
            },
            fail: err => {}
        });
        db.collection('account_details').get({
            success: res => {
                this.setData({
                    budgetId: res.data[0]._id,
                    budget: res.data[0].budget,
                    payAmount: res.data[0].payAmount
                })
                let percent = (Number(res.data[0].payAmount) / Number(res.data[0].budget)) * 100
                this.setData({
                    value: String(percent).replace(/\.\d+/g, '')
                })
            },
            fail: err => {}
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.query()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})