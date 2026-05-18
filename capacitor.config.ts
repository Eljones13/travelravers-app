import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.travelravers.app",
  appName: "Travel Ravers",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
