<template>
    <div id="info-panel">
        <vue-custom-scrollbar class="info-form" :setting="settings" offset-left="145">
            <h2>欲開發地區</h2>
            <div class="panel">
                <div class="panel-title">
                    加盟夥伴資料
                </div>
                <div class="panel-content">
                    <table class="info-form-table">
                        <tr>
                            <td style="width: 110px;">加盟夥伴姓名</td>
                            <td>
                                <label><input type="text"></label>
                                <label><input name="name" value="male" type="radio">&nbsp;&nbsp;&nbsp;先生</label>
                                <label><input name="name" value="female" type="radio">&nbsp;&nbsp;&nbsp;小姐</label>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 110px;">加盟夥伴電話</td>
                            <td>
                                <label><input type="text" style="width: 50px"> - <input type="text"></label>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 110px;">加盟夥伴信箱</td>
                            <td>
                                <label><input type="email" style="width: 241.5px;"></label>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="panel">
                <div class="panel-title">
                    店租條件
                </div>
                <div class="panel-content">
                    <table class="info-form-table">
                        <tr>
                            <td style="width: 110px;">依縣市選擇</td>
                            <td>
                                <select v-model="county" style="width: 110px; margin-right: 25px;">
                                    <option :value="null">== 請選擇縣市 ==</option>
                                    <option v-for="(item, index) in counties" :key="index" :value="item">{{item}}</option>
                                </select>
                            </td>
                            <td style="width: 110px;">依地區選擇</td>
                            <td>
                                <select v-model="district" style="width: 110px; margin-right: 25px;">
                                    <option :value="null">== 請選擇地區 ==</option>
                                    <option v-for="(item, index) in computedDis" :key="index" :value="item">{{item}}</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 110px;">租金範圍</td>
                            <td colspan="3">
                                <label><input type="text" style="width: 50px">&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;<input type="text">&nbsp;&nbsp;&nbsp;元</label>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 110px;">店面大小</td>
                            <td colspan="3">
                                <label><input type="text" style="width: 50px">&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;<input type="text">&nbsp;&nbsp;&nbsp;坪</label>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="panel">
                <div class="panel-title">
                    營業條件
                </div>
                <div class="panel-content">
                    <table class="info-form-table">
                        <tr>
                            <td style="width: 110px;">店型選擇</td>
                            <td>
                                <select style="width: 200px; margin-right: 10px;">
                                    <option :value="null">== 請選擇店型 ==</option>
                                    <option value="好鄰便利店型">好鄰便利店型</option>
                                    <option value="國民樂活店型">國民樂活店型</option>
                                    <option value="都會全能店型">都會全能店型</option>
                                </select>
                                (<a href="#">店型參考請點我</a>)
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 110px;">預計營業時間</td>
                            <td colspan="3">
                                <label>
                                    <select name="" id="" style="width: 70px;" v-model="startTime">
                                        <option :value="null" disabled>-開始-</option>
                                        <option v-for="(item, index) in times" :key="index" :value="item">{{item}}</option>
                                    </select>
                                    &nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;
                                    <select name="" id="" style="width: 70px;" v-model="endTime">
                                        <option :value="null" disabled>-結束-</option>
                                        <option v-for="(item, index) in times" :key="index" :value="item">{{item}}</option>
                                    </select>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 110px;">餐型</td>
                            <td>
                                <el-checkbox-group v-model="meatType" class="grid" style="padding-top: 10px">
                                    <el-checkbox class="item" label="早餐"></el-checkbox>
                                    <el-checkbox class="item" label="盤餐"></el-checkbox>
                                    <el-checkbox class="item" label="午餐"></el-checkbox>
                                </el-checkbox-group>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="panel">
                <div class="panel-title">
                    房屋來源
                </div>
                <div class="panel-content">
                    <el-checkbox-group v-model="exceptList" class="grid" style="padding-top: 10px">
                        <el-checkbox class="item" label="789租屋網"></el-checkbox>
                        <el-checkbox class="item" label="馬克房仲網"></el-checkbox>
                        <el-checkbox class="item" label="西利雅房仲網"></el-checkbox>
                        <el-checkbox class="item" label="豪宅網"></el-checkbox>
                        <el-checkbox class="item" label="好棒租屋"></el-checkbox>
                        <el-checkbox class="item" label="有屋氏房屋"></el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            
            <div style="text-align: center; padding: 15px 0 0;">
                <button class="btn btn-info info-submit-btn" @click="goStep">
                    送出
                </button>
            </div>
        </vue-custom-scrollbar>
    </div>
</template>

<script>
    import city from './../mixins/cityData'
    import dayjs from 'dayjs'
    import $ from 'jquery'
    import vueCustomScrollbar from 'vue-custom-scrollbar'
    export default {
        name: 'INfoFrom',
        props: {
            msg: String
        },
        components: {vueCustomScrollbar},
        mixins: [city],
        data() {
            let start = dayjs('2019-01-01 00:00')
            let times = new Array

            for (let i = 0; i < 49; i++) {
                times.push(start.add(i * 30, 'minutes').format('HH:mm'))
                
            }
            return {
                exceptList: [],
                meatType: [],
                county: null,
                district: null,
                times: times,
                startTime: null,
                endTime: null,
                settings: {
                    maxScrollbarLength: 60
                }
            }
        },
        created() {
            this.$nextTick(() => {
                $('#app #site-content #info-panel .info-form').css({
                    'left': $('#header-menu').offset().left + 15
                })
            })
        },
        computed: {
            computedDis() {
                let index = this.counties.indexOf(this.county)

                if (index == -1) {
                    return []
                }
                return this.districts[index][0]
            }
        },
        methods: {
            goStep() {
                this.$emit('goStep', 2);
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>