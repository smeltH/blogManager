<template>
    <div class="isOut">
        <span class="username">{{username}}</span>
        <el-dropdown class="user" @command="handleCommand" placement="bottom-start">
            <span class="el-dropdown-link">
                <el-avatar :size="size" :src="circleUrl"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item type="primary" class="sign-out" command="signOut">退出登录
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: "UserInfo",
        data() {
            return {
                isShow: false,
                username: '',
                circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                size: 'medium'
            }
        },
        created(){
            this.username = localStorage.getItem('adminUsername');
        },
        methods:{
            handleCommand (command) {
                if(command !== 'signOut'){
                    return;
                }
                localStorage.removeItem('adminUsername')
                this.$router.push('/');
                this.$router.go(0)
            },
            isOut(){
                this.isShow = !this.isShow;
            }
        }
    }
</script>

<style scoped lang="less">
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .demonstration {
        display: block;
        color: #8492a6;
        font-size: 14px;
        margin-bottom: 20px;
    }
    .isOut{
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        text-align: right;
        .user{
            position: relative;
            .sign-out{
                width: 100%;
                position: absolute;
                left: -50%;
                top: -1px;
                transform: translateX(-50%);
            }
            .el-icon-arrow-down{
                padding-left: 4px;
            }
            .avatar{
                display: inline-block;
                width: 34px;
                height: 34px;
                border-radius: 100%;
            }
        }
        .username{
            margin-right: 20px;
        }
    }
    .isOut /deep/ .el-button:focus, .el-button:hover{
        background-color: #fff;
        color: #606266;
    }
    .isOut /deep/ .el-button--primary{
        background-color: #fff;
        color: #606266;
        border: 1px solid #606266;
    }
</style>
