<template>
    <div id="condition-panel">
        <div class="panel">
            <div class="panel-title">
                營業條件
            </div>
            <div class="panel-content" style="padding-top: 15px;">
                <div>
                    預估營業額<span style="font-size: 12px; color: #ccc">(最高金額限制 NTD 1,000,000)</span>
                    <div class="row">
                        <div class="col-8">
                            <el-slider v-model="turnover" :show-tooltip="false" :min="0" :max="1000000" :step="10000"></el-slider>        
                        </div>
                        <div class="col-4 middle-right" style="font-weight: 700">
                            NTD {{formatNumber(turnover)}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel">
            <div class="panel-title">
                避免條件顯示
            </div>
            <div class="panel-content" style="padding-top: 15px;">
                <el-checkbox-group v-model="exceptList" class="grid">
                    <el-checkbox class="item" label="修車廠"></el-checkbox>
                    <el-checkbox class="item" label="殯儀館"></el-checkbox>
                    <el-checkbox class="item" label="養殖場"></el-checkbox>
                    <el-checkbox class="item" label="歇業熱點區"></el-checkbox>
                </el-checkbox-group>
            </div>
        </div>

        <div class="panel" v-if="chosenPosition">
            <div class="panel-title">
                選點地址
            </div>
            <div class="panel-content" style="padding-top: 15px;">
                {{chosenPosition.label}} <a class="clear-btn" style="cursor: pointer" @click="clearPosition">(解除鎖定)</a>
            </div>
        </div>

        <div class="panel">
            <div class="panel-title">
                備註填寫
            </div>
            <div class="panel-content" style="padding-top: 15px;">
                <el-input type="textarea" placeholder="請填入備註內容..." :rows="7"/>
            </div>
        </div>

        <div style="text-align: center; margin-top: 30px;" v-if="chosenPosition">
            <el-button type="primary" size="mini">送出運算</el-button>
        </div>
    </div>
</template>

<script>
    import helper from '../mixins/helper.js'
    export default {
        name: 'ConditionPanel',
        props: {
            msg: String,
            chosenPosition: Object
        },
        mixins: [helper],
        data() {
            return {
                turnover: 10000,
                exceptList: [],
            }
        },
        watch: {
            turnover(val) {
                this.changeTurnover(val)
            }
        },
        methods: {
            changeTurnover(val) {
                this.$emit('changeTurnover', val)
            },
            clearPosition() {
                this.$emit('clearPosition')
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.clear-btn {
    color: #ccc;
    font-size: 14px;
}
</style>