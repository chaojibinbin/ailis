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
            @click="dialogFormVisible = true">编辑</el-button>
			
	<!-- 编辑弹出窗 -->
			
			<el-dialog title="用户编辑" :visible.sync="dialogFormVisible">
			  <el-form >
			    <el-form-item label="账号" :label-width="formLabelWidth">
			      <el-input v-model="scope.row.user" ></el-input>
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
				'creatuser'
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
			
	        handleEdit(index, row) {
			 		
	          console.log(index, row);
	        },
	        handleDelete(index, row) {
	          console.log(index, row);
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
