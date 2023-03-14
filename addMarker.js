AFRAME.regiterComponent('create-markers',{
    init:async function(){
        var mainScene=document.querySelector("#main-scene");
        //get dishes collection from firestore database
        var dishes=await this.getDishes();
        dishes.map(dish=>{
            var marker=document.createElement("a-marker");
            marker.setAttribute("id",dish.id);
            marker.setAttribute("type","pattern") ;
            marker.setAttribute("url",dish.marker_patter_url ) ;
            marker.setAttribute("cursor",{rayOrigin : "mouse"})   ;   

        });
// set marker handler component
        marker.setAttribute("markerhandler",{});
        mainScene.appendChild(marker);
    
        //add 3d model to scene
        var model=document.createElement('a-entity');
        model.setAttribute('id',`model-${dish.id}`);
        model.setAttribute("position",dish.model_geometry.position);
        model.setAttribute("rotation",dish.model_geometry.rotation);
        model.setAttribute("scale",dish.model_geometry.scale);
        model.setAttribute('gltf-model',`url(${dish.model_url})`);
        model.setAttribute("gesture-handler",{});
        marker.appendChild(model);

        //ingredient container
        var mainplane=document.createElement("a-plane");
        mainplane.setAttribute("id",`main-plane-${dish.id}`);
        mainplane.setAttribute("position",{x:0,y:0,z:0});
        mainplane.setAttribute("rotation",{x:-90,y:0,z:0});
        mainplane.setAttribute("width",1.7);
        mainplane.setAttribute("height",1.5);

        marker.appendChild(mainplane);

        //dish  title bg plane
        var titleplane=document.createElement('a-plane');
        titleplane.setAttribute("id",`title-plane-${dish.id}`);
        titleplane.setAttribute("position",{x:0,y:0.89,z:0.03});
        titleplane.setAttribute("rotation",{x:0,y:0,z:0});
        titleplane.setAttribute("width",1.69);
        titleplane.setAttribute("height",0.3);
        titleplane.setAttribute("material",{color:"green"});

        mainplane.appendChild(titleplane);
        //dish title
        var dishtitle=document.createElement('a-entity');

        dishtitle.setAttribute("id",`dish-title-${dish.id}`);
        dishtitle.setAttribute("position",{x:0,y:0,z:0.1});
        dishtitle.setAttribute("rotation",{x:0,y:0,z:0});
        dishtitle.setAttribute("text",{
            font:"monoid",
            color:"black",
            width:1.8,
            height:1,
            align:"center",
            value:dish.dish_name.toUpperCase()
        });

        titleplane.appendChild(dishtitle);

        ///Ingredient list

        var ingredients=document.createElement('a-entity');
        ingredients.setAttribute("id",`ingredients-${dish.id}`);
        ingredients.setAttribute("position",{x:0.3,y:0,z:0.1});
        ingredients.setAttribute("rotation",{x:0,y:0,z:0});
        ingredients.setAttribute("text",{
            font:"monoid",
            color:"black",
            width:2,
            height:1,
            align:"right",
            value:`${dish.ingredients.join("\n\n ")}`
        });

        mainplane.appendChild(ingredients);
    },

    getDishes:async function(){
        return await firebase
            .firestore()
            .collection("dishes")
            .get()
            .then(snap=>{
                return snap.docs.map(doc=>doc.data());
            })


    }

})