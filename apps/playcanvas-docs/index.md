---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
hero:
  name: "Galbi SDK"
  text: "みんなでワールド制作"
  tagline: VRChatのワールドをウェブから複数人で作る仕組みです。
  actions:
    - theme: brand
      text: 今すぐ始める
      link: /guide/getting-started
  image:
    src: https://cdn.pixabay.com/animation/2023/01/31/11/00/11-00-41-940_512.gif
    alt: logo
    width: 400
    height: 400

features:
  - title: 📦 WebGLゲームエンジンPlayCanvas
    details: ゲームエンジンのPlayCanvasのエコシステムを利用して、ワールドを作成します。
  - title: 📦 VRChatへのリアルタイム同期
    details: アップロードを不要で、VRChatへのリアルタイム同期をしてワールドの確認ができます。Desktop、PC VR、Quest単体でのユーザー同士でワールドの確認ができます。
  - title: 📦 glTF形式を軸にしたワールド作成
    details: 成果物のエクスポートはglTF形式で出力を行うため、BlenderやMayaなどの3Dモデリングツールで作成したモデルをそのまま利用できます。

---

### Special Thanks

- VRChatのワールドでの同期の仕組みは、Voyageさんの開発している[vrchat-glb-loader](https://github.com/vr-voyage/vrchat-glb-loader)を元に作成しています。
