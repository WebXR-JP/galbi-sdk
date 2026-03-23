# 오브젝트 추가하기


> [!IMPORTANT]
> PlayCanvas는 `glTF (.glb)`와 `.fbx` 등의 3D 모델을 가져올 수 있습니다.
> 
> 또한 기본 도형으로 `Box`, `Sphere`, `Cylinder`, `Plane` 등도 에디터에서 추가할 수 있습니다.
>
> Public 프로젝트의 경우 제3자도 접근할 수 있으므로, 사용하는 모델 데이터의 이용 약관에 주의해 주세요.
>
> 텍스처가 포함된 3D 모델을 가져올 때는 [텍스처 설정](how-to-load-texture.md)을 해주세요.

### Box 추가하기

이번에는 PlayCanvas 에디터에서 Box를 추가해 보겠습니다.

왼쪽 상단의 계층 구조에서 `Entity` → `Box`를 선택하세요.

![alt text](/captures/19.png)

### 계층 구조에 Box가 추가되었습니다

계층 구조에 `Box`가 추가되었습니다.

이 오브젝트는 자유롭게 이동, 회전, 크기 조절이 가능합니다.

![alt text](/captures/21.png)


### 재질 추가하기

각 모델 데이터에는 재질을 설정할 수 있습니다.

재질을 설정해 보겠습니다.

Assets 영역에서 마우스 오른쪽 버튼을 클릭하고 `New Asset` → `Material`을 선택하세요.

![alt text](/captures/22.png)



### 재질 설정

재질을 설정해 보겠습니다.

재질을 클릭하면 오른쪽의 Inspector에 재질 설정이 표시됩니다.

여러 항목이 있지만, 기본 색상을 변경하기 위해 `Diffuse` 항목을 클릭하세요.

그리고 `Color` 항목을 클릭하여 색상을 변경해 보세요.

![alt text](/captures/23.png)

> [!NOTE]
> 기술적인 정보로, 모든 재질은 glTF 포맷 표준을 따릅니다.
>
> PlayCanvas 재질 매개변수의 호환성 표는 현재 개발 중입니다.

### Box에 재질 적용하기

재질을 Box에 적용하기 위해 Box에 드래그 앤 드롭하세요.

그러면 Box에 재질이 적용됩니다.

![alt text](/captures/25.png)


### VRChat에서 확인하기

VRChat에서 확인해 보겠습니다.

VRChat에서 월드를 로드하면 Box의 색상이 변경된 것을 확인할 수 있습니다.

![alt text](/captures/26.png)

이러한 방식으로 월드를 만들 수 있습니다.
