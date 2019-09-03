<template>
<d2-container>
  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="创建日期"
        width="300">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="账户"
        width="300">
        <template slot-scope="scope">
          <i class="el-icon-s-custom"></i>
          <span style="margin-left: 10px">{{ scope.row.user }}</span>
        </template>
      </el-table-column>
	  <el-table-column
	    label="姓名"
	    width="300">
	    <template slot-scope="scope">
	      <el-popover trigger="hover" placement="top">
	        <p>姓名: {{ scope.row.name }}</p>
	        <p>住址: {{ scope.row.address }}</p>
	        <div slot="reference" class="name-wrapper">
	          <el-tag size="medium">{{ scope.row.name }}</el-tag>
	        </div>
	      </el-popover>
	    </template>
	  </el-table-column>
	  <el-table-column
	    label="状态"
	    width="300">
	    <template slot-scope="scope">
	  <div slot="reference" class="name-wrapper">
	    <el-tag size="medium">{{ scope.row.state }}</el-tag>
	  </div>
	    </template>
	  </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
		    style="margin-left: 0.4em;"
            size="mini"
			type="primary" 
			icon="el-icon-edit"
            @click="handleEdit()">编辑</el-button>
			<el-popover
			  placement="top"
			  width="160"
			  v-model="deletevisible">
			  <p>确认删除这个用户吗？</p>
			  <div style="text-align: right; margin: 0">
			    <el-button size="mini" type="text" @click="deletevisible = false">取消</el-button>
			    <el-button type="primary" size="mini" @click="deletevisible = false">确定</el-button>
			  </div>
			 <el-button
			   size="mini"
			   type="danger"
			     style="margin-left: 0.4em;"
			   icon="el-icon-delete"
			   slot="reference">删除</el-button>
			</el-popover>
        </template>
      </el-table-column>
    </el-table>
	 <template slot="footer"> 
	 <div class="chuangjian">
		 <el-button class="cjc" type="primary">创建用户</el-button>
	 </div>

</template>
</d2-container>
</template>

<script>
	export default {
	  data() {
		  
	        return {
				deletevisible:false,
	          tableData: [{
	            date: '2016-05-02',
				user:'51113594',
	            name: '王小虎',
				state:'正常',
	            address: '上海市普陀区金沙江路 1518 弄'
	          }]
	        }
	      },
	      methods: {
	        handleEdit(index, row) {
	          console.log(index, row);
	        },
	        handleDelete(index, row) {
	          console.log(index, row);
	        }
	      },
		  name: 'usermanage'
	}
</script>

<style scoped="scoped">
	.chuangjian{
	
		display: flex;
		flex-direction: row-reverse;
	}
	.cjc{
		width: 20%;
	
	}
	
</style>
