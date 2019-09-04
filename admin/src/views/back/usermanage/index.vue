<template>
<d2-container>
  <el-table
      :data="userform"
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
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
	  <el-table-column
	    label="姓名"
	    width="300">
	    <template slot-scope="scope">
	      <el-popover trigger="hover" placement="top">
	        <p>姓名: {{ scope.row.name }}</p>
	        <p>其他信息: {{ scope.row.other }}</p>
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
	    <el-tag size="medium">{{ scope.row.region}}</el-tag>
	  </div>
	    </template>
	  </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
			<!-- //编辑操作 -->
          <el-button
		    style="margin-left: 0.4em;"
            size="mini"
			type="primary" 
			icon="el-icon-edit"
            @click="dialogFormVisible = true">编辑</el-button>
			
	<!-- 编辑弹出窗 -->
			
			<el-dialog title="用户编辑" :visible.sync="dialogFormVisible">
			  <el-form >
			    <el-form-item label="账号" :label-width="formLabelWidth">
			      <el-input v-model="scope.row.username" ></el-input>
			    </el-form-item>
				<el-form-item label="名字" :label-width="formLabelWidth">
				  <el-input v-model="scope.row.name" ></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
				  <el-input v-model="scope.row.password" ></el-input>
				</el-form-item>
				<el-form-item label="其他信息" :label-width="formLabelWidth">
				  <el-input v-model="scope.row.other" ></el-input>
				</el-form-item>
				<el-form-item label="账号状态" :label-width="formLabelWidth">
				      <el-select v-model="scope.row.region" placeholder="请选择状态">
				        <el-option label="停用" value="停用"></el-option>
				        <el-option label="启用" value="正常"></el-option>
				      </el-select>
			    </el-form-item>
		
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogFormVisible = false,handleEdit(scope.row)">确 定</el-button>
			  </div>
			</el-dialog>
			
			
			
			
		<!-- 	//删除操作 -->
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
		<!-- 创建弹出窗 -->
		 <el-dialog title="创建用户" :visible.sync="uesrcreatdialogFormVisible">
		   <el-form :model="usercreat" >
		     <el-form-item label="账号" :label-width="formLabelWidth">
		       <el-input v-model="usercreat.username" ></el-input>
		     </el-form-item>
		 	<el-form-item label="名字" :label-width="formLabelWidth">
		 	  <el-input v-model="usercreat.name" ></el-input>
		 	</el-form-item>
		 	<el-form-item label="密码" :label-width="formLabelWidth">
		 	  <el-input v-model="usercreat.password" ></el-input>
		 	</el-form-item>
		 	<el-form-item label="其他信息" :label-width="formLabelWidth">
		 	  <el-input v-model="usercreat.other" ></el-input>
		 	</el-form-item>
		 	<el-form-item label="账号状态" :label-width="formLabelWidth">
		 	      <el-select v-model="usercreat.region" placeholder="请选择状态">
		 	        <el-option label="停用" value="停用"></el-option>
		 	        <el-option label="启用" value="正常"></el-option>
		 	      </el-select>
		     </el-form-item>
			 </el-form>
			   <div slot="footer" class="dialog-footer">
			     <el-button @click="uesrcreatdialogFormVisible = false">取 消</el-button>
			     <el-button type="primary" @click="uesrcreatdialogFormVisible = false,usercreatmethod()">确 定</el-button>
			   </div>
			 </el-dialog>
			 <!-- 创建按钮 -->
		 <el-button class="cjc" type="primary" @click="uesrcreatdialogFormVisible=true">创建用户</el-button>
	 </div>

</template>
</d2-container>
</template>

<script>
	export default {
	  data() {
		  
	        return {
				        dialogFormVisible: false,
				        userform: [{
						  date: '2016-05-02',
				          name: '手打',				
						  password: 'sdasdad',
						  username: '51113594',
				          region: '11111',
						  other: '上海市普陀区金沙江路 1518 弄',
						  uuid:'001'
				        },
						{
						  date: '2016-05-02',
						  name: '手打',				
						  password: 'sdasdad',
						  username: '51113594',
						  region: '11111',
						  other: '上海市普陀区金沙江路 1518 弄',
						  uuid:'002'
						}],
						usercreat: {
						  date: '2016-05-02',
						  name: '',
						  password: '',
						  username: '',
						  region: '',
						  other: ''
						},
				        formLabelWidth: '120px',
				//删除编辑框显示
		   deletevisible:false,
		   uesrcreatdialogFormVisible:false,//创建框显示
	   
	        }
	      },
	      methods: {
	        handleEdit(index, row) {
	          console.log(index, row);
	        },
	        handleDelete(index, row) {
	          console.log(index, row);
	        },
			usercreatmethod(){
				
				alert('我要创建用户了')
				
			},
			
			
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
