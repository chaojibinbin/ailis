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
          <span style="margin-left: 10px">{{ scope.row.user }}</span>
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
            @click="handleEdit(scope.row)">编辑</el-button>
			
	<!--shanchu-->		
			<el-button
			  style="margin-left: 0.4em;"
			  size="mini"
						type="danger" 
						icon="el-icon-edit"
			  @click="handledelete(scope.row)">删除</el-button>
			
			
			
		
        </template>
      </el-table-column>
    </el-table>
	 <template slot="footer"> 
	 <div class="chuangjian">
		<!-- 创建弹出窗 -->
		 <el-dialog title="创建用户" :visible.sync="uesrcreatdialogFormVisible">
		   <el-form :model="usercreat" ref='creatform' :rules="creatrules">
		     <el-form-item label="账号" :label-width="formLabelWidth" prop='user'>
		       <el-input v-model="usercreat.user" ></el-input>
		     </el-form-item>
		 	<el-form-item label="名字" :label-width="formLabelWidth" prop='name'>
		 	  <el-input v-model="usercreat.name" ></el-input>
		 	</el-form-item>
		 	<el-form-item label="密码" :label-width="formLabelWidth" prop='password'>
		 	  <el-input v-model="usercreat.password" ></el-input>
		 	</el-form-item>
		 	<el-form-item label="其他信息" :label-width="formLabelWidth" prop='other'>
		 	  <el-input v-model="usercreat.other" ></el-input>
		 	</el-form-item>
		 	<el-form-item label="账号状态" :label-width="formLabelWidth" prop='region'>
		 	      <el-select v-model="usercreat.region" placeholder="请选择状态">
		 	        <el-option label="停用" value="停用"></el-option>
		 	        <el-option label="启用" value="正常"></el-option>
		 	      </el-select>
		     </el-form-item>
			 </el-form>
			   <div slot="footer" class="dialog-footer">
			     <el-button @click="creatformvisible">取 消</el-button>
			     <el-button type="primary" @click="creatsubmit">确 定</el-button>
			   </div>
			 </el-dialog>
			 <!-- 创建按钮 -->
		 <el-button class="cjc" type="primary" @click="creatformvisible">创建用户</el-button>
		 
		<!-- 用户编辑 -->
		 <el-dialog title="用户编辑" :visible.sync="dialogFormVisible" >
		   <el-form >
		     <el-form-item label="账号" :label-width="formLabelWidth" >
		       <el-input v-model="form.user" ></el-input>
		     </el-form-item>
		 	<el-form-item label="名字" :label-width="formLabelWidth" >
		 	  <el-input v-model="form.name" ></el-input>
		 	</el-form-item>
		 	<el-form-item label="密码" :label-width="formLabelWidth" >
		 	  <el-input v-model="form.password" ></el-input>
		 	</el-form-item>
		 	<el-form-item label="其他信息" :label-width="formLabelWidth" >
		 	  <el-input v-model="form.other" ></el-input>
		 	</el-form-item>
		 	<el-form-item label="账号状态" :label-width="formLabelWidth" >
		 	      <el-select v-model="form.region" placeholder="请选择状态">
		 	        <el-option label="停用" value="停用"></el-option>
		 	        <el-option label="启用" value="正常"></el-option>
		 	      </el-select>
		     </el-form-item>
		 	
		   </el-form>
		   <div slot="footer" class="dialog-footer">
		     <el-button @click="dialogFormVisible = false">取 消</el-button>
		     <el-button type="primary" @click="edituser1">确 定</el-button>
		   </div>
		 </el-dialog>
	 </div>
	 
</template>
</d2-container>
</template>

<script>
	import { mapActions,mapState,mapGetters} from 'vuex'
	
	export default {
	  data() {
	        return {
		dialogFormVisible: false,    
		formLabelWidth: '120px',
				//删除编辑框显示
		 deletevisible:false,
		  form:{},
		creatrules:{
		  user:[{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }],
		  name:[{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
		  password:[{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
		  other:[{
            required: true,
            message: '请输入其他信息',
            trigger: 'blur'
          }],
		  region:[{
            required: true,
            message: '请输入选择状态',
            trigger: 'blur'
          }]
			 
			 
			  
		}
	   
	        }
	      },
	      methods: {
			...mapActions('back/user',[
				'getlist',
				'creatformvisible',
				'creatuser',
				'edituser2',
				'deleteuser'
			]),
			
			creatsubmit(){
				this.$refs.creatform.validate((valid) => {
				  if (valid) {
				    // zhuce 		  
				    this.creatuser({
				     name:this.usercreat.name,
					 password:this.usercreat.password,
					 user:this.usercreat.user,
					 region:this.usercreat.region,
					 other:this.usercreat.other
				    })
				      .then(() => {
				        // 
						this.getlist()
						
				     //  this.creatformvisible()
				      })
				  } else {
				    // 登录表单校验失败
				    this.$message.error('提交失败，请检查输入信息是否正确')
				  }
				})				
			},
			
	        handleEdit(row) {
			  this.form = row
	          this.dialogFormVisible = true
	        },
			edituser1(){
				
				    // zhuce 		  
				    this.edituser2({
				     name:this.form.name,
					 password:this.form.password,
					 user:this.form.user,
					 region:this.form.region,
					 other:this.form.other,
					 uuid:this.form.uuid
				    })
				      .then(() => {
				        // 
					    this.getlist()
						this.dialogFormVisible = false
				     //  this.creatformvisible()
				      })
				  
				
			},
	         handledelete(value) {
				 // 删除
				 
	                this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
	                  confirmButtonText: '确定',
	                  cancelButtonText: '取消',
	                  type: 'warning'
	                }).then(() => {
			
						
						// 删除
						this.deleteuser({
						 name:value.name,
						 password:value.password,
						 user:value.user,
						 region:value.region,
						 other:value.other,
						 uuid:value.uuid
						})
						  .then(() => {
						    // 
							this.$message({
							  type: 'success',
							  message: '删除成功!'
							});
						    this.getlist()
							
						 //  this.creatformvisible()
						  })
						
	                  
	                }).catch(() => {
	                  this.$message({
	                    type: 'info',
	                    message: '已取消删除'
	                  });          
	                });
	              },	
	      },
		  computed:{
			
			...mapGetters('back/user',{
						userform:'getuserform',
						usercreat:'getusercreat',
						uesrcreatdialogFormVisible:'getuesrcreatdialogFormVisible'
					 }),  
		  },
		  created() {
		  	this.getlist();
		  }
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
