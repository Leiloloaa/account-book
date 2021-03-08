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
        today: true,
        haveEdit: false,
        payAmount: '',
        accountId: ''
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
        const db = wx.cloud.database()
        if (this.data.haveEdit) {
            let data = wx.getStorageSync('editItem')
            db.collection('day_consume').doc(data._id).remove({
                success: res => {
                    wx.clearStorage()
                },
                fail: err => {
                    console.error('[数据库] [删除记录] 失败：', err)
                }
            })
        }
        // 修改支出数额
        db.collection('account_details').get({
            success: res => {
                this.setData({
                    payAmount: res.data[0].payAmount,
                    accountId: res.data[0]._id,
                })
                let payAmounts = Number(this.data.payAmount) + Number(this.data.value)
                db.collection('account_details').doc(this.data.accountId).update({
                    data: {
                        payAmount: payAmounts
                    },
                    success: function(res) {}
                })
            },
            fail: err => {}
        });
        // 修改类型表
        if (this.data.type == '01') {
            db.collection('type_consume').where({
                code: 1
            }).get({
                success: res => {
                    db.collection('type_consume').doc('79550af26035c28f06cea06c4edc5dba').update({
                        data: {
                            payAmount: Number(res.data[0].payAmount) + Number(this.data.value)
                        },
                        success: function(res) {}
                    })
                },
                fail: err => {}
            });
        } else if (this.data.type == '02') {
            db.collection('type_consume').where({
                code: 2
            }).get({
                success: res => {
                    db.collection('type_consume').doc('79550af26035c3ad06cf07d43e9428eb').update({
                        data: {
                            payAmount: Number(res.data[0].payAmount) + Number(this.data.value)
                        },
                        success: function(res) {}
                    })
                },
                fail: err => {}
            });
        } else if (this.data.type == '03') {
            console.log('执行了')
            db.collection('type_consume').where({
                code: 3
            }).get({
                success: res => {
                    console.log(res)
                    db.collection('type_consume').doc('b00064a76035c3e606dec8036d86c10d').update({
                        data: {
                            payAmount: Number(res.data[0].payAmount) + Number(this.data.value)
                        },
                        success: function(data) {
                            console.log(data)
                        }
                    })
                },
                fail: err => {}
            });
        } else if (this.data.type == '04') {
            db.collection('type_consume').where({
                code: 4
            }).get({
                success: res => {
                    db.collection('type_consume').doc('b00064a76035c41f06ded29335b09f8e').update({
                        data: {
                            payAmount: Number(res.data[0].payAmount) + Number(this.data.value)
                        },
                        success: function(res) {}
                    })
                },
                fail: err => {}
            });
        } else if (this.data.type == '05') {
            db.collection('type_consume').where({
                code: 5
            }).get({
                success: res => {
                    db.collection('type_consume').doc('b00064a76035c45506dedc162c3ad12f').update({
                        data: {
                            payAmount: Number(res.data[0].payAmount) + Number(this.data.value)
                        },
                        success: function(res) {}
                    })
                },
                fail: err => {}
            });
        }
        // 添加数据
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
                wx.reLaunch({
                    url: '/pages/home/home',
                })
            },
            fail: err => {
                wx.showToast({
                    icon: 'none',
                    title: '新增记录失败'
                })
            }
        })
    },

    show(event) {
        this.setData({
            show_key: true,
            type: event.currentTarget.dataset.type
        })
        if (event.currentTarget.dataset.type == '01') {
            this.setData({
                remark: '餐饮'
            })
        } else if (event.currentTarget.dataset.type == '02') {
            this.setData({
                remark: '购物'
            })
        } else if (event.currentTarget.dataset.type == '03') {
            this.setData({
                remark: '蔬菜'
            })
        } else if (event.currentTarget.dataset.type == '04') {
            this.setData({
                remark: '交通卡充值'
            })
        } else if (event.currentTarget.dataset.type == '05') {
            this.setData({
                remark: '其它'
            })
        }
    },

    showData() {
        this.setData({
            show: true,
            show_key: false,
        })
    },

    onLoad: function(options) {
        if (options.isEdit) {
            let data = wx.getStorageSync('editItem')
            this.setData({
                show_key: true,
                value: data.consume_value,
                type: data.consume_type,
                input_data: data.consume_time,
                remark: data.consume_remark,
                haveEdit: true
            });
        } else {
            let nowTime = this.changeTime(new Date().getTime())
            this.setData({
                input_data: nowTime
            })
        }
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
        this.onGetOpenid()
    },

    onGetOpenid: function() {
        // 调用云函数
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                let openIds = ['oJi955LxRNmV3oxR_T24X-D2ayqI', 'oJi955N_iXJSFxV7YU77dh-fjmCA']
                if (!openIds.includes(res.result.openid)) {
                    wx.reLaunch({
                        url: '../index/index',
                    })
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