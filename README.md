# Expo를 이용하여 Airbnb Clone 진행하면서 적은 간단한 메모장? 일기장? 일겁니다.

처음 React Native를 배우면서 Expo SDK 44 버젼을 사용했었다.  
그러나 당시에는 Third-Party Library들과 호환성도 너무 안좋아서 React Native CLI로 넘어가고 두번다시는 Expo를 쓰지 않겠다고 다짐했었다.(유연성과 자율성도 React Native에 비해 많이 떨어졌었고...)  
근데 요즘들어 Expo의 발전이 상당하여 벌써 SDK가 50인 상태였고 처음 배웠을 당시보다 변경된 사항이 굉장히 많았다..(Navigation이나 Routing 등)  
그래서 간단하게(?) Expo SDK 50 버젼을 이용하여 Airbnb clone을 진행해보려한다.  
이번 Clone을 진행하고 React Native CLI를 이용하는것보다 이점이 많다면 앞으로 내가 진행하는 프로젝트는 Expo Bare Workflow로 진행하려한다.  
당연히 UI적인 부분만 구현할거고 Data fetch 같은것은 당장은 구현하지 않으려고한다.  
그럼 시작해보겠다

### Airbnb Clone을 다짐한 이유

왜 Airbnb인가 의문을 가질 수 있는데, Airbnb가 React Native의 대부분의 기능을 모두 담을 수 있는 앱이라고 생각했기 때문이다.  
Animation, Tab, Modal 등 많은 기능을 구현하기에 최적이라고 생각이 들었기 때문이다.
그리고 간단하게 Authentication도 Clerk을 이용해 구현해보려고한다.  
Clerk는 요즘 Auth 관련하여 많은 사람들이 사용하여 꽤나 유명해졌다.  
그리고 가격까지 무료로 대부분의 인증기능을 제공해주어 한번 써보고싶었는데 이번 기회에 적용해보기로 하였다.(https://clerk.com)

### Start

시작은 Expo에서 제공해주는 tabs template을 이용해보려고 한다.  
`npx create-expo-app . -t tabs` 명령어를 이용해 set-up 하였다.  
벌써 놀라운점은 React Native CLI 보다 훨씬 빨랐다는것이다.  
심지어 code를 변경하고 fast refresh가 동작하는 속도도 굉장히 빨랐다.  
Clone을 진행하면서 처음 써보거나 이론적으로 메모가 필요한경우 여기에 모두 정리하려한다.

폴더의 구조도 예전보다 굉장히 달라졌다.  
Next.js가 생각나는 폴더구조였다.  
심지어 Expo SDK 50부터 API 기능까지 Beta로 제공해주고 있었다.(https://expo.dev/changelog/2024/01-23-router-3)

```
Airbnb
 ┣ app
 ┃ ┣ (tabs)
 ┃ ┃ ┣ _layout.tsx
 ┃ ┃ ┣ index.tsx
 ┃ ┃ ┗ two.tsx
 ┃ ┣ +html.tsx
 ┃ ┣ +not-found.tsx
 ┃ ┣ _layout.tsx
 ┃ ┗ modal.tsx
 ┣ assets
 ┃ ┣ fonts
 ┃ ┃ ┗ SpaceMono-Regular.ttf
 ┃ ┗ images
 ┃ ┃ ┣ adaptive-icon.png
 ┃ ┃ ┣ favicon.png
 ┃ ┃ ┣ icon.png
 ┃ ┃ ┗ splash.png
 ┣ components
 ┃ ┣ __tests__
 ┃ ┃ ┗ StyledText-test.js
 ┃ ┣ EditScreenInfo.tsx
 ┃ ┣ ExternalLink.tsx
 ┃ ┣ StyledText.tsx
 ┃ ┣ Themed.tsx
 ┃ ┣ useClientOnlyValue.ts
 ┃ ┣ useClientOnlyValue.web.ts
 ┃ ┣ useColorScheme.ts
 ┃ ┗ useColorScheme.web.ts
 ┗ constants
   ┗ Colors.ts
```

### Font

Airbnb에 대한 font를 조사하다보니 Montserrat가 제일 유사하다고 많은 사람들이 이야기하고 있어서 해당 font를 사용하게 되었다.

Expo에서 font를 적용하는 방법은 `/assets/fonts` 폴더에 `.ttf` font를 넣어두고 `/app/_layout.tsx`에 즉 `RootLayout`에 `useFont` hook이 적용되어있는데 이부분을 사용할 font family에 맞춰 적용하면된다.

```javascript
export default function RootLayout() {
    const [loaded, error] = useFonts({
        mon: require("../assets/fonts/Montserrat-Regular.ttf"),
        "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
        "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}
```

위는 이번 프로젝트에 적용한 font를 적용한 RootLayout의 code이다.  
`useFont` hook에서 loaded와 error에 대한 값을 전달해주고 loaded가 true가 되면 splash screen을 숨기고 RootLayoutNav를 return 해주는 형식으로 작성되어있다.  
여기서 초기에 앱을 보여주기 전 load가 필요한 data가 있다면 유사하게 처리해주면 된다.

### Tab

Tab은 React Native Navigation을 이용하여 Expo router가 쉽게 처리해주고 있었다.

```javascript
export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarLabelStyle: {
                    fontFamily: "mon-sb",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: "검색",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="wishlists"
                options={{
                    tabBarLabel: "위시리스트",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="heart-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="trips"
                options={{
                    tabBarLabel: "여행",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="airbnb" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="message"
                options={{
                    tabBarLabel: "메시지",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="message-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarLabel: "프로필",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="person-circle-outline"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
```

위 code는 `/app/tabs/_layout.tsx`에 구성인데, Tabs.Screen의 name을 `/app/tabs`의 `(name).tsx`의 (name)으로 넣어두면 Expo router가 자동으로 routing을 진행하여 tabbar의 형식으로 만들어준다.  
직접 component를 안넣어줘도 구성을 해주는건 참 편리하고 신기한 기능이었다.

### Modal

Authentication을 위한 login modal, 예약을 위한 booking modal을 구성하는데 이것도 정말 어메이징 하였다.  
`/app/modals`에 각각 `login.tsx`, `booking.tsx`로 작성하면 자동으로 modal과 같이 기능을 해주었다.  
기존의 React Native Navigation으로 화면에 대한 구성을 하려면 Stack과 Bottom Tabs의 구성으로 직접 해주어야 했지만 Expo router는 이마저도 자동으로 해주었다.

### Navigation

Expo router의 Link component를 사용해보았다.  
기존의 React Native Navigation은 화면에 대한 이름을 정해두고 이름으로 움직였지만 Expo router는 Web의 \<a> tag와 유사하게 href로 이동을 지원하였다.  
심지어 TypeScript까지 지원해주어서 없는 파일의 경로를 입력하면 type error가 발생하였고, 이는 개발간 정말 큰 도움을 주었다.  
아래 code를 보면 href속성으로 page의 .tsx 경로를 입력해주면 이동이 가능한 구조였다.

```javascript
<Link href={"/(modals)/login"}>Login</Link>
```

그리고 dynamic route 기능도 탐재되어있어 params로 동적인 data를 전달할 수 있었다.
`/detail/[id].tsx`를 생성하고 `id`를 동적으로 전달해 줄 수 있었으며, 아래와 같이 `Link`와 `useLocalSearchParams`를 이용하여 사용할 수 있었다.

```javascript
// Link component로 id 동적으로 넘기기
<Link href={"/detail/123"}>Detail</Link>

// /detail/[id].tsx
type PageParams = {
    id: string;
};

export default function Page() {
    const { id } = useLocalSearchParams<PageParams>();

    console.log(id);

    return (
        <View>
            <Text>Page</Text>
        </View>
    );
}

```

### Authentication

이번에 Clerk를 이용한 user 인증 기능까지 clone해보겠다고 앞서 말했었다.  
각종 social provider들을 제공해주고 있어서 Email, Google, Apple, Facebook Login UI를 구현하고 실제 동작은 Google만 진행하려고 한다.

먼저 `npm install @clerk/clerk-expo`을 진행하고 secure store의 사용을 위해 `npx expo install expo-secure-store`을 진행한다.  
그리고 `tokenCache`를 정의해주어야 하는데, 이는 Clerk가 secure store에 인증 관련 정보를 저장하고, 가져오기 위해 `saveToken`과 `getToekn`을 정의를 한다.

```javascript
const tokenCache = {
    async getToken(key: string) {
        try {
            return SecureStore.getItemAsync(key);
        } catch (error) {
            return null;
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return SecureStore.setItemAsync(key, value);
        } catch (error) {
            return;
        }
    },
};
```

이후 `ClerkProvider`에 public key와 tokenCache를 넘겨준다.

```javascript
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
    async getToken(key: string) {
        try {
            return SecureStore.getItemAsync(key);
        } catch (error) {
            return null;
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return SecureStore.setItemAsync(key, value);
        } catch (error) {
            return;
        }
    },
};

...

export default function RootLayout() {
    ...

    return (
        <ClerkProvider
            publishableKey={CLERK_PUBLISHABLE_KEY!}
            tokenCache={tokenCache}
        >
            <RootLayoutNav />
        </ClerkProvider>
    );
}

...
```

이후 provider들을 Strategy enum으로 나열해두고, 해당 page에 진입 시 `useWarmUpBrowser` hook을 사용하고, Clerk의 `useOAuth` hook으로 Clerk에서 제공해주는 provider별 OAuthFlow를 가져온 후 해당 버튼이 눌렸을때 해당 flow가 진행 될 수 있도록 `onSelectAuth` 함수를 버튼에 연결함

```javascript
enum Strategy {
    Google = "oauth_google",
    Apple = "oauth_apple",
    Facebook = "oauth_facebook",
}

export default function Page() {
    useWarmUpBrowser();

    const router = useRouter();

    const { startOAuthFlow: googleAuth } = useOAuth({
        strategy: Strategy.Google,
    });
    const { startOAuthFlow: appleAuth } = useOAuth({
        strategy: Strategy.Apple,
    });
    const { startOAuthFlow: facebookAuth } = useOAuth({
        strategy: Strategy.Facebook,
    });

    async function onSelectAuth(strategy: Strategy) {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
            [Strategy.Facebook]: facebookAuth,
        }[strategy];

        try {
            const { createdSessionId, setActive } = await selectedAuth();

            if (createdSessionId) {
                setActive!({ session: createdSessionId });
                router.back();
            }
        } catch (error) {
            console.error("OAuth error: ", error);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                autoCapitalize="none"
                placeholder="이메일"
                style={[defaultStyles.inputField, { marginBottom: 30 }]}
            />
            <TouchableOpacity style={defaultStyles.btn}>
                <Text style={defaultStyles.btnText}>계속하기</Text>
            </TouchableOpacity>

            <View style={styles.seperatorView}>
                <View
                    style={{
                        flex: 1,
                        borderBottomColor: "#000",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <Text style={styles.seperator}>또는</Text>
                <View
                    style={{
                        flex: 1,
                        borderBottomColor: "#000",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
            </View>

            <View style={{ gap: 20 }}>
                <TouchableOpacity style={styles.btnOutline}>
                    <Ionicons
                        name="call-outline"
                        style={defaultStyles.btnIcon}
                        size={24}
                    />
                    <Text style={styles.btnOutlineText}>
                        전화번호로 계속하기
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnOutline}
                    onPress={() => onSelectAuth(Strategy.Apple)}
                >
                    <Ionicons
                        name="logo-apple"
                        style={defaultStyles.btnIcon}
                        size={24}
                    />
                    <Text style={styles.btnOutlineText}>
                        Apple 계정으로 계속하기
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnOutline}
                    onPress={() => onSelectAuth(Strategy.Google)}
                >
                    <Ionicons
                        name="logo-google"
                        style={defaultStyles.btnIcon}
                        size={24}
                    />
                    <Text style={styles.btnOutlineText}>
                        Google 계정으로 계속하기
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnOutline}
                    onPress={() => onSelectAuth(Strategy.Facebook)}
                >
                    <Ionicons
                        name="logo-facebook"
                        style={defaultStyles.btnIcon}
                        size={24}
                    />
                    <Text style={styles.btnOutlineText}>
                        Facebook 계정으로 계속하기
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
```

### useWarmUpBrowser hook

Authentication을 구현하면서 `useWarmUpBrowser` hook을 구현했는데 이 hook은 expo-browser가 언제든 표시될 수 있도록 warm-up 해주는 hook이다.  
이후 해당 hook이 unmount될 때 cool-down도 할 수 있게 아래와 같이 작성하였다.

```javascript
export function useWarmUpBrowser() {
    useEffect(() => {
        void WebBrowser.warmUpAsync();

        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
}
```

### Airbnb listing data

Airbnb와 유사하게 만들려면 실제 Airbnb와 같은 data가 필요하겠다고 생각이 들었다.  
어떻게 구할 수 있을까 했는데 opendatasoft라는 곳에서 제공을 해주고 있었다.[(Link)](https://public.opendatasoft.com/explore/dataset/airbnb-listings/table/?disjunctive.host_verifications&disjunctive.amenities&disjunctive.features&q=가&dataChart=eyJxdWVyaWVzIjpbeyJjaGFydHMiOlt7InR5cGUiOiJjb2x1bW4iLCJmdW5jIjoiQ09VTlQiLCJ5QXhpcyI6Imhvc3RfbGlzdGluZ3NfY291bnQiLCJzY2llbnRpZmljRGlzcGxheSI6dHJ1ZSwiY29sb3IiOiJyYW5nZS1jdXN0b20ifV0sInhBeGlzIjoiY2l0eSIsIm1heHBvaW50cyI6IiIsInRpbWVzY2FsZSI6IiIsInNvcnQiOiIiLCJzZXJpZXNCcmVha2Rvd24iOiJyb29tX3R5cGUiLCJjb25maWciOnsiZGF0YXNldCI6ImFpcmJuYi1saXN0aW5ncyIsIm9wdGlvbnMiOnsiZGlzanVuY3RpdmUuaG9zdF92ZXJpZmljYXRpb25zIjp0cnVlLCJkaXNqdW5jdGl2ZS5hbWVuaXRpZXMiOnRydWUsImRpc2p1bmN0aXZlLmZlYXR1cmVzIjp0cnVlLCJxIjoiXHVBQzAwIn19fV0sInRpbWVzY2FsZSI6IiIsImRpc3BsYXlMZWdlbmQiOnRydWUsImFsaWduTW9udGgiOnRydWV9)  
한국의 data를 얻고싶었지만 아쉽게도 한국의 data는 제공해주지 않아, 외국에서 한인들이 운영하는것으로 추정되는 "가"라는 text가 들어간 정보 106개를 filtering하여 가져왔다.(물론 제대로 영어로 된것도 꽤 있음)

### react-native-reanimated

Animation을 위해 react-native-reanimated를 사용해보기로 하였다.  
예전부터 React Native의 Animated를 사용하면서 직접 animation을 구현하고 하는것이 생각보다 번거로운 일이라고 생각이 들었기 때문에 간단한 clone을 진행하면서 미리 구현된 animation을 쓰기위해 선택하였다.  
`npx expo install react-native-reanimated` 명령어로 install하면 되고, 사용을 위해 `babel.config.js`에 plugin도 등록을 해주어야한다.

```javascript
module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: ["react-native-reanimated/plugin"], //<= 추가
    };
};
```

자세한 사용법이나 animation 종류는 link를 확인하면 된다 [(Link)](https://docs.swmansion.com/react-native-reanimated/)

### React Native Share function

이번 clone을 하면서 Share를 처음 써보았다.  
React Native에서 기본으로 Share sheet가 올라오는 function을 제공해주어서 `async-await`을 이용하여 아래와 같이 사용하면된다.  
매번 어떻게 쓰면 될지 궁금했는데 생각보다 쉬웠다.

```javascript
try {
    await Share.share({
        title: detail.name,
        url: detail.listing_url,
    });
} catch (error) {
    console.error("Share error: ", error);
}
```

### react-native-map & react-native-map-clustering

지도에 숙소 리스트를 표시하기 위해 react-native-map library를 사용하였다.[(Link)](https://github.com/react-native-maps/react-native-maps)  
별다른 설정없이 `npx expo install react-native-maps`을 진행하면 install됨.  
react-native-map library는 기본적으로 platform에 맞게 지도를 표시해준다.(Android는 GoogleMap, iOS는 AppleMap)  
이번 프로젝트에는 platform에 상관없이 GoogleMap만 사용하기 위해 `<MapView>` component의 `provider` prop으로 `PROVIDER_GOOGLE`을 넘겨주었다.(사실 한국에서는 애플맵이 UX적으로 친화적이지 않은듯하여..)  
그리고 custom marker를 작성하여 지도에 금액이 표시되도록 Marker를 작성하였다.  
그러나 금액을 전체적으로 뿌리니 여러 숙소가 있는 장소들은 가격들이 중첩되어 보여졌다.(물론 실제 Airbnb도 동일하게 중첩되어 보이나 보기에 너무 안좋은것같았음)

![Before]()

그래서 보기에 좋게 바꾸는 방법이 없을까 찾다가 `react-native-map-clustering`을 찾게되었다.[(Link)](https://github.com/venits/react-native-map-clustering)  
해당 library를 간단히 표현하자면 `<Marker>`가 특정지역에 중첩되어있으면 몇개인지 표시를 해주는 library라고 생각하면된다.  
`npx expo install react-native-map-clustering`를 진행하면 간단하게 install할 수 있었고 사용법도 `react-native-map`과 같았다.  
그래서 최종적으로 아래와 같은 지도의 형태와 동작들을 만들 수 있었다.

![After]()
