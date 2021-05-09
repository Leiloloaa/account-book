// miniprogram/pages/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        currentDate: new Date().getTime(),
        minDate: new Date(2021, 1, 1).getTime(),
        maxDate: new Date().getTime(),
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
        list1: [],
        nowTime: '',
        nowTime1: '',
        imoney: 0,
        omoney: 0,
        imoney1: 0,
        omoney1: 0,
        showAction: false,
        actions: [{
                name: '编辑',
                value: 1
            },
            {
                name: '删除',
                color: '#ee0a24',
                value: 2
            }
        ],
        budget: '',
        payAmount: ''
    },

    onSelect(event) {
        if (event.detail.value == '1') {
            wx.reLaunch({
                url: '/pages/account/account?isEdit=true',
            })
        } else {
            let data = wx.getStorageSync('editItem')
            const db = wx.cloud.database()
            db.collection('account_details').get({
                success: res => {
                    let payAmounts = Number(res.data[0].payAmount) - Number(data.consume_value)
                    db.collection('account_details').doc(res.data[0]._id).update({
                        data: {
                            payAmount: payAmounts
                        },
                        success: function(res) {
                            db.collection('day_consume').doc(data._id).remove({
                                success: res => {
                                    this.onQuery()
                                        // 修改类型表
                                    if (data.consume_type == '01') {
                                        db.collection('type_consume').where({
                                            code: 1
                                        }).get({
                                            success: res => {
                                                db.collection('type_consume').doc('79550af26035c28f06cea06c4edc5dba').update({
                                                    data: {
                                                        payAmount: Number(res.data[0].payAmount) - Number(data.consume_value)
                                                    },
                                                    success: function(res) {}
                                                })
                                            },
                                            fail: err => {}
                                        });
                                    } else if (data.consume_type == '02') {
                                        db.collection('type_consume').where({
                                            _id: '79550af26035c3ad06cf07d43e9428eb'
                                        }).get({
                                            success: res => {
                                                db.collection('type_consume').doc('79550af26035c3ad06cf07d43e9428eb').update({
                                                    data: {
                                                        payAmount: Number(res.data[0].payAmount) - Number(data.consume_value)
                                                    },
                                                    success: function(res) {}
                                                })
                                            },
                                            fail: err => {}
                                        });
                                    } else if (data.consume_type == '03') {
                                        db.collection('type_consume').where({
                                            _id: 'b00064a76035c3e606dec8036d86c10d'
                                        }).get({
                                            success: res => {
                                                db.collection('type_consume').doc('b00064a76035c3e606dec8036d86c10d').update({
                                                    data: {
                                                        payAmount: Number(res.data[0].payAmount) - Number(data.consume_value)
                                                    },
                                                    success: function(res) {}
                                                })
                                            },
                                            fail: err => {}
                                        });
                                    } else if (data.consume_type == '04') {
                                        db.collection('type_consume').where({
                                            _id: 'b00064a76035c41f06ded29335b09f8e'
                                        }).get({
                                            success: res => {
                                                db.collection('type_consume').doc('b00064a76035c41f06ded29335b09f8e').update({
                                                    data: {
                                                        payAmount: Number(res.data[0].payAmount) - Number(data.consume_value)
                                                    },
                                                    success: function(res) {}
                                                })
                                            },
                                            fail: err => {}
                                        });
                                    } else if (data.consume_type == '05') {
                                        db.collection('type_consume').where({
                                            _id: 'b00064a76035c45506dedc162c3ad12f'
                                        }).get({
                                            success: res => {
                                                db.collection('type_consume').doc('b00064a76035c45506dedc162c3ad12f').update({
                                                    data: {
                                                        payAmount: Number(res.data[0].payAmount) - Number(data.consume_value)
                                                    },
                                                    success: function(res) {}
                                                })
                                            },
                                            fail: err => {}
                                        });
                                    }
                                },
                                fail: err => {
                                    console.error('[数据库] [删除记录] 失败：', err)
                                }
                            })
                        }
                    })
                },
                fail: err => {}
            });
        }
    },

    showData() {
        this.setData({
            show: true,
            list: [],
            list1: [],
            imoney: 0,
            omoney: 0,
            imoney1: 0,
            omoney1: 0,
        })
    },

    showSelect(event) {
        wx.clearStorage()
        wx.setStorage({
            key: 'editItem',
            data: event.currentTarget.dataset.item,
        });
        this.setData({
            showAction: true
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
        let day1 = (Date.parse(this.data.nowTime) - 86400000)
        let day2 = (day1 - 86400000)
        this.setData({
            nowTime1: this.changeTime(day1),
            nowTime2: this.changeTime(day2),
        })
        const db = wx.cloud.database()
        db.collection('account_details').get({
            success: res => {
                this.setData({
                    budget: res.data[0].budget,
                    payAmount: res.data[0].payAmount
                })
            },
            fail: err => {}
        });
        db.collection('day_consume').where({
            consume_time: this.data.nowTime,
        }).get({
            success: res => {
                this.setData({
                    list: res.data,
                })
                if (this.data.list.length >= 1) {
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
            }
        })
        db.collection('day_consume').where({
            consume_time: this.changeTime(day1),
        }).get({
            success: res => {
                this.setData({
                    list1: res.data,
                })
                if (this.data.list1.length >= 1) {
                    for (var i = 0; i < this.data.list1.length; i++) {
                        if (this.data.list1[i].consume_type == '01' && this.data.list1[i].consume_type == '02' && this.data.list1[i].consume_type == '03' && this.data.list1[i].consume_type == '04' && this.data.list1[i].consume_type == '05') {
                            this.setData({
                                omoney1: (Number(this.data.omoney1) + Number(this.data.list1[i].consume_value)),
                            })
                        } else {
                            this.setData({
                                imoney1: (Number(this.data.imoney1) + Number(this.data.list1[i].consume_value)),
                            })
                        }
                    }
                }
            },
            fail: err => {
                wx.showToast({
                    icon: 'none',
                    title: '查询记录失败'
                })
            }
        });
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
        this.setData({ show: false, showAction: false });
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
        this.setData({
            list: [],
            list1: [],
            imoney: 0,
            omoney: 0,
            imoney1: 0,
            omoney1: 0,
        })
        this.onGetOpenid()
    },

    onGetOpenid: function() {
        // 调用云函数
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                let openIds = ['oJi955LxRNmV3oxR_T24X-D2ayqI', 'oJi955N_iXJSFxV7YU77dh-fjmCA']
                if (openIds.includes(res.result.openid)) {
                    this.onQuery()
                }
            },
            fail: err => {
                console.error('[云函数] [login] 调用失败', err)
            }
        })
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