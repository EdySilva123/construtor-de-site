var host = window.location.host;
//Controller principal
admPanel.controller("admPanelController", function($scope){
	$scope.app_title = "Olá mundo";
});


//Controller dos links
admPanel.controller("linksController", function($scope, $http){


	$scope.enabled_links=[];
	$scope.disabled_links = [];


	//carrega os links ativos da página
	$scope.load_enabled_links = function(){
		$http.get("http://"+host+"/construtor-de-site/app/http/ajax_request.php?action=load-enabled-links").success(function(data){
			$scope.enabled_links=[];

			for(var i=0; i < data.length; i++){
				$scope.enabled_links.push(data[i]);
			}
		});
	};

	$scope.load_disabled_links = function(){
		$http.get("http://"+host+"/construtor-de-site/app/http/ajax_request.php?action=load-disabled-links").success(function(data){
			$scope.disabled_links=[];

			for(var i=0; i < data.length; i++){
				$scope.disabled_links.push(data[i]);
			}
		});
	};


	$scope.enable=function(event){

		var id_link = event.target.getAttribute('data-id');

		$http.get("http://"+host+"/construtor-de-site/app/http/ajax_request.php?action=enable-link&id-link="+id_link).success(function(data){
			if(data == 1){
				// alert("Link habilitado com com sucesso!");
				$scope.load_enabled_links();
				$scope.load_disabled_links();
			}
		});

	};


	$scope.disable=function(event){

		var id_link = event.target.getAttribute('data-id');

		$http.get("http://"+host+"/construtor-de-site/app/http/ajax_request.php?action=disable-link&id-link="+id_link).success(function(data){
			if(data == 1){
				// alert("Link desabilitado com sucesso!");
				$scope.load_disabled_links();
				$scope.load_enabled_links();
			}
		});

	};





	$scope.load_enabled_links();
	$scope.load_disabled_links();

});

//Controller das notícias
admPanel.controller("noticiasController", function($scope, $http){

	$scope.enabled_notices = [];
	$scope.disabled_notices = [];


	$scope.load_enabled_notices=function(){
		$http.get("http://"+host+"/construtor-de-site/app/http/ajax_request.php?action=load-enabled-notices").success(function(data){
			$scope.enabled_notices=[];
			for (var i = 0; i < data.length; i++) {
				$scope.enabled_notices.push(data[i]);
			}
		});
	};

	$scope.load_disabled_notices=function(){
		$http.get("http://"+host+"/construtor-de-site/app/http/ajax_request.php?action=load-disabled-notices").success(function(data){
			$scope.disabled_notices=[];
			for (var i = 0; i < data.length; i++) {
				$scope.disabled_notices.push(data[i]);
			}
		});
	};


	$scope.disable=function(event){
		var id = event.target.getAttribute('data-id');
			$http.get("http://"+host+"/construtor-de-site/app/http/ajax_request.php?action=disable-notice&id_notice="+id).success(function(data){
				$scope.load_enabled_notices();
				$scope.load_disabled_notices();
			});
	};

	$scope.enable=function(event){
		var id =  event.target.getAttribute('data-id');
		$http.get("http://"+host+"/construtor-de-site/app/http/ajax_request.php?action=enable-notice&id_notice="+id).success(function(data){
				$scope.load_enabled_notices();
				$scope.load_disabled_notices();
			});
	};

	$scope.delete=function(event){
		var id =  event.target.getAttribute('data-id');
		$http.get("http://"+host+"/construtor-de-site/app/http/ajax_request.php?action=delete-notice&id_notice="+id).success(function(data){
				// $scope.load_enabled_notices();
				$scope.load_disabled_notices();
			});
	};

	$scope.add_notice=function(noticia){
		$http.get("http://"+host+"/construtor-de-site/app/http/ajax_request.php?action=add-noticia&titulo="+noticia.titulo+"&conteudo="+noticia.conteudo).success(function(data){
			if(data == 1){
				$scope.load_enabled_notices();
			}

			delete noticia;
		});
	};



	$scope.load_enabled_notices();
	$scope.load_disabled_notices();

});



//controler dos posts

admPanel.controller("postController", function($scope, $http){

	$scope.enabled_posts=[];
	$scope.disabled_posts=[];


	$scope.load_enabled_posts=function(){
		$http.get("http://"+host+"/construtor-de-site/app/http/ajax_request.php?action=load-enabled-posts").then(function(response){
			$scope.enabled_posts=[];
			for(var i=0; i<response.data.length; i++){
				$scope.enabled_posts.push(response.data[i]);
			}
		});
	};

	$scope.load_disabled_posts=function(){
		$http.get("http://"+host+"/construtor-de-site/app/http/ajax_request.php?action=load-disabled-posts").then(function(response){
			$scope.disabled_posts=[];
			for(var i=0; i<response.data.length; i++){
				$scope.disabled_posts.push(response.data[i]);
			}
		});
	};

	$scope.disable=function(event){
		var id = event.target.getAttribute('data-id');
		$http.get("http://"+host+"/construtor-de-site/app/http/ajax_request.php?action=disable-post&id-post="+id).then(function(response){
			$scope.load_enabled_posts();
			$scope.load_disabled_posts();
		});
	};

	$scope.enable=function(event){
		var id = event.target.getAttribute('data-id');
		$http.get("http://"+host+"/construtor-de-site/app/http/ajax_request.php?action=enable-post&id-post="+id).then(function(response){
			$scope.load_enabled_posts();
			$scope.load_disabled_posts();
		});
	};

	$scope.add_post=function(post){
		var str=[], checkBox = document.querySelector('input[name=adiciona-site]');
		for(var i in post){
			if(i != 'ativo'){
				str.push(i+'='+(post[i]));
			}
		};// fim do loop for

		var c = (checkBox.checked) ? 1 : 0;
		str.push('flg_ativo='+c);

		$http.get("http://"+host+"/construtor-de-site/app/http/ajax_request.php?action=add-post&"+str.join('&')).then(function(response){
			$scope.load_enabled_posts();
			$scope.load_disabled_posts();
			console.log(response.data);
		});	

	



		// console.log(str.join('&'));
	};


	$scope.load_enabled_posts();
	$scope.load_disabled_posts();

});



admPanel.controller("textController", function($scope, $http){
	$scope.texts = {};

	$scope.load_texts = function(){
		$scope.texts={};
		$http.get("http://"+host+"/construtor-de-site/app/http/ajax_request.php?action=load-texts").then(function(response){
			$scope.texts=response.data;
			console.log(response.data);
		});	

	};

	$scope.save_text=function(t){
		$http.get("http://"+host+"/construtor-de-site/app/http/ajax_request.php?action=change-texts&texto_topo="+t.texto_topo).then(function(response){
			// $scope.texts=response.data;
			// $scope.load_texts();
			console.log(response.data);

			if(response.data == 1){
				alert("Texto Alterado!");
			}
		});	
	};

	$scope.load_texts();

});
