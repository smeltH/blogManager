<template>
    <div class="create-article">
        <div class="crumbs-nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/admin/userLists' }">后台管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/admin/articleLists' }">内容管理</el-breadcrumb-item>
                <el-breadcrumb-item>文章列表</el-breadcrumb-item>
                <el-breadcrumb-item>修改文章</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="line"></div>

        <el-form ref="form" :model="form" label-width="80px">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="文章标题" class="title">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="文章作者" class="author">
                        <el-input v-model="form.author"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="文章分类">
                        <el-select v-model="form.tag.categoryName" placeholder="请选择文章分类">
                            <el-option v-for="(category,index) in categoryArr" :label="category.categoryName" :value="category._id" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否置顶" prop="isTop">
                        <el-col :span="12">
                            <el-switch v-model="form.isTop"></el-switch>
                            <span class="tip" v-if="form.isTop">开启置顶</span>
                            <span class="tip" v-if="!form.isTop">取消置顶</span>
                            <span class="isRecommend">是否推荐</span>
                        </el-col>
                        <el-col :span="12">
                            <el-switch v-model="form.isRecommend"></el-switch>
                            <span class="tip" v-if="form.isRecommend">推荐</span>
                            <span class="tip" v-if="!form.isRecommend">不推荐</span>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="grid-content bg-purple">
                <el-form-item label="文章简介" class="description">
                    <el-input type="textarea" v-model="form.description"></el-input>
                </el-form-item>
            </div>
            <el-form-item label="文章内容" class="content">
                <!--<mark-down :initialValue="form.content" ref="formContent"></mark-down>-->
                <mark-down :value="form.content" ref="formContent"></mark-down>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">更新文章</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import MarkDown from 'vue-meditor'
    import {findArticle, editArticle} from '@/api/admin/index'
    export default {
        name: "EditArticle",
        data() {
            return {
                form: {
                    title: '',
                    author: '',
                    categorys: [],
                    description: '',
                    content: '',
                    contentHtml: '',
                    isTop: false,
                    isRecommend: false,
                    tag: ''
                },
                newContent: ''
            }
        },
        components:{
            MarkDown
        },
        async created(){
            const {data} = await findArticle({_id:this.$route.query.id});
            if(data.statements){
                this.$message.error(data.msg)
                return
            }
            this.form = data;
            this.newContent = data.content;
        },
        computed:{
            categoryArr(){
                return this.$store.state.category
            }
        },
        methods: {
            async onSubmit() {
                this.form.content = this.$refs.formContent.currentValue;
                this.form.contentHtml = this.$refs.formContent.html;
                if( !(
                    this.form.title &&
                    this.form.author &&
                    this.form.tag.categoryName &&
                    this.form.description &&
                    this.form.content &&
                    this.form.contentHtml )
                ){
                    this.$message({
                        message:'请正确修改！！！！',
                        type:'info'
                    })
                    return
                }
                let newForm = this.form
                // if(newForm === this.oldform){
                //     this.$message({
                //         message:'文章信息没有发生改变',
                //         type:'info'
                //     });
                //     return
                // }
                newForm.tag = newForm.tag._id
                const {data} = await editArticle(newForm);
                if(data.statements === 1){
                    this.$message.error(data.msg)
                    return
                }
                this.$message({
                    message:data.msg,
                    type:'success'
                })
                this.$router.push('/admin/articleLists')
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
    .el-form{
        padding: 20px 20px 0 0;
        .isRecommend{
            color: #606266;
            font-size: 14px;
            margin: 0 8px 0 10px;
        }
    }
    .description /deep/ .el-textarea__inner{
        height: 62px;
    }
    .content /deep/ .el-textarea__inner{
        height: 270px;
    }
    .content .el-row {
        width: 100%;
        height: 580px;
        border: 1px solid #DCDFE6;
        textarea{
            display: block;
            width: 100%;
            font-size: 16px;
            line-height: 30px;
            height: 580px;
            padding: 10px 4px 0 16px;
            border: none;
            border-right: 1px dashed #DCDFE6;
            border-bottom: 1px solid #DCDFE6;
            box-sizing: border-box;
            resize: none;
            font-family: Arial;
        }
        ::-webkit-scrollbar{
            width: 14px;
        }
        ::-webkit-scrollbar-track{
            background-color: #ececec;
        }
        ::-webkit-scrollbar-thumb{
            border-radius: 7px;
            background-color: #aaa2a2;
        }
        .artInput{
            width: 100%;
            padding-left: 20px;
            height: 580px;
            box-sizing: border-box;
            overflow-y: scroll;
            /deep/ pre{
                color: #fff;
                background-color: #333;
            }
        }
    }
    .title /deep/ .el-input{
        width: 200px;
    }
    .author /deep/ .el-input{
        width: 200px;
    }
    .tip{
        display: inline-block;
        margin-left: 8px;
    }
</style>
