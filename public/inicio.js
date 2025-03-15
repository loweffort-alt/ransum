$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: $variableUtil.root + "v2/informacion/formularioDatos?accion=obtenerFormularioDatos",
        //data: criterioBusqueda,
        beforeSend: function(xhr) {
        },
        success: function(response) {
            //console.log(response);
            //let alumno = response.data.alumno;
            let formulario = response.data.formulario;
            if (response.data.alumno.codEscuela<200){
                if (formulario.nombreColegio=='No Registrado'||formulario.nombreColegio==null || formulario.nombreColegio=="" || formulario.nombreColegio==undefined || response.data.llenar==true ){
                    $('#modalIrFormulario').modal('show');
                }
            }else{
                if ( formulario.procedencia=='No Registrado'||formulario.procedencia==null || formulario.procedencia=="" || formulario.procedencia==undefined || response.data.llenar==true ){
                    $('#modalIrFormulario').modal('show');
                    $('#iniciarMatricula').prop('disabled', true);
                    $('#iniciarMatriculaLabo').prop('disabled', true);			}
            }

        },
        complete : function() {

        }
    });


    $('#btnIrFormulario').on("click", function() {
        window.location = $variableUtil.root + 'v2/informacion/formularioDatos';
    });


});