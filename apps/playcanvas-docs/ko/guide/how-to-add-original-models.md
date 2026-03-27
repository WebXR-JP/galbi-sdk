# Blender에서 모델 가져오기

PlayCanvas 에디터에 Blender에서 만든 3D 모델을 가져오는 방법을 소개합니다.

이번에는 이렇게 간단한 재질(텍스처 포함) 모델 데이터를 가져와 보겠습니다.

![alt text](/captures/46.png)

### 내보내기

모델 데이터의 내보내기는 `파일`→`내보내기`→`glTF`를 클릭합니다.

![alt text](/captures/47.png)

내보내기 설정은 "선택한 객체를 내보내기"에 체크한 상태에서 내보내기를 실행합니다. 이번에는 `human.glb`로 내보내기를 합니다.

![alt text](/captures/54.png)

### 가져오기

PlayCanvas에 모델 데이터를 가져오려면 자산 부분에 드래그 앤 드롭하면 모델 데이터 폴더가 생성됩니다(이번에는 `human.glb`).
그리고 "◇" 마크가 붙은 아이콘을 계층 구조나 장면에 드래그 앤 드롭하면 배치할 수 있습니다.
![alt text](/captures/48.png)

모델 데이터가 장면에 배치되었습니다.

![alt text](/captures/49.png)

### 텍스처 설정

이 모델 데이터를 VRChat에 동기화하려면 텍스처 설정을 해야 합니다. 텍스처를 클릭하고 오른쪽 인스펙터에서 `LEGACY`를 선택합니다.

![alt text](/captures/50.png)

#### 텍스처 압축

인스펙터의 `COMPRESS`에서 `DXT`를 선택하고, `COMPRESS LEGACY`를 클릭합니다. (ALPHA(투명도를 포함하는 경우 `ALPHA`에도 체크를 넣습니다.)
![alt text](/captures/51.png)

이제 PlayCanvas의 장면을 시작하고 다시 동기화를 진행합니다.

![alt text](/captures/52.png)

발행된 URL을 VRChat에 붙여넣고 동기화를 진행하면 모델 데이터가 동기화되었습니다.
![alt text](/captures/53.png)

> [!NOTE]
> 모델 데이터의 정점 수나 텍스처 해상도는 가능한 한 낮추는 것이 좋습니다.
>
> 기준으로는 `.glb` 파일 크기(텍스처 포함)가 최대 5MB ~ 10MB 정도로 유지하는 것이 동기화 시 무겁지 않을 것입니다.