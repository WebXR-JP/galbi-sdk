# Let's Add Objects


> [!IMPORTANT]
> PlayCanvas can import 3D models such as `glTF (.glb)` and `.fbx`.
> 
> You can also add basic shapes like `Box`, `Sphere`, `Cylinder`, `Plane`, etc. in the editor.
>
> For Public projects, third parties can access them, so please be mindful of the usage terms of the model data you use.
>
> When importing 3D models with textures, please refer to [Texture Settings](how-to-load-texture.md)

### Let's Add a Box

This time, let's add a Box in the PlayCanvas editor.

From the hierarchy on the top left, select `Entity` → `Box`.

![alt text](/captures/19.png)

### Box Added to Hierarchy

A `Box` has been added to the hierarchy.

This object can be freely moved, rotated, and scaled.

![alt text](/captures/21.png)


### Adding Material

You can set materials for each model.

Let's set up a material.

Right-click in the Assets section and select `New Asset` → `Material`.

![alt text](/captures/22.png)



### Material Settings

Let's configure the material.

When you click on the material, its settings will appear in the Inspector on the right.

There are various options, but to change the basic color, click on the `Diffuse` section.

Then, click on the `Color` item to change the color.

![alt text](/captures/23.png)

> [!NOTE]
> For technical information, all materials conform to the glTF format standard.
>
> The compatibility table for PlayCanvas material parameters is currently under development.

### Applying Material to Box

Drag and drop the material onto the Box to apply it.

This will apply the material to the Box.

![alt text](/captures/25.png)


### Check in VRChat

Let's check it in VRChat.

When you load the world in VRChat, you'll see that the Box's color has changed.

![alt text](/captures/26.png)

This is how you can create worlds.
