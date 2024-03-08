# Expo를 이용하여 Airbnb Clone 진행하면서 적은 일기장입니다.

### Airbnb Clone을 다짐한 이유

처음 React Native를 배우면서 Expo SDK 44 버젼을 사용했었다.  
그러나 당시에는 Third-Party Library들과 호환성도 너무 안좋아서 React Native CLI로 넘어가고 두번다시는 Expo를 쓰지 않겠다고 다짐했었다.(유연성과 자율성도 React Native에 비해 많이 떨어졌었고...)  
근데 요즘들어 Expo의 발전이 상당하여 벌써 SDK가 50인 상태였고 처음 배웠을 당시보다 변경된 사항이 굉장히 많았다..(Navigation이나 Routing 등)  
그래서 간단하게(?) Expo SDK 50 버젼을 이용하여 Airbnb clone을 진행해보려한다.  
이번 Clone을 진행하고 React Native CLI를 이용하는것보다 이점이 많다면 앞으로 내가 진행하는 프로젝트는 Expo Bare Workflow로 진행하려한다.  
당연히 UI적인 부분만 구현할거고 Data fetch 같은것은 당장은 구현하지 않으려고한다.  
그럼 시작해보겠다

### Start

시작은 Expo에서 제공해주는 tabs template을 이용해보려고 한다.  
`npx create-expo-app . -t tabs` 명령어를 이용해 set-up 하였다.  
벌써 놀라운점은 React Native CLI 보다 훨씬 빨랐다는것이다.

폴더의 구조도 예전보다 굉장히 달라졌다.  
Next.js가 생각나는 폴더구조였다.

```
app
 ┣ 📂(tabs)
 ┃ ┣ _layout.tsx
 ┃ ┣ index.tsx
 ┃ ┗ two.tsx
 ┣ +html.tsx
 ┣ +not-found.tsx
 ┣ _layout.tsx
 ┗ modal.tsx
 assets
 ┣ fonts
 ┃ ┗ SpaceMono-Regular.ttf
 ┗ images
 ┃ ┣ adaptive-icon.png
 ┃ ┣ favicon.png
 ┃ ┣ icon.png
 ┃ ┗ splash.png
 components
 ┣ __tests__
 ┃ ┗ StyledText-test.js
 ┣ EditScreenInfo.tsx
 ┣ ExternalLink.tsx
 ┣ StyledText.tsx
 ┣ Themed.tsx
 ┣ useClientOnlyValue.ts
 ┣ useClientOnlyValue.web.ts
 ┣ useColorScheme.ts
 ┗ useColorScheme.web.ts
 constants
 ┗ Colors.ts
```
