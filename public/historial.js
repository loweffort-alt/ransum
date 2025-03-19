$(document).ready(function() {

	let $local = {
		$tablaHistorial : $("#tablaHistorial"),
		tablaHistorial : "",
		$generarPDF : $("#btnDescargar")
	};

	$.fn.dataTable.ext.errMode = 'none';

	//let botones = [];
	function crearTablaEvaluaciones(dtBotones, criterio,facultad,escuela,anioIngreso) {
		if ($.fn.dataTable.isDataTable('#tablaHistorial')) {
			$local.tablaHistorial.clear().draw();
			$local.$tablaHistorial.DataTable().destroy();
			$local.$tablaHistorial.empty();
		}

		let tabla = {
			"language": {
				"emptyTable": "No se encontraron evaluaciones."
			},
			"initComplete": function() {
				$local.$tablaHistorial.wrap("<div class='table-responsive'></div>");
			},
			"columnDefs": [{
				"targets": [0, 1, 2, 3, 4, 5, 6, 7],
				"className": "text-center",
			}],
			"ordering": false,
			"paging": false,
			//"searching": false,
			"columns": [{
				"data": 'ciclo',
				"width": '5%',
				"title": 'Ciclo'
			}, {
				"data": 'codPlan',
				"width": '5%',
				"title": 'Plan'
			}, {
				"data": 'codTipoAsignatura',
				"width": '5%',
				"title": 'Tipo'
			}, {
				"data": function (row) {
					return row.codAsignatura + " - " + row.desAsignatura;
				},
				"width": '45%',
				"className": "text-left",
				"title": 'Asignatura'
			}, {
				"data": function (row) {
					if (row.calificacion < 0) {
						return "";
					} else if (escuela>=400){
						let minimo = anioIngreso < 2019 ? 11 : anioIngreso > 2023 ? 14 : 13;
						// Si es Medicina y el Año Ingreso es >= 2018, ajusta el mínimo
						if (facultad==1 && anioIngreso >= 2018) minimo = 13;

						// Validar la calificación según el mínimo determinado
						return row.calificacion < minimo
							? '<span class="label-danger">' + row.calificacion + '</span>'
							: '<span class="label-primary">' + row.calificacion + '</span>';

					}else{
						if (criterio) {
							if (row.calificacion < 13) {
								return '<span class="label-danger">' + row.calificacion + '</span>'
							} else {
								return '<span class="label-primary">' + row.calificacion + '</span>'
							}
						} else {
							if (row.calificacion < 10.500) {
								return '<span class="label-danger">' + row.calificacion + '</span>'
							} else {
								return '<span class="label-primary">' + row.calificacion + '</span>'
							}
						}
					}
				},
				"width": '5%',
				"title": 'Calificación'
			}, {
				"data": 'creditos',
				"width": '5%',
				"title": 'Créditos'
			}, {
				"data": 'codSeccion',
				"width": '5%',
				"title": 'Sección'
			}, {
				"data": function (row) {
					if (row.codTipoActa === 'C') {
						return row.codTipoActa + " - " + row.numResConv;
					} else {
						return row.codTipoActa + " - " + row.numActa;
					}
				},
				"width": '25%',
				"title": 'Acta'
			}],
			"createdRow": function(row, data, dataIndex){
				//console.log(data);
				if (data.codFacultad == undefined) {
					// Add COLSPAN attribute
					$('td:eq(0)', row).attr('colspan', 8);
					$('td:eq(0)', row).css({
						"background": 'rgb(101, 88, 211, 0.15)',
						"color": '#6558d3',
						"font-weight": 'bolder',
						"text-align": 'left',
						"padding": '8px'
					});
					$('td:eq(1)', row).css('display', 'none');
					$('td:eq(2)', row).css('display', 'none');
					$('td:eq(3)', row).css('display', 'none');
					$('td:eq(4)', row).css('display', 'none');
					$('td:eq(5)', row).css('display', 'none');
					$('td:eq(6)', row).css('display', 'none');
					$('td:eq(7)', row).css('display', 'none');
					let semestre = data.codSemestre.substring(0, 4) + "-" + data.codSemestre.substring(4);
					this.api().cell($('td:eq(0)', row)).data('PERIODO ACADÉMICO ' + semestre);
				}

			},
			"dom": 'Bfrtip',
			"buttons": dtBotones
		};

		$local.tablaHistorial = $local.$tablaHistorial.DataTable(tabla);
	};

	$.ajax({
		type: "GET",
		url: $variableUtil.root + "v2/informacion/historial?accion=obtenerHistorialAcademico",
		//data: criterioBusqueda,
		beforeSend: function(xhr) {
			crearTablaEvaluaciones([], false,0,0,0);
		},
		success: function(response) {
			//console.log(response);
			let historial = response.data.historial;
			let creditos = response.data.creditaje;
			let criterio = response.data.criterioCalificacion;
			let promedios = response.data.promedios;
			let facultad=response.data.facultad;
			let escuela=response.data.escuela;
			let anioIngreso=response.data.anioIngreso;
			if (historial.length === 0) {
				$funcionUtil.notificarException("No se encontró historial académico.",
					"fa-triangle-exclamation", "Aviso", "info");
				return;
			}
			if (creditos !== null) {
				$("#spCredTotal").text(creditos.credTotalPlan);
				$("#spCredAprob").text(creditos.credTotalAprob);
				$("#spCredObli").text(creditos.totalCredObli);
				$("#spCredEsp").text(creditos.totalCredEsp);
				$("#spCredEle").text(creditos.totalCredEle);
				$("#spCredEleEsp").text(creditos.totalCredEleEsp);
				$("#spCredOpt").text(creditos.totalCredOpt);
				$("#spCredAlt").text(creditos.totalCredAlt);
				$("#spCredOtraEsp").text(creditos.credAproOtraEsp);
				$("#spCredDup").text(creditos.credAproDuplicados);
				$("#spCredOtros").text(creditos.credAproOtros);
				$("#spCredFaltante").text(creditos.credFaltante);
				$("#spPromedio").text(creditos.promPonderado);
				if (criterio) {
					if (creditos.promPonderado < 13) {
						$("#spPromedio").removeClass("label-success");
						$("#spPromedio").addClass("label-danger");
					} else {
						$("#spPromedio").removeClass("label-danger");
						$("#spPromedio").addClass("label-success");
					}
				} else {
					if (creditos.promPonderado < 10.500) {
						$("#spPromedio").removeClass("label-success");
						$("#spPromedio").addClass("label-danger");
					} else {
						$("#spPromedio").removeClass("label-danger");
						$("#spPromedio").addClass("label-success");
					}
				}
			}

			let botonPdf = [{
				"text": '<i class="fa-regular fa-file-pdf"></i> Descargar',
				"className": 'btn btn-danger exportarPDF',
				"titleAttr": 'exportar en PDF'
			} ];
			crearTablaEvaluaciones(botonPdf, criterio,facultad,escuela,anioIngreso);

			let listSemestres = [];
			let listPromedios = [];
			$.each(promedios, function(i, p) {
				let sem = this.semestre.substring(0, 4) + "-" + this.semestre.substring(4);
				listSemestres.push(sem);
				listPromedios.push(this.promedio.toFixed(3));
			});
			cargarGrafico(listSemestres, listPromedios);
			let semestre = "";
			$.each(historial, function(i, hist) {
				if (hist.codSemestre !== semestre) {
					$local.tablaHistorial.row.add({
						"codSemestre": hist.codSemestre
					}).draw();
					$local.tablaHistorial.row.add(hist).draw();
					semestre = hist.codSemestre;
				} else {
					$local.tablaHistorial.row.add(hist).draw();
				}
			});
		},
		complete : function() {

		}
	});

	function cargarGrafico (semestres, promedios) {
		let options = {
			series: [{
				name: "Prom. Ponderado",
				data: promedios
			}],
			chart: {
				height: 400,
				type: 'line',
				zoom: {
					enabled: false
				}
			},
			dataLabels: {
				enabled: false
			},
			stroke: {
				curve: 'smooth'
			},
			title: {
				text: 'Gráfico del comparación entre Periodo Académico y el Promedio Ponderado',
				align: 'left'
			},
			grid: {
				row: {
					colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
					opacity: 0.5
				},
			},
			xaxis: {
				categories: semestres,
				title: {
					text: 'Periodos'
				}
			},
			yaxis: {
				title: {
					text: 'Promedios'
				}
			}
		};

		let chart = new ApexCharts(document.querySelector("#chart"), options);
		chart.render();
	}

	$(document).on('click', '.exportarPDF', function() {
		window.open($variableUtil.root + "v2/informacion/historial?accion=exportar");
	});
	
});