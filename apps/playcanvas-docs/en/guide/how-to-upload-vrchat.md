# Exporting 3D Models


## Exporting 3D Models

In Galbi SDK, 3D models are exported in the glTF format.

Let's try exporting the project you created in the PlayCanvas editor.


### Click the GLTF Export Button

Click the export button.

This will download a glTF `(.glb)` file.

![alt text](/captures/27.png)


### Import to Blender

In Blender (4.2), you can import files by drag & drop.

![alt text](/captures/28.png)


### 3D Model Has Been Imported

The 3D model has been imported into Blender.

![alt text](/captures/29.png)



## FBX Export
To use in Unity for uploading to VRChat, you can export in `.fbx` format from Blender.

### Select All Models

Press the `A` key to select all models.

![alt text](/captures/30.png)


### Export the Model

Select `File` → `Export` → `FBX`.

![alt text](/captures/31.png)


### Export Settings

In the export settings, check `Selected Objects` and export.
![alt text](/captures/32.png)


## Import to Unity

To upload the created model data as a VRChat world, you'll need to use the "VCC" software and "Unity" software.

For instructions on how to use these, please refer to the [VRChat Official Documentation](https://creators.vrchat.com/worlds/creating-your-first-world/).


![alt text](/captures/33.png)



### Download Textures


Currently, when exporting using this method, textures won't be imported directly into Unity.

While there are ways to set this up in Blender, I'll introduce how to set it up in Unity for beginners.


Select the texture asset set in the PlayCanvas editor and click `Download`.

This will allow you to download the texture data.

![alt text](/captures/34.png)


### Set Up Textures in Unity

Import these into Unity and set up new materials.

This way, you can recreate the same world you created in PlayCanvas.


![alt text](/captures/35.png)





