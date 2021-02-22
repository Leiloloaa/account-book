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
        month: '',
        year: '',
        list: [],
        nowTime: '',
        imoney: 0,
        omoney: 0,
        isEmpty: false
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
        this.setData({
            nowTime: this.changeTime(new Date().getTime()),
            year: this.changeYearTime(new Date().getTime()),
            month: this.changeMonthTime(new Date().getTime()),
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

    onQuery: function() {
        this.setData({
            imoney: 0,
            omoney: 0,
        })
        console.log(this.data.nowTime)
        const db = wx.cloud.database()
        db.collection('day_consume').where({ consume_time: this.data.nowTime }).get({
            success: res => {
                this.setData({
                    list: res.data,
                })
                if (this.data.list.length >= 1) {
                    this.setData({
                        isEmpty: false,
                    })
                    for (var i = 0; i < this.data.list.length; i++) {
                        if (this.data.list[i].consume_type == '01' && this.data.list[i].consume_type == '02' && this.data.list[i].consume_type == '03' && this.data.list[i].consume_type == '04' && this.data.list[i].consume_type == '05') {
                            this.setData({
                                omoney: (Number(this.data.omoney) + Number(this.data.list[i].consume_value)),
                            })
                        } else {
                            this.setData({
                                imoney: (Number(this.data.imoney) + Number(this.data.list[i].consume_value)),
                            })
                        }
                    }
                } else {
                    this.setData({
                        isEmpty: true,
                    })
                }
            },
            fail: err => {
                wx.showToast({
                    icon: 'none',
                    title: '查询记录失败'
                })
                console.error('[数据库] [查询记录] 失败：', err)
            }
        })
    },

    onConfirm(event) {
        this.setData({
            show: false,
            year: this.changeYearTime(event.detail),
            month: this.changeMonthTime(event.detail),
            nowTime: this.changeTime(event.detail),
            list: []
        })
        this.onQuery()
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
        this.onQuery()
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