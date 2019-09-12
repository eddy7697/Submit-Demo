<template>
    <div class="fit-box">
        <div id="bg-mask"></div>
        <vue-custom-scrollbar id="result-panel" class="result-panel" :setting="settings">
            <div class="container-fluid">
                <div class="row shorter-row">
                    <div class="col-12 header" style="text-align: center">
                        <img src="../assets/logo-black.png" alt="最佳拓點預測報告">
                        <h2>最佳拓點預測報告</h2>
                    </div>
                    <div class="col-6" style="font-size: 10px">
                        <p>專案業務：王大明 / 0912-345678</p>
                    </div>
                    <div class="col-6" style="font-size: 10px; text-align: right">
                        <p>&nbsp;&nbsp;健檢日期：2019/09/24</p>
                    </div>
                    <div class="col-12" style="margin-bottom: 20px">
                        <div class="result-panel-info">
                            <h3>加盟夥伴基本資料</h3>
                            <p>加盟夥伴姓名：<span class="info">張三</span></p>
                            <p>加盟夥伴電話：<span class="info">0933123123</span></p>
                            <p>加盟夥伴信箱：<span class="info">im3@gmail.com</span></p>
                        </div>
                    </div>
                    <div class="col-8" style="margin-bottom: 20px">
                        <div class="result-panel-info" style="padding: 5px 0;">
                            <h3 style="padding-left: 10px;">營業條件與成本</h3>
                            <div class="container">
                                <div class="row">
                                    <div class="col-6">
                                        <p>店鋪位置：<span class="info">台北市中山區中山北路二段115巷3弄4號</span></p>
                                        <p>物件來源：<span class="info">西利雅房仲網</span></p>
                                        <p>店型選擇：<span class="info">好鄰便利店</span></p>
                                        <p>預計營業時數：<span class="info">6 - 12</span></p>
                                        <p>預計餐型：<span class="info">早餐 盤餐</span></p>
                                        <p>預測營業額：<span class="info">561,000</span></p>
                                    </div>
                                    <div class="col-6">
                                        <p>預計租金：<span class="info">30,000</span></p>
                                        <p>預計人事成本：<span class="info">120,000</span></p>
                                        <p>預計原物料成本：<span class="info">220,000</span></p>
                                        <p>預計其他成本：<span class="info">30,000</span></p>
                                        <p>預計營業額 - 四大成本：<span class="info">161,000</span></p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="col-4" style="margin-bottom: 20px">
                        <div class="result-panel-info">
                            <h3>推薦：預測結果最佳化</h3>
                            <div>
                                <p>最佳營業配置</p>
                                <p>推薦店型：<span class="info">好鄰便利店</span></p>
                                <p>推薦營業時間：<span class="info">6 - 14</span></p>
                                <p>推薦餐型：<span class="info">早餐 盤餐 午餐</span></p>
                                <p>預測最佳營業額：<br><span class="info result">NTD 660,000</span></p>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-12">
                        <hr>
                    </div>
                    <div class="col-6 chart-container">
                        <BarChart :chart-data="barChartData" :width="500" :height="300"/>
                    </div>
                    <div class="col-6 chart-container">
                        <PieChart :chart-data="pirChartData" :width="500" :height="300"/>
                    </div>
                    <div class="col-12" v-if="false">
                        <hr>
                        <p>備註：</p>
                        <el-input type="textarea" rows="6"/>
                    </div>
                </div>
            </div>
            <div class="result-panel-footer" id="result-panel-footer">
                <el-button size="small" type="primary" @click="goStep">儲存運算結果</el-button>
                <el-button size="small" type="primary" @click="printResult">儲存為PDF</el-button>
            </div>
        </vue-custom-scrollbar>
    </div>
</template>

<script>
    import $ from 'jquery'
    import BarChart from './chart/Chart'
    import PieChart from './chart/PieChart'
    import vueCustomScrollbar from 'vue-custom-scrollbar'
    export default {
        name: 'ResultPanel',
        props: {
            msg: String
        },
        components: {BarChart, PieChart, vueCustomScrollbar},
        data() {
            return {
                barChartData: {
                    labels: ['本店'],
                    datasets: [{
                        label: '預計月營收減去四大成本',
                        backgroundColor: '#6d9eeb',
                        borderColor: '#6d9eeb',
                        borderWidth: 1,
                        data: [16.1]
                    }, {
                        label: '預計月營收',
                        backgroundColor: '#1c4587',
                        borderColor: '#1c4587',
                        borderWidth: 1,
                        data: [56.1]
                    }]
                },
                pirChartData: {
                    datasets: [{
                        data: [3, 12, 22, 3, 16.1],
                        backgroundColor: [
                            '#4285f4',
                            '#db4437',
                            '#f4b400',
                            '#0f9d58',
                            '#ab47bc',
                        ],
                        label: 'Dataset 1'
                    }],
                    labels: [
                        '租金',
                        '人事成本',
                        '物料成本',
                        '其他成本',
                        '其餘淨利'
                    ]
                },
                settings: {
                    maxScrollbarLength: 60
                }
            }
        },
        methods: {
            printResult() {
                $('#site-header').hide()
                $('#site-footer').hide()
                $('#result-panel-footer').hide()
                $('#map').hide()

                setTimeout(() => {
                    window.print()
                    $('#site-header').show()
                    $('#site-footer').show()
                    $('#result-panel-footer').show()
                    $('#map').show()
                }, 500);
            },
            goStep() {
                this.$emit('goStep', 4)
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .result-panel {
        padding: 20px;
        max-width: 850px;
        width: 100%;
        background-color: #fff;
        color: #373634;
        margin: 15px auto 0;
        border-radius: 3px;
        border: #ccc thin solid;
        font-size: 13px;
        max-height: calc(100% - 30px);
        overflow: auto;

        h2 {
            font-size: 22px;
            font-weight: 900;
        }
        hr {
            margin-top: 5px;
            margin-bottom: 5px;
        }
        p {
            margin-top: 9px;
            margin-bottom: 9px;
        }
        .header {
            text-align: center;

            img {
                margin: 15px 0;
                width: 100%;
                max-width: 150px;
            }
            
        }
        .chart-container {
            padding-top: 15px;
            padding-bottom: 15px;
        }
        .result-panel-info {
            border-radius: 5px;
            border: #6198b1 solid thin;
            padding: 5px 10px;
            height: 100%;
            color: #6198b1;

            h3 {
                font-weight: 600;
                font-size: 20px;
                margin: 8px 0;
            }
            span.info {
                font-weight: 900;

                &.result {
                    display: block;
                    text-align: right;
                    font-size: 26px;
                    color: #f6af79;
                }
            }
        }
        .result-panel-footer {
            padding: 20px;
            background-color: #dddddd;
            margin: 30px -20px -20px -20px;
            display: flex;
            justify-content: center;

            .el-button {
                flex: 0 0 20%;
            }
        }
        .shorter-row {
            margin-left: -10px;
            margin-right: -10px;

            [class*="col-"] {
                padding-left: 10px;
                padding-right: 10px;
            }
        }
    }
</style>