# 3Dモデルのエクスポート

## 3Dモデルのエクスポート

Galbi SDKでは、3DモデルをglTFというフォーマットでエクスポートします。

作成したプロジェクトをPlayCanvasのエディターでエクスポートしてみましょう。

### GLTFのエクスポートボタンをクリック

エクスポートボタンをクリックします。

すると、glTF `(.glb)`ファイルがダウンロードされます。

![alt text](/captures/27.png)

### Blenderに読み込み

Blender (4.2) では、ドラッグ＆ドロップでファイルを読み込めます。

![alt text](/captures/28.png)

### 3Dモデルがインポートされました

Blenderで3Dモデルがインポートされました。

![alt text](/captures/29.png)

## FBXエクスポート

VRChatにアップロードするために、Unityで利用する際は、Blenderで`.fbx`形式でエクスポートできます。

### すべてのモデルを選択

`A`キーを押して、すべてのモデルを選択してください。

![alt text](/captures/30.png)

### モデルのエクスポート

`ファイル` → `エクスポート` → `FBX`を選択してください。

![alt text](/captures/31.png)

### エクスポートの設定

エクスポートの設定は、`選択したオブジェクト`にチェックを入れてエクスポートしてください。

![alt text](/captures/32.png)

## Unityにインポート

作成したモデルデータをVRChatのワールドとしてアップロードするには、「VCC」というソフトウェアと「Unity」というソフトウェアを利用します。

そちらの利用方法については、[VRChat公式ドキュメント](https://creators.vrchat.com/worlds/creating-your-first-world/)をご覧ください。


![alt text](/captures/33.png)
### テクスチャのダウンロード

現状、この方法でエクスポートした場合、Unityで設定するテクスチャは、そのままではUnityでインポートされません。

Blenderで設定をする方法もありますが、初めて触る方向けにUnityで設定をする方法をご紹介します。

PlayCanvasのエディターで設定されているテクスチャアセットを選択して `ダウンロード` をクリックしてください。

これでテクスチャのデータをダウンロードすることができます。

![alt text](/captures/34.png)

### Unityでテクスチャを設定

これをUnityにインポートして新しくマテリアルの設定をしてください。

それで、PlayCanvasで作成したデータと同じワールドを再現することができました。

![alt text](/captures/35.png)
