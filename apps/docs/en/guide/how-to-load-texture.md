# Texture Settings (Required)


> [!IMPORTANT]
> When using textures in 3D model data or materials, you need to configure the imported textures.

## Change PlayCanvas Editor Settings

To load 3D models with textures in VRChat, you need to change the texture dimensions to powers of two (`128x128`, `256x256`, `512x512`, `1024x1024`, `2048x2048`...). This will allow VRChat to load the textures.

PlayCanvas has a setting to automatically change uploaded textures to powers of two.
In the PlayCanvas editor, go to `SETTINGS` and check `ASSET TASKS` → `Texture Pot`.



![alt text](/captures/41.png)

> [!NOTE]
> This is a personal setting, so when developing with multiple people, everyone needs to do this.


### Per-Texture Settings

For VRChat usage, textures need to be in a format that can be loaded dynamically.

This can also be changed in the PlayCanvas editor.


Select the texture and enable the `LEGACY` option under the `COMPRESS` section.

![alt text](/captures/36.png)

### Check DXT


Check the `DXT` option.

For textures with transparency, check `ALPHA` above DXT.

![alt text](/captures/38.png)


Click the `COMPRESS LEGACY` button.


---

Now the texture settings are complete.
