
var $funcionUtil = {};
var $variableUtil = {};
var $tablaFuncion = {};

$(document).ready(function() {
	// Aviso: Ocurrió un error no identificado.
	var path = location.pathname;
	$('.x-navigation li').find("a").filter(function() {
		return $(this).attr('href') === path;
	}).parent("li").addClass('active').parents("li.xn-openable").addClass("active");

	$variableUtil = {
		container : $(".layout .layout"),
		csrf : $('meta[name=_csrf]').attr("content"),
		root : $("meta[name='root']").attr("content"),
		botonEligirSeccion : "<button class='btn btn-sm btn-warning elegirSeccion' data-tooltip='Elegir sección' data-tooltip-location='left'><i class='fas fa-hand-pointer'></i></button>",
		botonEliminarSeccion : "<button class='btn btn-sm btn-danger eliminarSeccion' data-tooltip='Eliminar Sección' data-tooltip-location='left'><i class='fas fa-trash'></i></button>",
		botonEligirGrupo : "<button class='btn btn-sm btn-warning elegirGrupo' data-tooltip='Elegir Grupo'><i class='fas fa-hand-pointer'></i></button>",
		botonEliminarGrupo : "<button class='btn btn-sm btn-danger eliminarGrupo' data-tooltip='Eliminar Grupo'><i class='fas fa-trash'></i></button>",
		botonHorarios : "<button class='btn btn-sm btn-warning mostrarHorarios' data-tooltip='Mostrar horarios' data-tooltip-location='left'><i class='fas fa-calendar-alt'></i></button>",
		botonAsistencias : "<a href='#mant' class='btn btn-sm btn-warning verAsistencias' data-tooltip='Ver Asistencias' data-tooltip-location='left'><i class='fa-solid fa-calendar-check'></i></a>",

		botonEliminar : "<button class='btn btn-sm btn-danger eliminar' data-tooltip='Eliminar' data-tooltip-location='left'><i class='fa fa-trash'></i></button>",
		botonActualizar : "<button class='btn btn-sm btn-primary actualizar' data-tooltip='Modificar' data-tooltip-location='left'><i class='fa fa-edit'></i></button>",
		botonExportarPDF : "<button class='btn btn-sm btn-outline-danger exportar-pdf' data-tooltip='Ver Acta'><i class='fas fa-file-pdf'></i></button>",
		botonExportarDocx : "<button class='btn btn-xs btn-primary exportar-docx' title='Exportar .DOCX'><i class='fa fa-file-word'></i></button>",
		botonDeclaracionJurada : "<button class='btn btn-sm btn-primary verDeclaracion' data-tooltip='Ver Declaración Jurada' data-tooltip-location='left'><i class='fa-solid fa-file'></i></button>",
		botonVerDetalle : "<button class='btn btn-sm btn-info ver-detalle' data-tooltip='Ver Acta' data-tooltip-location='left'><i class='fas fa-eye'></i></button>",
		botonVerSesion : "<button class='btn btn-sm btn-info sesiones' data-tooltip='Ver Sesiones' data-tooltip-location='left'><i class='fas fa-eye'></i></button>",
		botonVerTutoria : "<button class='btn btn-sm btn-info ver-detalle' data-tooltip='Ver Sesion' data-tooltip-location='left'><i class='fas fa-eye'></i></button>",
		tableBotonExportarXlsx : "<button id='exportarXlsx' class='btn btn-success pull-right input-sm' type='button'><i class='fa fa-download'></i> XLSX</button>",
		
		registroExitoso : "Se registró correctamente",
		asignacionExitosa : "Se asignaron los recursos exitosamente",
		busquedaFueraAmbito : "No se han encontrado resultados para su búsqueda o se encuentra fuera de ámbito.",
		busquedaSinResultados : "No se han encontrado resultados para su búsqueda. Pruebe diferentes opciones o filtros.",
		cambioContrasenia : "<strong>¡Cuidado!</strong> Cambie su contraseña, sino sera bloqueado",
		actualizacionExitosa : "Se actualizó correctamente",
		accionEliminado : "eliminado(a)",
		accionActualizado : "actualizado(a)",
		filtrable : "filtrable",
		noFiltrable : "noFiltrable",
		seleccionable : "seleccionable",
		idFilaFiltro : "filaFiltro",
		claseEncabezadoFiltros : "encabezadoFiltro",
		claseDataNoDefinida : "data-no-definida",
		claseDataVacia : "data-vacia",
		claseInsertableOpcionesHtml : "insertable-opciones-html",
		arregloSiNo : [ "0", "1" ],
		camposVacios : "Debe escoger algún Filtro para poder realizar la Búsqueda",
	};

	$funcionUtil = {
		aniadirRadioButton : function(name, value, texto, checked) {
			var id = value;
			var element = 	'<div class="">' +
				  				'<input class="option-input radio" type="radio" name="' + name + '" id="elegir' + id + '" value="' + value + '" '+checked+'>' +
						  		'<label class="form-check-label" for="elegir">' + texto + '</label>' +				   
							'</div>';
			return element;
		},
		aniadirTitleParaTooltip : function($element, titulo) {
			$element.attr({
				"title" : titulo,
				"data-original-title" : titulo
			});
		},		
		construirNotEqual : function(name, argumentos) {
			var clause = '';
			for (var i = 0; i < argumentos.length; i++) {
				clause = clause + '[' + name + '!=\'' + argumentos[i] + '\']';
			}
			return clause;
		},
		construirEqual : function(name, argumentos) {
			var clause = '';
			for (var i = 0; i < argumentos.length; i++) {
				clause = clause + '[' + name + '=\'' + argumentos[i] + '\'],';
			}
			if (clause != '') {
				return clause.slice(0, -1);
			}
			return clause;
		},
		obtenerMensajeError : function(mensajeInicial, mensajeError, accion) {
			var mensaje = mensajeInicial || "";
			switch (mensajeError.codigo_error) {
			case 547:
				return mensaje += " no puede ser " + accion + ", porque est&aacute; siendo usado(a) actualmente.";
			default:
				return "Ocurrió un problema desconocido.";
			}
		},
		notificarException : function(mensaje, icon, titulo, tipo) {
			$.notify({
				icon : "fa " + icon,
				title : " <strong>" + titulo + ": </strong>",
				message : "<p>" + mensaje + "</p>"
			}, {
				delay : 6000,
				type : tipo
			})
		},
		notificarExceptionPermanente : function(mensaje, icon, titulo, tipo) {
			$.notify({
				icon : "fa " + icon,
				title : " <strong>" + titulo + ": </strong>",
				message : "<p>" + mensaje + "</p>"
			}, {
				delay : 60000,
				type : tipo
			})
		},
		notificarException_15s : function(mensaje, icon, titulo, tipo) {
			$.notify({
				icon : "fa " + icon,
				title : " <strong>" + titulo + ": </strong>",
				message : "<p>" + mensaje + "</p>"
			}, {
				delay : 15000,
				type : tipo
			})
		},
		insertarEtiquetaSiNo : function(valor_booleano) {
			switch (true) {
			case (valor_booleano == "0" || valor_booleano == "NO" || valor_booleano == false):
				return $variableUtil.$labelDanger.text("NO").get(0).outerHTML;
			case (valor_booleano == "1" || valor_booleano == "SI" || valor_booleano == true):
				return $variableUtil.$labelSuccess.text("SI").get(0).outerHTML;
			default:
				return "-";
			}
		},
		insertarBoolNumerico : function(cuenta_compensacion) {
			switch (cuenta_compensacion) {
			case 0:
				return $variableUtil.$labelPrimary.text("NO").get(0).outerHTML;
			case 1:
				return $variableUtil.$labelPrimary.text("SI").get(0).outerHTML;
			default:
				return $variableUtil.$labelPrimary.text("No Especificado").get(0).outerHTML;
			}
		},
		limpiarMensajesDeError : function(formulario) {
			formulario.find(".form-group, .group").removeClass("has-error").find(".help-block").remove();
		},
		mostrarMensajeDeError : function(mensajesDeError, formulario) {
			var notificacionMensajeError = [];
			$.each(mensajesDeError, function(i, mensaje) {
				var idSpanError = mensaje.campoError + "-error";
				var input = formulario.find("input[name=" + mensaje.campoError + "], select[name=" + mensaje.campoError + "], textarea[name=" + mensaje.campoError + "]").first();
				if (input.length > 0) {
					if (input.parent(".input-group").length > 0 || input.parent(".radio-inline").length > 0) {
						input.attr({
							"aria-required" : true,
							"aria-describedby" : idSpanError,
							"aria-invalid" : true
						}).parent().parent().append("<span id='" + idSpanError + "' class='help-block'>" + mensaje.mensajeError + "</span>").parents(".group, .form-group").first().addClass("has-error");
					} else {
						input.attr({
							"aria-required" : true,
							"aria-describedby" : idSpanError,
							"aria-invalid" : true
						}).parent().append("<span id='" + idSpanError + "' class='help-block'>" + mensaje.mensajeError + "</span>").parents(".group, .form-group").first().addClass("has-error");
					}
				} else {
					notificacionMensajeError.push(mensaje.mensajeError);
				}
			});
			if (notificacionMensajeError.length > 0) {
				this.notificarException(notificacionMensajeError.join(".<br/>"), "fa-exclamation-triangle", "Aviso", "warning");
			}
		},
		llenarFormulario : function(dto, formulario) {
			$.each(dto, function(i, value) {
				var input = formulario.find("input[name=" + i + "], select[name=" + i + "], textarea[name=" + i + "]");
				if (input.is(":checkbox")) {
					input.prop("checked", (value == "S" || value == "1" || value == "true" || value == "Sí"));
				} else if (input.is(":radio")) {
					input.filter("[value=" + value + "]").prop('checked', true);
				} else {
					input.val(value);
				}
				if (input.hasClass("select2")) {
					input.val(value).trigger("change.select2");
				}
			});
		},
		limpiarCamposFormulario : function(formulario) {
			formulario.trigger("reset");
			formulario.find(".select2").val("").trigger("change.select2");
		},
		prepararFormularioRegistro : function(formulario) {
			formulario.find(".elemento-desactivable").prop("disabled", false);
			this.limpiarCamposFormulario(formulario);
			this.limpiarMensajesDeError(formulario);
			formulario.validate().resetForm();
		},
		prepararFormularioRegistro2 : function(formulario) {
			formulario.find(".elemento-desactivable").prop("disabled", false);
			formulario.validate().resetForm();
		},
		prepararFormularioActualizacion : function(formulario) {
			formulario.find(".elemento-desactivable").prop("disabled", true);
			this.limpiarMensajesDeError(formulario);
			formulario.validate().resetForm();
		},
		prepararFormularioActualizacion2 : function(formulario) {
			formulario.find(".elemento-desactivable").prop("disabled", true);
			this.limpiarMensajesDeError(formulario);
			//formulario.validate().resetForm();
		},
		obtenerMensajeErrorEnCadena : function(mensajesDeError) {
			var mensajeCadena = "";
			$.each(mensajesDeError, function(i, mensaje) {
				mensajeCadena += mensaje.mensajeError + "<br/>";
			});
			return mensajeCadena;
		},
		filaFiltro : function() {
			return "<tr id='" + $variableUtil.idFilaFiltro + "'></tr>"
		},
		encabezadoFiltro : function() {
			return "<th class='" + $variableUtil.claseEncabezadoFiltros + "'></th>"
		},
		unique : function(array) {
			return $.grep(array, function(el, index) {
				return index === $.inArray(el, array);
			});
		},
		unirCodigoDescripcion : function(codigo, descripcion) {
			if (codigo == null || codigo == undefined) {
				codigo = "";
			}
			if (descripcion == null || descripcion == undefined) {
				descripcion = "";
			}
			return codigo + " - " + descripcion;
		},
		crearSelect2 : function(select, textoPorDefecto) {
			var propiedad = {
				placeholder : textoPorDefecto,
				language : {
					noResults : function() {
						return "No se encontró resultados";
					}
				},
				"width" : "100%",
				"selectionCssClass" : "error-test",
				"theme" : "bootstrap",
				"dropdownAutoWidth" : true,
				"dropdownParent" : select.parent()
			};
			if (textoPorDefecto != undefined && textoPorDefecto != null) {
				propiedad.placeholder = textoPorDefecto;
			}
			if (select.hasClass("encabezado")) {
				propiedad.containerCssClass = ":all:";
			}
			select.select2(propiedad);
		},
		templateResult : function(data) {
			return $funcionUtil.unirCodigoDescripcion(data.id, data.text);
		},
		templateSelection : function(data) {
			if (data.id == "") {
				return "";
			} else 
			return $funcionUtil.unirCodigoDescripcion(data.id, data.text);
		},
		crearDatePickerSimple : function(input, format) {
			format = format || "DD/MM/YYYY";
			input.daterangepicker({
				"singleDatePicker" : true,
				"showDropdowns" : true,
				"locale" : {
					direction : 'ltr',
					format : format,
					separator : ' - ',
					customRangeLabel : 'Personalizado',
					daysOfWeek : [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
					monthNames : [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
					firstDay : 1
				}
			}, function(start, end, label) {
			});
		},
		crearDateRangePickerSimple : function(input) {
			input.daterangepicker({
				"alwaysShowCalendars" : true,
				"ranges" : {
					'Hoy' : [ moment(), moment() ],
					'Ayer' : [ moment().subtract(1, 'days'), moment().subtract(1, 'days') ],
					'Últimos 07 días' : [ moment().subtract(6, 'days'), moment() ],
					'Últimos 30 días' : [ moment().subtract(29, 'days'), moment() ],
					'Este mes' : [ moment().startOf('month'), moment().endOf('month') ],
					'Último mes' : [ moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month') ]
				},
				"startDate" : moment(),
				"endDate" : moment(),
				"opens" : "left",
				"locale" : {
					direction : 'ltr',
					format : 'DD/MM/YYYY',
					separator : ' - ',
					applyLabel : 'Aplicar',
					cancelLabel : 'Cancelar',
					fromLabel : 'Desde',
					toLabel : 'A',
					customRangeLabel : 'Personalizado',
					daysOfWeek : [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
					monthNames : [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
					firstDay : 1
				},
				"maxDate" : moment()
			}, function(start, end, label) {
			});
		},
		animacionAjax : function($button) {
			var $this = this;
			$(document).ajaxStart(function() {
				$this.animacionBusqueda($button);
				console.log("Start");
			}).ajaxStop(function() {
				$this.animacionBusqueda($button);
				console.log("Stop");
			});
		},
		animacionBusqueda : function($boton, action, callback) {
			if (!$boton.hasClass("refreshing")) {
				$boton.addClass("refreshing");
				$boton.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw")
				if (action && action === "shown" && typeof callback === "function")
					callback();
			} else {
				$boton.removeClass("refreshing");
				$boton.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
				if (action && action === "hidden" && typeof callback === "function")
					callback();
			}
		},
		crearDateRangePickerConsulta : function(input) {
			input.daterangepicker({
				"alwaysShowCalendars" : true,
				"ranges" : {
					'Hoy' : [ moment(), moment() ],
					'Ayer' : [ moment().subtract(1, 'days'), moment().subtract(1, 'days') ],
					'Últimos 07 días' : [ moment().subtract(6, 'days'), moment() ],
					'Últimos 30 días' : [ moment().subtract(29, 'days'), moment() ],
					'Este mes' : [ moment().startOf('month'), moment().endOf('month') ],
					'Último mes' : [ moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month') ]
				},
				"autoUpdateInput" : false,
				"opens" : "left",
				"locale" : {
					direction : 'ltr',
					format : 'DD/MM/YYYY',
					separator : ' - ',
					applyLabel : 'Aplicar',
					cancelLabel : 'Limpiar',
					fromLabel : 'Desde',
					toLabel : 'A',
					customRangeLabel : 'Personalizado',
					daysOfWeek : [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
					monthNames : [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
					firstDay : 1
				},
				"maxDate" : moment()
			}, function(start, end, label) {
			});
			input.on('apply.daterangepicker', function(ev, picker) {
				$(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
			});
			input.on('cancel.daterangepicker', function(ev, picker) {
				$(this).val('');
			});
		},
		obtenerFechasDateRangePicker : function(input) {
			var rangoFecha = {};
			if (input.val() == undefined || input.val() == "") {
				rangoFecha.fechaInicio = "";
				rangoFecha.fechaFin = "";
				return rangoFecha;
			}
			rangoFecha.fechaInicio = input.data("daterangepicker").startDate.format('YYYY-MM-DD');
			rangoFecha.fechaFin = input.data("daterangepicker").endDate.format('YYYY-MM-DD');
			return rangoFecha;
		},
		convertirDeFormatoAFormato : function(fecha, formatoOrigen, formatoFinal) {
			return moment(fecha, formatoOrigen).format(formatoFinal);
		},
		camposVacios : function(formulario) {
			var camposVacios = true;
			formulario.find(".filtro").each(function() {
				var campo = $(this);
				var valorCampo = "";
				if (campo.is(":radio") && !campo.is(":checked")) {
					valorCampo = "";
				} else {
					valorCampo = campo.val();
				}
				if (valorCampo != undefined && valorCampo != "" && valorCampo != '-1') {
					camposVacios = false;
					return camposVacios;
				}
			});
			return camposVacios;
		},
		descripcionLarga : function(txt) {
			$('[data-tooltip="tooltip"]').tooltip({
				placement : 'top',
				title : txt
			});
		}
	};

	$tablaFuncion = {
		aniadirBotonEnTabla : function(elemento, boton, lugar) {
			if (lugar == $variableUtil.posIzquierdo) {
				elemento.append(boton);
				elemento.find("label").addClass("margin-left-2");
			} else if (lugar == $variableUtil.posDerecho) {
				elemento.prepend(boton);
				elemento.find("button").addClass("margin-left-2");
			}
		},
		aniadirFiltroAlSeleccionable : function(select, filtro) {
			if (filtro == "0") {
				filtro = "NO";
			} else {
				if (filtro == "1") {
					filtro = "SI";
				}
			}
			select.append("<option value='" + filtro + "'>" + filtro + "</option>");
		},
		aniadirFiltroBusquedaCajaTexto : function(encabezadoTabla, encabezadoFiltros) {
			encabezadoFiltros.html('<input type="text" placeholder="' + encabezadoTabla.text() + '"class="input-sm form-control filtrable" style="width:100%;" />');
		},
		aniadirFiltroBusquedaSeleccionable : function(encabezadoTabla, encabezadoFiltros, filtrosSeleccionables, column) {
			var funcion = this;
			var $select = $("<select class='encabezado input-sm form-control' style='width:100%;'><option value='' selected='selected'>Todos</option></select>").appendTo(encabezadoFiltros);
			switch (true) {
			case encabezadoTabla.hasClass($variableUtil.claseDataNoDefinida):
				$.each(filtrosSeleccionables[encabezadoTabla.index()], function(i, filtro) {
					funcion.aniadirFiltroAlSeleccionable($select, filtro);
				});

				break;
			case encabezadoTabla.hasClass($variableUtil.claseDataVacia):
				break;
			case encabezadoTabla.hasClass($variableUtil.claseInsertableOpcionesHtml):
				$select.append(filtrosSeleccionables[encabezadoTabla.index()]);
				break;
			default:
				column.data().unique().sort().each(function(filtro, j) {
					funcion.aniadirFiltroAlSeleccionable($select, filtro);
				});
				break;
			}
			var claseAgregable = encabezadoTabla.attr("class").match(/agregable[\w-]*\b/);
			if (claseAgregable != null) {
				$select.addClass(claseAgregable[0]);
			}
			if (encabezadoTabla.hasClass("select2")) {
				$funcionUtil.crearSelect2($select);
			}
		},
		aniadirFiltroDeBusquedaEnEncabezado : function(datatable, tabla, filtrosSeleccionables) {
			var $thead = tabla.find("thead");
			var numeroEncabezados = $thead.find("tr").find("th").length;
			var funcion = this;
			filtrosSeleccionables = filtrosSeleccionables || {};
			$thead.append($funcionUtil.filaFiltro());
			$thead.find("#" + $variableUtil.idFilaFiltro).append($($funcionUtil.encabezadoFiltro()).multiply(numeroEncabezados));
			datatable.api().columns().every(function() {
				var column = this;
				var encabezadoTabla = $(column.header());
				var encabezadoFiltros = $thead.find("#" + $variableUtil.idFilaFiltro).find("th").eq(encabezadoTabla.index());
				switch (true) {
				case encabezadoTabla.hasClass($variableUtil.filtrable):
					funcion.aniadirFiltroBusquedaCajaTexto(encabezadoTabla, encabezadoFiltros);
					break;
				case encabezadoTabla.hasClass($variableUtil.seleccionable):
					funcion.aniadirFiltroBusquedaSeleccionable(encabezadoTabla, encabezadoFiltros, filtrosSeleccionables, column);
					break;
				}
			});
		},
		actualizarFiltroBusquedaSeleccionable : function(select, opcionAgregar) {
			if (select.children("option[value='" + opcionAgregar + "']").length === 0) {
				select.append("<option value='" + opcionAgregar + "' >" + opcionAgregar + "</option>");
			}
		},
		trasladarHaciaSelect : function(select, data, valor, texto) {
			select.empty();
			$.each(data, function(i, fila) {
				select.append("<option value='" + fila[valor] + "' >" + fila[texto] + "</option>");
			});
			$funcionUtil.crearSelect2(select, "sera o.o");
		}
	};

	$(".select2").on("select2:close", function() {
		$(this).trigger('blur');
	});

	$("input[type=text]").on("click", function() {
		$(this).select();
	});

	$(".upperCase").bestupper();

/*
	$('body').tooltip({
		selector : "[data-tooltip=tooltip]",
		container : "body"
	});
*/
	$(".lettersOnlyAccent").on("keyup", function() {
		if (this.value != this.value.replace(/[^a-z\u00f1\u00d1\u00E0-\u00FC\' ']/g, '')) {
			this.value = this.value.replace(/[^a-z\u00f1\u00d1\u00E0-\u00FC\' ']/g, '');
		}
	});

	$(".lettersOnly").on("keyup", function() {
		if (this.value != this.value.replace(/[^a-z\' ']/g, '')) {
			this.value = this.value.replace(/[^a-z\' ']/g, '');
		}
	});

	$(".numbersOnly").on("keyup", function() {
		if (this.value != this.value.replace(/[^0-9]/g, '')) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
	});

	$(".notDash").on("keyup", function() {
		if (this.value != this.value.replace(/[\-]/g, '')) {
			this.value = this.value.replace(/[\-]/g, '');
		}
	});

	$(".numbersOnlyAndDot").on("keyup", function() {
		if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
			this.value = this.value.replace(/[^0-9\.]/g, '');
		}
	});

	$(".numbersAndLettersOnlyAndDot").on("keyup", function() {
		if (this.value !== this.value.replace(/[^a-zA-Z\u00f1\u00d1\^0-9\.\_\@]/g, '')) {
			this.value = this.value.replace(/[^a-zA-Z\u00f1\u00d1\^0-9\.\_\@]/g, '');
		}
	});

	$(".numbersAndLettersOnly").on("keyup", function() {
		if (this.value != this.value.replace(/[^a-z\u00f1\u00d1\^0-9]/g, '')) {
			this.value = this.value.replace(/[^a-z\u00f1\u00d1\^0-9]/g, '');
		}
	});

	$.ajaxSetup({
		statusCode : {
			409 : function(response) {
				if (response.responseJSON == undefined) {
					$funcionUtil.notificarException(response.responseText, "fa-exclamation-triangle", "Aviso", "warning");
				}
			},
			500 : function(response) {
				let errorMessage = response.responseText;
				if (errorMessage.includes("ID")){
					errorMessage = errorMessage.replace("ID", "<br> ID")
				}
				console.log(errorMessage)
				$funcionUtil.notificarException(errorMessage, "fa-exclamation-triangle", "Aviso", "warning");
			}
		}
	});
});