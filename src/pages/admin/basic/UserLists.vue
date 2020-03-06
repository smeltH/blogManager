<template>
    <div class="user-lists">
        <div class="crumbs-nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/admin/userLists' }">后台管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="line"></div>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
                prop="_id"
                label="用户id"
                width="300">
            </el-table-column>
            <el-table-column
                prop="username"
                label="用户名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="password"
                label="用户密码">
            </el-table-column>
            <el-table-column
                prop="isAdmin"
                label="是否为管理员">
            </el-table-column>
            <el-table-column label="操作" v-if="host">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">{{tableData[scope.$index].addAdmin}}</el-button>
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
    import {userlists, updataAdmin} from '@/api/admin/index'
    export default {
        name: "UserLists",
        data() {
            return {
                tableData: [],
                maxPages:0,
                totalCounts:0,
                currentPage:0,
                count:5,
                host:false
            }
        },
        async created(){
            if(this.$store.state.username === 'admin12'){
                this.host = true
            }
            // const {data:{data,maxPages,totalCounts}} = await this.$axios.post('/api/admin/userlists',{page:0,count:this.count})
            const {data:{data,maxPages,totalCounts}} = await userlists({page:0,count:this.count})
            this.tableData = data.map((item) => {
                if (item.isAdmin) {
                    item.isAdmin = "是";
                    item.addAdmin = "取消管理员"
                } else {
                    item.isAdmin = "否";
                    item.addAdmin = "设为管理员"
                }
                return item;
            });
            this.maxPages = maxPages;
            this.totalCounts = totalCounts;
        },
        methods: {
            // 管理员操作按钮
            async handleEdit(index, row) {
                if(this.tableData[index].username === 'admin12'){
                    this.$message.error('不允许操作')
                    return
                }
                let result = {};
                if(row.isAdmin==='是'){
                    // const {data} = await this.$axios.post('/api/admin/updataAdmin',{isAdmin:true,_id:this.tableData[index]._id})
                    const {data} = await updataAdmin({isAdmin:true,_id:this.tableData[index]._id})
                    result = data;
                }else{
                    // const {data} = await this.$axios.post('/api/admin/updataAdmin',{isAdmin:false,_id:this.tableData[index]._id})
                    const {data} = await updataAdmin({isAdmin:false,_id:this.tableData[index]._id})
                    result = data;
                }
                if(result.statements === 0){
                    this.$message({
                        message:result.msg,
                        type:'success'
                    })
                    setTimeout(()=>{
                        this.$router.go(0)
                    },200)
                }else{
                    this.$message.error(result.msg)
                }
            },
            //切换页面按钮
            async handleCurrentChange(val) {
                // const {data:{data,maxPages,totalCounts}} = await this.$axios.post('/api/admin/userlists',{page:val-1,count:this.count})
                const {data:{data,maxPages,totalCounts}} = await userlists({page:val-1,count:this.count})
                this.tableData = data.map((item) => {
                    if (item.isAdmin) {
                        item.isAdmin = "是";
                        item.addAdmin = "取消管理员"
                    } else {
                        item.isAdmin = "否";
                        item.addAdmin = "设为管理员"
                    }
                    return item;
                });
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
