// Configuration de Formulario de la pajina presupuesto.html


// llamamos al elemento formulario y button
let formPresupesto = document.getElementById('formulario');
let bntPresupesto = document.getElementById('btn-presupesto');

// llamamos al los capmos
let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido');
let mobile = document.getElementById('mobile');
let correo = document.getElementById('correo');



let mostrarResulta = document.getElementById('total-final')
let prevacidad = document.getElementById('prevacidad');
let selectProducto = document.getElementById('select');

// console.log(selectedIndex === 0)
let numeroDia = document.getElementById('palzo');




function error(input , Mserror){
    let padre = input.parentElement;
    let span = padre.querySelector('span');
    padre.className = 'error';
    span.innerText = Mserror;
    
    
};

function succes(input){
    let padre = input.parentElement;
    padre.className ='succes';
};



// donde se almacena boolean de la funciones de event blur
let validar = 
{
nombre:false,
apellido:false,
mobile:false,
correo:false,
selectProducto:false,
numeroDia:false,
prevacidad:false,
}


 


let regNombre = /^[a-zA-Z ]{2,20}$/;
let regApellido = /^[a-zA-Z ]{2,20}$/;
let regTelephon = /^\d{9}$/;
let regDireccion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let regnumeroDia =/^\d{1}$/;

function validainput(input,regex){
    

            if(input.value.trim() == null || input.value.trim() == ""){
               
                error(input , 'Debes rellenar el campo de '+input.name);
                validar[input.name]= false ; 
                }else if(!regex.test(input.value)){
                   
                        error(input,'Debes respectar la forma de '+input.name);
                        validar[input.name]= false ;
                    
               
                }else{
                    succes(input);
                    validar[input.name]= true ;
                }
      

}


function validarSelect(){

     if(selectProducto.options.selectedIndex == 0){
        error(selectProducto, ' debes selctionar un producto');
       validar.selectProducto = false ;
     
    }else{
        succes(selectProducto);
        validar.selectProducto = true ;
    }

   
}







// Validación de la privacidad
function validarPrivacidad() {
   

    if (!prevacidad.checked) {
        error(prevacidad, ' debes markar  Privacidad');
       validar.prevacidad= false ;
    } else {
        validar.prevacidad= true ;
        
    }
}



nombre.addEventListener("blur",()=> validainput(nombre,regNombre))
apellido.addEventListener("blur",()=>validainput(apellido,regApellido))
mobile.addEventListener("blur", ()=>validainput(mobile,regTelephon))
correo.addEventListener("blur",()=> validainput(correo,regDireccion))
selectProducto.addEventListener("change",()=> validarSelect())
numeroDia.addEventListener(('blur') ,()=>validainput(numeroDia,regnumeroDia))
prevacidad.addEventListener("change", ()=>validarPrivacidad())





formPresupesto.addEventListener(('submit') , (elem)=>{

 // selectionar el value de option 
 
    elem.preventDefault();  

    validainput(nombre,regNombre),
    validainput(apellido,regApellido);
    validainput(mobile,regTelephon);
    validainput(correo,regDireccion);
    validarSelect();
    validainput(numeroDia,regnumeroDia);
    validarPrivacidad();


// // CREAMOS VARIABLE validarEnvio
    let hayError  = false ;  
    // let comprovarEnvio = false;

// // LOOP PARA COMPRAR RETURN  DE CADA ELEMENTO = false
    for(let property in validar){
        
        if(validar[property] == false){
            
            hayError = true ;
           
        }
    }    
   

    
    if(!hayError){
          
         formPresupesto.submit();
  
    }
})

 
let bottonReset = document.getElementById('btn-rest');
bottonReset.addEventListener('click',()=>{
    formPresupesto.reset()
})


























// //************************** VALIDATION de prevacidad *******************************************************


// prevacidad.addEventListener(('blur') , ()=>{

//     if(!prevacidad.checked){
//         error(prevacidad, ' debes aceptar las condiciones de privacidad');
//         validar.prevacidad = false;
//     }else{
//         succes(prevacidad);
//         validar.prevacidad = true;
//     }
// })





 





function calcularPresupuesto() {
    //selctionamos las option 
 let optionSelectionada = selectProducto.options[selectProducto.selectedIndex];
 // selectionar el value de option 
 let valorSelectionada = optionSelectionada.value;

 //hacemos una condution por evitar el value vacio 


 // suparramos el nombre del producto y percio 

 let [ nombreProducto, precioProducto] = valorSelectionada.split(":");

//convertimos precioProducto a numbre 

let precioDeProducto = parseFloat(precioProducto);

//   Si no hay producto seleccionado, presupuesto = 0
    if ( !precioDeProducto || precioDeProducto == 0) {
        mostrarResulta.textContent = "0 €";
        return;
    }


    let plazo = parseInt(numeroDia.value)|| 1;

  

    // Sumar extras
    let extras = 0;
    document.querySelectorAll(".extra:checked").forEach(e => {
        extras += parseFloat(e.value);
        
    });
   
    // // Descuento: 2% por cada mes
    let descuento = precioDeProducto * (0.02 * (plazo - 1));
    
    if (descuento < 0) descuento = 0;

    let total = precioDeProducto + extras - descuento;

    mostrarResulta.textContent = total.toFixed(2) + " €";
}

// Eventos para recalcular automáticamente
document.getElementById("select").addEventListener("change", calcularPresupuesto);
document.getElementById("palzo").addEventListener("input", calcularPresupuesto);
document.querySelectorAll(".extra").forEach(e => {
    e.addEventListener("change", calcularPresupuesto);
});















