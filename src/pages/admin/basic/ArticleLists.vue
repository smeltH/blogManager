<template>
    <div class="article-lists">
        <div class="crumbs-nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/admin/userLists' }">后台管理</el-breadcrumb-item>
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                <el-breadcrumb-item>文章列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="line"></div>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
                prop="_id"
                label="文章id"
                width="250">
            </el-table-column>
            <el-table-column
                prop="title"
                label="文章标题"
                width="180">
            </el-table-column>
            <el-table-column
                prop="author"
                label="作者">
            </el-table-column>
            <el-table-column
                prop="tag.categoryName"
                label="文章分类">
            </el-table-column>
            <el-table-column
                prop="releaseTime"
                label="发布时间">
            </el-table-column>
            <el-table-column
                prop="isTop"
                label="是否置顶">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">修改文章</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除文章</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="count"
                layout="total, prev, pager, next, jumper"
                :total="totalCounts">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getTime} from "../../../static/js/getTime";
    import {deleteArticle, articlelists} from '@/api/admin/index'
    export default {
        name: "ArticleLists",
        data() {
            return {
                tableData: [
                    {
                        _id:'',
                        title:'',
                        tag:'',
                        author:'',
                        releaseTime:''
                    }
                ],
                count:8,
                currentPage:0,
                totalCounts:0,
                maxPages:0,
            }
        },
        methods: {
            //重命名事件处理
            handleEdit(index, row) {
                this.$router.push(`/admin/articleLists/editArticle?id=${row._id}`)
            },
            //删除按钮
            async handleDelete(index, row) {
                // const {data} = await this.$axios.post('/api/admin/deleteArticle',{_id:row._id});
                const {data} = await deleteArticle({_id:row._id});
                if(data.statements === 1){
                    this.$message.error(data.msg)
                    return
                }
                this.$message({
                    message:data.msg,
                    type:'success'
                })
                this.$router.go(0)
            },
            //切换页面按钮
            async handleCurrentChange(val) {
                // const {data:{data,maxPages,totalCounts}} = await this.$axios.post('/api/admin/articlelists',{page:val-1,count:this.count});
                const {data:{data,maxPages,totalCounts}} = await articlelists({page:val-1,count:this.count});
                this.tableData = data.map((item)=>{
                    item.releaseTime = getTime(item.releaseTime)
                    if(item.isTop){
                        item.isTop = '是'
                    }else{
                        item.isTop = '否'
                    }
                    return item
                })
            }
        },
        async created(){
            const {data:{data,maxPages,totalCounts}} = await articlelists({page:0,count:this.count});
            data.map((item)=>{
                item.releaseTime = getTime(item.releaseTime)
                if(item.isTop){
                    item.isTop = '是'
                }else{
                    item.isTop = '否'
                }
            })
            this.maxPages = maxPages;
            this.totalCounts = totalCounts;
            this.tableData = data;
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
    .block{
        width: auto;
        margin: 50px 150px 10px 10px;
        text-align: center;
    }
    .block /deep/ .el-pagination{
        display: inline-block;
        margin: 0 auto;
    }
</style>

