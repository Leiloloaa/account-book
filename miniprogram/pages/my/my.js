//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        modalName: '',
        show: false,
        showAbout: false
    },
    onLoad: function() {
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            this.setData({
                                avatarUrl: res.userInfo.avatarUrl,
                                userInfo: res.userInfo
                            })
                        }
                    })
                }
            }
        })
    },
    showModal(e) {
        this.setData({
            modalName: e.currentTarget.dataset.target
        })
    },
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
    showPro() {
        this.setData({
            show: true
        })
    },
    onClose() {
        this.setData({ show: false, showAbout: false });
    },
    toUrl(e) {
        let type = e.currentTarget.dataset.type
        if (type == 1) {
            wx.navigateTo({
                url: "/pages/plan/plan",
            })
        } else if (type == 2) {

        } else if (type == 3) {

        } else {
            this.setData({
                showAbout: true
            })
        }
    }
})