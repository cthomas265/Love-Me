const uploadUrlInput = document.querySelector('[name="story-photo"]')
    const uploadWidgetButton = document.getElementById("upload_widget")

    var myWidget = cloudinary.createUploadWidget({
      cloudName: 'dzql8up82', 
      uploadPreset: 'nzdjc3dx'
    }, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
        uploadUrlInput.value = result.info.secure_url
        uploadWidgetButton.style.display = 'none'
      }
    })

    uploadWidgetButton.addEventListener("click", function(){
      myWidget.open();
    }, false);