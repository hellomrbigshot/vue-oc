<template>
	<div>
		<div><h1 class="title" style="display: inline-block">新建问卷</h1><el-button class="top-button" type="primary" @click="saveQuestionaire">保存问卷</el-button></div>
		<div class="line">
			<el-form>
				<el-form-item>
					<el-input @blur="toggleNameInput" v-if="name_input" v-model="form_obj.name" type="text" style="text-align: center; width: 100%" placeholder="请输入问卷标题">
					</el-input>
					<div v-else class="el-input" @click="toggleNameInput">
						<div class="el-input__inner" style="text-align: center; line-height: 28px; width: 100%">{{ form_obj.name?form_obj.name:'请输入问卷标题' }}</div>
					</div>
				</el-form-item>
				<div v-for="(question, index) in form_obj.questions">
					<el-form-item  :label="(index+1)+'. '+question.content+(question.prompt?'('+question.prompt+')':'')">
						<el-radio-group v-model="arr[index]" v-if="question.type=='radio'">
							<el-radio v-for="(option, index) in question.options" :label="option.value">
								<el-input v-if="option.value_by_input" style="width: 150px;"></el-input>
								{{ option.display?option.display:option.value }}
								{{option.notice?'('+option.notice+')':''}}
							</el-radio>
						</el-radio-group>
						<el-checkbox-group v-model="arr[index]" v-if="question.type=='checkbox'">
							<el-checkbox v-for="(option, index) in question.options" :label="option.value">
								<el-input v-if="option.value_by_input" style="width: 150px;"></el-input>
								{{ option.display?option.display:option.value }}
								{{option.notice?'('+option.notice+')':''}}
							</el-checkbox>
						</el-checkbox-group>
						<template v-model="arr[index]" v-if="question.type=='input' || question.type=='textarea'">
							<el-input :type="question.type" style="width: 80%;"></el-input>	
						</template>
						<div id="icons">
	                        <i class="el-icon-edit edit-question-icon" @click="editQuestion(index)"></i>
	                        <i class="el-icon-delete delete-question-icon" @click="deleteQuestion(index)"></i>
	                    </div>
					</el-form-item>
				</div>
			</el-form>
		</div>  
		<div class="line">
			<transition name="button">
				<div style="width: 100%; text-align: center" v-if="!buttons_show">
					<el-button @click="radioDialogVisible = true">单选</el-button>
					<el-button @click="checkboxDialogVisible = true">多选</el-button>
					<el-button @click="inputDialogVisible = true">文本框</el-button>
				</div>
			</transition>

			<div class="add-button" @click="buttons_show=!buttons_show"><span icon="plus">添加问题</span></div>
		</div>

		<!-- radio弹窗 -->
		<el-dialog title="单选" :visible.sync="radioDialogVisible">
			<el-form label-width="100px">
				<el-form-item label="标题：">
					<el-input placeholder="请输入标题" v-model="radio_group_obj.content"></el-input>
				</el-form-item>
				<el-form-item label="提示文字：">
					<el-input placeholder="请输入提示文字" v-model="radio_group_obj.prompt"></el-input>
				</el-form-item>
				<el-form-item label="是否必选：">
					<el-radio-group v-model="radio_group_obj.optional">
						<el-radio :label="true">是</el-radio>
						<el-radio :label="false">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="添加选项：">
					<el-button type="primary" @click="addRadioOption">添加选项</el-button>
				</el-form-item>
				<el-form-item label="真实值：">
					<el-input v-model="radio_option_obj.value"></el-input>
				</el-form-item>
				<el-form-item label="显示值：">
					<el-input v-model="radio_option_obj.display"></el-input>
				</el-form-item>
				<el-form-item label="选项提示：">
					<el-input v-model="radio_option_obj.notice"></el-input>
				</el-form-item>
				<el-form-item label="预览：">
				</el-form-item>
				<el-form-item :label="radio_group_obj.prompt?radio_group_obj.content+'('+radio_group_obj.prompt+')':radio_group_obj.content">
					<el-radio-group>
						<div>
							<el-radio class="single-option" :label="option.value" v-for="(option, index) in radio_group_obj.options">
								<el-input v-if="option.value_by_input" style="width: 150px;"></el-input>
								{{ option.display?option.display:option.value }}
								{{option.notice?'('+option.notice+')':''}}
								<i class="el-icon-delete icon" @click.stop="deleteRadioOption(index)"></i>
							</el-radio>
						</div>
					</el-radio-group>
				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="radioDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addSubmit('radio')">添 加</el-button>
			</span>
		</el-dialog> 

		<!-- checkbox弹窗 -->
		<el-dialog title="多选" :visible.sync="checkboxDialogVisible">
			<el-form label-width="100px">
				<el-form-item label="标题：">
					<el-input placeholder="请输入标题" v-model="checkbox_group_obj.content"></el-input>
				</el-form-item>
				<el-form-item label="提示文字：">
					<el-input placeholder="请输入提示文字" v-model="checkbox_group_obj.prompt"></el-input>
				</el-form-item>
				<el-form-item label="是否必选：">
					<el-radio-group v-model="checkbox_group_obj.optional">
						<el-radio :label="true">是</el-radio>
						<el-radio :label="false">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="最少选：" class="inline-item">
					<el-input v-model="checkbox_group_obj.min" placeholder="请输入数字" style="width: 100px"></el-input>
				</el-form-item>
				<el-form-item label="最多选：" class="inline-item">
					<el-input v-model="checkbox_group_obj.max" placeholder="请输入数字" style="width: 100px"></el-input>
				</el-form-item>
				<el-form-item label="添加选项：">
					<el-button type="primary" @click="addCheckboxOption">添加选项</el-button>
				</el-form-item>
				<el-form-item label="真实值：">
					<el-input v-model="checkbox_option_obj.value"></el-input>
				</el-form-item>
				<el-form-item label="显示值：">
					<el-input v-model="checkbox_option_obj.display"></el-input>
				</el-form-item>
				<el-form-item label="选项提示：">
					<el-input v-model="checkbox_option_obj.notice"></el-input>
				</el-form-item>
				<el-form-item label="预览：">
				</el-form-item>
				<el-form-item :label="checkbox_group_obj.prompt?checkbox_group_obj.content+'('+checkbox_group_obj.prompt+')':checkbox_group_obj.content">
					<el-checkbox-group>
						<div>
							<el-checkbox class="single-option" :label="option.value" v-for="(option, index) in checkbox_group_obj.options">
								<el-input v-if="option.value_by_input" style="width: 150px;"></el-input>
								{{ option.display?option.display:option.value }}
								{{option.notice?'('+option.notice+')':''}}
								<i class="el-icon-delete icon" @click.stop="deleteCheckboxOption(index)"></i>
							</el-checkbox>
						</div>
					</el-checkbox-group>
				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="radioDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addSubmit('checkbox')">添 加</el-button>
			</span>
		</el-dialog>

		<!-- input弹窗 -->
		<el-dialog title="输入框" :visible.sync="inputDialogVisible">
			<el-form label-width="100px">
				<el-form-item label="标题：">
					<el-input placeholder="请输入标题" v-model="input_obj.content"></el-input>
				</el-form-item>
				<el-form-item label="是否必选：">
					<el-radio-group v-model="input_obj.optional">
						<el-radio :label="true">是</el-radio>
						<el-radio :label="false">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="类型：">
					<el-radio-group v-model="input_obj.type">
						<el-radio label="input">文本框</el-radio>
						<el-radio label="textarea">文本域</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="提示文字：">
					<el-input placeholder="请输入提示文字" v-model="input_obj.prompt"></el-input>
				</el-form-item>
				<el-form-item label="校验：">
					<el-radio-group v-model="input_obj.validator">
						<el-radio label="TEXT">文本</el-radio>
						<el-radio label="NUMBER">数字</el-radio>
						<el-radio label="DATE">日期</el-radio>
						<el-radio label="TIME">时间(精确到秒)</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="inputDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addSubmit('input')">保 存</el-button>
			</span>
		</el-dialog>

	</div>
</template>
<script>
	export default {
		data () {
			return {
				arr: [],
				name_input: false,
				buttons_show: false,
				radioDialogVisible: false,
				checkboxDialogVisible: false,
				inputDialogVisible: false,
				inputDialogVisible: false,
				form_obj: {
					name: '',
					questions: []
				},
				radio_group_obj: {
					type: "radio",
					content: "",
					options: [],
					optional: true,
					prompt: ""
				},
				radio_option_obj: {
					display: "",
					notice: "",
					value: "",
					value_by_input: false
				},
				checkbox_group_obj: {
					type: "checkbox",
					content: "",
					options: [],
					optional: true,
					prompt: "",
					min: "",
					max: "",
				},
				checkbox_option_obj: {
					display: "",
					notice: "",
					value: "",
					value_by_input: false
				},
				input_obj: {
					type: "input",
					content: "",
					optional: true,
					prompt: "",
					validator: 'TEXT'
				},
				rules: [],
			}
		},
		methods: {
			toggleNameInput () {
				this.name_input = !this.name_input
			},
			addRadioOption () {
				if(!this.radio_option_obj.value) {
					if(this.radio_group_obj.options.filter(value => value.value_by_input == true).length > 0) {
						this.$message.warning("只能有一个文本框选项");
						return false;
					}
					else {
						this.radio_option_obj.value_by_input = true;
						this.radio_option_obj.display = "";
						this.radio_group_obj.options.push(this.radio_option_obj);
						this.resetOption();
						return false;
					}
				} else {
					this.radio_group_obj.options.push(this.radio_option_obj);
					this.resetOption();
				}
			},
			deleteRadioOption (index) {
				this.radio_group_obj.options.splice(index, 1);
			},

			addSubmit (type) {
				switch (type) {
					case 'radio': 
					if(!this.radio_group_obj.options.length) {
						this.$message.warning("至少添加一个选项");
						return false;
					};
					if(!this.radio_group_obj.content) {
						this.$message.warning("问题名不能为空");
						return false;
					}
					if(this.radio_group_obj.index != undefined) {
                        this.form_obj.questions[this.radio_group_obj.index] =JSON.parse(JSON.stringify(this.radio_group_obj));
                    } else {
                        this.form_obj.questions.push(this.radio_group_obj);
                    }
					break;
					case 'checkbox': 
					if(!this.checkbox_group_obj.options.length) {
						this.$message.warning("至少添加一个选项");
						return false;
					};
					if(!this.checkbox_group_obj.content) {
						this.$message.warning("问题名不能为空");
						return false;
					}
					if(this.checkbox_group_obj.index != undefined) {
                        this.form_obj.questions[this.checkbox_group_obj.index] = JSON.parse(JSON.stringify(this.checkbox_group_obj));
                    } else {
                        this.form_obj.questions.push(this.checkbox_group_obj);
                    }
					break;
					case 'input': 
					if(!this.input_obj.content) {
						this.$message.warning("问题名不能为空");
						return false;
					}
					if(this.input_obj.index != undefined) {
                        this.form_obj.questions[this.input_obj.index] = JSON.parse(JSON.stringify(this.input_obj));
                    } else {
                        this.form_obj.questions.push(this.input_obj);
                    }
				}



				this.radioDialogVisible = false;
				this.checkboxDialogVisible = false;
				this.inputDialogVisible = false;
				this.resetDialog();
			},
			deleteQuestion (index) {
				this.form_obj.questions.splice(index, 1);
			},
			addCheckboxOption () {

				if(!this.checkbox_option_obj.value) {
					if(this.checkbox_group_obj.options.filter(value => value.value_by_input == true).length > 0) {
						this.$message.warning("只能有一个文本框选项");
						return false;
					}
					else {
						this.checkbox_option_obj.value_by_input = true;
						this.checkbox_option_obj.display = "";
						this.checkbox_group_obj.options.push(this.checkbox_option_obj);
						this.resetOption();
						return false;
					}
				} else {
					this.checkbox_group_obj.options.push(this.checkbox_option_obj);
					this.resetOption();
				}
			},
			deleteCheckboxOption (index) {
				this.checkbox_group_obj.options.splice(index, 1);
			},
			editQuestion: function(index) {
				let obj = JSON.parse(JSON.stringify(this.form_obj.questions[index]))
                if(obj.type == 'radio') {
                    this.radio_group_obj = obj;
                    this.radio_group_obj.index = index;
                    this.radioDialogVisible =  true;
                } else if (obj.type == 'checkbox') {
                    this.checkbox_group_obj = obj;
                    this.checkbox_group_obj.index = index;
                    this.checkboxDialogVisible = true;
                } else if (obj.type == 'textarea' || obj.type == 'input') {
                    this.input_obj = obj;
                    this.input_obj.index = index;
                    this.inputDialogVisible = true;
                }

            },
			saveQuestionaire () {
				if(!this.form_obj.name || !this.form_obj.questions) {
					this.$message.warning("问卷至少添加一个选项且问卷名不能为空");
					return false;
				}
				let questionnaire_list = JSON.parse(sessionStorage.getItem('questionnaire_list')) || [];
				questionnaire_list.push(this.form_obj);
				sessionStorage.setItem('questionnaire_list', JSON.stringify(questionnaire_list));
				this.$message.success("问卷保存成功");
				this.$router.push("/questionnaire");
			},
			resetOption () {
				this.radio_option_obj = {
					display: "",
					notice: "",
					value: "",
					value_by_input: false
				};
				this.checkbox_option_obj = {
					display: "",
					notice: "",
					value: "",
					value_by_input: false
				}
			},
			resetDialog () {
				this.radio_group_obj = {
					type: "radio",
					content: "",
					options: [],
					optional: true,
					prompt: ""
				};
				this.checkbox_group_obj = {
					type: "checkbox",
					content: "",
					options: [],
					optional: true,
					prompt: "",
					min: "",
					max: "",
				},
				this.input_obj = {
					type: "input",
					content: "",
					optional: true,
					prompt: "",
					validator: 'TEXT'
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	.title {
		margin: 20px;
	}
	.line {
		padding: 20px
	}
	.add-button {
		width: 100%; 
		height: 60px;
		background: #eee;
		text-align: center;
		line-height: 60px;
		margin-top: 10px;
		&:hover {
			cursor: pointer
		}
		span {
			color: #bfcbd9;
		}
		&:hover span {
			color: #000;
		}
	}
	.button-enter-active, .button-leave-active {
		transition: opacity .3s
	}
	.button-enter, .button-leave-to /* .button-leave-active 在低于版本 2.1.8 中 */ {
		opacity: 0.5
	}
	.single-option {
		border: 1px solid #cdcdcd;
		padding: 5px;
		border-radius: 5px;
		.icon {
			margin-left: 10px;
			font-size: 12px;
			color: #cdcdcd;
			&:hover {
				color: #000;
			}
		}
	} 
	.top-button {
		// margin-left: 60%;
		float: right;
		margin-right: 20px;
		margin-top: 20px;
	}
	#icons {
            position: absolute;
            top: 10px;
            right: 0;
            .edit-question-icon, .delete-question-icon {
            font-size: 16px;
            margin-left: 10px;
            display: inline-block;
            &:hover {
				cursor: pointer;
            }
        }
    }
	.inline-item {
		display: inline-block;
	}
	.el-checkbox-group {
		display: inline-block;
		// font-size: 0;
	}
</style>