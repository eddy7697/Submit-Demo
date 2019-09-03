<template>
    <div class="caculator-panel">
        <button class="close-btn" @click="closePanel">
            <i class="el-icon-close"></i>
        </button>

        <div class="panel" v-if="parsedPosition">
            <div class="panel-title">
                成本估算工具 <span style="color: red">(業務選項)</span>
            </div>
            <div class="panel-content" style="padding-top: 15px;">
                <table class="info-form-table">
                    <tr style="margin-bottom: 20px;">
                        <td>
                            店舖租金
                        </td>
                        <td>NTD {{formatNumber(parsedPosition.monthlyRent)}}</td>
                    </tr>
                    <tr>
                        <td colspan="2"><br></td>
                    </tr>
                    <tr>
                        <td colspan="2">預估人事成本</td>
                    </tr>
                    <tr>
                        <td>
                            <el-slider v-model="humanCost" :show-tooltip="false" :min="0" :max="1000000" :step="10000"></el-slider>
                        </td>
                        <td>
                            NTD {{formatNumber(humanCost)}}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">預估原物料成本</td>
                    </tr>
                    <tr>
                        <td>
                            <el-slider v-model="materialCost" :show-tooltip="false" :min="0" :max="1000000" :step="10000"></el-slider>
                        </td>
                        <td>
                            NTD {{formatNumber(materialCost)}}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">預估其他成本</td>
                    </tr>
                    <tr>
                        <td>
                            <el-slider v-model="otherCost" :show-tooltip="false" :min="0" :max="1000000" :step="10000"></el-slider>
                        </td>
                        <td>
                            NTD {{formatNumber(otherCost)}}
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="final-cost">
            <div class="col">
                <strong>NTD {{formatNumber(turnover)}}</strong> 
                <br>
                預估營業額
            </div>
            <div class="col">
                <strong>NTD {{formatNumber(allCost)}}</strong> 
                <br>
                預估成本
            </div>
            <div class="col">
                <span style="color: #afd560"><strong>NTD {{formatNumber(turnover - allCost)}}</strong></span>
                <br>
                預估利潤
            </div>
        </div>
    </div>
</template>

<script>
    import helper from '../mixins/helper.js'
    export default {
        name: 'CostCaculator',
        props: {
            msg: String,
            chosenPosition: Object,
            turnover: Number
        },
        mixins: [helper],
        created() {
        },
        data() {
            return {
                humanCost: 0,
                materialCost: 0,
                otherCost: 0,
            }
        },
        computed: {
            allCost() {
                return this.humanCost + this.materialCost + this.otherCost
            },
            parsedPosition() {
                try {
                    let parsed = JSON.parse(JSON.stringify(this.chosenPosition))

                    parsed.monthlyRent = parseInt(parsed.monthlyRent.replace(/,/g, ''))
                    return parsed   
                } catch (error) {
                    return null
                }
            }
        },
        methods: {
            closePanel() {
                this.$emit('toggleVisiable', false)
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.caculator-panel {
    background-color: #fff;
    position: absolute;
    top: 10px;
    left: 465px;
    z-index: 2;
    width: 450px;
    padding: 15px 25px;
    box-shadow: 2px 2px 12px -2px rgba($color: #000000, $alpha: .5);

    .close-btn {
        background: transparent;
        border: none;
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .info-form-table {
        width: 100%;
        table-layout: fixed;

        tr {
            td {
                &:first-child {
                    text-align: left !important;
                }
                &:last-child {
                    text-align: right;
                    width: 135px;
                }
            }
        }
    }
    .final-cost {
        margin-top: 20px;
        margin-bottom: 10px;
        display: flex;
        border: #eee thin solid;
        border-radius: 3px;
        box-shadow: 3px 2px 4px -2px rgba($color: #000000, $alpha: .5);

        .col {
            padding: 20px 0;
            text-align: center;
            font-size: 14px;

            strong {
                font-size: 16px;
            }
            &::after {
                content: '';
                position: absolute;
                top: 25%;
                right: -0.5px;
                bottom: 25%;
                background-color: #ccc;
                width: 1px;
            }
            &:last-child {
                &::after {
                    content: none;
                }
            }
        }
    }
}
</style>