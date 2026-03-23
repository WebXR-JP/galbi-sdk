# 3D 모델 내보내기


## 3D 모델 내보내기

Galbi SDK에서는 3D 모델을 glTF 포맷으로 내보냅니다.

PlayCanvas 에디터에서 만든 프로젝트를 내보내 보겠습니다.


### GLTF 내보내기 버튼 클릭

내보내기 버튼을 클릭하세요.

그러면 glTF `(.glb)` 파일이 다운로드됩니다.

![alt text](/captures/27.png)


### Blender로 가져오기

Blender(4.2)에서는 드래그 앤 드롭으로 파일을 가져올 수 있습니다.

![alt text](/captures/28.png)


### 3D 모델이 가져와졌습니다

3D 모델이 Blender로 가져와졌습니다.

![alt text](/captures/29.png)



## FBX 내보내기
VRChat에 업로드하기 위해 Unity에서 사용하려면 Blender에서 `.fbx` 형식으로 내보낼 수 있습니다.

### 모든 모델 선택

`A` 키를 눌러 모든 모델을 선택하세요.

![alt text](/captures/30.png)


### 모델 내보내기

`File` → `Export` → `FBX`를 선택하세요.

![alt text](/captures/31.png)


### 내보내기 설정

내보내기 설정에서 `Selected Objects`를 체크하고 내보내기를 하세요.
![alt text](/captures/32.png)


## Unity로 가져오기

생성된 모델 데이터를 VRChat 월드로 업로드하려면 "VCC"와 "Unity" 소프트웨어를 사용해야 합니다.

이들의 사용 방법은 [VRChat 공식 문서](https://creators.vrchat.com/worlds/creating-your-first-world/)를 참조하세요.


![alt text](/captures/33.png)



### 텍스처 다운로드


현재 이 방법으로 내보내기를 하면 텍스처가 Unity로 직접 가져와지지 않습니다.

Blender에서 설정하는 방법도 있지만, 초보자를 위해 Unity에서 설정하는 방법을 소개하겠습니다.


PlayCanvas 에디터에서 설정된 텍스처 에셋을 선택하고 `Download`를 클릭하세요.

이렇게 하면 텍스처 데이터를 다운로드할 수 있습니다.

![alt text](/captures/34.png)


### Unity에서 텍스처 설정

이것들을 Unity로 가져와서 새로운 재질을 설정하세요.

이렇게 하면 PlayCanvas에서 만든 것과 동일한 월드를 재현할 수 있습니다.


![alt text](/captures/35.png)





