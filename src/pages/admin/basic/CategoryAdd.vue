<template>
    <div class="category-add">
        <div class="crumbs-nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/admin/userLists' }">后台管理</el-breadcrumb-item>
                <el-breadcrumb-item>分类列表</el-breadcrumb-item>
                <el-breadcrumb-item>分类添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="line"></div>
        <el-form label-width="80px" class="form-add">
            <el-form-item label="名称" class="category">
                <el-input v-model="category"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {categoryAdd} from '@/api/admin/index'
    export default {
        name: "CategoryAdd",
        data() {
            return {
                category:''
            }
        },
        methods: {
            //分类数据提交
            async onSubmit() {
                if(!this.category){
                    this.$message.error('内容不能为空')
                    return
                }
                // const {data} = await this.$axios.post('/api/admin/categoryAdd',{category:this.category})
                const {data} = await categoryAdd({category:this.category})
                if(data.statements === 1){
                    this.$message.error(data.msg)
                    return
                }
                this.$message({
                    message:data.msg,
                    type:'success'
                });
                // this.$router.go(0)
            }
        }
    }
</script>

<style scoped lang="less">
    .crumbs-nav{
        padding: 30px 0;
        .el-breadcrumb__item{
            font-size: 16px;
        }
    }
    .form-add{
        padding-top: 50px;
    }
    .form-add /deep/ .category{
        width: 300px;
    }
</style>

