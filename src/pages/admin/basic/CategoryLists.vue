<template>
    <div class="category-lists">
        <div class="crumbs-nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/admin/userLists' }">后台管理</el-breadcrumb-item>
                <el-breadcrumb-item>分类管理</el-breadcrumb-item>
                <el-breadcrumb-item>分类列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="line"></div>
        <el-table
            :data="getCategoryList[currentPage]"
            stripe
            style="width: 100%">
            <el-table-column
                prop="_id"
                label="分类id"
                width="600">
            </el-table-column>
            <el-table-column
                prop="categoryName"
                label="分类名"
                width="500">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="open(scope.$index, scope.row)">重命名</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    import {editCategory, deleteCategory} from '@/api/admin/index'
    export default {
        name: "CategoryLists",
        data() {
            return {
                count:6,
                currentPage:0,
                totalCounts:0,
                maxPages:0,
            }
        },
        methods:{
            // 重命名按钮点击事件
            open(index,row){
                this.$prompt('请输入新的分类', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    // this.$axios.post('/api/admin/editCategory',{_id:row._id,value})
                    editCategory({_id:row._id,value})
                        .then((result)=>{
                            if(result.data.statements === 1){
                                this.$message({
                                    type: 'info',
                                    message: result.data.msg
                                });
                                return
                            }
                            this.$message({
                                type: 'success',
                                message: result.data.msg
                            });
                            setTimeout(()=>{
                                this.$router.go(0)
                            },300)
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            // 删除按钮点击事件
            async handleDelete(index,row){
                // const {data} = await this.$axios.post('/api/admin/delete',{_id:row._id,categoryName:row.categoryName})
                const {data} = await deleteCategory({_id:row._id,categoryName:row.categoryName});
                console.log(data);
                if(data.statements === 1){
                    this.$message({
                        type: 'info',
                        message: data.msg
                    });
                    return
                }
                if(data.statements === 2){
                    this.$message({
                        type: 'info',
                        message: data.msg
                    });
                    return
                }
                this.$message({
                    type: 'success',
                    message: data.msg
                });
                setTimeout(()=>{
                    this.$router.go(0)
                },300)
            },

            //切换页面按钮
            handleCurrentChange(val) {
                this.currentPage = val-1
            }
        },
        computed:{
            getCategoryList(){
                this.$store.dispatch('getCategorys');
                const categories = this.$store.state.category
                this.totalCounts = categories.length
                this.maxPages = Math.ceil(categories.length/this.count)
                const arr = [];
                for(let i=0,len=this.maxPages;i<len;i++){
                    let item = categories.slice(i*this.count,(i+1)*this.count)
                    arr.push(item)
                }
                return arr
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
