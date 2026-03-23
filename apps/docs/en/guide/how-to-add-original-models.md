# Importing Models from Blender

This section introduces how to import 3D models created in Blender into the PlayCanvas editor.

This time, we will import a simple model data with material (including texture).

![alt text](/captures/46.png)

### Exporting

To export the model data, click `File` → `Export` → `glTF`.

![alt text](/captures/47.png)

Make sure to check the "Export Selected Objects" option before executing the export. This time, we will export it as `human.glb`.

![alt text](/captures/54.png)

### Importing

To import the model data into PlayCanvas, drag and drop it into the asset section, which will create a model data folder (this time `human.glb`).
Then, you can drag and drop the icon marked with "◇" into the hierarchy or scene to place it.
![alt text](/captures/48.png)

The model data has been placed in the scene.

![alt text](/captures/49.png)

### Texture Settings

To synchronize this model data with VRChat, you need to set the texture. Click on the texture and select `LEGACY` in the right inspector.

![alt text](/captures/50.png)

#### Texture Compression

In the inspector, select `DXT` under `COMPRESS`, and click `COMPRESS LEGACY`. (If including transparency, check `ALPHA` as well.)
![alt text](/captures/51.png)

Now start the scene in PlayCanvas and proceed with the synchronization again.

![alt text](/captures/52.png)

Paste the published URL into VRChat, and proceed with the synchronization, and the model data will be synchronized.
![alt text](/captures/53.png)

> [!NOTE]
> It is recommended to keep the vertex count and texture resolution of the model data as low as possible.
>
> As a guideline, keeping the `.glb` file size (including textures) to a maximum of 5MB to 10MB will help ensure it is not too heavy during synchronization.