// miniprogram/pages/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        currentDate: new Date().getTime(),
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`;
            }
            return value;
        },
        month: '02',
        year: '2021'
    },

    showData() {
        this.setData({
            show: true
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    onConfirm(event) {
        this.setData({
            show: false,
            year: this.changeYearTime(event.detail),
            month: this.changeMonthTime(event.detail),
        })
    },
    onClose() {
        this.setData({ show: false });
    },
    changeYearTime(time) {
        if (time) {
            var oDate = new Date(time * 1),
                oYear = oDate.getFullYear()
            return oYear
        } else {
            return ""
        }
    },
    changeMonthTime(time) {
        if (time) {
            var oDate = new Date(time * 1),
                oMonth = oDate.getMonth() + 1,
                oTime = this.change(oMonth)
            return oTime
        } else {
            return ""
        }
    },
    change(num) {
        return num < 10 ? "0" + num : "" + num
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