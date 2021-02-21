// miniprogram/pages/account.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        remark: '',
        value: '',
        type: '',
        show_key: false,
        show: false,
        input_data: '',
        currentDate: new Date().getTime(),
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`;
            }
            return value;
        },
    },

    getRemark(event) {
        // event.detail 为当前输入的值
        console.log(event.detail);
    },

    getValue(res) {
        this.setData({
            value: this.data.value + res.target.dataset.type,
        })
        console.log(this.data.value);
    },

    addValue() {
        this.setData({
            value: ++this.data.value,
        })
    },

    subValue() {
        if (this.data.value == 0) {
            this.setData({
                value: 0,
            })
        } else {
            let temp = Number(this.data.value)
            this.setData({
                value: --temp,
            })
        }
    },

    delValue() {
        let temp = String(this.data.value)
        if (temp.length > 1) {
            this.setData({
                value: temp.substr(0, temp.length - 1)
            })
        } else {
            this.setData({
                value: 0
            })
        }
    },

    finishValue() {
        console.log(this.data.value + '--' + this.data.type)
        this.setData({
            show_key: false,
            value: ''
        })
    },

    show(event) {
        this.setData({
            show_key: true,
            type: event.currentTarget.dataset.type
        })
    },
    showData() {
        this.setData({
            show: true,
            show_key: false,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let nowTime = this.changeTime(new Date().getTime())
        this.setData({
            input_data: nowTime
        })
    },
    onConfirm(event) {
        this.setData({
            show: false,
            show_key: true,
            input_data: this.changeTime(event.detail)
        })
    },
    changeTime(time) {
        if (time) {
            var oDate = new Date(time * 1),
                oYear = oDate.getFullYear(),
                oMonth = oDate.getMonth() + 1,
                oDay = oDate.getDate(),
                oTime =
                oYear +
                "-" +
                this.change(oMonth) +
                "-" +
                this.change(oDay)
            return oTime
        } else {
            return ""
        }
    },

    change(num) {
        return num < 10 ? "0" + num : "" + num
    },

    onClose() {
        this.setData({ show: false });
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