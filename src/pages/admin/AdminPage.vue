<template>
    <div class="admin-manage">
        <div class="control-panel">
            <el-col :span="12">
                <h2>后台管理</h2>
                <el-menu
                    router
                    default-active="2"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/admin/userLists">用户列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>内容管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/admin/articleLists">文章列表</el-menu-item>
                            <el-menu-item index="/admin/createArticle">写文章</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>分类管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/admin/categoryLists">分类列表</el-menu-item>
                            <el-menu-item index="/admin/categoryAdd">分类添加</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </div>
        <div class="admin-info">
            <div class="isOut">
                <user-info></user-info>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import UserInfo from '@/components/UserInfo'
    export default {
        name: "AdminPage",
        data() {
            return {
                activeName: 'first',
                username:'',
                isShow:false
            }
        },
        components:{
            UserInfo
        },
        created(){
            const userInfo = localStorage.getItem('adminUsername');
            if(userInfo){
                this.username = userInfo;
            }else {
                this.$router.push('/404');
            }
        },
        methods: {
            signOut(){
                this.$router.push('/');
            },
            isOut(){
                this.isShow = !this.isShow;
            }
        }
    }
</script>

<style scoped lang="less">
    .control-panel{
        padding-top: 50px;
    }
    .admin-manage{
        display: flex;
        .admin-info{
            height: 100vh;
            flex: 1;
            padding: 10px 0 0 30px;
            box-sizing: border-box;
            /*overflow: hidden;*/
            .isOut{
                position: absolute;
                top: 12px;
                right: 100px;
                text-align: right;
                .user{
                    position: relative;
                    .sign-out{
                        width: 100%;
                        position: absolute;
                        bottom: -40px;
                        left: 50%;
                        transform: translateX(-50%);
                        background-color: #ecf5ff;
                        color: #409EFF;
                    }
                    .el-icon-arrow-down{
                        padding-left: 4px;
                    }
                }
            }
        }
        .control-panel{
            width: 300px;
            height: 100vh;
            background-color: rgb(84,92,100);
            box-sizing: border-box;
            h2{
                padding: 20px 0 20px 30px;
                color: #fff;
                font-size: 24px;
            }
            .el-submenu{
                width: 300px;
            }
        }
        .control-panel::after{
            display:block;
            height:0;
            content: '';
            clear:both;
            visibility:hidden;
        }
    }
    .control-panel /deep/ .el-col-12{
        width: 100%;
    }
</style>
