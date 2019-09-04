<template>
    <div class="fit-box">
        <div id="bg-mask"></div>
        <vue-custom-scrollbar id="result-panel" class="result-panel" :setting="settings">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 header" style="text-align: center">
                        <img src="../assets/logo-black.png" alt="最佳拓點預測報告">
                    </div>
                    <div class="col-6" style="font-size: 10px">
                        <h2>最佳拓點預測報告</h2>
                    </div>
                    <div class="col-6" style="font-size: 10px; text-align: right">
                        <p>專案業務：王大明 / 0912-345678&nbsp;&nbsp;健檢日期：2019/09/20</p>
                    </div>
                    <div class="col-12">
                        <hr>
                        <p>加盟主姓名：</p>
                        <p>加盟主電話：</p>
                        <p>加盟主信箱：</p>
                        <hr>
                    </div>
                    <div class="col-4">
                        <p>店鋪位置：</p>
                        <p>物件來源：</p>
                        <p>店型選擇：</p>
                        <p>推薦營業時數：</p>
                        <p>推薦餐型：</p>
                        <p>預計營業額：</p>
                    </div>
                    <div class="col-4">
                        <p>最佳營業配置：</p>
                        <p>推薦店型：</p>
                        <p>推薦營業時間：</p>
                        <p>推薦餐型：</p>
                        <p>預計最佳營業額</p>
                    </div>
                    <div class="col-4">
                        <p>預計租金：</p>
                        <p>預測人事成本：</p>
                        <p>預測原物料成本：</p>
                        <p>預測其他成本：</p>
                        <p>預測營業額：</p>
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
                    labels: ['本店', '店面2', '店面3', '店面4'],
                    datasets: [{
                        label: '預計月營收減去四大成本',
                        backgroundColor: '#6d9eeb',
                        borderColor: '#6d9eeb',
                        borderWidth: 1,
                        data: [12, 36, 10, 28]
                    }, {
                        label: '預計月營收',
                        backgroundColor: '#1c4587',
                        borderColor: '#1c4587',
                        borderWidth: 1,
                        data: [36, 24, 32, 53]
                    }]
                },
                pirChartData: {
                    datasets: [{
                        data: [5, 7, 10, 2, 12],
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
    }
</style>