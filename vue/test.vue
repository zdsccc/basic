<template>
    <div>
        <div v-for="item in json">
            <h6>{{item.yyyymmdd}}</h6>
            <div>
                <span>订单状态</span>
                <span>
                    {{
                    item.stat==="100"
                        ?"aa"
                        :(item.stat==="101"
                            ?"bb"
                            :(item.stat==="102")
                                ?"cc"
                                :(item.stat==="103")
                                    ?"dd"
                                    :(item.stat==="104")
                                        ?"ee"
                                        :"未知")
                    }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "test",
        data () {
            return {
                json: [
                    {"yyyymmdd":"2018.04.11","hhiiss":"233644","site_name":"\u6ce2\u5947\u7f51","order_code":"11111111","stat":"100","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"160.00","commission":"8.96","product_code":"22414","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"233644","site_name":"\u6ce2\u5947\u7f51","order_code":"11111111","stat":"101","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"39.00","commission":"2.18","product_code":"8242","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"233644","site_name":"\u6ce2\u5947\u7f51","order_code":"11111111","stat":"102","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"35.00","commission":"1.96","product_code":"14152","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"233644","site_name":"\u6ce2\u5947\u7f51","order_code":"11111111","stat":"103","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"6.00","commission":"0.34","product_code":"22331","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"224501","site_name":"YOHO!\u6709\u8d27\u79fb\u52a8\u7aef","order_code":"22222222222","stat":"104","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"569.00","commission":"39.83","product_code":"3176750","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"224500","site_name":"YOHO!\u6709\u8d27\u79fb\u52a8\u7aef","order_code":"33333333333","stat":"100","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"569.00","commission":"39.83","product_code":"3176750","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"223600","site_name":"YOHO!\u6709\u8d27\u79fb\u52a8\u7aef","order_code":"44444444444","stat":"100","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"569.00","commission":"39.83","product_code":"3176748","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"204632","site_name":"\u5f00\u5fc3\u4fdd\u4fdd\u9669\u7f51wap","order_code":"555555555555555","stat":"100","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"1,749.00","commission":"244.86","product_code":"106501039","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"200404","site_name":"\u82cf\u5b81\u6613\u8d2d\u79fb\u52a8\u7aef","order_code":"66666666666","stat":"100","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"9.90","commission":"0.24","product_code":"190194387","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"180006","site_name":"\u6ce2\u5947\u7f51","order_code":"77777777","stat":"100","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"1.00","commission":"0.03","product_code":"26576","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"174544","site_name":"YOHO!\u6709\u8d27\u79fb\u52a8\u7aef","order_code":"88888888888","stat":"100","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"539.00","commission":"37.73","product_code":"3177048","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"173602","site_name":"YOHO!\u6709\u8d27\u79fb\u52a8\u7aef","order_code":"99999999999","stat":"100","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"539.00","commission":"37.73","product_code":"3177052","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"173600","site_name":"YOHO!\u6709\u8d27\u79fb\u52a8\u7aef","order_code":"00000000000","stat":"100","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"539.00","commission":"37.73","product_code":"3177050","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"173600","site_name":"YOHO!\u6709\u8d27\u79fb\u52a8\u7aef","order_code":"10101010101","stat":"100","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"539.00","commission":"37.73","product_code":"3177048","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"172451","site_name":"YOHO!\u6709\u8d27\u79fb\u52a8\u7aef","order_code":"20202020202","stat":"100","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"539.00","commission":"37.73","product_code":"3177050","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"172451","site_name":"YOHO!\u6709\u8d27\u79fb\u52a8\u7aef","order_code":"30303030303","stat":"100","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"539.00","commission":"37.73","product_code":"3177052","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"172450","site_name":"YOHO!\u6709\u8d27\u79fb\u52a8\u7aef","order_code":"40404040404","stat":"100","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"539.00","commission":"37.73","product_code":"3177046","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"171500","site_name":"YOHO!\u6709\u8d27\u79fb\u52a8\u7aef","order_code":"50505050505","stat":"100","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"539.00","commission":"37.73","product_code":"3177046","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"102226","site_name":"\u60e0\u79df\u8f66","order_code":"X6060606060","stat":"100","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"1,301.00","commission":"45.54","product_code":"drv","product_name":"","uid":null},
                    {"yyyymmdd":"2018.04.11","hhiiss":"101409","site_name":"\u60e0\u79df\u8f66","order_code":"X7070707070","stat":"100","stat_name":"\u672a\u6838\u5bf9","stat_img":"\/style\/images\/weiqueren.png","sales":"2,479.00","commission":"86.77","product_code":"drv","product_name":"","uid":null}
                ]
            }
        }
    }
</script>

<style scoped>

</style>