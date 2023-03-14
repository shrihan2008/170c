AFRAME.registerComponent('marker-handler',{
    init:function(){
        this.el.addEventListener("makrerFound",()=>{
           
            this.handleMarkerFound();
        });

     this.el.addEventListener("markerLost",()=>{
     
        this.handleMarkerLost();
     })   ;
    },

    handleMarkerFound:function(){
        var buttonDiv=document.getElementById('button-div')
        buttonDiv.style.display="flex"
        var ratingButton=document.getElementById("rating-button")
        var orderButton=document.getElementById("order-button")
        
        ratingButton.addEventListener('click',function(){
            swal({
                title:"Rate dish",
                icon:"warning",
                text:"wip",


            });
        });

        orderButton.addEventListener('click',function(){
            swal({
                title:"order found",
                icon:"https://imgur.com/4NZ6uLY",
                text:"served soon"
            })
        })
    },

    handleMarkerLost:function(){
        var buttonDiv=document.getElementById("button-div")
        buttonDiv.style.display="none"
    }
})