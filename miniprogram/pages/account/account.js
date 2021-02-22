// miniprogram/pages/account.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        remark: '',
        value: 0,
        temp1_value: '',
        temp2_value: '',
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
        isAdd: true,
        showEqu: false,
        today: true
    },

    getRemark(event) {
        // event.detail 为当前输入的值
        this.setData({
            remark: event.detail,
        })
    },

    getValue(res) {
        if (this.data.temp1_value) {
            if (this.data.isAdd) {
                this.setData({
                    value: this.data.temp1_value + '+',
                    temp2_value: res.target.dataset.type + this.data.temp2_value
                })
                this.setData({
                    value: this.data.temp1_value + '+' + this.data.temp2_value,
                })
            } else {
                this.setData({
                    value: this.data.temp1_value + '-',
                    temp2_value: res.target.dataset.type + this.data.temp2_value
                })
                this.setData({
                    value: this.data.temp1_value + '-' + this.data.temp2_value,
                })
            }
        } else {
            let temp = (this.data.value + res.target.dataset.type).replace(/^[0]/g,  "")
            this.setData({
                value: temp
            })
        }
    },

    addValue() {
        this.setData({
            isAdd: true,
            showEqu: true,
        })
        if (this.data.temp1_value) {
            this.setData({
                value: Number(this.data.temp1_value) + Number(this.data.temp2_value),
                temp1_value: this.data.value,
                temp2_value: '',
            })
            this.setData({
                temp1_value: this.data.value,
            })
        } else {
            this.setData({
                temp1_value: this.data.value,
                value: this.data.value + '+'
            })
        }
    },

    subValue() {
        this.setData({
            isAdd: false,
            showEqu: true,
        })
        if (this.data.temp1_value) {
            this.setData({
                value: Number(this.data.temp1_value) - Number(this.data.temp2_value),
                temp1_value: this.data.value,
                temp2_value: '',
            })
            this.setData({
                temp1_value: this.data.value,
            })
        } else {
            this.setData({
                temp1_value: this.data.value,
                value: this.data.value + '-'
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

    equValue() {
        this.setData({
            showEqu: false,
        })

        if (this.data.isAdd) {
            this.setData({
                value: Number(this.data.temp1_value) + Number(this.data.temp2_value),
                temp1_value: '',
                temp2_value: '',
            })
        } else {
            this.setData({
                value: Number(this.data.temp1_value) - Number(this.data.temp2_value),
                temp1_value: '',
                temp2_value: '',
            })
        }
    },

    finishValue() {
        console.log(this.data.value + '--' + this.data.type)
        const db = wx.cloud.database()
        db.collection('day_consume').add({
            data: {
                consume_type: this.data.type,
                consume_time: this.data.input_data,
                consume_value: this.data.value,
                consume_remark: this.data.remark
            },
            success: res => {
                this.setData({
                    show_key: false,
                    value: '',
                    temp1_value: '',
                    temp2_value: '',
                })
                wx.showToast({
                    title: '新增成功',
                })
            },
            fail: err => {
                wx.showToast({
                    icon: 'none',
                    title: '新增记录失败'
                })
                console.error('[数据库] [新增记录] 失败：', err)
            }
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

    onLoad: function(options) {
        let nowTime = this.changeTime(new Date().getTime())
        this.setData({
            input_data: nowTime
        })
    },

    onConfirm(event) {
        if (this.changeTime(event.detail) != this.changeTime(new Date().getTime())) {
            this.setData({
                today: false,
            })
        } else {
            this.setData({
                today: true,
            })
        }
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