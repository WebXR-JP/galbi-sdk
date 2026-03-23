# 텍스처 설정(필수)


> [!IMPORTANT]
> 3D 모델 데이터나 재질에 텍스처를 사용할 경우, 가져온 텍스처를 설정해야 합니다.

## PlayCanvas 에디터 설정 변경

VRChat에서 텍스처가 포함된 3D 모델을 로드하려면 텍스처의 가로와 세로 크기를 2의 거듭제곱(`128x128`, `256x256`, `512x512`, `1024x1024`, `2048x2048`...)으로 변경해야 합니다. 이렇게 하면 VRChat에서 텍스처를 로드할 수 있습니다.

PlayCanvas에는 업로드된 텍스처를 자동으로 2의 거듭제곱으로 변경하는 설정이 있습니다.
PlayCanvas 에디터의 `SETTINGS`에서 `ASSET TASKS` → `Texture Pot`을 체크해 주세요.



![alt text](/captures/41.png)

> [!NOTE]
> 이것은 개인 설정이므로 여러 사람이 개발할 때는 모든 사람이 설정해야 합니다.


### 텍스처별 설정

VRChat 사용을 위해 텍스처 형식이 동적으로 로드할 수 있는 텍스처 포맷이어야 합니다.

이것도 PlayCanvas 에디터에서 변경할 수 있습니다.


텍스처를 선택하고 `COMPRESS` 항목의 `LEGACY` 옵션을 활성화하세요.

![alt text](/captures/36.png)

### DXT 체크하기


`DXT` 옵션을 체크하세요.

투명도가 있는 텍스처의 경우 DXT 위의 `ALPHA`를 체크하세요.

![alt text](/captures/38.png)


`COMPRESS LEGACY` 버튼을 클릭하세요.


---

이제 텍스처 설정이 완료되었습니다.
