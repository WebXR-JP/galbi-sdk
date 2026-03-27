---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
hero:
  name: "Galbi SDK"
  text: "함께 월드 만들기"
  tagline: 웹에서 여러 사람이 함께 VRChat 월드를 만드는 시스템입니다.
  actions:
    - theme: brand
      text: 시작하기
      link: /ko/guide/getting-started
  image:
    src: https://cdn.pixabay.com/animation/2023/01/31/11/00/11-00-41-940_512.gif
    alt: logo
    width: 400
    height: 400

features:
  - title: 📦 WebGL 게임 엔진 PlayCanvas
    details: PlayCanvas 게임 엔진의 생태계를 활용하여 월드를 만듭니다.
  - title: 📦 VRChat과 실시간 동기화
    details: 업로드 없이 VRChat과 실시간 동기화하여 월드를 확인할 수 있습니다. Desktop, PC VR, 독립형 Quest 사용자들이 함께 월드를 확인할 수 있습니다.
  - title: 📦 glTF 포맷 기반 월드 제작
    details: 결과물을 glTF 형식으로 내보내므로 Blender나 Maya 같은 3D 모델링 도구에서 만든 모델을 바로 사용할 수 있습니다.

---


### Special Thanks

- VRChat 월드의 동기화 메커니즘은 Voyage가 개발한 [vrchat-glb-loader](https://github.com/vr-voyage/vrchat-glb-loader)를 기반으로 만들어졌습니다.
