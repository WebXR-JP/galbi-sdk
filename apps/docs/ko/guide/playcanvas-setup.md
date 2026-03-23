# 개발 환경 준비

--- 

> [!NOTE]
> Galbi SDK는 PlayCanvas를 에디터로 사용합니다.
>
> PlayCanvas는 WebGL 기반 게임 엔진으로, FBX와 glTF 모델 데이터를 가져오고 JavaScript 게임과 씬을 만들 수 있습니다.
> 
> SaaS로 제공되는 에디터의 무료 계정 범위 내에서 프로젝트를 만들어 갈 것입니다.




## 계정 생성

PlayCanvas [공식 사이트](https://playcanvas.com/)에 접속하여,

우측 상단의 "Sign Up" 버튼을 클릭합니다.

![alt text](/captures/1.png)

### 계정 등록 화면

새 계정을 생성합니다.
이메일 주소와 비밀번호를 입력하고 "Sign Up"을 클릭합니다.


![alt text](/captures/2.png)

### 이메일 확인

이메일 주소로 확인 메일이 발송됩니다.
메일에 포함된 링크를 클릭하여 계정을 활성화합니다.


![alt text](/captures/3.png)


### 계정 정보 입력

"사용자 이름"과 "이름"을 입력하고 "Create Account"를 클릭합니다.

> [!IMPORTANT]
> 여기서 입력한 사용자 이름과 이름은 플랫폼에서 사용될 이름이므로,
> 공개 가능한 이름을 입력해 주세요.


![alt text](/captures/4.png)


### 새 프로젝트 생성

로그인하면 튜토리얼용 프로젝트가 표시됩니다.

> [!NOTE]
> 이것은 튜토리얼용 프로젝트이므로,
> 시간이 있다면 이 프로젝트를 참고하여
> 직접 씬을 만들어 보세요.


![alt text](/captures/5.png)



### 플랫폼으로 이동

이 화면에서 "홈" 아이콘을 클릭하면

현재 씬에서 PlayCanvas 플랫폼으로 이동할 수 있습니다.

![alt text](/captures/6.png)


> [!NOTE]
> 로그인한 상태에서 [PlayCanvas](https://playcanvas.com/)에 접속해도 플랫폼으로 이동할 수 있습니다.


### 프로젝트 상세
이와 같이 프로젝트 상세 정보를 확인할 수 있습니다.


![alt text](/captures/7.png)


## Galbi SDK

Galbi SDK는 이 PlayCanvas 프로젝트 내에 템플릿 프로젝트로 준비되어 있습니다.

[Galbi SDK](https://playcanvas.com/project/1292374/overview/galbisdk)에 접속해 주세요.


### 프로젝트 포크

접속하면 페이지 내의 "Fork" 버튼을 클릭해 주세요.


> [!NOTE]
> PlayCanvas에는 프로젝트를 포크(복제)하는 기능이 있어 프로젝트 상태를 복사할 수 있습니다.


![alt text](/captures/8.png)


### 프로젝트 이름 입력

Fork 버튼을 클릭하면 프로젝트 이름을 입력하는 대화 상자가 표시됩니다.

여기서는 "VRC World" 등을 입력합니다 (원하는 이름으로 해도 됩니다)

![alt text](/captures/10.png)

### 프로젝트 생성

입력이 완료되면 "Fork" 버튼을 클릭해 주세요.


이제 PlayCanvas 플랫폼에서 프로젝트가 생성되었습니다.

![alt text](/captures/11.png)

---

> [!IMPORTANT]
> 프로젝트는 "Public" 또는 "Private" 중 하나를 선택할 수 있습니다.
>
> "Public"인 경우 PlayCanvas 계정으로 로그인한 모든 사용자와 공유됩니다.
>
> 데이터 사용 약관이나 기밀성이 높은 프로젝트의 경우 "Public"이 아닌 "Private"을 선택하는 것을 추천합니다.
> 
> PlayCanvas에서 비공개 프로젝트를 만들려면 "Personal" 또는 "Organization" 플랜 중 하나에 가입해야 합니다.

