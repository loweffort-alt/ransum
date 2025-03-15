$(document).ready(function() {

	$(".perfil").on('click', function() {
		window.location.href = $variableUtil.root + "v2/informacion/perfil";
	});

	$(".historial").on('click', function() {
		window.location.href = $variableUtil.root + "v2/informacion/historial";
	});

	$(".matricula").on('click', function() {
		window.location.href = $variableUtil.root + "v2/matricula/informacion";
	});

	$(".programacion").on('click', function() {
		window.location.href = $variableUtil.root + "v2/matricula/programacion";
	});

	$(".Rep_prematricula").on('click', function() {
		window.location.href = $variableUtil.root + "v2/reportes/prematricula";
	});

	$(".Rep_matricula").on('click', function() {
		window.location.href = $variableUtil.root + "v2/reportes/matricula";
	});

	$(".Rep_deudas").on('click', function() {
		window.location.href = $variableUtil.root + "v2/reportes/deudas";
	});

	$(".plan").on('click', function() {
		window.location.href = $variableUtil.root + "v2/planEstudios";
	});

	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	});

	//timeout
	$('.timer').startTimer({
		onComplete: function(){
			let user = $("#userSession").val();
			alert('La sesión ha caducado!');
			window.location =  $variableUtil.root + 'logout?us='+user;
      	}
    });

});

let $loader = document.querySelector('.loader')

window.onload = function() {
  	$loader.classList.remove('loader--active')
};

/*
document.querySelector('.open-menu').addEventListener('click', function () {
  	$loader.classList.add('loader--active')
  
  	window.setTimeout(function () {
    	$loader.classList.remove('loader--active')
  	}, 5000)
})

*/

