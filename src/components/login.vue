<style scoped>
    .login{
        width: 100%;
        height: 100%;
        min-height: 760px;
        background: url('../assets/loginBg.jpg') no-repeat;
        background-size:100% 100%;
    }
    .top-right{
        position: absolute;
        top:180px;
        right: 80px;
        width: 330px;
        background: #fff;
        padding: 20px 40px;
        border-radius: 6px;
        box-shadow: 0 0 18px rgba(133,218,254,.8);
    }
    .form-title{
        font-size: 18px;
        color: #666;
        margin: 14px 0;
    }
</style>
<style>
    .form-input-code .ivu-form-item-content{
        display: flex;
    }
    .form-input-code .ivu-input-wrapper{
        margin-right: 4px;
    }
</style>

<template>
  <div class="login">
    <div class="top-right">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <!--请登录-->
            <p class="form-title">请登录</p>
            <FormItem prop="phone">
                <Input size="large" type="text" v-model="formInline.phone" placeholder="请输入手机号" autofocus>
                    <Icon type="ios-phone-portrait" slot="prefix"></Icon>
                </Input>
            </FormItem>
            <FormItem class="form-input-code">
                <Input size="large" type="text" v-model="formInline.code" placeholder="验证码">
                    <Icon type="ios-phone-portrait" slot="prefix"></Icon>
                </Input>
                <Button size="large" type="primary" @click="getCode" :disabled="getCodeObj.disabled">{{getCodeObj.title}}</Button>
            </FormItem>
            <FormItem>
                <!--登录-->
                <Button @click="login" long size="large" type="primary" :disabled="loginBtn.disabled">登录</Button>
            </FormItem>
        </Form>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
        const validateName = (rule, value, callback) => {
            if (!phoneReg.test(value)) {
                this.loginBtn.disabled = true
                callback(new Error('手机号格式有误'))
            } else {
                this.loginBtn.disabled = false
                callback()
            }
        }
        return {
            ruleInline: { // 验证方式
                phone: [
                    { required: true, validator: validateName, trigger: 'blur' }
                ]
            },
            formInline: { // 提交参数
                phone: '',
                code: ''
            },
            getCodeObj: { // 获取验证码
                title: '获取验证码',
                disabled: false,
                waitTimer: 60,
                timer: '',
                code: '', // 获取到的验证码（mock模拟的123456->string）
            },
            loginBtn: { // 登录按钮
                disabled: true
            }
        }
    },
    methods: {
        getCode () {
            this.$refs.formInline.validate(valid => {
                if (valid) {
                    this.timer(this.getCodeObj)
                    this.axios.post('/getVerificatCode', {phone: this.formInline.phone}).then(res => {
                        this.getCodeObj.code = res.data.vCode
                    })
                }
            })
        },
        login () {
            this.axios.post('/login', this.formInline).then(res => {
                const result = res.data
                if (result.code === 1) {
                    this.$router.push('/firstPage')
                } else {
                    this.$Message.error(result.text)
                }
            })
        },
        timer (o) {
            if (o.waitTimer === 0) {
                o.disabled = false
                o.title="重新获取验证码";
                o.waitTimer = 60;
            } else {
                o.disabled = true
                o.title = `重新发送 ${o.waitTimer}`
                o.waitTimer--
                clearTimeout(this.getCodeObj.timer)
                this.getCodeObj.timer = setTimeout(() => {
                    this.timer(o)
                }, 1000)
            }
        }
    },
}
</script>
