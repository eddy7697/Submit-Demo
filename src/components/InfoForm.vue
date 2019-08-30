<template>
    <div id="info-panel">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="info-form">
                        <h2>欲開發地區</h2>
                        <div class="panel">
                            <div class="panel-title">
                                店租條件
                            </div>
                            <div class="panel-content">
                                <table class="info-form-table">
                                    <tr>
                                        <td style="width: 110px;">加盟主姓名</td>
                                        <td>
                                            <label><input type="text"></label>
                                            <label><input name="name" value="male" type="radio">&nbsp;&nbsp;&nbsp;先生</label>
                                            <label><input name="name" value="female" type="radio">&nbsp;&nbsp;&nbsp;小姐</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 110px;">加盟主電話</td>
                                        <td>
                                            <label><input type="text" style="width: 50px"> - <input type="text"></label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 110px;">加盟主信箱</td>
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
                                            <select name="" id="" style="width: 110px; margin-right: 25px;">
                                                
                                            </select>
                                        </td>
                                        <td style="width: 110px;">依地區選擇</td>
                                        <td>
                                            <select name="" id="" style="width: 110px; margin-right: 25px;">
                                                
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 110px;">加盟主電話</td>
                                        <td colspan="3">
                                            <label><input type="text" style="width: 50px">&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;<input type="text">&nbsp;&nbsp;&nbsp;元</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 110px;">加盟主信箱</td>
                                        <td colspan="3">
                                            <label><input type="text" style="width: 50px">&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;<input type="text">&nbsp;&nbsp;&nbsp;坪</label>
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
                                        <td style="width: 110px;">店型選擇</td>
                                        <td>
                                            <select name="" id="" style="width: 200px; margin-right: 10px;"></select>
                                            (<a href="#">店型參考請點我</a>)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 110px;">預計營業時間</td>
                                        <td colspan="3">
                                            <label>
                                                <select name="" id="" style="width: 50px;"></select>
                                                &nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;
                                                <select name="" id="" style="width: 50px;"></select>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 110px;">餐型</td>
                                        <td>
                                            <label><input name="timing" value="breakfast" type="radio">&nbsp;&nbsp;&nbsp;早餐</label>
                                            <label><input name="timing" value="lunch" type="radio">&nbsp;&nbsp;&nbsp;午餐</label>
                                            <label><input name="timing" value="dinner" type="radio">&nbsp;&nbsp;&nbsp;晚餐</label>
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
                                    <el-checkbox class="item" label="591租屋網"></el-checkbox>
                                    <el-checkbox class="item" label="永慶房仲網"></el-checkbox>
                                    <el-checkbox class="item" label="信義房仲網"></el-checkbox>
                                    <el-checkbox class="item" label="樂屋網"></el-checkbox>
                                    <el-checkbox class="item" label="好房快租"></el-checkbox>
                                    <el-checkbox class="item" label="有巢氏房屋"></el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        
                        <div style="text-align: center; padding: 15px 0;">
                            <button class="btn btn-info info-submit-btn" @click="goStep">
                                送出
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'INfoFrom',
        props: {
            msg: String
        },
        data() {
            return {
                exceptList: []
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