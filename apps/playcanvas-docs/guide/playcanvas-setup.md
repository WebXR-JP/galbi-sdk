# 開発環境の準備

--- 

> [!NOTE]
> Galbi SDKでは、エディターとしてPlayCanvasを使用します。
>
> PlayCanvasはWebGLベースのゲームエンジンで、FBXやglTFのモデルデータのインポートやJavaScriptゲームやシーンを作成することができます。
> 
> サービスはSaaSで提供されているエディターを無料アカウントの範囲で、プロジェクトを作成していきます。




## アカウントの作成

PlayCanvasの[公式サイト](https://playcanvas.com/)にアクセスし、

右上の「Sign Up」ボタンをクリックします。

![alt text](/captures/1.png)

### アカウント登録画面

新しいアカウントを作成をします。
メールアドレス、パスワードを入力し、「Sign Up」をクリックします。


![alt text](/captures/2.png)

###  メールの確認

メールアドレスに確認メールが送信されます。
記載されているリンクをクリックして、アカウントを有効化します。


![alt text](/captures/3.png)


### アカウント情報の入力

「ユーザー名」・「名前」を入力して「Create Account」をクリックします。

> [!IMPORTANT]
> ここで入力したユーザー名と名前はプラットフォーム上で使用する名前となるので、
> 公開可能な名前を入力をしてください


![alt text](/captures/4.png)


### プロジェクトの新規作成

ログインをすると、チュートリアル用のプロジェクトが表示されます。

> [!NOTE]
> このプロジェクトはチュートリアル用のプロジェクトとなるので、
> お時間があれば、このプロジェクトを参考にして、
> 自分でシーンを作成してみてください。


![alt text](/captures/5.png)



### プラットフォームに移動

この画面で、「家」のアイコンをクリックをすることで、

現在のシーンからPlayCanvasのプラットフォームに移動することができます。

![alt text](/captures/6.png)


> [!NOTE]
> ログインをしている状態で、[PlayCanvas](https://playcanvas.com/)にアクセスをしてもプラットフォームに移動することができます。


### プロジェクトの詳細
このように、プロジェクトの詳細を確認することができます。


![alt text](/captures/7.png)


## Galbi SDK

Galbi SDKは、このPlayCanvasのプロジェクト内にテンプレートプロジェクトとして用意をしています。

[Galbi SDK](https://playcanvas.com/project/1292374/overview/galbisdk)にアクセスをしてください。


### プロジェクトのフォーク

アクセスをしたらページ内の「Fork」ボタンをクリックしてください。


> [!NOTE]
> PlayCanvasでは、プロジェクトをフォーク（複製）の機能があり、プロジェクトの状態をコピーすることができます。


![alt text](/captures/8.png)


### プロジェクト名を入力

フォークボタンをクリックすると、プロジェクト名を入力するダイアログが表示されます。

ここでは「VRC World」などと入力をします（お好きな名前で大丈夫です）

![alt text](/captures/10.png)

### プロジェクトの作成

入力をしたら、「Fork」ボタンをクリックしてください。


これでPlayCanvasプラットフォーム上でプロジェクトを作成することができました。

![alt text](/captures/11.png)

---

> [!IMPORTANT]
> プロジェクトは「Public」か「Private」のどちらかを選択することができます。
>
> 「Public」の場合にはPlayCanvasアカウントでログインしているユーザーであれば、共有されてしまうので
>
> 利用するデータの規約や秘匿性の高いプロジェクトの場合には、「Public」ではなく、「Private」を選択することをおすすめします。
> 
> プライベートプロジェクトを作成するには、PlayCanvasでは、「Personal」か「Organization」のどちらかのプランに加入する必要があります。
>
> [Plans](https://playcanvas.com/plans)
