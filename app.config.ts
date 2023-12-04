import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "AIO Connect",
  slug: "aio-connect",
  // extra: {
  //   eas: {
  //     projectId: "fee6f798-1e8e-4246-a4ce-13d4f771cb03",
  //   },
  // },
  // android: {
  //   package: "com.irs.svn_mes",
  //   versionCode: 1,
  // },
  // ios: {
  //   bundleIdentifier: "com.irs.svnmes",
  // },
});
