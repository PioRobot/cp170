AFRAME.registerComponent("create-markers", {
  init:async function() {
    var ss=document.querySelector("#main-scene")
    var dishes=await this.getDishes()
    dishes.map(dish=>{
      var mark=document.createElement("a-marker")
      mark.setAttribute("id",dish.id)
      mark.setAttribute("type","pattern")
      mark.setAttribute("url",dish.marker_pattern_url)
      mark.setAttribute("cursor",{rayOrigin:"mouse"})
      mark.setAttribute("markerhandler",{})
      ss.appendChild(mark)

      var model=document.createElement("a-entity")
      model.setAttribute("id",dish.id)
      model.setAttribute("position",dish.model_geometry.position)
      model.setAttribute("rotation",dish.model_geometry.rotation)
      model.setAttribute("scale",dish.model_geometry.scale)
      model.setAttribute("gesture-handler",{})
      model.setAttribute("gltf-model",`url(${dish.model_url})`)
      mark.appendChild(model)

      var plain=document.createElement("a-plane")
      plain.setAttribute("id",dish.id)
      plain.setAttribute("position",{x:0, y:0, z:0})
      plain.setAttribute("rotation",{x:-90,y:0,z:0})
      plain.setAttribute("width",1.7)
      plain.setAttribute("height",1.5)
      mark.appendChild(plain)

      var title=document.createElement("a-plane")
      title.setAttribute("id",dish.id)
      title.setAttribute("position",{x:0, y:0.89, z:0.02})
      title.setAttribute("rotation",{x:0,y:0,z:0})
      title.setAttribute("width",1.69)
      title.setAttribute("height",0.3)
      title.setAttribute("material",{color:"#F0C30F"})
      plain.appendChild(title)

      var title2=document.createElement("a-entity")
      title2.setAttribute("id",dish.id)
      title2.setAttribute("position",{x:0, y:0, z:0.1})
      title2.setAttribute("rotation",{x:0,y:0,z:0})
      title2.setAttribute("text",{font:monoid, color:"black", width:1.8, height:1, aling:clearInterval, value:`${dish.nombre.toUpperCase()}`})
      title2.setAttribute("height",1.5)
      title.appendChild(title2)
      
      var ing=document.createElement("a-entity")
      ing.setAttribute("id",dish.id)
      ing.setAttribute("position",{x:0.3, y:0, z:0.1})
      ing.setAttribute("rotation",{x:0,y:0,z:0})
      ing.setAttribute("text",{font:monoid, color:"black", width:2,aling:clearInterval, value:`${dish.ingredientes.join("\n\n")}`})
      ing.setAttribute("height",1.5)
      plain.appendChild(ing)
    })
  },
  //¡Añade aquí el código!
  getDishes:async function() {
    return await firebase.firestore()
    .collection("platillos")
    .get()
    .then(snap=>{
      return snap.docs.map(doc=>doc.data())
    })
  }
  });
