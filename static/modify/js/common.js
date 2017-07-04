$(function(){
	//退出登录
	$('#outLogin').on('click',function(){
	  layer.open({
		  type: 1 
		  ,area: ['460px']
		  ,title: ' '
		  ,maxmin: false
		  ,anim: 1 
		  ,content: '<div class="layer-tip"><p class="p3">确定要退出？</p></div>'
		  ,btn: ['确认', '取消']
		  ,yes: function(){console.log('退出成功！')}
		});
	});
	
	//修改密码
	$('#modifyPass').on('click',function(){
		var msg ='<form class="layui-form bomb-form" action="" method="" id="modifyPassform">\
				      <div class="layui-form-item">\
					      <label class="layui-form-label" for="oldpass">旧密码：</label>\
					      <div class="layui-input-block">\
						      <input type="text" name="oldpass" placeholder="请输入密码" autocomplete="off" class="layui-input radius">\
						  </div>\
				      </div>\
				      <div class="layui-form-item">\
					      <label class="layui-form-label" for="newpass">新密码：</label>\
					      <div class="layui-input-block layui-ico">\
						      <input type="password" name="newpass" id="newpass" placeholder="请输入密码" autocomplete="off" class="layui-input radius">\
						      <i class="ico-global ico-eye"></i>\
						  </div>\
				      </div>\
				      <div class="layui-form-item">\
					      <label class="layui-form-label" for="checkpass">确认密码：</label>\
					      <div class="layui-input-block layui-ico">\
						      <input type="password" name="checkpass" id="checkpass" placeholder="请确认密码" autocomplete="off" class="layui-input radius">\
						      <i class="ico-global ico-eye"></i>\
						  </div>\
				      </div>\
				      <p class="error-box" id="error-box"></p>\
				    </form>';
		layer.open({
		  type: 1 
		  ,area: ['460px']
		  ,title: '修改密码'
		  ,maxmin: false
		  ,anim: 1 
		  ,move:false
		  ,content: msg
		  ,btn: ['确认']
		  ,success:function(layer){
		  	modifypassVali()
		  }
		  ,yes: function(){
		  	if($('#modifyPassform').valid()){
		  		console.log('验证通过！')
		  	}else{
		  		console.log('验证不通过！请重新验证')
		  	}
		  	
		  }
		});   
	});

	//修改密码校验
	function modifypassVali(){
		$('#modifyPassform').validate({
			rules:{
				oldpass:{
					required:true,
					minlength:6
				},
				newpass:{
					required:true,
					minlength:6
				},
				checkpass:{
					required:true,
					minlength:6,
					equalTo: "#newpass"
				}
			},
			messages:{
				oldpass:{
					required:"请输入密码",
					minlength:"密码长度不能小于6个字符"
				},
				newpass:{
					required:"请输入密码",
					minlength:"密码长度不能小于6个字符"
				},
				checkpass:{

					required:"请输入密码",
					minlength:"密码长度不能小于6个字符",
					equalTo:'两次密码输入不一致'
				}
			},
			submitHandler:function(form){
	            form.submit();
			},
			groups:{
				modPassword:'oldpass newpass checkpass'
			},
			errorPlacement:function(error,element){
				$('#error-box').append(error);
			},
			onfocusout:function(element){
				$(element).valid();
			},
			onsubmit:false,
			focusCleanup:true
		});
	}


	//更改密码状态
	var onOff = true;
	$('body').on('click','.ico-eye',function(){
		if(onOff){
			$(this).parent().addClass('checked');
			$(this).siblings('input').attr('type','text');
			onOff = false;
		}else{
			$(this).parent().removeClass('checked');
			$(this).siblings('input').attr('type','password');
			onOff = true;
		}
	});

	//自适应高度
	 reHeight2 ();
	 reHeight ();
	$(window).resize(function() {
	  reHeight2 ();
	  reHeight ();
	});

	//自适应高度
	function reHeight2 (){
	  var height = window.innerHeight - $('.header').height() -1;
	  $('.page-box').css({'height':height + 'px'})
	};
	function reHeight (){
	  var height = window.innerHeight - $('.header').height() -9;
	  $('.page-box-two').css({'height':height + 'px'})
	};


    //发布新闻
	$('#addNewsBtn').on('click',function(){
		var successMsg = '<div class="layer-tip layer-tip2"><i class="ico-global ico-ok"></i><p class="p2 mt-35">发布成功！</p></div>';
		var errorMsg = '<div class="layer-tip layer-tip2"><i class="ico-global ico-error"></i><p class="p2 mt-25">抱歉！发布失败，请重试！</p></div>';
		layer.open({
		  type: 1
		  ,area: ['460px']
		  ,title: ''
		  ,maxmin: false
		  ,move:false
		  ,anim: 1 
		  ,content: successMsg
		  ,btn: ['确认']
		  ,yes: function(){console.log('发布成功！')}
		});
	})

	//需求待处理
	$('.demandPending').on('click',function(){
		var tr = $(this).parents('tr').html();
		$('#demand-process').find('table tbody').prepend('<tr>'+ tr +'</tr>' ).find('.demandPending').removeClass('demandPending').addClass('demandAlready').text('已处理');
		$(this).parents('tr').remove();
	})
	//需求处理中
	$('.bd-box').on('click','.demandAlready',function(){
		var tr = $(this).parents('tr').html();
		$('#demand-already').find('table tbody').prepend('<tr>'+ tr +'</tr>' ).find('.demandAlready').removeClass('demandAlready').addClass('demandDel').text('删除');
		$(this).parents('tr').remove();
	})
	//需求已处理
	$('.bd-box').on('click','.demandDel',function(){
		var _this = $(this);
		layer.open({
			  type: 1
			  ,area: ['460px']
			  ,title: ' '
			  ,maxmin: false
			  ,anim: 1 
			  ,content:'<div class="layer-tip"><p class="p3">确定要删除此条数据吗？</p></div>'
			  ,btn: ['确认','取消']
			  ,yes: function(){
			  	_this.parents('tr').remove();
			  	layer.closeAll();
			  }
			});
	});


})