$(document).ready(function() {

	let $local = {
		$generarPDF : $("#btnDescargar"),
		$foto : ""
	};

	const labels = document.querySelectorAll(".accordion-item__label");
	const tabs = document.querySelectorAll(".accordion-tab");

	function toggleShow() {
		const target = this;
		const item = target.classList.contains("accordion-tab")
			? target
			: target.parentElement;
		const group = item.dataset.actabGroup;
		const id = item.dataset.actabId;

		tabs.forEach(function(tab) {
			if (tab.dataset.actabGroup === group) {
				if (tab.dataset.actabId === id) {
					tab.classList.add("accordion-active");
				} else {
					tab.classList.remove("accordion-active");
				}
			}
		});

		labels.forEach(function(label) {
			const tabItem = label.parentElement;

			if (tabItem.dataset.actabGroup === group) {
				if (tabItem.dataset.actabId === id) {
					tabItem.classList.add("accordion-active");
				} else {
					tabItem.classList.remove("accordion-active");
				}
			}
		});
	}

	labels.forEach(function(label) {
		label.addEventListener("click", toggleShow);
	});

	tabs.forEach(function(tab) {
		tab.addEventListener("click", toggleShow);
	});

	$local.$foto = $("#foto").attr('src');
	//console.log($local.$foto);

	$.ajax({
		type: "GET",
		url: $variableUtil.root + "v2/informacion/perfil?accion=obtenerInformacionAlumno",
		//data: criterioBusqueda,
		beforeSend: function(xhr) {
		},
		success: function(response) {
			let perfil = response.data;
			//console.log(perfil);
			$("#spDni").text(perfil.tipoDocumento + " - " + perfil.numDocumento)
			$("#spEstadoCivil").text(perfil.estadoCivil)
			$("#spSexo").text(perfil.desSexo)
			if ($local.$foto === "/image/hombre_no_profile.png") {
				if (perfil.codSexo == "F") {
					$("#foto").attr("src","/image/mujer_no_profile.png");
				} else {
					$("#foto").attr("src","/image/hombre_no_profile.png");
				}
			}
			$("#spFechaNac").text(perfil.fechaNacimiento)
			$("#spLugarNac").text(perfil.departamentoNac + " / " + perfil.provinciaNac + " / " + perfil.distritoNac)
			$("#spTelefono").text(perfil.telefono)
			$("#spCelular").text(perfil.celular)
			$("#spCorreoInst").text(perfil.correoInstitucional)
			$("#spCorreoPers").text(perfil.correoPersonal)
			$("#spDomicilio").text(perfil.departamentoDir + " / " + perfil.provinciaDir + " / " + perfil.distritoDir)
			$("#spDireccion").text(perfil.direccion)

			$("#spAnioIngreso").text(perfil.anioIngreso)
			$("#spModIngreso").text(perfil.codTipoIngreso + " - " + perfil.desTipoIngreso)
			$("#spColeProc").text(perfil.desColegioProc)
			$("#spAnioEstudio").text(perfil.anioEstudio)
			$("#spPromedio").text(perfil.promedio)
			if (perfil.promedio < 10.5) {
				$("#spPromedio").addClass("label-danger");
			} else {
				$("#spPromedio").addClass("label-primary");
			}
			$("#spSituacion").text(perfil.situAcademica)
			if (perfil.situAcademica == "Regular") {
				$("#spSituacion").addClass("label-success");
			} else {
				$("#spSituacion").addClass("label-danger");
			}
			$("#spPermanencia").text(perfil.permanencia)
			switch (perfil.permanencia) {
				case "Egresado": $("#spPermanencia").addClass("label-primary");
					break;
				case "Inactivo": $("#spPermanencia").addClass("label-danger");
					break;
				case "Activo": $("#spPermanencia").addClass("label-success");
					break;
				default: $("#spPermanencia").addClass("label-default");
			}
			$("#spSemUltMat").text(perfil.codSemUltMat)
			$("#spPromUltMat").text(perfil.promUltMat)
			if (perfil.promUltMat < 10.5) {
				$("#spPromUltMat").addClass("label-danger");
			} else {
				$("#spPromUltMat").addClass("label-success");
			}

		},
		complete : function() {

		}
	});

	$local.$generarPDF.on("click", function() {
		//window.location.href = $variableUtil.root + "prematricula/reportes?accion=exportar&" + paramCriterioBusqueda;
		window.open($variableUtil.root + "v2/informacion/perfil?accion=exportar");
	});
	
});